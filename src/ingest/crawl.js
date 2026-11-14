// Crawler: recorre un sitio y guarda el contenido como .md en corpus/web/.
// Guía §3 ("el caso de la landing") y §6.2.
//
// Uso:
//   node src/ingest/crawl.js --seed https://www.frrq.utn.edu.ar/ --max 40 --delay 400
//   node src/ingest/crawl.js --sitemap https://www.frrq.utn.edu.ar/wp-sitemap.xml --max 300
//
// Reglas de buena ciudadanía (no las saltes):
//   - Respeta robots.txt (lo lee y aplica Disallow).
//   - 1 request cada --delay ms (default 400ms).
//   - Mismo host que la semilla.
//   - User-Agent identificable.
//   - No sigue logout, carrito, búsquedas ni calendarios infinitos.
//
// Salida:
//   corpus/web/<slug>.md        contenido con frontmatter (url, title, fetched_at)
//   corpus/web/_manifest.json   índice de lo bajado
//   corpus/web/_pdfs.json       PDFs descubiertos (no se descargan acá)

import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fetchHtml, extractContent } from "./loaders/url.js";

const args = parseArgs(process.argv.slice(2));
const OUT_DIR = args.out ?? "corpus/web";
const DELAY = Number(args.delay ?? 400);
const MAX = Number(args.max ?? 50);

const SKIP_PATTERNS = [
  /\/wp-login\.php/i, /\/wp-admin/i, /\/feed\/?$/i, /[?&](s|paged|replytocom)=/i,
  /\/(tag|author)\//i, /\/wp-json\//i, /\/xmlrpc\.php/i, /\/comments\//i,
  /\/search\//i, /\/page\/\d+/i, /\.(jpg|jpeg|png|gif|webp|svg|zip|rar|docx?|xlsx?|pptx?)$/i,
];

