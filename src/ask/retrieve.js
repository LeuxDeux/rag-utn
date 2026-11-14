// Retrieval: pregunta -> top K chunks.
// Guía §7.2, pasos 2 y 3.
//
// ⬜ TODO — Fase 2.
//
// Algoritmo completo:
//   1. Embeddear la pregunta                     -> embed(question)
//   2. Cargar data/store.json (con cache en memoria; no leer el archivo por request)
//   3. topK(store, questionEmbedding, config.retrieveK)
//   4. Devolver los chunks con score
//
// Después (Fase 3+), cuando la calidad no alcance:
//   - búsqueda híbrida: BM25 + vectorial, y fusionar resultados.
//     Los códigos de materia, números de resolución y nombres propios
//     los encuentra mejor la búsqueda por palabra exacta.
//   - reranker sobre los top 20 -> top 5.
//
// NUNCA metas un vector DB antes de ~5.000 chunks. store.json en memoria
// alcanza y te enseña qué hace realmente una base vectorial.

import { config } from "../config.js";
import { embed } from "../lib/ollama.js";
import { topK } from "../lib/similarity.js";

/**
 * @param {string} question
 * @param {number} [k]
 * @returns {Promise<Array<{ id: string, text: string, meta: object, score: number }>>}
 */
export async function retrieve(question, k = config.retrieveK) {
  throw new Error(
    "TODO: implementar retrieve() — ver guía §7.2 paso 3",
  );
}

/**
 * Fuentes `live` relevantes para esta pregunta (aranceles, fechas, estado).
 * Guía §6.4. Solo en Fase 3.
 *
 * @param {string} question
 * @returns {Promise<Array<{ title: string, text: string, fetched_at: string }>>}
 */
export async function fetchRelevantLiveSources(question) {
  // TODO (Fase 3): decidir si la pregunta toca un dato volátil y, si sí,
  // llamar a fetchLive() del loader de api. Devolver [] mientras tanto.
  return [];
}
