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
| 1 | ✅ **Actualizar el ground truth de la evaluación** | Hecho en `webapp-utn` (rama `ragv2`): `internal/asistente/evaluacion/alternativas_dialogflow.json` acepta la página del sitio que responde mejor que la FAQ esperada, sin tocar `eval/questions-dialogflow.yaml`. Da **187/189** con los PDF (188 sin ellos): «¿Quién te ha programado?» no tiene respuesta en el sitio y «Administración rural» está mal etiquetada (espera la FAQ de posgrados) |
| 2 | ✅ **Datos volátiles (`mode: live`)** | Hecho en `webapp-utn` (`ragv2`): no hay endpoint del calendario, así que la fuente viva es una pantalla del panel (**Asistente → Datos vigentes**, tabla `asistente_datos_vivos`). Cada dato tiene desde/hasta; mientras vale y toca el tema de la pregunta va primero al prompt como `[VIVO] (actualizado el …)` y manda sobre las fechas del índice. No se indexa ni se cachea |
| 3 | ✅ **PDF a `.md`** | `npm run import:pdf` convierte los 26 de `corpus/pdf-fuentes.yaml` a `corpus/pdf/` (los escaneados pasan antes por `src/tools/ocr-pdf-windows.ps1`). De las tablas de correlatividades queda solo la lista de materias: con los números, gemma3:4b mezclaba correlativas de materias vecinas. `webapp-utn` los importa como `externo` con doc_id `pdf-…` y deriva las correlativas al PDF. Pendiente: probar `CORRELATIVAS=1` con un modelo más grande |
| 4 | ✅ **Sincronizar la copia del corpus** | `webapp-utn/corpus` copiado de `aebc040` (incluye `ubicacion-facultad.md`). Los documentos `source: curado` ya no pasan por el filtro de poco texto. Al cambiar el corpus acá, volver a copiarlo (ver `corpus/README.md` allá) |
| 5 | **Deploy** | `webapp-utn/docs/INSTALACION.md` §12 ya cubre systemd (`enable` para que Ollama arranque solo), `OLLAMA_MAX_LOADED_MODELS=2` y recomienda generación local si el servidor tiene placa. Falta decidir el servidor y hacer el deploy real |

---

*Última actualización: 2026-11-16.*