// ---------------------------------------------------------------- utilidades

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    out[a.slice(2)] = argv[i + 1]?.startsWith("--") ? true : argv[++i];
  }
  return out;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function readJson(file, fallback) {
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function slugify(url) {
  const u = new URL(url);
  const raw = `${u.hostname}${u.pathname}`
    .replace(/\/+$/, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const hash = Buffer.from(u.href).toString("base64url").slice(-6);
  return `${raw.slice(0, 80) || "index"}-${hash}`.toLowerCase();
}

function shouldSkip(url, host) {
  let u;
  try {
    u = new URL(url);
  } catch {
    return true;
  }
  if (u.host !== host) return true;
  return SKIP_PATTERNS.some((re) => re.test(u.pathname + u.search));
}

// ----------------------------------------------------------------- robots.txt

function parseRobots(txt) {
  const disallow = [];
  let applies = false;
  for (const line of txt.split(/\r?\n/)) {
    const l = line.replace(/#.*/, "").trim();
    if (!l) continue;
    const [rawKey, ...rest] = l.split(":");
    const key = rawKey.trim().toLowerCase();
    const val = rest.join(":").trim();
    if (key === "user-agent") applies = val === "*" || /rag-corpus-bot/i.test(val);
    else if (key === "disallow" && applies && val) disallow.push(val);
  }
  return disallow;
}

async function loadRobots(host) {
  try {
    const res = await fetch(`https://${host}/robots.txt`, {
      signal: AbortSignal.timeout(8000),
      headers: { "user-agent": "Mozilla/5.0 (compatible; RAG-corpus-bot/0.1)" },
    });
    if (!res.ok) return [];
    return parseRobots(await res.text());
  } catch {
    return [];
  }
}

const isAllowed = (url, disallow) => {
  const { pathname } = new URL(url);
  return !disallow.some((d) => pathname.startsWith(d));
};

// ------------------------------------------------------------------- sitemap

async function urlsFromSitemap(sitemapUrl) {
  const out = new Set();
  const seen = new Set();

  async function walk(url, depth = 0) {
    if (depth > 2 || seen.has(url)) return;
    seen.add(url);
    const res = await fetch(url, {
      signal: AbortSignal.timeout(20_000),
      headers: { "user-agent": "Mozilla/5.0 (compatible; RAG-corpus-bot/0.1)" },
    });
    if (!res.ok) return;
    const xml = await res.text();
    const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1]);
    if (/<sitemapindex/i.test(xml)) {
      // Índice de sitemaps: no incluir los de usuarios (privacidad) ni taxonomías.
      for (const loc of locs) {
        if (/users|taxonomies|category|tag/i.test(loc)) continue;
        await walk(loc, depth + 1);
      }
    } else {
      for (const loc of locs) out.add(loc);
    }
  }

  await walk(sitemapUrl);
  return [...out];
}

// ----------------------------------------------------------------------- main

async function main() {
  const seed = args.seed ?? args.sitemap;
  if (!seed) {
    console.error(
      "Uso:\n  node src/ingest/crawl.js --seed https://sitio/ --max 50\n  node src/ingest/crawl.js --sitemap https://sitio/sitemap.xml --max 300",
    );
    process.exit(1);
  }

  const host = new URL(seed).host;
  const disallow = await loadRobots(host);
  console.log(`Host: ${host} | robots: ${disallow.length ? disallow.join(", ") : "sin restricciones"}`);

  // Semillas: sitemap (mejor) o la propia URL.
  let queue = args.sitemap
    ? (await urlsFromSitemap(args.sitemap)).filter((u) => !shouldSkip(u, host))
    : [seed];

  if (args.sitemap) console.log(`Sitemap: ${queue.length} URLs tras filtrar`);
  else queue = [seed];

  mkdirSync(OUT_DIR, { recursive: true });

  // Merge con lo ya bajado: así se puede crawlear un sitio y después otro
  // sin pisar el manifest ni la lista de PDFs.
  const prev = readJson(path.join(OUT_DIR, "_manifest.json"), { pages: [], hosts: [] });
  const manifest = prev.pages ?? [];
  const allPdfs = new Set(readJson(path.join(OUT_DIR, "_pdfs.json"), []));
  const hosts = new Set([...(prev.hosts ?? []), host]);

  const visited = new Set();
  const savedUrls = new Set(manifest.map((p) => p.url));
  let errors = 0;

  while (queue.length && visited.size < MAX) {
    const url = queue.shift();
    const cleanUrl = url.split("#")[0];
    if (visited.has(cleanUrl)) continue;
    visited.add(cleanUrl);

    if (!isAllowed(cleanUrl, disallow)) {
      console.log(`  · robots  ${cleanUrl}`);
      continue;
    }

    try {
      const { html, finalUrl } = await fetchHtml(cleanUrl);
      const { text, title, links, pdfs, vigencia, redirect } = extractContent(html, finalUrl);

      for (const p of pdfs) allPdfs.add(p);

      // Stub de meta-refresh: seguimos el destino en vez de guardar basura.
      if (redirect && !visited.has(redirect)) {
        queue.unshift(redirect);
        console.log(`  → redirige ${redirect}`);
        continue;
      }

      if (text.length < 200 || savedUrls.has(finalUrl)) {
        console.log(
          `  · ${savedUrls.has(finalUrl) ? "duplicado" : "vacío"}  ${cleanUrl} (${text.length} chars)`,
        );
      } else {
        const slug = slugify(cleanUrl);
        const front = [
          "---",
          `source: web`,
          `url: ${finalUrl}`,
          `title: ${JSON.stringify(title)}`,
          `site: ${host}`,
          vigencia ? `vigencia: ${vigencia}` : null,
          `fetched_at: ${new Date().toISOString()}`,
          "---",
        ]
          .filter((line) => line !== null)
          .join("\n");

        writeFileSync(
          path.join(OUT_DIR, `${slug}.md`),
          `${front}\n\n# ${title}\n\n${text}\n`,
        );
        manifest.push({ slug, url: finalUrl, title, chars: text.length });
        savedUrls.add(finalUrl);
        console.log(`  ✓ ${String(text.length).padStart(6)}  ${title.slice(0, 60)}`);
      }

      // Encolar links internos nuevos.
      if (!args["no-follow"]) {
        for (const link of links) {
          if (visited.has(link) || shouldSkip(link, host)) continue;
          if (!queue.includes(link)) queue.push(link);
        }
      }
    } catch (err) {
      errors++;
      console.log(`  ✖ ${cleanUrl} — ${err.message}`);
    }

    await sleep(DELAY);
  }

  writeFileSync(
    path.join(OUT_DIR, "_manifest.json"),
    JSON.stringify(
      { hosts: [...hosts], crawled_at: new Date().toISOString(), pages: manifest },
      null,
      2,
    ),
  );
  writeFileSync(path.join(OUT_DIR, "_pdfs.json"), JSON.stringify([...allPdfs], null, 2));

  console.log(
    `\nListo: ${manifest.length} páginas guardadas, ${errors} errores, ${allPdfs.size} PDFs descubiertos.`,
  );
  console.log(`  → ${OUT_DIR}/`);
  if (allPdfs.size) console.log(`  → ${OUT_DIR}/_pdfs.json`);
}

main().catch((err) => {
  console.error(`\n✖ ${err.message}\n`);
  process.exit(1);
});
