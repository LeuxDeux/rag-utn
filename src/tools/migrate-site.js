// Compara dos cosechas del sitio (antes y después de una migración de dominio
// o de cambio de CMS) y produce un diff accionable.
//
// Uso:
//   npm run migrate:site -- --old corpus/web --new corpus/web-new
//   npm run migrate:site -- --old corpus/web --new corpus/web-new --apply
//
// Con --apply, los documentos nuevos heredan doc_id y aliases de los viejos, y
// se escribe docs/redirects.csv (viejo -> nuevo) para el equipo web.
//
// Estrategia de matching, en orden:
//   1. doc_id igual            (la ruta se conservó)
//   2. hash del cuerpo igual    (misma página, otra URL)
//   3. similitud de texto > .60 (misma página, reescrita o movida)
//   4. sin match                -> desaparecido (viejo) / nuevo (nuevo)
//
// Nada se borra: los "desaparecidos" quedan para que decidas con el reporte de
// curación. Durante la migración, el corpus viejo es el único registro de lo
// que había.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { parse, stringify } from "yaml";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith("--")) acc.push([a.slice(2), arr[i + 1]?.startsWith("--") || arr[i + 1] === undefined ? true : arr[i + 1]]);
    return acc;
  }, []),
);

const OLD = args.old ?? "corpus/web";
const NEW = args.new ?? "corpus/web-new";
const APPLY = process.argv.includes("--apply");
const TODAY = new Date().toISOString().slice(0, 10);

if (!fs.existsSync(OLD) || !fs.existsSync(NEW)) {
  console.error(`Faltan carpetas: ${OLD} o ${NEW}`);
  process.exit(1);
}

const norm = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function readDoc(dir, file) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const parts = raw.split("---");
  const fm = parts[1] ?? "";
  const body = parts.slice(2).join("---").replace(/^\n/, "");
  const field = (k) => ((fm.match(new RegExp(`^${k}:\\s*(.+)$`, "m")) ?? [])[1] ?? "").trim().replace(/^"|"$/g, "");
  return {
    dir,
    file,
    raw,
    fmText: fm,
    fm: parse(fm) ?? {},
    title: field("title"),
    url: field("url"),
    doc_id: field("doc_id"),
    body,
    hash: crypto.createHash("sha1").update(norm(body)).digest("hex"),
    words: norm(body).split(" ").filter(Boolean),
  };
}

const readAll = (dir) =>
  fs.readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readDoc(dir, f));

const oldDocs = readAll(OLD);
const newDocs = readAll(NEW);

// bigramas para similitud
const bigrams = (words) => {
  const s = new Set();
  for (let i = 0; i < words.length - 1; i++) s.add(`${words[i]} ${words[i + 1]}`);
  return s;
};
for (const d of [...oldDocs, ...newDocs]) d.bg = bigrams(d.words);

const sim = (a, b) => {
  let inter = 0;
  for (const x of a.bg) if (b.bg.has(x)) inter++;
  const union = a.bg.size + b.bg.size - inter;
  return union === 0 ? 0 : inter / union;
};

const oldByDocId = new Map(oldDocs.map((d) => [d.doc_id, d]).filter(([k]) => k));
const oldByHash = new Map(oldDocs.map((d) => [d.hash, d]));

const matched = new Map(); // newFile -> { old, how, score }
const usedOld = new Set();

for (const n of newDocs) {
  const byId = oldByDocId.get(n.doc_id);
  if (byId && !usedOld.has(byId.file)) {
    matched.set(n.file, { old: byId, how: "doc_id", score: 1 });
    usedOld.add(byId.file);
    continue;
  }
  const byHash = oldByHash.get(n.hash);
  if (byHash && !usedOld.has(byHash.file)) {
    matched.set(n.file, { old: byHash, how: "contenido", score: 1 });
    usedOld.add(byHash.file);
    continue;
  }
}

// similitud para los que quedaron sin match
for (const n of newDocs) {
  if (matched.has(n.file)) continue;
  let best = null;
  for (const o of oldDocs) {
    if (usedOld.has(o.file)) continue;
    if (o.words.length < 40 || n.words.length < 40) continue;
    const s = sim(o, n);
    if (!best || s > best.score) best = { old: o, how: "similitud", score: s };
  }
  if (best && best.score > 0.6) {
    matched.set(n.file, best);
    usedOld.add(best.old.file);
  }
}

