// Genera docs/REPORTE-CURACION.md a partir de todo el corpus.
//
// Uso:
//   npm run curation
//
// Lee corpus/web (sitio cosechado) y corpus/faq (import de Dialogflow),
// clasifica cada documento y escribe un reporte con tres casillas por
// documento: Queda / Queda — vigente / Excluir.
//
// PRESERVA las casillas ya marcadas: las lee del reporte anterior antes de
// reescribirlo. Podés regenerar cuantas veces quieras sin perder decisiones.
//
// El reporte vive en docs/ y no en corpus/ para que el ingest no lo indexe.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { parse as parseYaml } from "yaml";

const OUT = "docs/REPORTE-CURACION.md";
const HOY = 2026;

const SOURCES = [
  { dir: "corpus/web", key: "web", label: "Sitio web" },
  { dir: "corpus/faq", key: "faq", label: "FAQ del bot" },
  { dir: "corpus-excluded", key: "excluded", label: "Excluido" },
];

// ---------------------------------------------------------------- señales
const EVENT = /jornada|jits?|innovatec|simposio|congreso|charla|taller|seminario|curso|diplomatura|capacitaci|feria|expo|elecciones|concurso|llamado|inscripci[oó]n|asamblea|festival|encuentro|visita|muestra|premiaci|programa-|inscrip|calendario-de-reuniones|reuniones-ordinarias/i;
const NORMATIVE = /reglamento|resoluc|ordenanza|plan-de-estudio|pland|calendario-academico|correlatividad|arancel|estatuto|normativa|acta|equivalencia|beca|biblioteca|licencia|procedimiento|regimen|r[eé]gimen/i;
const OFERTA = /cursos-extension|diplomatura-en|escuela-de-idiomas|curso-online|curso-virtual|-ei-|educacion-virtual|oferta-laboral|escuela-tecnologica/i;
// Nombres de producto que contienen un año y NO son fechas de evento.
const SOFTWARE = /ms ?project|office ?365|autodesk|solidworks|zoom|windows|excel|microsoft|matlab|ansys/i;

const norm = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function readDoc(dir, f) {
  const raw = fs.readFileSync(path.join(dir, f), "utf8");
  const parts = raw.split("---");
  const fm = parts[1] ?? "";
  const body = parts.slice(2).join("---").trim();
  const field = (k) => ((fm.match(new RegExp(`^${k}:\\s*(.+)$`, "m")) ?? [])[1] ?? "").trim();
  return {
    file: f,
    dir,
    source: field("source") || "web",
    title: (field("title") || "(sin título)").replace(/^"|"$/g, ""),
    url: field("url"),
    body,
    chars: body.length,
    listItems: (body.match(/^\s*[-*]\s+\S/gm) ?? []).length,
  };
}

const docs = [];
for (const s of SOURCES) {
  if (!fs.existsSync(s.dir)) continue;
  for (const f of fs.readdirSync(s.dir).filter((x) => x.endsWith(".md"))) {
    docs.push(readDoc(s.dir, f));
  }
}

// ---------------------------------------------------------------- clasificación
for (const d of docs) {
  const yt = [...`${d.title} ${d.file}`.matchAll(/\b(20[0-2]\d)\b/g)].map((m) => +m[1]);
  d.maxYearTitle = yt.length ? Math.max(...yt) : null;
  d.signal = "limpio";
  d.verdict = "ok";
  d.reason = "";
}

// 0. FAQ del bot: categoría propia, no se le aplican heurísticas de web.
for (const d of docs) {
  if (d.dir === "corpus-excluded") {
    d.signal = "excluido";
    d.verdict = "excluded";
    d.reason = "ya excluido";
    continue;
  }
  if (d.source === "dialogflow" || d.dir.includes("faq")) {
    d.signal = "faq";
    d.verdict = "faq";
    d.reason = `respuesta del bot · ${d.chars} chars`;
  }
}

