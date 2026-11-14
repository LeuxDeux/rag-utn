// Loader de páginas web: una URL -> texto limpio + metadatos + links.
// Guía §3 y §6.2.
//
// También lo usa el crawler (src/ingest/crawl.js) para recorrer un sitio.
//
// Contrato de salida (no cambiar):
//   { text: string, meta: { id, title, url, vigencia?, fetched_at } }

import * as cheerio from "cheerio";

export const USER_AGENT =
  "Mozilla/5.0 (compatible; RAG-corpus-bot/0.1; uso interno academico)";

// Basura que nunca es contenido: si no se quita, el índice se llena de
// "Inicio | Carreras | Contacto" repetido en cada chunk.
const DROP = [
  "script", "style", "noscript", "iframe", "svg", "form", "nav", "header",
  "footer", "aside", "button", "select", "input", "textarea",
  "#wpadminbar", ".screen-reader-text", ".skip-link", ".menu", ".navbar",
  ".sidebar", ".widget", ".breadcrumb", ".cookie", ".cookies", ".social",
  ".share", ".pagination", ".comments", "#comments", ".related-posts",
].join(",");

// En orden de preferencia: el primero que tenga suficiente texto gana.
const MAIN_SELECTORS = [
  ".entry-content",
  "article .content",
  "main article",
  "article",
  "main",
  "#content",
  ".content",
  "body",
];

const BLOCK_TAGS = "h1,h2,h3,h4,h5,p,li,td,th,blockquote,dd,dt";

/** Descarga HTML. Lanza si el status no es 2xx. */
export async function fetchHtml(url, { timeout = 20_000 } = {}) {
  const res = await fetch(url, {
    headers: {
      "user-agent": USER_AGENT,
      accept: "text/html,application/xhtml+xml",
      "accept-language": "es-AR,es;q=0.9",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(timeout),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} en ${url}`);
  return {
    html: await res.text(),
    finalUrl: res.url,
    contentType: res.headers.get("content-type") ?? "",
  };
}

function clean(s) {
  return String(s ?? "")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+/g, " ")
    .trim();
}

/**
 * Extrae el contenido principal, los links internos y los PDFs de un HTML.
 * @returns {{ text, title, links: string[], pdfs: string[], vigencia?: string }}
 */
export function extractContent(html, baseUrl) {
  const $ = cheerio.load(html);

  // 1. Links y PDFs ANTES de borrar nada.
  const links = new Set();
  const pdfs = new Set();
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:")) return;
    let abs;
    try {
      abs = new URL(href, baseUrl);
    } catch {
      return;
    }
    if (abs.protocol !== "http:" && abs.protocol !== "https:") return;
    abs.hash = "";
    if (/\.pdf$/i.test(abs.pathname)) pdfs.add(abs.href);
    else links.add(abs.href);
  });

  // 2. Metadatos antes de limpiar.
  const rawTitle =
    clean($("h1").first().text()) ||
    clean($("title").text()) ||
    new URL(baseUrl).pathname;
  // WordPress suele agregar "– Nombre del sitio" al título. Es ruido en la cita.
  const title = rawTitle.replace(/\s*[–|—]\s*[^–|—]{1,60}$/, "").trim() || rawTitle;

  // Stub de redirección por meta refresh (típico de exportadores estáticos).
  const refresh = $('meta[http-equiv="refresh" i]').attr("content") ?? "";
  const refreshMatch = refresh.match(/url\s*=\s*(.+)$/i);
  let redirectTarget = null;
  if (refreshMatch) {
    try {
      redirectTarget = new URL(refreshMatch[1].trim().replace(/^['"]|['"]$/g, ""), baseUrl).href;
    } catch {
      redirectTarget = null;
    }
  }
  const vigencia =
    $('meta[property="article:modified_time"]').attr("content") ??
    $('meta[property="article:published_time"]').attr("content") ??
    undefined;

  // 3. Fuera todo lo que no es contenido.
  $(DROP).remove();

  // 4. Elegir el contenedor con más texto.
  let node = null;
  for (const sel of MAIN_SELECTORS) {
    const candidate = $(sel).first();
    if (candidate.length && clean(candidate.text()).length > 200) {
      node = candidate;
      break;
    }
  }
  node ??= $("body");

  // 5. Convertir a texto preservando la estructura (títulos y párrafos).
  const blocks = [];
  node.find(BLOCK_TAGS).each((_, el) => {
    const text = clean($(el).text());
    if (!text) return;
    const tag = el.tagName?.toLowerCase() ?? "";
    if (/^h[1-5]$/.test(tag)) blocks.push(`\n${text}\n`);
    else if (tag === "li") blocks.push(`- ${text}`);
    else blocks.push(text);
  });

  // 6. El contenedor elegido puede no tener hijos de bloque: usar su texto.
  if (blocks.length === 0) blocks.push(clean(node.text()));

  // 7. Deduplicar líneas repetidas (restos de menús, avisos de cookies).
  const seen = new Map();
  for (const b of blocks) {
    const k = b.toLowerCase();
    seen.set(k, (seen.get(k) ?? 0) + 1);
  }
  const text = blocks
    .filter((b) => !(b.length < 120 && (seen.get(b.toLowerCase()) ?? 0) > 2))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { text, title, links: [...links], pdfs: [...pdfs], vigencia, redirect: redirectTarget };
}

/** Loader de una sola URL, con el contrato estándar. */
export async function loadUrl(source) {
  const { html, finalUrl } = await fetchHtml(source.url);
  const { text, title, vigencia } = extractContent(html, finalUrl);

  if (text.length < 100) {
    throw new Error(`Contenido casi vacío en ${source.url} (${text.length} chars). ¿Es una SPA?`);
  }

  return {
    text,
    meta: {
      id: source.id,
      title: source.title || title,
      url: finalUrl,
      vigencia,
      fetched_at: new Date().toISOString(),
    },
  };
}
