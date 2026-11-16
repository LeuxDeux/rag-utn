# Handoff: cómo retomar el asistente desde cero

Para quien sigue con el runtime. Asume que ya tiene `webapp-utn` clonado y que va a
pullear `LeuxDeux/rag-utn`.

**Reparto de responsabilidades**

| Repo | Qué es | Quién lo toca |
|---|---|---|
| `rag-utn` | Fábrica de datos: corpus, curación, identidad de documentos, migración | Quien cura el contenido |
| `webapp-utn` | Runtime: ingesta a Postgres, búsqueda híbrida, prompt, API, panel | Quien programa el asistente |

El runtime **consume** `corpus/` y `decisions.yaml`; no los edita.

---

## 1. Requisitos

| Herramienta | Versión | Para qué |
|---|---|---|
| Node | 20+ (probado con 24) | Herramientas de `rag` |
| Go | 1.27 | `webapp-utn` |
| PostgreSQL | 18 | Índice y datos |
| Ollama | 0.40+ | Embeddings y generación |
| Modelos | `embeddinggemma` (621 MB) y `gemma3:4b` (3,4 GB) | — |

Variables de Ollama (a nivel usuario, **antes** de arrancarlo):

```powershell
[Environment]::SetEnvironmentVariable("OLLAMA_MAX_LOADED_MODELS","2","User")
[Environment]::SetEnvironmentVariable("OLLAMA_CONTEXT_LENGTH","8192","User")
```

`OLLAMA_MAX_LOADED_MODELS=2` no es opcional: con el default, Ollama mantiene un solo
modelo en VRAM y cada pregunta alterna entre embedder y chat. Ese cambio de modelo
tarda más que el timeout de 3 s del cliente, y la búsqueda **degrada a solo texto sin
avisar**.

## 2. Poner todo en marcha

### Postgres

```sql
CREATE ROLE webapp LOGIN CREATEDB PASSWORD '...';
CREATE DATABASE db_portal OWNER webapp;
```

`CREATEDB` lo necesita la suite de tests: cada test crea y borra su propia base.

### `.env.local` en `webapp-utn` (no se commitea)

```ini
WEBAPP_DSN=postgres://webapp:CLAVE@127.0.0.1:5432/db_portal?sslmode=disable
WEBAPP_TEST_DSN=postgres://webapp:CLAVE@127.0.0.1:5432/postgres?sslmode=disable
WEBAPP_ENTORNO=desarrollo
WEBAPP_URL_BASE=http://localhost:5004
WEBAPP_DIRECCION=127.0.0.1:5004
WEBAPP_DIR_MEDIA=./media

WEBAPP_ASISTENTE=1
WEBAPP_LLM_URL=http://127.0.0.1:11434/v1
WEBAPP_LLM_CLAVE=ollama
WEBAPP_LLM_MODELOS=gemma3:4b
WEBAPP_OLLAMA_URL=http://127.0.0.1:11434
WEBAPP_EMBEDDING_MODELO=embeddinggemma
```

### Migrar, importar, levantar

```powershell
# Ollama (no arranca solo tras reiniciar)
ollama serve
ollama pull embeddinggemma
ollama pull gemma3:4b

cd <ruta>\webapp-utn
Get-Content .env.local | Where-Object { $_ -match '^\s*[A-Z_]+=' } |
  ForEach-Object { $k,$v = $_ -split '=',2; Set-Item "env:$k" $v }

go run ./cmd/webapp-utn migrar
go run ./cmd/webapp-utn asistente importar ..\rag\corpus
go run ./cmd/webapp-utn asistente reindexar
go run ./cmd/webapp-utn servir
```

Abrir `http://localhost:5004`. La burbuja «Asistente de la Facultad» aparece abajo a la derecha.

> **Importante:** importá desde `..\rag\corpus`, no desde la copia vendorizada
> `webapp-utn/corpus`. Esa copia quedó atrás (47 documentos contra 48) y le falta
> `ubicacion-facultad.md`, el documento curado de la dirección.

### Herramientas de `rag` (solo cuando cambie el corpus)

```powershell
cd <ruta>\rag
npm install
npm run doc-ids        # asigna/valida doc_id; debe dar 0 cambios
npm run curation       # regenera docs/REPORTE-CURACION.md
npm run decisions      # dry-run; con -- --apply aplica y mueve excluidos
```

## 3. Verificar que quedó bien

| Paso | Salida esperada |
|---|---|
| `importar ..\rag\corpus` | `leídos 228, importados 227 (56 vigentes), descartados 1` · `0 pendientes` |
| `reindexar` | `sitio 13 documentos, 337 fragmentos` |
| `psql ... \dt asistente_*` | 7 tablas |
| `asistente estado` | `conocimiento: rag@<hash> · 240 documentos · 1.632 fragmentos` · `estado: al día` |
| `evaluar --dialogflow corpus\eval\questions-dialogflow.yaml` | **182/189** con el sitio indexado (187/189 sin él) |
| `go test ./internal/asistente/...` | 4 paquetes `ok` (necesita `WEBAPP_TEST_DSN`) |

