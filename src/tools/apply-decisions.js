// Aplica las decisiones marcadas en docs/REPORTE-CURACION.md.
//
// Uso:
//   npm run decisions              → dry-run, no toca nada
//   npm run decisions -- --apply   → escribe corpus/decisions.yaml y mueve los excluidos
//
// Funciona sobre todas las carpetas de corpus (web y faq). El reporte es la
// fuente de verdad: aplicar reconcilia el filesystem en las dos direcciones,
// así que cambiar una marca de Excluir a Queda devuelve el archivo a su carpeta.
//
// Produce:
//   corpus/decisions.yaml     registro de decisiones (lo consume el ingest)
//   corpus-excluded/*.md      documentos excluidos, fuera del corpus

import fs from "node:fs";
import path from "node:path";
import { stringify } from "yaml";

const ROOT = process.cwd();
const REPORT = path.join(ROOT, "docs/REPORTE-CURACION.md");
const DECISIONS = path.join(ROOT, "corpus/decisions.yaml");
const EXCLUDED_DIR = path.join(ROOT, "corpus-excluded");
const MANIFEST = path.join(ROOT, "corpus/web/_manifest.json");
const CORPUS_DIRS = ["corpus/web", "corpus/faq"];

const APPLY = process.argv.includes("--apply");

const locate = (name) => {
  for (const d of CORPUS_DIRS) {
    const p = path.join(d, name);
    if (fs.existsSync(p)) return p;
  }
  return null;
};

// ---------------------------------------------------------------- parseo
const text = fs.readFileSync(REPORT, "utf8");
const entries = [];
let cur = null;

for (const line of text.split(/\r?\n/)) {
  const doc = line.match(/^- \[`(.+?)`\]\(\.\.\/(corpus\/[a-z]+|corpus-excluded)\/(.+?)\)\s*$/);
  if (doc) {
    cur = {
      file: decodeURIComponent(doc[3]),
      relDir: doc[2] === "corpus-excluded" ? null : doc[2].split("/")[1],
      title: "",
      reason: "",
      options: {},
    };
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

// ---------------------------------------------------------------- decisiones previas
const previous = new Map();
if (fs.existsSync(DECISIONS)) {
  const raw = fs.readFileSync(DECISIONS, "utf8");
  for (const block of raw.split(/\n(?=\s*- file:)/)) {
    const f = block.match(/file:\s*"?([^"\n]+)"?/);
    const s = block.match(/status:\s*"?([^"\n]+)"?/);
    const d = block.match(/corpus_dir:\s*"?([^"\n]+)"?/);
    if (f && s) {
      previous.set(f[1].trim(), {
        file: f[1].trim(),
        status: s[1].trim(),
        corpus_dir: d ? d[1].trim() : undefined,
      });
    }
  }
}

// ---------------------------------------------------------------- resultado
const results = entries.map((e) => {
  const marked = Object.entries(e.options).filter(([, v]) => v).map(([k]) => k);
  if (marked.length === 0) return { ...e, status: "sin-decision" };
  if (marked.length > 1) return { ...e, status: "conflicto", marked };
  return { ...e, status: marked[0] };
});

const counts = results.reduce((acc, r) => ({ ...acc, [r.status]: (acc[r.status] ?? 0) + 1 }), {});
const conflicts = results.filter((r) => r.status === "conflicto");
const decided = results.filter((r) => ["keep", "vigente", "excluir"].includes(r.status));

if (conflicts.length) {
  console.log(`\n⚠ ${conflicts.length} documento(s) con más de una casilla marcada. No se tocan:`);
  for (const c of conflicts) console.log(`  - ${c.file} (${c.marked.join(" + ")})`);
}

// Guarda contra desincronización del parser: si de golpe se parsean muchos menos
// documentos que los ya decididos, algo se rompió y escribiría sobre los equivocados.
if (previous.size && entries.length < previous.size * 0.8) {
  console.error(
    `\n✖ Parseo sospechoso: ${entries.length} documentos leídos contra ${previous.size} decisiones registradas.`,
  );
  console.error("  Abortado sin tocar nada. Revisá el formato de los links del reporte.");
  process.exit(1);
}

console.log(
  `Reporte: ${entries.length} documentos · decididos: ${decided.length} · sin decisión: ${counts["sin-decision"] ?? 0}`,
);
console.log(
  `  conservar: ${counts.keep ?? 0} | vigente: ${counts.vigente ?? 0} | excluir: ${counts.excluir ?? 0}`,
);

// ---------------------------------------------------------------- reconciliación
const wantExcluded = decided.filter((d) => d.status === "excluir");
const wantPresent = decided.filter((d) => d.status !== "excluir");
const toMoveOut = wantExcluded.filter((d) => locate(d.file));
const toRestore = wantPresent.filter(
  (d) => !locate(d.file) && fs.existsSync(path.join(EXCLUDED_DIR, d.file)),
);

console.log(`\n${APPLY ? "APLICANDO" : "DRY-RUN (usá --apply para ejecutar)"}`);
for (const d of decided) {
  const mark = d.status === "excluir" ? "✖" : d.status === "vigente" ? "★" : "✓";
  console.log(`  ${mark} ${d.status.padEnd(8)} ${d.file}`);
}

