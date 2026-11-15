# AGENTS.md

Documento operativo del repositorio. Está escrito para que un agente (o una persona nueva) pueda trabajar sin romper nada.

- **Guía humana completa:** [`guia-rag-asistente-universitario.md`](./guia-rag-asistente-universitario.md)
- **Contrato de runtime (ingesta + `/api/ask`):** [`docs/CONTRATO-RUNTIME.md`](./docs/CONTRATO-RUNTIME.md)
- **Producto:** [`README.md`](./README.md)
- **Decisiones de curación:** [`corpus/decisions.yaml`](./corpus/decisions.yaml)
- **Reporte de curación:** [`docs/REPORTE-CURACION.md`](./docs/REPORTE-CURACION.md)

---

## 1. Qué es esto

Un asistente virtual que responde consultas de estudiantes usando **material propio** (sitio institucional + FAQ del bot anterior), con citas, y que escala a un humano cuando no sabe.

El pipeline de consulta (`/api/ask` → retrieval → LLM) **todavía no está implementado**. Lo que sí está construido es toda la **fábrica de conocimiento**: recolección, importación, identidad de documentos, curación y evaluación.

```
cosecha (web)  ─┐
import (FAQ)   ─┼→  corpus/  →  [ingesta: TODO]  →  store.json  →  /api/ask  →  canales
curaduría      ─┘
```

## 2. Estado actual

| Componente | Estado |
|---|---|
| Extracción de HTML (cheerio) y crawler | ✅ |
| Import de Dialogflow | ✅ |
| Reporte de curación | ✅ |
| Aplicador de decisiones | ✅ |
| `doc_id` + `aliases` (identidad estable) | ✅ |
| Diff de migración de sitio | ✅ |
| Cliente Ollama (embed + chat) | ✅ |
| Chunking, similitud, prompt | ✅ |
| Servidor con `/health` | ✅ |
| Ingesta a índice (`store.json`) | ⬜ **próximo paso** |
| `/api/ask` | ⬜ devuelve 501 |
| Loaders de PDF / API / OCR | ⬜ |
| Retrieval y caché | ⬜ |
| Evaluación (`eval/run.js`) | ⬜ |
| Canales (WhatsApp, widget) | ⬜ |

Números al día de hoy: **180** documentos en `corpus/web`, **47** en `corpus/faq`, **30** en `corpus-excluded`, **124** decisiones (38 keep · 56 vigente · 30 excluir).

## 3. Invariantes

No romper sin medir el impacto:

1. **Mismo `EMBEDDING_MODEL` en ingesta y consulta.** Si cambia, reindexar todo. Mezclarlos no falla: devuelve resultados malos en silencio.
2. **`mode: live` nunca se indexa.** Datos con vencimiento (aranceles, fechas) se consultan en runtime.
3. **`num_ctx` siempre explícito** (8192). El default de Ollama trunca sin avisar.
4. **Toda respuesta cita o escala.** Nunca las dos cosas a medias.
5. **Todo cambio de chunking, prompt o modelo se valida con `npm run eval`** antes y después.
6. **El título del documento va dentro de cada chunk.** Un chunk que dice «cierra el 28/02» no sirve sin saber de qué documento viene.
7. **Nada se borra por defecto.** Excluir es una decisión registrada, reversible, no un `rm`.
8. **`corpus-excluded/` está fuera de `corpus/`** para que el ingest no lo recorra.
9. **Las decisiones se identifican por `doc_id`**, no por nombre de archivo: el nombre cambia cuando cambia la URL.

## 4. Mapa del repositorio

```
corpus/
  web/              sitio cosechado (frontmatter: doc_id, url, title, site, aliases, fetched_at)
  faq/              import de Dialogflow (frontmatter: doc_id, intent, title, url?, aliases)
  decisions.yaml    registro de curación (lo consume el ingest)
  ejemplo.txt       documento de prueba
corpus-excluded/    excluidos, gitignored, fuera del corpus
data/               store.json y cache.json (artefactos, gitignored)
docs/
  REPORTE-CURACION.md   generado por npm run curation
eval/
  questions.yaml            golden set manual
  questions-dialogflow.yaml generado por npm run import:df
public/index.html   widget de prueba
src/
  config.js         .env + sources.yaml
  lib/              ollama, chunk, similarity
  ingest/           crawler, orquestador (TODO), loaders
  ask/              prompt, retrieve (TODO), cache (TODO)
  tools/            curaduría, import, doc-ids, migración
  server.js         Express: /health y /api/ask
sources.yaml        inventario de fuentes
```

## 5. Contratos de datos

### Frontmatter de cada documento

```yaml
source: web | dialogflow
doc_id: secretarias-sec-academica    # identidad estable; NO cambiar nunca
title: Secretaría Académica
url: https://www.frrq.utn.edu.ar/... # URL canónica actual
site: www.frrq.utn.edu.ar
aliases:                             # URLs anteriores (las llena migrate:site)
  - url: https://www.frrq.utn.edu.ar/vieja/
    valid_until: 2026-12-01
vigencia: 2026-01-01                 # opcional
fetched_at: 2026-11-14T09:47:55Z
```

`doc_id` se deriva del **path**, no del host: `/secretarias/sec_academica/` → `secretarias-sec-academica`. En FAQ se usa `faq-<slug>`.

### `corpus/decisions.yaml`

```yaml
decisions:
  - file: corpus/web/archivo.md      # ubicación actual (pista)
    doc_id: mi-documento             # identidad (clave real)
    title: ...
    status: keep | vigente | excluir
    corpus_dir: web | faq
    note: "..."                      # solo en vigente
```

