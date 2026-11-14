// Orquestador de ingesta.
// Guía §5 (Fase 0) y §6 (Fase 1).
//
// Flujo: sources.yaml -> cargar cada fuente -> chunk -> embeddings -> data/store.json
//
// ⬜ TODO — ESTO ES TU PRIMER TRABAJO (Fase 0).
//
// Versión mínima (el código completo está en la guía §5, paso 4):
//   1. Leer sources.yaml con loadSources()
//   2. Por cada source con mode: "index":
//        - type === "dir"  -> recorrer el directorio (ej. corpus/web/*.md).
//          Cada archivo tiene frontmatter YAML entre "---" con url, title,
//          fetched_at. Parsealo y usalo como meta de los chunks.
//        - type === "file" y termina en .txt o .md -> fs.readFile
//        - si no -> delegate al loader correspondiente (Fase 1)
//   3. chunkText(raw, { size, overlap })
//   4. embedAll(chunks)
//   5. Escribir [{ id, text, meta, embedding }] en data/store.json
//   6. Imprimir "Indexados N chunks" y el modelo usado
//
// DECISIONES DE CURADURÍA: leer corpus/decisions.yaml (lo genera
// `npm run decisions -- --apply`) y:
//   - status: excluir -> no indexar (el archivo ni siquiera está en corpus/)
//   - status: vigente -> indexar con meta.vigencia_ambigua = true, para que
//     el prompt no afirme años ni fechas de ese documento (ver ask/prompt.js)
//
// INVARIANTE: guardar el modelo de embeddings en el store y verificarlo al
// arrancar. Si cambió, abortar con un mensaje claro ("reindexá con X").
// Mezclar modelos no falla: solo devuelve resultados malos en silencio.
//
// Ojo: `mode: "live"` NUNCA se indexa (guía §3). Esos se consultan en runtime.

import { config, loadSources } from "../config.js";
import { chunkText } from "../lib/chunk.js";
import { embedAll } from "../lib/ollama.js";

/**
 * @returns {Promise<{ chunks: number, model: string }>}
 */
export async function runIngest() {
  const { sources } = loadSources();

  throw new Error(
    `TODO: implementar la ingesta. Hay ${sources.length} fuentes declaradas en sources.yaml. ` +
      `Ver guía §5 paso 4 (versión mínima, ~40 líneas).`,
  );
}

// Ejecución directa: `npm run ingest`
runIngest()
  .then((r) => console.log(`Indexados ${r.chunks} chunks con ${r.model}`))
  .catch((err) => {
    console.error(`\n✖ ${err.message}\n`);
    process.exit(1);
  });
