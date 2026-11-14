// Similitud: el motor de búsqueda completo. Son 10 líneas.
// Guía §2.
//
// No hay magia: dos vectores son parecidos si apuntan en la misma dirección.

/** Similitud coseno. 1 = idénticos, 0 = sin relación. */
export function cosine(a, b) {
  if (!a || !b || a.length !== b.length) {
    throw new Error(`Vectores incompatibles: ${a?.length} vs ${b?.length}`);
  }
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb);
  return denom === 0 ? 0 : dot / denom;
}

/**
 * Devuelve los k items más parecidos al vector de consulta.
 * @param {Array<{ embedding: number[] }>} items
 * @param {number[]} queryEmbedding
 * @param {number} k
 */
export function topK(items, queryEmbedding, k = 5) {
  return items
    .map((item) => ({ ...item, score: cosine(item.embedding, queryEmbedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}