const desaparecidos = oldDocs.filter((o) => !usedOld.has(o.file));
const nuevos = newDocs.filter((n) => !matched.has(n.file));

// ---------------------------------------------------------------- reporte
const rows = [];
for (const n of newDocs) {
  const m = matched.get(n.file);
  if (!m) {
    rows.push(`| \`${n.file}\` | — | — | **NUEVO** |`);
    continue;
  }
  const o = m.old;
  const change =
    m.how === "doc_id" && o.hash === n.hash
      ? "igual"
      : m.how === "contenido"
        ? "URL nueva"
        : m.how === "doc_id"
          ? "contenido cambió"
          : `movido (${m.score.toFixed(2)})`;
  rows.push(`| \`${n.file}\` | \`${o.doc_id ?? "?"}\` | ${o.url || "—"} | ${change} |`);
}

const md = `# Migración de sitio — diff de contenido

**Comparado:** \`${OLD}\` (${oldDocs.length}) → \`${NEW}\` (${newDocs.length})
**Fecha:** ${TODAY}

## Resumen

| Situación | Documentos |
|---|---|
| Emparejados por doc_id | ${[...matched.values()].filter((m) => m.how === "doc_id").length} |
| Emparejados por contenido idéntico | ${[...matched.values()].filter((m) => m.how === "contenido").length} |
| Emparejados por similitud | ${[...matched.values()].filter((m) => m.how === "similitud").length} |
| **Desaparecidos** (existían y ya no) | **${desaparecidos.length}** |
| **Nuevos** (no existían antes) | **${nuevos.length}** |

## Documentos nuevos vs. anteriores

| Documento nuevo | doc_id anterior | URL anterior | Situación |
|---|---|---|---|
${rows.join("\n")}

## Desaparecidos (${desaparecidos.length})

Estos documentos existían en el sitio anterior y no tienen equivalente en el nuevo.
No se borran: hay que decidir si se archivan (contenido histórico) o se excluyen.

${desaparecidos.map((d) => `- \`${d.doc_id ?? d.file}\` · *${d.title}* · ${d.url || "sin url"}`).join("\n") || "_Ninguno._"}

## Qué hacer

1. Revisar esta tabla con el equipo web: ¿las URLs nuevas son las definitivas?
2. Exportar \`docs/redirects.csv\` y pasárselo para los 301 (SEO).
3. \`--apply\` para que los documentos nuevos hereden doc_id y aliases.
4. Regenerar el reporte de curación: las decisiones siguen por doc_id.
`;

fs.mkdirSync("docs", { recursive: true });
fs.writeFileSync("docs/MIGRACION.md", md);

const csv = ["old_url,new_url,doc_id"];
for (const [newFile, m] of matched.entries()) {
  const n = newDocs.find((x) => x.file === newFile);
  if (!n || !m.old.url || m.old.url === n.url) continue;
  csv.push(`"${m.old.url}","${n.url}","${m.old.doc_id ?? ""}"`);
}
fs.writeFileSync("docs/redirects.csv", csv.join("\n") + "\n");

// ---------------------------------------------------------------- aplicar
if (APPLY) {
  let updated = 0;
  for (const [newFile, m] of matched.entries()) {
    const n = newDocs.find((x) => x.file === newFile);
    if (!n || !m.old.doc_id) continue;
    const aliases = [
      ...(Array.isArray(m.old.fm.aliases) ? m.old.fm.aliases : []),
      ...(m.old.url && m.old.url !== n.url
        ? [{ url: m.old.url, valid_until: TODAY }]
        : []),
    ];
    const seen = new Set();
    const dedup = aliases.filter((a) => {
      const u = typeof a === "string" ? a : a.url;
      if (!u || seen.has(u)) return false;
      seen.add(u);
      return true;
    });

    const next = {
      ...n.fm,
      doc_id: m.old.doc_id,
      ...(dedup.length ? { aliases: dedup } : {}),
    };
    const body = n.raw.split("---").slice(2).join("---");
    fs.writeFileSync(path.join(n.dir, n.file), `---\n${stringify(next, { lineWidth: 0 })}---${body}`);
    updated++;
  }
  console.log(`✓ ${updated} documentos nuevos heredaron doc_id/aliases`);
}

console.log(`\n→ docs/MIGRACION.md`);
console.log(`→ docs/redirects.csv`);
console.log(
  `emparejados: ${matched.size} | desaparecidos: ${desaparecidos.length} | nuevos: ${nuevos.length}`,
);
