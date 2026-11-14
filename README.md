# Asistente virtual con RAG — esqueleto

Guía completa: [`guia-rag-asistente-universitario.md`](./guia-rag-asistente-universitario.md)

## Estado de los archivos

| Archivo | Estado |
|---|---|
| `src/config.js` | ✅ implementado |
| `src/lib/ollama.js` | ✅ implementado |
| `src/lib/chunk.js` | ✅ implementado (mejorable — guía §6.3) |
| `src/lib/similarity.js` | ✅ implementado |
| `src/ask/prompt.js` | ✅ implementado |
| `src/server.js` | 🟡 arranca; `/api/ask` devuelve 501 |
| `public/index.html` | 🟡 widget funcional, espera el endpoint |
| `src/ingest/index.js` | ⬜ TODO — Fase 0 (guía §5) |
| `src/ingest/loaders/url.js` | ✅ implementado (fetch + extracción + links + PDFs) |
| `src/ingest/crawl.js` | ✅ implementado (`npm run crawl`) |
| `src/ingest/loaders/file.js` | ⬜ TODO — Fase 1 (guía §6.2) |
| `src/ingest/loaders/api.js` | ⬜ TODO |
| `src/ingest/loaders/image.js` | ⬜ TODO (opcional, último) |
| `src/ask/retrieve.js` | ⬜ TODO — Fase 2 |
| `src/ask/cache.js` | ⬜ TODO — Fase 2 |
| `eval/run.js` | ⬜ TODO — Fase 4 |

**Regla:** las primitivas están hechas para que puedas leerlas y entender el mecanismo.
El pipeline lo escribís vos — ahí está el aprendizaje.

## Arranque

```bash
# 1. Dependencias
npm install

# 2. Modelos (una sola vez)
ollama serve
ollama pull embeddinggemma
ollama pull gemma3:4b

# 3. Verificar que el esqueleto levanta
npm start
# → http://localhost:3000  (widget)
# → http://localhost:3000/health
```

## Orden de trabajo

1. **Fase 0** — implementar `src/ingest/index.js` para `.txt` y `.md`, y `/api/ask` en `src/server.js`.
   El código mínimo está en la guía §5. **No mires más lejos hasta que `curl` responda citando `[1]`.**
2. **Fase 1** — loaders: `file.js` (PDF con `unpdf`), `url.js` (`cheerio`), `api.js`. Recién después `image.js`.
3. **Fase 2** — `retrieve.js` + `cache.js`.
4. **Fase 4** — `eval/run.js` y el golden set. **Antes del deploy.**
5. **Fase 3/5** — canales y VPS.

## Verificaciones rápidas

```bash
# ¿Ollama responde?
curl http://localhost:11434/api/tags

# ¿El modelo de embeddings funciona?
node -e "import('./src/lib/ollama.js').then(async m => { const v = await m.embed('hola'); console.log('dim:', v.length) })"

# ¿El chunking parte bien un documento?
node -e "import('./src/lib/chunk.js').then(m => console.log(m.chunkText(require('fs').readFileSync('corpus/ejemplo.txt','utf8')).length, 'chunks'))"
```

## Invariantes (no romper)

- Mismo `EMBEDDING_MODEL` en ingesta y consulta. Si lo cambiás, **reindexá todo**.
- `mode: live` nunca se indexa (guía §3).
- `num_ctx` siempre explícito (8k).
- Toda respuesta cita o escala.
- Cada cambio de chunking/prompt/modelo → correr `npm run eval`.