**El ingest debe resolver por `doc_id`** y usar `file` solo como respaldo.

- `keep` → indexar normal.
- `vigente` → indexar con `meta.vigencia_ambigua = true`; el prompt no debe afirmar años/fechas de ese documento.
- `excluir` → no indexar (el archivo vive en `corpus-excluded/`).

### `AskResponse`

```ts
{ answer, sources[{id,title,page?,url?,score}], confidence, escalate, cached?, latency_ms }
```

## 6. Comandos

| Comando | Qué hace | Escribe |
|---|---|---|
| `npm start` | servidor Express | — |
| `npm run crawl -- --seed <url> --max N` | cosecha un sitio | `corpus/web/` |
| `npm run import:df -- --dir <path>` | importa intents de Dialogflow | `corpus/faq/`, `eval/questions-dialogflow.yaml` |
| `npm run doc-ids` | asigna `doc_id` (dry-run) | — |
| `npm run doc-ids -- --apply` | idem, aplicado | frontmatter |
| `npm run curation` | regenera el reporte | `docs/REPORTE-CURACION.md` |
| `npm run decisions` | dry-run de decisiones | — |
| `npm run decisions -- --apply` | aplica y mueve excluidos | `corpus/decisions.yaml`, filesystem |
| `npm run migrate:site -- --old A --new B` | diff de migración | `docs/MIGRACION.md`, `docs/redirects.csv` |
| `npm run migrate:site -- --old A --new B --apply` | hereda `doc_id`/`aliases` | frontmatter de B |
| `npm run ingest` | ⬜ indexar | `data/store.json` |
| `npm run eval` | ⬜ evaluar | — |

## 7. Flujos

### 7.1 Cosechar el sitio

```bash
npm run crawl -- --sitemap https://www.frrq.utn.edu.ar/wp-sitemap-posts-page-1.xml \
                 --max 300 --delay 250 --out corpus/web
npm run crawl -- --seed https://sac.frrq.utn.edu.ar/ --max 40 --delay 250 \
                 --exclude "utn-frrq-noticias\.html,/noticias/" --out corpus/web
```

El crawler respeta `robots.txt`, espera 250–350 ms, prefiere sitemap, filtra login/feeds/tags/autores/paginación, quita nav/footer/forms, sigue `meta refresh`, deduplica por URL final y **mergea** `_manifest.json` y `_pdfs.json` entre corridas.

### 7.2 Curar

1. `npm run curation` → regenera `docs/REPORTE-CURACION.md` (preserva marcas; las lee del reporte anterior **y** de `decisions.yaml`).
2. Marcá una casilla por documento: `Queda` / `Queda — vigente` / `Excluir`.
3. `npm run decisions` para revisar, `npm run decisions -- --apply` para aplicar.

`Queda — vigente` es para páginas oficiales con años viejos en URL o texto: se responde el procedimiento y **no** las fechas.

### 7.3 Migrar el sitio (cuando `sac` tome el dominio)

1. Cosechar el sitio nuevo en **otra** carpeta (`corpus/web-new`). Nunca sobre `corpus/web`: los viejos quedarían duplicados.
2. `npm run migrate:site -- --old corpus/web --new corpus/web-new`
3. Leer `docs/MIGRACION.md`: igual / URL nueva / contenido cambió / desaparecido / nuevo.
4. Pasar `docs/redirects.csv` al equipo web (301).
5. `--apply` para que los nuevos hereden `doc_id` y `aliases`.
6. Regenerar el reporte: las decisiones siguen por `doc_id`.

## 8. Lo que falta, en orden

1. `src/ingest/index.js`: `type: dir` (web y faq), aplicar `decisions.yaml` por `doc_id`, guardar `embedding_model` en el store.
2. `/api/ask` mínimo → criterio: `curl` responde citando `[1]`.
3. `loaders/file.js` con PDF (`unpdf`), empezando por los 28 de alto valor.
4. `eval/run.js` con `hit@5`, fidelidad y escalado.
5. `retrieve.js` + `cache.js`.
6. Canales y deploy.

## 9. Trampas conocidas

- **Encoding:** la consola de PowerShell manglea UTF-8. Verificá con Node, no con `Get-Content`/`Select-String`.
- **Links del reporte:** el formato es [`archivo.md`](../corpus/web/archivo.md), y también `../corpus/faq/` o `../corpus-excluded/`. Si cambia, el parser de decisiones deja de ver documentos (ya pasó una vez y corrió casillas de documento). El script aborta si parsea menos del 80% de lo registrado.
- **No re-crawlear sobre `corpus/web` después de una migración.** Usar carpeta nueva + `migrate:site`.
- **`autocrlf=false`** en este repo: los archivos son LF.
- **Ollama no tiene auth:** nunca exponerlo a internet.
- **El FAQ del bot es viejo:** puede contradecir al sitio en costos y contactos.

## 10. Cómo verificar que no rompiste nada

```bash
npm run doc-ids                                  # 257 doc_id únicos, 0 cambios esperados
npm run curation                                 # marcas preservadas = 124
npm run decisions                                # 38 keep / 56 vigente / 30 excluir
node --check src/tools/*.js                      # sintaxis
```

Y el chequeo de integridad del reporte:

```bash
node -e "const fs=require('fs');const s=fs.readFileSync('docs/REPORTE-CURACION.md','utf8');const l=[...new Set([...s.matchAll(/\]\((\.\.\/corpus[^)]+)\)/g)].map(m=>decodeURI(m[1])))];console.log('links',l.length,'rotos',l.filter(x=>!fs.existsSync('docs/'+x)).length)"
```
