// Servidor. Un endpoint raro: POST /api/ask.
// Guía §7.2.
//
// 🟡 Arranca, pero /api/ask todavía devuelve 501. Ese es tu trabajo de Fase 0.
//
// El flujo completo del handler (guía §7.2):
//   1. validar input
//   2. cache.get(question) -> si hay hit, devolver con cached: true
//   3. retrieve(question, 5)
//   4. si el mejor score < config.minScore -> "no lo sé" + escalate, SIN llamar al modelo
//   5. chat(buildMessages({ question, chunks, liveData }))
//   6. armar AskResponse, cache.set(), devolver
//
// Contrato de respuesta (NO cambiar; solo agregar campos opcionales):
//   { answer, sources[], confidence, escalate, cached?, latency_ms }

import express from "express";
import { config } from "./config.js";

const app = express();
app.use(express.json({ limit: "32kb" }));
app.use(express.static("public"));

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    embedding_model: config.ollama.embeddingModel,
    chat_model: config.ollama.chatModel,
    chat_backend: config.chat.baseUrl ? "api" : "ollama",
  });
});

app.post("/api/ask", (req, res) => {
  res.status(501).json({
    error: "TODO: implementar /api/ask",
    hint: "Guía §7.2. La versión mínima está en §5 paso 5.",
    received: req.body?.question ?? null,
  });
});

app.listen(config.port, () => {
  console.log(`\n  RAG esqueleto → http://localhost:${config.port}`);
  console.log(`  embeddings: ${config.ollama.embeddingModel}`);
  console.log(`  chat:       ${config.ollama.chatModel} (${config.chat.baseUrl ? "API" : "Ollama"})`);
  console.log(`  /api/ask    → 501 (pendiente: Fase 0)\n`);
});
