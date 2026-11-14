// Caché de respuestas.
// Guía §7.3.
//
// ⬜ TODO — Fase 2. Es la diferencia entre 15 USD y 300 USD al mes.
//
// Nivel 1 — exacta (hacelo primero, es trivial):
//   key = hash(question.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
//              .replace(/[^\w\s]/g, "").trim())
//   guardar { answer, sources, confidence, escalate, expires_at } en data/cache.json
//   TTL: config.cacheTtl (3600s). Para datos live, TTL más corto.
//
// Nivel 2 — semántica (después):
//   guardar también el embedding de la pregunta.
//   Si cosine(pregunta, preguntaCacheada) > 0.95 -> mismo cache hit.
//   Captura "cuanto sale la cuota" vs "cuánto está la cuota mensual".
//
// En época de inscripción, el 80% de las consultas son las mismas cinco.
// Medí y mostrá la tasa de caché: es la métrica que convence a la universidad.

import { config } from "../config.js";

/**
 * @param {string} question
 * @returns {Promise<object|null>}
 */
export async function get(question) {
  // TODO (Fase 2)
  return null;
}

/**
 * @param {string} question
 * @param {object} payload
 */
export async function set(question, payload) {
  // TODO (Fase 2)
}

/** Para el log y el panel de métricas. */
export function stats() {
  return { hits: 0, misses: 0, ttl: config.cacheTtl };
}
