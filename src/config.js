// Configuración central. Lee .env (Node >= 20.6, sin dependencias) y sources.yaml.
// Guía §4 y §10.

import { readFileSync } from "node:fs";
import { parse } from "yaml";

try {
  process.loadEnvFile(".env");
} catch {
  // Sin .env: se usan los defaults de abajo.
}

const env = (key, fallback) => process.env[key] ?? fallback;
const num = (key, fallback) => Number(process.env[key] ?? fallback);

export const config = {
  port: num("PORT", 3000),

  ollama: {
    host: env("OLLAMA_HOST", "http://127.0.0.1:11434"),
    embeddingModel: env("EMBEDDING_MODEL", "embeddinggemma"),
    chatModel: env("CHAT_MODEL", "gemma3:4b"),
    // NUNCA confiar en el default de Ollama: trunca en silencio.
    numCtx: num("NUM_CTX", 8192),
  },

  chat: {
    // Vacío => se usa Ollama. Con valor => API externa OpenAI-compatible.
    baseUrl: env("CHAT_BASE_URL", ""),
    apiKey: env("CHAT_API_KEY", ""),
  },

  retrieveK: num("RETRIEVE_K", 5),
  minScore: num("MIN_SCORE", 0.35),
  cacheTtl: num("CACHE_TTL", 3600),

  paths: {
    corpus: "./corpus",
    store: "./data/store.json",
    cache: "./data/cache.json",
  },
};

export function loadSources(path = "./sources.yaml") {
  const doc = parse(readFileSync(path, "utf8"));
  return {
    chunkSize: doc.chunk_size ?? 800,
    chunkOverlap: doc.chunk_overlap ?? 120,
    embeddingModel: doc.embedding_model ?? config.ollama.embeddingModel,
    sources: doc.sources ?? [],
  };
}