Si `pendientes` no es 0, Ollama no estaba disponible durante el import: volvé a correr
`asistente reindexar`.

## 4. Pruebas

```powershell
# unitarias + integración (cada test crea su base)
$env:WEBAPP_TEST_DSN="postgres://webapp:CLAVE@127.0.0.1:5432/postgres?sslmode=disable"
go test ./internal/asistente/... -count=1

# retrieval sobre 189 preguntas reales del bot anterior (no usa LLM, no gasta cupo)
go run ./cmd/webapp-utn asistente evaluar --dialogflow corpus\eval\questions-dialogflow.yaml

# completa, 15 preguntas con LLM (sí gasta cupo)
go run ./cmd/webapp-utn asistente evaluar
```

### Cómo leer los números

- **182/189** es el valor correcto con el sitio nuevo indexado. Los 5 casos «perdidos»
  respecto de 187 son preguntas cuya respuesta ahora sale de una página del sitio en
  vez de la FAQ del bot: para el usuario es mejor, para el set es una fuente distinta.
  El ítem 1 del roadmap es actualizar `fuentesEsperadas` para reflejarlo.
- **`derivación correcta`** se cuenta contra el total (15), no contra las preguntas que
  deben derivar. Una respuesta que deriva a Alumnado con el contacto **no** matchea
  `EsSinRespuesta`, que exige la frase textual «No tengo esa información.». Es una
  métrica más estricta de lo que parece.
- **Cupo**: 6 preguntas por minuto y 40 por día por IP. Si se agota durante pruebas:
  `update asistente_uso_diario set pedidos_llm = 0;` (solo desarrollo).

## 5. Problemas conocidos

| Síntoma | Causa | Solución |
|---|---|---|
| Importé y responde lo anterior | El conocimiento en la base es una **copia**: un `git pull` en `rag` no la actualiza | `asistente estado` y reimportar |
| Respuestas vagas en un seguimiento | Ya corregido en `fd9508f`; verificar que la rama lo tenga | — |
| `/api/embed` da timeout | `OLLAMA_MAX_LOADED_MODELS` sin setear | Reiniciar Ollama con la variable |
| «No tengo esa información» con datos que existen | Umbral de coseno 0,35 y sin coincidencia de texto | Revisar chunking antes que el modelo |
| Imágenes o chats que no cargan en el panel | Falta `npm --prefix web/panel run build` | Recompilar el panel |
| `403` al probar la API por curl | El chequeo de origen compara con `WEBAPP_URL_BASE` | Usar `Origin: http://localhost:5004` |

## 6. Qué sigue

Ordenado por impacto, con detalle en [`ARQUITECTURA-BUSQUEDA.md`](./ARQUITECTURA-BUSQUEDA.md) §7:

1. **Actualizar el ground truth** del set de 189 (aceptar el documento del sitio).
2. **Datos volátiles (`mode: live`)**: el calendario académico no puede salir del índice.
3. **PDFs**: 458 descubiertos, 28 de alto valor (reglamentos, planes, correlatividades).
   Se pueden convertir a `.md` en `rag` y entrar como `externo`, sin tocar el indexador.
4. **Sincronizar o eliminar la copia vendorizada** de `corpus/`.
5. **Deploy**: HTTPS, systemd, y decidir generación local vs API.

## 7. Documentación

| Archivo | Qué tiene |
|---|---|
| [`../README.md`](../README.md) | Qué es el proyecto |
| [`CONTRATO-RUNTIME.md`](./CONTRATO-RUNTIME.md) | Reglas que el runtime no puede romper |
| [`ARQUITECTURA-BUSQUEDA.md`](./ARQUITECTURA-BUSQUEDA.md) | Cómo busca hoy y cuándo pasar a pgvector |
| [`REPORTE-CURACION.md`](./REPORTE-CURACION.md) | Qué documentos quedan, se conservan o están en duda |
| [`COMANDOS-EJECUCION.txt`](./COMANDOS-EJECUCION.txt) | Chuleta de comandos del día a día |
| [`../AGENTS.md`](../AGENTS.md) | Mapa técnico del repo |

---

## Mensaje corto para pegar

> Pulleá `rag-utn` y leé `docs/HANDOFF.md`. Resumen: importá el corpus desde
> `..\rag\corpus` (no de `webapp-utn/corpus`, que quedó atrás), poné
> `OLLAMA_MAX_LOADED_MODELS=2` antes de arrancar Ollama, y corré la evaluación:
> tiene que dar 182/189 con el sitio indexado. En `fd9508f` ya está el fix de
> multi-turno. Los detalles de búsqueda y escalado están en
> `docs/ARQUITECTURA-BUSQUEDA.md`.
