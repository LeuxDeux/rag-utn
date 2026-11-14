// Aplica las decisiones marcadas en docs/REPORTE-CURACION.md.
//
// Uso:
//   npm run decisions              → dry-run, no toca nada
//   npm run decisions -- --apply   → escribe corpus/decisions.yaml y mueve los excluidos
//
// Produce:
//   corpus/decisions.yaml     registro de decisiones (lo consume el ingest)
//   corpus-excluded/*.md      documentos excluidos, fuera de corpus/ (reversible)
//
// Los archivos NO se borran: se mueven. Para revertir, alcanza con moverlos de
// vuelta y borrar su entrada en decisions.yaml.

import fs from "node:fs";
import path from "node:path";
import { stringify } from "yaml";

const ROOT = process.cwd();
const REPORT = path.join(ROOT, "docs/REPORTE-CURACION.md");
const DECISIONS = path.join(ROOT, "corpus/decisions.yaml");
const WEB_DIR = path.join(ROOT, "corpus/web");
const EXCLUDED_DIR = path.join(ROOT, "corpus-excluded");
const MANIFEST = path.join(WEB_DIR, "_manifest.json");

const APPLY = process.argv.includes("--apply");

// ---------------------------------------------------------------- parseo
const text = fs.readFileSync(REPORT, "utf8");
const entries = [];
let cur = null;

for (const line of text.split(/\r?\n/)) {
  const doc = line.match(/^- \[`(.+?)`\]\(\.\.\/corpus\/(?:web|excluded)\/(.+?)\)\s*$/);
  if (doc) {
    cur = { file: decodeURIComponent(doc[2]), title: "", reason: "", options: {} };
    entries.push(cur);
    continue;
  }
  if (!cur) continue;

  const meta = line.match(/^\s{2}- \*(.+?)\*\s*·\s*(.+)$/);
  if (meta && !cur.title) {
    cur.title = meta[1];
    cur.reason = meta[2].replace(/\s*·\s*\[original\]\(<[^>]*>\)\s*$/, "").trim();
    continue;
  }

  const box = line.match(/^\s{2}- \[([ xX])\] (.+)$/);
  if (box) {
    const label = box[2].trim();
    const key = label.includes("vigente") ? "vigente" : label.startsWith("Excluir") ? "excluir" : "keep";
    cur.options[key] = box[1].toLowerCase() === "x";
  }
}

// ---------------------------------------------------------------- decisión
const results = entries.map((e) => {
  const marked = Object.entries(e.options).filter(([, v]) => v).map(([k]) => k);
  if (marked.length === 0) return { ...e, status: "sin-decision" };
  if (marked.length > 1) return { ...e, status: "conflicto", marked };
  return { ...e, status: marked[0] };
});

const counts = results.reduce((acc, r) => ({ ...acc, [r.status]: (acc[r.status] ?? 0) + 1 }), {});
const conflicts = results.filter((r) => r.status === "conflicto");
const decided = results.filter((r) => ["keep", "vigente", "excluir"].includes(r.status));

console.log(`Reporte: ${entries.length} documentos · marcados: ${decided.length}`);
console.log(
  `  conservar: ${counts.keep ?? 0} | vigente: ${counts.vigente ?? 0} | excluir: ${counts.excluir ?? 0} | sin decisión: ${counts["sin-decision"] ?? 0}`,
);

if (conflicts.length) {
  console.log(`\n⚠ ${conflicts.length} documento(s) con más de una casilla marcada. No se tocan:`);
  for (const c of conflicts) console.log(`  - ${c.file} (${c.marked.join(" + ")})`);
}

if (!decided.length) {
  console.log("\nNo hay decisiones marcadas. Marcá el reporte y volvé a correr.");
  process.exit(0);
}

// ---------------------------------------------------------------- validación
const missing = decided.filter((d) => !fs.existsSync(path.join(WEB_DIR, d.file)));
if (missing.length) {
  console.log(`\n⚠ ${missing.length} archivo(s) marcados que ya no están en corpus/web (¿excluidos antes?):`);
  for (const m of missing) console.log(`  - ${m.file}`);
}

// ---------------------------------------------------------------- escritura
const toExclude = decided.filter((d) => d.status === "excluir" && fs.existsSync(path.join(WEB_DIR, d.file)));

