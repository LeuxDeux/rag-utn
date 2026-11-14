// Importa un export de Dialogflow ES (carpeta de intents) al corpus como FAQ.
//
// Uso:
//   npm run import:df -- --dir C:/Users/lauti/Downloads/Bot_UTN/intents
//
// Entrada: <NN>_DF_Nombre.json + <NN>_DF_Nombre_usersays_es.json
// Salida:  corpus/faq/<slug>.md   (un documento por intent)
//          corpus/faq/_import.json (manifiesto del import)
//          eval/questions-dialogflow.yaml (frases reales como set de evaluación)
//
// Por qué así y no un JSON gigante: cada intent es una unidad pregunta→respuesta.
// Si se parte en chunks arbitrarios, el retrieval puede devolver las preguntas
// sin la respuesta. Cada documento se mantiene por debajo de ~1.000 caracteres
// para que sea un solo chunk autocontenido.
//
// Las frases de entrenamiento se incluyen DENTRO del documento a propósito:
// son la forma real en que la gente escribe ("como me anoto a las materias"),
// y el texto de la web está escrito en formal ("inscripción a materias"). Eso
// mejora el retrieval más que cambiar de modelo.

import fs from "node:fs";
import path from "node:path";
import { stringify } from "yaml";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith("--")) acc.push([a.slice(2), arr[i + 1]?.startsWith("--") ? true : arr[i + 1]]);
    return acc;
  }, []),
);

const SRC = args.dir ?? "C:/Users/lauti/Downloads/Bot_UTN/intents";
const OUT = args.out ?? "corpus/faq";
const EVAL_OUT = "eval/questions-dialogflow.yaml";

const SKIP_INTENTS = [/^Default Fallback Intent$/i, /^Default Welcome Intent$/i];
const MAX_PHRASES = 8;
const MAX_PHRASE_LEN = 90;
const MAX_DOC_CHARS = 1400;

// Nombres de intent sin tildes -> título legible.
const ACCENTS = {
  Inscripcion: "Inscripción", Examenes: "Exámenes", Academico: "Académico",
  Evaluacion: "Evaluación", Recuperacion: "Recuperación", Aprobacion: "Aprobación",
  Extension: "Extensión", Autogestion: "Autogestión", Ubicacion: "Ubicación",
  Electromecanica: "Electromecánica", Programacion: "Programación",
  Titulo: "Título", Materias: "Materias", Inasistencias: "Inasistencias",
  Regularidad: "Regularidad", Boleto: "Boleto", Educativo: "Educativo",
  Estudiantil: "Estudiantil", Criterios: "Criterios", Reglamento: "Reglamento",
  Correo: "Correo", Institucional: "Institucional", Calendario: "Calendario",
  Mecatronica: "Mecatrónica", Higiene: "Higiene", Seguridad: "Seguridad",
  Costo: "Costo", Legajo: "Legajo", Material: "Material", Estudio: "Estudio",
  Programador: "Programador", Redes: "Redes", Sociales: "Sociales",
  Dudas: "Dudas", Persona: "Persona", Real: "Real", Carreras: "Carreras",
  Distancia: "Distancia", Grado: "Grado", Tecnicaturas: "Tecnicaturas",
  Posgrado: "Posgrado", Cursado: "Cursado", Condicional: "Condicional",
  Llamados: "Llamados", Horarios: "Horarios", Fechas: "Fechas",
  Cursillo: "Cursillo", Ingreso: "Ingreso", Becas: "Becas", Abono: "Abono",
  Cuota: "Cuota", Plan: "Plan", Estudios: "Estudios", Licencia: "Licencia",
  Directa: "Directa", Faltas: "Faltas",
};

const readJson = (f) => JSON.parse(fs.readFileSync(f, "utf8"));

