// Evaluación. Guía §9.
//
// ⬜ TODO — Fase 4, pero antes del deploy. Sin esto, estás adivinando.
//
// Corre todas las preguntas de eval/questions.yaml contra POST /api/ask
// (o importando el pipeline directamente, más rápido) y reporta:
//
//   1. hit@5 (retrieval)  -> ¿expected_source está entre las sources devueltas?
//   2. fidelidad          -> ¿aparecen los expected_keywords en la answer?
//   3. escalado           -> comparar escalate vs should_escalate
//
// Salida esperada:
//
//   Pregunta                                    hit@5  fid.  escal.
//   ¿hasta cuándo me puedo inscribir?            ✅    ✅    ✅
//   ¿me pueden hacer una excepción con la cuota?  -     -    ✅
//   ...
//   ─────────────────────────────────────────────────────────
//   hit@5: 0.86   fidelidad: 0.82   escalado correcto: 0.94
//
// Interpretación (guía §9, "orden de arreglo"):
//   - chunk correcto NO aparece     -> problema de chunking o corpus
//   - aparece pero responde mal     -> problema de prompt
//   - aparece y responde bien       -> recién ahí, otro modelo
//
// Truco: correr el mismo set contra varios modelos para elegir:
//   CHAT_MODEL=gemma3:4b npm run eval
//   CHAT_MODEL=qwen3:8b  npm run eval

import { readFileSync } from "node:fs";
import { parse } from "yaml";

export async function runEval() {
  const questions = parse(readFileSync("./eval/questions.yaml", "utf8"));
  throw new Error(
    `TODO: implementar eval/run.js. Hay ${questions.length} preguntas en el golden set. Ver guía §9.`,
  );
}

runEval()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(`\n✖ ${err.message}\n`);
    process.exit(1);
  });