console.log(`\n${APPLY ? "APLICANDO" : "DRY-RUN (usá --apply para ejecutar)"}`);
for (const d of decided) {
  const mark = d.status === "excluir" ? "✖" : d.status === "vigente" ? "★" : "✓";
  console.log(`  ${mark} ${d.status.padEnd(8)} ${d.file}`);
}

if (!APPLY) {
  console.log(`\nSe escribiría corpus/decisions.yaml y se moverían ${toExclude.length} archivo(s) a corpus-excluded/.`);
  process.exit(0);
}

const decidedAt = new Date().toISOString().slice(0, 10);
const doc = {
  decided_at: decidedAt,
  source_report: "docs/REPORTE-CURACION.md",
  decisions: decided.map((d) => ({
    file: `corpus/web/${d.file}`,
    title: d.title,
    status: d.status,
    ...(d.status === "vigente"
      ? { note: "el sitio conserva un año viejo pero es el canal oficial vigente: no afirmar fechas" }
      : {}),
  })),
};

// Merge con decisiones previas: las nuevas pisan a las viejas por archivo.
let previous = [];
if (fs.existsSync(DECISIONS)) {
  const raw = fs.readFileSync(DECISIONS, "utf8");
  const m = raw.match(/^decisions:\s*\n([\s\S]*)$/m);
  if (m && !/^\s*decisions:\s*\[\]\s*$/m.test(raw)) {
    // Parseo simple: no vale la pena importar YAML para leer lo que escribimos nosotros.
    for (const block of m[1].split(/\n(?=\s*- file:)/)) {
      const f = block.match(/file:\s*"?([^"\n]+)"?/);
      const s = block.match(/status:\s*"?([^"\n]+)"?/);
      if (f && s) previous.push({ file: f[1].trim(), status: s[1].trim() });
    }
  }
}
const merged = new Map(previous.map((p) => [p.file, p]));
for (const d of doc.decisions) merged.set(d.file, { file: d.file, status: d.status });
doc.decisions = [...merged.values()].map((p) => {
  const full = doc.decisions.find((d) => d.file === p.file);
  return full ?? { file: p.file, status: p.status };
});

fs.writeFileSync(
  DECISIONS,
  `# Registro de decisiones de curación del corpus.\n` +
    `# Generado por \`npm run decisions -- --apply\` desde docs/REPORTE-CURACION.md.\n` +
    `# No editar a mano: volvé a marcar el reporte y re-corré el script.\n` +
    `#\n` +
    `# status: keep    → se indexa normal\n` +
    `#         vigente → se indexa, pero el prompt no debe afirmar fechas de ese documento\n` +
    `#         excluir → no se indexa (el archivo vive en corpus-excluded/)\n\n` +
    stringify(doc),
);
console.log(`\n✓ corpus/decisions.yaml (${doc.decisions.length} entradas)`);

// ---------------------------------------------------------------- mover
if (toExclude.length) {
  fs.mkdirSync(EXCLUDED_DIR, { recursive: true });
  for (const d of toExclude) {
    const from = path.join(WEB_DIR, d.file);
    const to = path.join(EXCLUDED_DIR, d.file);
    fs.renameSync(from, to);
  }

  // Los links del reporte tienen que seguir funcionando: apuntan a la ubicación real.
  let report = fs.readFileSync(REPORT, "utf8");
  for (const d of toExclude) {
    const enc = encodeURI(d.file);
    report = report.split(`../corpus/web/${enc}`).join(`../corpus-excluded/${enc}`);
  }
  fs.writeFileSync(REPORT, report);

  console.log(`✓ ${toExclude.length} archivo(s) movidos a corpus-excluded/`);
  console.log(`✓ links del reporte actualizados a corpus-excluded/`);
}

// ---------------------------------------------------------------- manifest
if (fs.existsSync(MANIFEST)) {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  const gone = new Set(toExclude.map((d) => `${d.file.replace(/\.md$/, "")}`));
  const before = manifest.pages.length;
  manifest.pages = manifest.pages.filter((p) => !gone.has(p.slug));
  manifest.excluded = manifest.excluded ?? [];
  for (const d of toExclude) {
    manifest.excluded.push({
      slug: d.file.replace(/\.md$/, ""),
      reason: `excluido por decisión (${decidedAt}): ${d.reason}`,
    });
  }
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(`✓ manifest: ${before} → ${manifest.pages.length} páginas`);
}

console.log(`\nDocumentos en corpus/web: ${fs.readdirSync(WEB_DIR).filter((f) => f.endsWith(".md")).length}`);
