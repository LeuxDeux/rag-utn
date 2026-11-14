// Loader de archivos: .txt, .md y .pdf.
// Guía §6.2.
//
// ⬜ TODO — Fase 1. Recién cuando la Fase 0 (solo .txt/.md inline) funcione.
//
// Contrato de salida (no cambiar):
//   { text: string, meta: { id, title, url?, page?, vigencia?, fetched_at } }
//
// Para PDFs simples:  npm i unpdf  (ya está en package.json)
//   import { extractText, getDocumentProxy } from "unpdf";
//   const pdf = await getDocumentProxy(new Uint8Array(readFileSync(path)));
//   const { text } = await extractText(pdf, { mergePages: true });
//
// PDFs complejos (tablas, columnas, escaneados): docling por child_process.
//   pip install docling
//
// Chequeo obligatorio antes de indexar: imprimir los primeros 2000 caracteres
// y leerlos. Si el orden está mezclado o hay basura, el RAG no va a funcionar
// y ningún modelo lo arregla.

import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * @param {{ id: string, path: string, title: string, vigencia?: string }} source
 * @returns {Promise<{ text: string, meta: object }>}
 */
export async function loadFile(source) {
  const ext = path.extname(source.path).toLowerCase();

  if (ext === ".txt" || ext === ".md") {
    const text = readFileSync(source.path, "utf8");
    return { text, meta: baseMeta(source, { url: undefined }) };
  }

  if (ext === ".pdf") {
    throw new Error(
      `TODO: implementar PDF (${source.path}) con unpdf — ver guía §6.2`,
    );
  }

  throw new Error(`Extensión no soportada: ${ext}`);
}

function baseMeta(source, extra = {}) {
  return {
    id: source.id,
    title: source.title,
    vigencia: source.vigencia,
    fetched_at: new Date().toISOString(),
    ...extra,
  };
}
