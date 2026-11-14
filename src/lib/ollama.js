// Cliente mínimo de Ollama: embeddings + chat.
// Guía §7.1 y §11.
//
// Lo único que hay que entender acá: embed() convierte texto en un array de
// números. chat() recibe mensajes y devuelve texto. Nada más.

import { config } from "../config.js";

const TIMEOUT_MS = 120_000;

async function postJson(url, body, headers = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} en ${url}: ${detail.slice(0, 300)}`);
  }
  return res.json();
}

/**
 * Texto -> vector.
 * Usa la API nueva (/api/embed con `input`) y cae a la vieja si no existe.
 */
export async function embed(text) {
  const body = { model: config.ollama.embeddingModel, input: text };

  try {
    const data = await postJson(`${config.ollama.host}/api/embed`, body);
    if (data.embeddings?.[0]) return data.embeddings[0];
  } catch {
    // Probablemente versión vieja de Ollama: seguimos al fallback.
  }

  const data = await postJson(`${config.ollama.host}/api/embeddings`, {
    model: config.ollama.embeddingModel,
    prompt: text,
  });
  if (!data.embedding) throw new Error("Ollama no devolvió un embedding");
  return data.embedding;
}

/** Igual que embed() pero para muchos textos, de a uno (Ollama no siempre soporta batch). */
export async function embedAll(texts, { onProgress } = {}) {
  const out = [];
  for (let i = 0; i < texts.length; i++) {
    out.push(await embed(texts[i]));
    onProgress?.(i + 1, texts.length);
  }
  return out;
}

/**
 * Mensajes -> respuesta de texto.
 * Si CHAT_BASE_URL está definido, usa una API externa OpenAI-compatible.
 */
export async function chat(messages, { model, numCtx } = {}) {
  const chatModel = model ?? config.ollama.chatModel;
  const ctx = numCtx ?? config.ollama.numCtx;

  if (config.chat.baseUrl) {
    const data = await postJson(
      `${config.chat.baseUrl.replace(/\/$/, "")}/chat/completions`,
      { model: chatModel, messages, temperature: 0.1 },
      { authorization: `Bearer ${config.chat.apiKey}` },
    );
    return data.choices?.[0]?.message?.content ?? "";
  }

  const data = await postJson(`${config.ollama.host}/api/chat`, {
    model: chatModel,
    messages,
    stream: false,
    options: { num_ctx: ctx, temperature: 0.1 },
  });
  return data.message?.content ?? "";
}

/** Chequeo de salud: ¿hay un Ollama vivo con el modelo de embeddings? */
export async function ping() {
  const res = await fetch(`${config.ollama.host}/api/tags`, {
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) throw new Error(`Ollama respondió ${res.status}`);
  const { models = [] } = await res.json();
  return models.map((m) => m.name);
}