// 1. Eventos con año vencido
for (const d of docs) {
  if (d.verdict !== "ok") continue;
  if (SOFTWARE.test(`${d.title} ${d.file}`)) continue;
  if (d.maxYearTitle && d.maxYearTitle < HOY && EVENT.test(`${d.title} ${d.file}`)) {
    d.signal = "evento-pasado";
    d.verdict = "excluir";
    d.reason = `evento de ${d.maxYearTitle}`;
  }
}
// 2. Normativa con año viejo
for (const d of docs) {
  if (d.verdict !== "ok") continue;
  if (d.maxYearTitle && d.maxYearTitle < HOY && NORMATIVE.test(`${d.title} ${d.file}`)) {
    d.signal = "normativa-vieja";
    d.verdict = "revisar";
    d.reason = `normativa de ${d.maxYearTitle} — puede seguir vigente`;
  }
}
// 3. Contenido muy fino
for (const d of docs) {
  if (d.verdict !== "ok") continue;
  if (d.chars < 600) {
    d.signal = "fino";
    d.verdict = "revisar";
    d.reason = `${d.chars} caracteres`;
  }
}
// 4. Listados
for (const d of docs) {
  if (d.verdict !== "ok") continue;
  if (d.listItems > 15) {
    d.signal = "listado";
    d.verdict = "revisar";
    d.reason = `${d.listItems} ítems de lista — parece un índice`;
  }
}
// 5. Oferta de extensión
for (const d of docs) {
  if (d.verdict !== "ok") continue;
  if (OFERTA.test(`${d.title} ${d.file}`)) {
    d.signal = "oferta";
    d.verdict = "opcional";
    d.reason = "oferta de extensión / idiomas";
  }
}

// duplicados y casi duplicados (solo web: la FAQ son documentos únicos por intent)
const webDocs = docs.filter((d) => d.dir === "corpus/web");
const groups = new Map();
for (const d of webDocs) {
  const h = crypto.createHash("sha1").update(norm(d.body)).digest("hex");
  if (!groups.has(h)) groups.set(h, []);
  groups.get(h).push(d);
}
const dups = [...groups.values()].filter((g) => g.length > 1);

const shingles = (t) => {
  const w = norm(t).split(" ").filter(Boolean);
  const s = new Set();
  for (let i = 0; i < w.length - 1; i++) s.add(`${w[i]} ${w[i + 1]}`);
  return s;
};
const nearDups = [];
for (let i = 0; i < webDocs.length; i++) {
  for (let j = i + 1; j < webDocs.length; j++) {
    const a = webDocs[i];
    const b = webDocs[j];
    if (a.chars < 400 || b.chars < 400) continue;
    if (Math.abs(a.chars - b.chars) / Math.max(a.chars, b.chars) > 0.4) continue;
    const A = shingles(a.body);
    const B = shingles(b.body);
    let inter = 0;
    for (const x of A) if (B.has(x)) inter++;
    const jac = inter / (A.size + B.size - inter);
    if (jac > 0.8) nearDups.push({ a, b, jac });
  }
}
for (const { a, b } of nearDups) {
  for (const d of [a, b]) {
    if (d.verdict === "ok") {
      d.signal = "duplicado";
      d.verdict = "revisar";
      d.reason = "contenido casi idéntico a otro documento";
    }
  }
}

