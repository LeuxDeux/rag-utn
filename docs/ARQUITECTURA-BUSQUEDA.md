# Arquitectura de búsqueda y cuándo escalar

**Para quien mantiene el runtime** (ingesta + `/api/ask`). Complementa
[`CONTRATO-RUNTIME.md`](./CONTRATO-RUNTIME.md).

Pregunta que responde: *«¿Postgres está vectorizando? ¿Necesitamos una base vectorial?»*

---

## 1. Qué hace hoy la base

Postgres **guarda** los vectores, pero **no busca con ellos**.

```
embedding  | real[]                  ← array común, sin extensión
tsv        | tsvector (índice GIN)   ← esto sí lo busca Postgres
extensiones: solo plpgsql            ← no hay pgvector
índices: PK, documento_id, GIN(tsv)  ← ninguno sobre embedding
```

| Parte del híbrido | Quién la ejecuta |
|---|---|
| Búsqueda de texto | Postgres, índice GIN sobre `tsv` |
| Búsqueda vectorial | **Go, en memoria**: carga todos los `embedding` al arrancar y calcula coseno en un bucle |

`indice/buscar.go` lo hace explícito: `SELECT id, embedding::text ...`, `normalizar()`
y producto escalar en Go. La fusión de ambas listas es RRF (k = 60).

Verificación (30 segundos):

```sql
\d asistente_fragmentos
select extname from pg_extension;
select indexname, indexdef from pg_indexes where tablename = 'asistente_fragmentos';
```

Si no aparece `vector` ni un índice sobre `embedding`, la búsqueda vectorial no es de Postgres.

## 2. Por qué hoy alcanza

Medido sobre el corpus actual (227 documentos externos + 13 del sitio):

```
1.632 fragmentos × 768 dimensiones × 4 bytes ≈ 4,8 MB de RAM
1 consulta = 1.252.000 multiplicaciones → menos de 1 ms en Go
```

La evaluación de 189 preguntas tarda ~21 s: **~110 ms por pregunta**, y el coseno
es una fracción mínima (el resto es el embedding en Ollama y el viaje a la base).

## 3. Cuándo deja de alcanzar

| Fragmentos | RAM de vectores | Costo por consulta | Veredicto |
|---|---|---|---|
| 1.600 (hoy) | ~5 MB | <1 ms | sobrado |
| 10.000 | ~30 MB | ~6 ms | sobrado |
| 50.000 | ~150 MB | ~30 ms | empieza a notarse |
| 500.000 | ~1,5 GB | ~300 ms | hay que indexar |

El umbral práctico es **~50.000 fragmentos**. Antes de eso, indexar es optimizar
lo que no duele.

Hay dos disparadores que **no** son de velocidad y llegan antes:

1. **Réplicas.** Cada proceso carga su propia copia en RAM. Tres réplicas de
   500.000 fragmentos son 4,5 GB repartidos, y cada arranque tarda más.
2. **Filtrado por permisos (etapa 2).** Si un alumno solo puede ver el material
   de sus materias, con fuerza bruta se filtran candidatos *después* de traerlos.
   Un índice en la base permite filtrar **antes** de buscar, que es lo que un ACL
   necesita para no filtrar información.

Sumar los 28 PDFs de reglamentos y planes de estudio agrega ~1.000–3.000
fragmentos: seguimos en ~5.000. El salto real es el **material bibliográfico por
materia** de la etapa 2.

## 4. Cómo sería la migración (cuando toque)

`pgvector` es la opción natural: misma base, sin servicio nuevo.

```sql
CREATE EXTENSION vector;

ALTER TABLE asistente_fragmentos ADD COLUMN embedding_v vector(768);
UPDATE asistente_fragmentos SET embedding_v = array_to_vector(embedding);
-- verificar en la versión instalada: alternativa `embedding::text::vector`

CREATE INDEX ON asistente_fragmentos
  USING hnsw (embedding_v vector_cosine_ops);

-- después de validar
ALTER TABLE asistente_fragmentos DROP COLUMN embedding;
ALTER TABLE asistente_fragmentos RENAME COLUMN embedding_v TO embedding;
```

Consulta con filtros de metadatos (lo que hoy no se puede hacer en la base):

```sql
SELECT f.id, f.texto, 1 - (f.embedding <=> $1::vector) AS coseno
FROM asistente_fragmentos f
JOIN asistente_documentos d ON d.id = f.documento_id
WHERE d.fuente = ANY($2)          -- y, en etapa 2, el filtro de permisos
ORDER BY f.embedding <=> $1::vector
LIMIT 20;
```

Cambios en el código:

1. Borrar `Hibrido.vecs`, `Cargar`, `verificar` y el cargador en memoria.
2. `buscarVector` pasa a ser una consulta SQL más, igual que `buscarTexto`.
3. Mantener la fusión RRF y los pesos por fuente tal como están.
4. Revalidar con la evaluación (`evaluar --dialogflow`): HNSW es **aproximado**;
   comparar hit@5 contra la fuerza bruta antes de borrar la columna vieja.

## 5. Qué no hacer todavía

- **No** meter Qdrant/Milvus/servicio aparte: agrega infraestructura y un lugar
  más donde los datos se desincronizan.
- **No** indexar con 1.600 fragmentos.
- **No** cambiar el modelo de embeddings: obliga a reindexar todo y hay que
  revalidar el set de 189.

## 6. Cómo medirlo cuando cambie el corpus

```sql
-- cantidad y peso real de los vectores
select count(*) as fragmentos,
       pg_size_pretty(sum(pg_column_size(embedding))::bigint) as vectores
from asistente_fragmentos;

-- documentos por fuente
select fuente, count(*) from asistente_documentos group by 1 order by 2 desc;
```

Y el costo real de una consulta, con el servidor levantado:

```powershell
Measure-Command { curl.exe -s -X POST http://localhost:5004/api/v1/asistente/preguntar `
  -H "content-type: application/json" -H "Origin: http://localhost:5004" `
  -d '{"pregunta":"cuando son las mesas de examen"}' | Out-Null }
```

Si el p95 se acerca al timeout de la pregunta (`timeoutPregunta`), ese es el
número que importa, no el benchmark aislado.

## 7. Roadmap técnico pendiente

Por orden de impacto, con lo que le toca a este lado:

| # | Qué | Detalle |
|---|---|---|
| 1 | **Actualizar el ground truth de la evaluación** | El set de 189 espera documentos de la FAQ del bot; ahora el sitio nuevo los supera y 5 casos cuentan como falla aunque la respuesta sea mejor. Aceptar el documento del sitio en `fuentesEsperadas` |
| 2 | **Datos volátiles (`mode: live`)** | Hoy las fechas de inscripción salen del índice. Cuando cambie el cuatrimestre va a afirmar plazos vencidos con cita. Endpoint/JSON del calendario inyectado como `[VIVO]` con `fetched_at` |
| 3 | **Loader de PDF** (o conversión previa a `.md`) | 458 PDFs descubiertos, 28 de alto valor (reglamentos, planes, correlatividades). Se pueden convertir a `.md` en `rag` y entrar como `externo` sin tocar el indexador |
| 4 | **Sincronizar la copia del corpus** | `webapp-utn/corpus` está vendorizado y quedó atrás (47 vs 48 docs: falta `ubicacion-facultad.md`). Mejor importar siempre de `..\rag\corpus` |
| 5 | **Deploy** | HTTPS, systemd, y decidir si la generación va local o por API. Ollama no arranca solo tras un reinicio |

---

*Última actualización: 2026-11-16.*
