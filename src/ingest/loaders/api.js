// Loader de APIs.
// Guía §3 y §6.4.
//
// Dos responsabilidades distintas, no confundirlas:
//
//   mode: "index"  -> snapshot. Se convierte el JSON a texto y se indexa.
//   mode: "live"   -> NO se indexa. Se consulta en runtime (fetchRelevantLiveSources
//                     en src/ask/retrieve.js) y se inyecta con su fetched_at.
//
// ⬜ TODO — Fase 1 (snapshot) / Fase 2 (live).
//
// Regla de oro: si el dato tiene vencimiento y equivocarse cuesta plata o
// plazos (aranceles, fechas), va live. Siempre con fecha visible en el prompt.

/**
 * Convierte un JSON arbitrario en texto legible para el modelo.
 * Ej: { matricula: 180000, cuota: 45000 } -> "matricula: 180000\ncuota: 45000"
 *
 * @param {unknown} data
 * @returns {string}
 */
export function jsonToText(data) {
  if (data === null || data === undefined) return "";
  if (Array.isArray(data)) return data.map(jsonToText).join("\n");
  if (typeof data === "object") {
    return Object.entries(data)
      .map(([k, v]) =>
        v && typeof v === "object" ? `${k}:\n${jsonToText(v)}` : `${k}: ${v}`,
      )
      .join("\n");
  }
  return String(data);
}

/**
 * Consulta una fuente `live` y devuelve el texto con su fecha.
 * @param {{ id: string, url: string, title: string }} source
 * @returns {Promise<{ id: string, title: string, text: string, fetched_at: string }>}
 */
export async function fetchLive(source) {
  throw new Error(
    `TODO: implementar fetchLive (${source.url}) — ver guía §6.4`,
  );
}