const clean = (s) =>
  String(s ?? "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function slugify(name) {
  return name
    .replace(/^\d+_DF_/i, "")
    .replace(/([a-záéíóúñ])([A-ZÁÉÍÓÚÑ])/g, "$1 $2")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function humanize(name) {
  const base = name.replace(/^\d+_DF_/i, "");
  const words = base
    .replace(/([a-záéíóúñ])([A-ZÁÉÍÓÚÑ])/g, "$1 $2")
    .replace(/[_\-\/]+/g, " ")
    .split(" ")
    .filter(Boolean);
  return words
    .map((w) => {
      const cap = w.charAt(0).toUpperCase() + w.slice(1);
      return ACCENTS[cap] ?? ACCENTS[w] ?? cap;
    })
    .join(" ");
}

function collectLinks(node, out = []) {
  if (Array.isArray(node)) {
    node.forEach((n) => collectLinks(n, out));
    return out;
  }
  if (node && typeof node === "object") {
    if (typeof node.link === "string" && node.link.startsWith("http")) {
      out.push({ text: clean(node.text) || node.link, url: node.link });
    }
    for (const v of Object.values(node)) collectLinks(v, out);
  }
  return out;
}

// ---------------------------------------------------------------- proceso
if (!fs.existsSync(SRC)) {
  console.error(`No existe la carpeta de intents: ${SRC}`);
  process.exit(1);
}

const files = fs.readdirSync(SRC).filter((f) => f.endsWith(".json"));
const intentFiles = files.filter((f) => !f.includes("_usersays_"));

fs.mkdirSync(OUT, { recursive: true });

const manifest = { source: SRC, imported_at: new Date().toISOString(), intents: [], skipped: [] };
const evalSet = [];
const seenDocs = new Map();
let totalPhrases = 0;

for (const f of intentFiles) {
  const intent = readJson(path.join(SRC, f));
  const name = intent.name ?? f.replace(/\.json$/, "");

  if (SKIP_INTENTS.some((re) => re.test(name))) {
    manifest.skipped.push({ intent: name, reason: "intent de sistema" });
    continue;
  }

  const base = f.replace(/\.json$/, "");
  const usersaysFile = files.find((u) => u.startsWith(`${base}_usersays`));
  const rawPhrases = usersaysFile
    ? readJson(path.join(SRC, usersaysFile))
        .map((p) => clean((p.data ?? []).map((d) => d.text).join("")))
        .filter(Boolean)
    : [];

  // Frases útiles: ni genéricas de una palabra ni gigantes.
  const phrases = [...new Set(rawPhrases)]
    .filter((p) => p.length >= 10 && p.split(" ").length >= 2)
    .sort((a, b) => a.length - b.length)
    .slice(0, MAX_PHRASES)
    .map((p) => (p.length > MAX_PHRASE_LEN ? p.slice(0, MAX_PHRASE_LEN).trim() + "…" : p));

  const messages = (intent.responses ?? []).flatMap((r) => r.messages ?? []);
  const texts = messages
    .filter((m) => m.type === "0")
    .flatMap((m) => m.speech ?? [])
    .map(clean)
    .filter(Boolean);

  const links = [];
  const seenUrls = new Set();
  for (const l of collectLinks(messages.filter((m) => m.type === "4").map((m) => m.payload))) {
    if (seenUrls.has(l.url)) continue;
    seenUrls.add(l.url);
    links.push(l);
  }

  if (!texts.length) {
    manifest.skipped.push({ intent: name, reason: "sin respuesta de texto" });
    continue;
  }

  const title = humanize(name);
  const slug = slugify(name);

  const buildBody = (phs) =>
    [
      `# ${title}`,
      "",
      "## Respuesta",
      "",
      texts.join("\n\n"),
      ...(links.length
        ? ["", "## Enlaces", "", ...links.map((l) => `- [${l.text}](${l.url})`)]
        : []),
      ...(phs.length
        ? ["", "## Preguntas que responde", "", ...phs.map((p) => `- ${p}`)]
        : []),
    ].join("\n");

  // Si el documento se pasa de largo, se recortan frases antes que la respuesta:
  // la respuesta manda, y el documento tiene que entrar en un solo chunk.
  let kept = phrases;
  let body = buildBody(kept);
  while (body.length > MAX_DOC_CHARS && kept.length > 0) {
    kept = kept.slice(0, -1);
    body = buildBody(kept);
  }
  if (body.length > MAX_DOC_CHARS) {
    manifest.warnings = manifest.warnings ?? [];
    manifest.warnings.push({ intent: name, reason: `cuerpo largo incluso sin frases (${body.length} chars)` });
  }

  const frontmatter = stringify({
    source: "dialogflow",
    intent: name,
    title,
    ...(links[0] ? { url: links[0].url } : {}),
    imported_at: manifest.imported_at.slice(0, 10),
  });

  const doc = `---\n${frontmatter}---\n\n${body}\n`;

  if (seenDocs.has(body)) {
    manifest.skipped.push({ intent: name, reason: `duplicado de ${seenDocs.get(body)}` });
    continue;
  }
  seenDocs.set(body, slug);

  fs.writeFileSync(path.join(OUT, `${slug}.md`), doc);
  totalPhrases += kept.length;

  manifest.intents.push({
    intent: name,
    slug,
    title,
    chars: body.length,
    phrases: kept.length,
    responses: texts.length,
    links: links.length,
  });

  for (const p of kept) {
    evalSet.push({ question: p, expected_doc: `corpus/faq/${slug}.md`, intent: name });
  }
}

fs.writeFileSync(path.join(OUT, "_import.json"), JSON.stringify(manifest, null, 2));
fs.writeFileSync(
  EVAL_OUT,
  "# Set de evaluación derivado de las frases de entrenamiento de Dialogflow.\n" +
    "# Son formulaciones reales de usuarios: sirven como baseline de hit@5.\n" +
    "# Ojo: fueron escritas para matchear intents, así que son más fáciles que\n" +
    "# una pregunta espontánea. Valen para detectar regresiones, no para presumir.\n\n" +
    stringify(evalSet),
);

console.log(`Intents leídos:        ${intentFiles.length}`);
console.log(`Documentos generados:  ${manifest.intents.length}`);
console.log(`Omitidos:              ${manifest.skipped.length}`);
console.log(`Frases en documentos:  ${totalPhrases}`);
console.log(`Preguntas de eval:     ${evalSet.length}`);
console.log(`\n→ ${OUT}/`);
console.log(`→ ${EVAL_OUT}`);
if (manifest.skipped.length) {
  console.log("\nOmitidos:");
  for (const s of manifest.skipped) console.log(`  - ${s.intent}: ${s.reason}`);
}