if (!APPLY) {
  console.log(
    `\nSe escribiría corpus/decisions.yaml, se moverían ${toMoveOut.length} a corpus-excluded/` +
      ` y se restaurarían ${toRestore.length}.`,
  );
  process.exit(0);
}

// ---------------------------------------------------------------- decisions.yaml
const decidedAt = new Date().toISOString().slice(0, 10);

const dirFor = (d) => {
  if (locate(d.file)) return path.dirname(locate(d.file)).replace(/\\/g, "/").replace(/^\.\//, "");
  if (d.relDir) return `corpus/${d.relDir}`;
  const prev = previous.get(`corpus/${d.relDir ?? ""}/${d.file}`);
  if (prev?.corpus_dir) return `corpus/${prev.corpus_dir}`;
  const found = [...previous.values()].find((p) => p.file.endsWith(`/${d.file}`));
  return found?.corpus_dir ? `corpus/${found.corpus_dir}` : "corpus/web";
};

const newDecisions = decided.map((d) => ({
  file: `${dirFor(d)}/${d.file}`,
  title: d.title,
  status: d.status,
  corpus_dir: dirFor(d).split("/")[1],
  ...(d.status === "vigente"
    ? { note: "el sitio conserva un año viejo pero es el canal oficial vigente: no afirmar fechas" }
    : {}),
}));

const merged = new Map([...previous.values()].map((p) => [p.file, p]));
for (const d of newDecisions) merged.set(d.file, d);

fs.writeFileSync(
  DECISIONS,
  `# Registro de decisiones de curación del corpus.\n` +
    `# Generado por \`npm run decisions -- --apply\` desde docs/REPORTE-CURACION.md.\n` +
    `# No editar a mano: volvé a marcar el reporte y re-corré el script.\n` +
    `#\n` +
    `# status: keep    → se indexa normal\n` +
    `#         vigente → se indexa, pero el prompt no debe afirmar fechas de ese documento\n` +
    `#         excluir → no se indexa (el archivo vive en corpus-excluded/)\n\n` +
    stringify({
      decided_at: decidedAt,
      source_report: "docs/REPORTE-CURACION.md",
      decisions: [...merged.values()].sort((a, b) => a.file.localeCompare(b.file)),
    }),
);
console.log(`\n✓ corpus/decisions.yaml (${merged.size} entradas)`);

// ---------------------------------------------------------------- mover / restaurar
fs.mkdirSync(EXCLUDED_DIR, { recursive: true });

for (const d of toMoveOut) {
  fs.renameSync(locate(d.file), path.join(EXCLUDED_DIR, d.file));
}
for (const d of toRestore) {
  const targetDir = dirFor(d);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.renameSync(path.join(EXCLUDED_DIR, d.file), path.join(targetDir, d.file));
}

if (toMoveOut.length || toRestore.length) {
  // Los links del reporte apuntan a la ubicación real del archivo.
  let report = fs.readFileSync(REPORT, "utf8");
  for (const d of decided) {
    const enc = encodeURI(d.file);
    const target =
      d.status === "excluir" ? `../corpus-excluded/${enc}` : `../${dirFor(d)}/${enc}`;
    for (const candidate of [
      `../corpus/web/${enc}`,
      `../corpus/faq/${enc}`,
      `../corpus-excluded/${enc}`,
    ]) {
      report = report.split(candidate).join(target);
    }
  }
  fs.writeFileSync(REPORT, report);
}

if (toMoveOut.length) console.log(`✓ ${toMoveOut.length} archivo(s) movidos a corpus-excluded/`);
if (toRestore.length) console.log(`✓ ${toRestore.length} archivo(s) restaurados al corpus`);
if (toMoveOut.length || toRestore.length) console.log(`✓ links del reporte actualizados`);

// ---------------------------------------------------------------- manifest (solo web)
if (fs.existsSync(MANIFEST)) {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  const before = manifest.pages.length;

  const entryFromFile = (slug) => {
    const raw = fs.readFileSync(path.join("corpus/web", `${slug}.md`), "utf8");
    const fm = raw.split("---")[1] ?? "";
    const field = (k) => ((fm.match(new RegExp(`^${k}:\\s*(.+)$`, "m")) ?? [])[1] ?? "").trim();
    const body = raw.split("---").slice(2).join("---").trim();
    return { slug, url: field("url"), title: field("title").replace(/^"|"$/g, ""), chars: body.length };
  };

  const present = fs
    .readdirSync("corpus/web")
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
  const bySlug = new Map(manifest.pages.map((p) => [p.slug, p]));

  manifest.pages = present.sort().map((slug) => bySlug.get(slug) ?? entryFromFile(slug));
  manifest.excluded = wantExcluded
    .filter((d) => dirFor(d) === "corpus/web")
    .map((d) => ({
      slug: d.file.replace(/\.md$/, ""),
      reason: `excluido por decisión (${decidedAt}): ${d.reason}`,
      decided_at: decidedAt,
    }));

  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(`✓ manifest: ${before} → ${manifest.pages.length} páginas, ${manifest.excluded.length} excluidas`);
}

for (const dir of CORPUS_DIRS) {
  const n = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".md")).length : 0;
  console.log(`  ${dir}: ${n} documentos`);
}
console.log(`  corpus-excluded: ${fs.readdirSync(EXCLUDED_DIR).filter((f) => f.endsWith(".md")).length}`);