// ---------------------------------------------------------------- marcas previas
// El reporte se regenera entero, pero las casillas ya marcadas no se pierden.
const previousMarks = new Map();
if (fs.existsSync(OUT)) {
  let curFile = null;
  for (const line of fs.readFileSync(OUT, "utf8").split(/\r?\n/)) {
    const doc = line.match(/^- \[`(.+?)`\]\(\.\.\/(?:corpus\/[a-z]+|corpus-excluded)\//);
    if (doc) {
      curFile = decodeURIComponent(doc[1]);
      continue;
    }
    const box = line.match(/^\s{2}- \[([xX])\] (.+)$/);
    if (!box || !curFile) continue;
    const label = box[2];
    previousMarks.set(
      curFile,
      /vigente/.test(label) ? "vigente" : /^Excluir/.test(label) ? "excluir" : "keep",
    );
  }
}

// El reporte no es la única fuente de decisiones: corpus/decisions.yaml es el
// registro durable. Sirve de respaldo cuando un documento dejó de clasificar
// como marcable (por ejemplo, porque su duplicado ya se excluyó).
if (fs.existsSync("corpus/decisions.yaml")) {
  try {
    const doc = parseYaml(fs.readFileSync("corpus/decisions.yaml", "utf8"));
    for (const d of doc?.decisions ?? []) {
      const name = String(d.file ?? "").split("/").pop();
      if (name && d.status && !previousMarks.has(name)) previousMarks.set(name, d.status);
    }
  } catch {
    // decisions.yaml corrupto: se ignora y se sigue con las marcas del reporte.
  }
}

// Un documento con decisión previa nunca deja de ser visible: si su
// clasificación cambió (por ejemplo, porque su duplicado ya se excluyó),
// se mantiene en el reporte para no perder la decisión en silencio.
for (const d of docs) {
  if (previousMarks.has(d.file) && d.verdict === "ok") {
    d.verdict = "revisar";
    d.signal = "decidido";
    d.reason = "ya tenía una decisión marcada";
  }
}

// ---------------------------------------------------------------- formato
const by = (v) => docs.filter((d) => d.verdict === v);
const bySig = (s) => docs.filter((d) => d.signal === s);

const item = (d) => {
  const local = `../${d.dir}/${encodeURI(d.file)}`;
  const original = d.url ? ` · [original](<${d.url}>)` : "";
  // Un documento en corpus-excluded está excluido por definición: su casilla
  // arranca marcada así, y marcar Queda lo restaura.
  const prev = previousMarks.get(d.file) ?? (d.dir === "corpus-excluded" ? "excluir" : undefined);
  const box = (k) => `  - [${prev === k ? "x" : " "}] `;
  return [
    `- [\`${d.file}\`](${local})`,
    `  - *${d.title.replace(/\*/g, "")}* · ${d.reason}${original}`,
    `${box("keep")}Queda`,
    `${box("vigente")}Queda — vigente (año desactualizado en el sitio)`,
    `${box("excluir")}Excluir`,
  ].join("\n");
};

const group = (title, list, note = "") =>
  list.length
    ? `### ${title} (${list.length})\n\n${note ? note + "\n\n" : ""}${list.map(item).join("\n")}\n`
    : "";

const excluir = by("excluir");
const revisar = by("revisar");
const opcional = by("opcional");
const faq = by("faq");
const excluded = by("excluded");
const limpios = by("ok");
const marcados = previousMarks.size;

const md = `# Reporte de curación del corpus

**Generado:** ${new Date().toISOString().slice(0, 10)}
**En el corpus:** ${docs.length - excluded.length} documentos · **Fuentes:** \`corpus/web\` (${webDocs.length}) y \`corpus/faq\` (${faq.length})
**Excluidos:** ${excluded.length} (en \`corpus-excluded/\`, fuera del índice)
**Decisiones ya marcadas:** ${marcados}

> Este archivo vive en \`docs/\`, fuera de \`corpus/\`, para que el pipeline no lo ingiera.
> Se regenera con \`npm run curation\` y **conserva las casillas marcadas**.

---

## Cómo marcar este reporte

Cada documento tiene **tres casillas**. Marcá **una sola**, con \`x\`:

\`\`\`markdown
  - [x] Queda                                       ← se conserva tal cual
  - [ ] Queda — vigente (año desactualizado)        ← se conserva y se marca como vigente
  - [ ] Excluir                                     ← sale del índice
\`\`\`

| Marcás | Qué queda guardado | Efecto en el asistente |
|---|---|---|
| **Queda** | \`status: keep\` | Se indexa normal |
| **Queda — vigente** | \`status: vigente\` | Se indexa, pero el prompt recibe la orden de **no afirmar años ni fechas** de ese documento y derivar al calendario |
| **Excluir** | \`status: excluir\` + motivo | Se mueve a \`corpus-excluded/\` y no se indexa |

**Si no marcás nada, no pasa nada.** Nada se borra por defecto.

### Cuándo usar «Queda — vigente»

Cuando el documento **es el canal oficial hoy** pero el sitio conserva un año viejo en la URL o en el texto. El procedimiento se responde desde ahí; las fechas nunca.

---

## Resumen

| Veredicto | Docs | Qué significa |
|---|---|---|
| 🔴 Excluir | **${excluir.length}** | Evento con fecha vencida |
| 🟡 Revisar | **${revisar.length}** | Listados, contenido fino, duplicados o vigencia dudosa |
| 🔵 Opcional | **${opcional.length}** | Oferta de extensión e idiomas |
| 🟢 FAQ del bot | **${faq.length}** | Respuestas del Dialogflow. Revisar si siguen vigentes |
| ⚪ Limpio | **${limpios.length}** | Contenido sustantivo y vigente |
| 🗄️ Ya excluidos | **${excluded.length}** | Fuera del índice. Marcá «Queda» para restaurar |

**Criterio central:** no se excluye por año, se excluye por **tipo**.
Un reglamento de 2019 sigue vigente hasta que lo deroguen; una jornada de 2022 no.

---

## ⚠️ Falsos positivos conocidos

| Documento | Por qué parece candidato | Qué es en realidad |
|---|---|---|
| \`cursos-extension-ms-project-2016\` | "2016" en el título | La **versión del software**, no la fecha del curso |
| \`carreras-ea-calchaqui-tumi\` ≡ \`carreras-ea-san-javier-tumi\` | 93% de texto idéntico | El mismo programa en **dos localidades**. Conservar ambos |
| \`category-*\` y \`novedades\` | 94–97% idénticos entre sí | Listados de WordPress. Esos sí son redundantes |

---

# 🔴 A excluir — eventos cerrados (${excluir.length})

Recomendación: **excluir todos**. Varios son activamente peligrosos: el modelo puede responder *"la inscripción es hasta marzo de 2025"* en presente.

${excluir.map(item).join("\n\n")}

---

# 🟡 A revisar (${revisar.length})

${[
  group(
    "Decisiones previas que cambiaron de categoría",
    bySig("decidido"),
    "Su clasificación automática cambió, pero ya tenían una casilla marcada. Se mantienen visibles para no perder la decisión.",
  ),
  group(
    "Listados de navegación",
    bySig("listado"),
    "Índices de WordPress. No contienen respuestas: contienen enlaces. Compiten con las páginas reales en el retrieval.",
  ),
  group(
    "Contenido muy fino",
    bySig("fino"),
    "Menos de 600 caracteres. Revisar de a uno: una página de contacto **sirve**; una plantilla vacía **no**.",
  ),
  group("Duplicados", bySig("duplicado"), "Casi idénticos entre sí. Conservar uno y excluir el resto."),
  group(
    "Normativa de vigencia dudosa",
    bySig("normativa-vieja"),
    "**No excluir sin verificar.** Consultar con secretaría académica antes de tocar nada.",
  ),
]
  .filter(Boolean)
  .join("\n---\n\n")}

---

# 🟢 FAQ importada de Dialogflow (${faq.length})

Respuestas curadas del bot anterior. Son la mejor fuente de **formulaciones reales** (cada documento incluye las frases de entrenamiento), pero el contenido es de hace años.

**Riesgo principal:** pueden contradecir a la web actual en costos y contactos. Si la web ya cubre el tema y el dato cambió, excluirlas o marcarlas **vigente** evita que el asistente responda datos viejos.

${faq.map(item).join("\n\n")}

---

# 🔵 Opcional — oferta de extensión e idiomas (${opcional.length})

Depende de si el asistente responde *"¿qué cursos hay?"* o solo *"¿cuándo me inscribo?"*.

${opcional.map(item).join("\n\n")}

---

# ⚪ Limpio (${limpios.length})

<details>
<summary>Ver los ${limpios.length} documentos</summary>

${limpios.map((d) => `- [*${d.title.replace(/\*/g, "").replace(/\[|\]/g, "")}*](../${d.dir}/${encodeURI(d.file)}) · ${d.chars} chars`).join("\n")}

</details>

---

# 🗄️ Ya excluidos (${excluded.length})

Están en \`corpus-excluded/\`, fuera del índice. **Marcá «Queda» o «Queda — vigente» para devolverlos al corpus**; dejarlos en «Excluir» no cambia nada.

<details>
<summary>Ver los ${excluded.length} excluidos</summary>

${excluded.map(item).join("\n\n")}

</details>

---

## Duplicados detectados (sitio web)

${
  dups.length
    ? dups.map((g) => `- **Exactos:** ${g.map((d) => `\`${d.file}\``).join(" ≡ ")}`).join("\n")
    : "- Ninguno exacto."
}

${
  nearDups.length
    ? nearDups
        .map(({ a, b, jac }) => `- **Casi iguales (${jac.toFixed(2)}):** \`${a.file}\` ≡ \`${b.file}\``)
        .join("\n")
    : "- Ninguno por encima de 0.80."
}

---

## Qué pasa cuando termines de marcar

\`\`\`bash
npm run decisions             # dry-run
npm run decisions -- --apply  # escribe corpus/decisions.yaml y mueve los excluidos
\`\`\`

1. Lee este reporte y escribe \`corpus/decisions.yaml\` con estado, motivo y fecha.
2. Los marcados como **Excluir** se mueven a \`corpus-excluded/\`, reversible sin git.
3. Regenera \`_manifest.json\` y actualiza los links de este reporte.
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, md);

console.log(`→ ${OUT}`);
console.log(`documentos: ${docs.length} (web ${webDocs.length} · faq ${faq.length})`);
console.log(`🔴 ${excluir.length} | 🟡 ${revisar.length} | 🟢 ${faq.length} | 🔵 ${opcional.length} | ⚪ ${limpios.length}`);
console.log(`casillas marcadas preservadas: ${marcados}`);
