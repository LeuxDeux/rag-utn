// Asigna doc_id estable a los documentos del corpus.
//
// Uso:
//   npm run doc-ids              → dry-run
//   npm run doc-ids -- --apply   → escribe el frontmatter
//
// Por qué: hoy la identidad de un documento es su URL. El día que el sitio
// cambie de dominio o de estructura (WordPress -> export estático), todas las
// URLs cambian y cada documento pasa a ser "otro". Con doc_id, la identidad
// viaja con el contenido y las decisiones de curación sobreviven a la mudanza.
//
// doc_id se deriva del PATH, no del host:
//   https://www.frrq.utn.edu.ar/secretarias/sec_academica/  -> secretarias-sec-academica
//   https://sac.frrq.utn.edu.ar/utn-frrq-carreras.html      -> utn-frrq-carreras
//   https://www.frrq.utn.edu.ar/                            -> home
//
// No se toca `url`: sigue siendo la URL canónica actual. `aliases` guarda las
// anteriores, con la fecha en que dejaron de ser válidas (lo llena migrate-site).

import fs from "node:fs";
import path from "node:path";
import { parse, stringify } from "yaml";

const APPLY = process.argv.includes("--apply");
const DIRS = ["corpus/web", "corpus/faq", "corpus/pdf", "corpus-excluded"];

function docIdFromUrl(url) {
  let u;
  try {
    u = new URL(url);
  } catch {
    return null;
  }
  const p = decodeURIComponent(u.pathname)
    .replace(/\/+$/, "")
    .replace(/\.html?$/i, "");
  if (!p) return "home";
  return p
    .replace(/^\/+/, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

const used = new Map();
function unique(id) {
  if (!used.has(id)) {
    used.set(id, 1);
    return id;
  }
  const n = used.get(id) + 1;
  used.set(id, n);
  return `${id}-${n}`;
}

let changed = 0;
let skipped = 0;
const rows = [];

for (const dir of DIRS) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".md"))) {
    const full = path.join(dir, f);
    const raw = fs.readFileSync(full, "utf8");
    const parts = raw.split("---");
    if (parts.length < 3) {
      skipped++;
      continue;
    }
    const fm = parse(parts[1]) ?? {};
    const body = parts.slice(2).join("---").replace(/^\n/, "");

    let id = fm.doc_id;
    if (!id) {
      if (fm.source === "dialogflow") {
        id = f.replace(/\.md$/, "");
        if (!id.startsWith("faq-")) id = `faq-${id}`;
      } else {
        id = docIdFromUrl(fm.url);
      }
      if (!id) {
        skipped++;
        continue;
      }
      id = unique(id);
    }

    // Un título plegado por YAML ocupa dos líneas y rompe los parsers line-based:
    // se reescribe con lineWidth 0 aunque el doc_id ya exista.
    const wrapped = /\n\s{2,}\S/.test(parts[1]);

    if (fm.doc_id === id && !wrapped) {
      rows.push({ file: `${dir}/${f}`, doc_id: id, cambio: "sin cambios" });
      continue;
    }

    const next = {
      source: fm.source ?? "web",
      ...(fm.intent ? { intent: fm.intent } : {}),
      doc_id: id,
      title: fm.title ?? "",
      ...(fm.url ? { url: fm.url } : {}),
      ...(fm.site ? { site: fm.site } : {}),
      ...(fm.vigencia ? { vigencia: fm.vigencia } : {}),
      aliases: Array.isArray(fm.aliases) ? fm.aliases : [],
      ...(fm.imported_at ? { imported_at: fm.imported_at } : {}),
      ...(fm.fetched_at ? { fetched_at: fm.fetched_at } : {}),
    };

    if (APPLY) fs.writeFileSync(full, `---\n${stringify(next, { lineWidth: 0 })}---\n${body}`);
    changed++;
    rows.push({ file: `${dir}/${f}`, doc_id: id, cambio: fm.doc_id ? "actualizado" : "asignado" });
  }
}

console.log(`${APPLY ? "APLICADO" : "DRY-RUN"} — ${changed} documentos con doc_id nuevo, ${skipped} omitidos`);
for (const r of rows.filter((r) => r.cambio !== "sin cambios").slice(0, 15)) {
  console.log(`  ${r.cambio.padEnd(11)} ${r.doc_id.padEnd(42)} ${r.file}`);
}
if (rows.filter((r) => r.cambio !== "sin cambios").length > 15) {
  console.log(`  ... y ${rows.filter((r) => r.cambio !== "sin cambios").length - 15} más`);
}

// Chequeo de unicidad
const ids = rows.map((r) => r.doc_id);
const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dup.length) {
  console.log(`\n⚠ doc_id repetidos: ${[...new Set(dup)].join(", ")}`);
} else {
  console.log(`\n✓ ${ids.length} doc_id únicos`);
}
