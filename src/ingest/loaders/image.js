// Loader de imágenes (OCR).
// Guía §6.5.
//
// ⬜ TODO — OPCIONAL Y ÚLTIMO. No lo toques hasta que todo lo demás funcione.
//
//   npm i tesseract.js
//
//   import { createWorker } from "tesseract.js";
//   const worker = await createWorker("spa");
//   const { data: { text } } = await worker.recognize(source.path);
//   await worker.terminate();
//
// Advertencia: un OCR mediocre mete basura al índice y EMPEORA el asistente.
// Si la foto está torcida, oscura o tiene poco contraste, es mejor derivar
// a un humano que indexar texto mal reconocido.
//
// Contrato de salida (no cambiar):
//   { text: string, meta: { id, title, fetched_at } }

/**
 * @param {{ id: string, path: string, title: string }} source
 * @returns {Promise<{ text: string, meta: object }>}
 */
export async function loadImage(source) {
  throw new Error(
    `TODO (opcional): implementar OCR para ${source.path} — ver guía §6.5`,
  );
}
