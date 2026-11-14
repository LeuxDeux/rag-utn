// Chunking: partir un documento en fragmentos indexables.
// Guía §6.3.
//
// Reglas que aplica:
//   1. Parte por bloques (párrafos), no por caracteres ciegos.
//   2. Nunca corta una oración al medio.
//   3. Mantiene un solapamiento para no perder contexto en las fronteras.
//
// TODO (Fase 1, mejora importante): partir por estructura de verdad
//   (títulos "Artículo N", "CAPÍTULO", headings markdown) y PREPENDER
//   el título del documento al texto de cada chunk. Eso mejora el
//   retrieval más que cambiar de modelo.

const SENTENCE_END = /(?<=[.!?])\s+/;

/** Divide un bloque gigante en trozos <= size respetando oraciones. */
function splitBySentences(block, size) {
  const sentences = block.split(SENTENCE_END);
  const parts = [];
  let current = "";

  for (const sentence of sentences) {
    if (current && current.length + sentence.length + 1 > size) {
      parts.push(current);
      current = sentence;
    } else {
      current = current ? `${current} ${sentence}` : sentence;
    }
  }
  if (current) parts.push(current);
  return parts;
}

function tail(text, n) {
  if (n <= 0 || text.length <= n) return text;
  const cut = text.slice(-n);
  const space = cut.indexOf(" ");
  return space === -1 ? cut : cut.slice(space + 1);
}

/**
 * @param {string} text
 * @param {{ size?: number, overlap?: number }} opts
 * @returns {string[]}
 */
export function chunkText(text, { size = 800, overlap = 120 } = {}) {
  const normalized = String(text).replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const blocks = normalized
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  const chunks = [];
  let current = "";

  for (const block of blocks) {
    // Bloque demasiado grande: partirlo por oraciones.
    if (block.length > size * 1.5) {
      if (current) {
        chunks.push(current);
        current = "";
      }
      chunks.push(...splitBySentences(block, size));
      continue;
    }

    const joined = current ? `${current}\n\n${block}` : block;

    if (current && joined.length > size) {
      chunks.push(current);
      current = `${tail(current, overlap)}\n\n${block}`;
    } else {
      current = joined;
    }
  }

  if (current.trim()) chunks.push(current.trim());
  return chunks.filter((c) => c.length > 0);
}
