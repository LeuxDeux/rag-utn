// Convierte los PDF de alto valor a corpus/pdf/*.md (guía §6.2 y §17.3).
//
// Uso:
//   npm run import:pdf                 → baja (o usa la copia en data/pdf-cache), convierte y escribe
//   npm run import:pdf -- --revisar    → además imprime el comienzo de cada documento para leerlo
//
// Entrada: corpus/pdf-fuentes.yaml (url + title). doc_id = pdf-<nombre del archivo>.
// Salida:  corpus/pdf/<doc_id>.md (frontmatter source: pdf) y corpus/pdf/_import.json (manifiesto,
//          con los que se descartaron y por qué). Borra los .md que ya no están en la lista.
//
// Por qué así: el runtime (webapp-utn) importa .md con frontmatter; convertir acá deja el texto en
// git, revisable y versionado, y el indexador no cambia. Un PDF mal parseado arruina el RAG y ningún
// modelo lo arregla: por eso se quitan encabezados y pies repetidos, se juntan las líneas cortadas y
// se descarta lo que casi no tiene texto (escaneados).

import fs from "node:fs";
import path from "node:path";
import { parse, stringify } from "yaml";
import { getDocumentProxy } from "unpdf";

const REVISAR = process.argv.includes("--revisar");
const FUENTES = "corpus/pdf-fuentes.yaml";
const OUT = "corpus/pdf";
const CACHE = "data/pdf-cache";
const OCR = "corpus/pdf-ocr";
const UA = "Mozilla/5.0 (compatible; RAG-corpus-bot/0.1; uso interno academico)";
const MIN_CHARS_POR_PAGINA = 150; // menos que esto: escaneado o casi vacío

function docIdDeUrl(url) {
  const base = decodeURIComponent(new URL(url).pathname.split("/").pop() ?? "")
    .replace(/\.pdf$/i, "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  return `pdf-${base}`;
}

const espera = (ms) => new Promise((r) => setTimeout(r, ms));

async function bajar(url, archivo) {
  if (fs.existsSync(archivo)) return fs.readFileSync(archivo);
  const r = await fetch(url, { headers: { "user-agent": UA } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const b = Buffer.from(await r.arrayBuffer());
  if (b.subarray(0, 5).toString() !== "%PDF-") throw new Error("la respuesta no es un PDF");
  fs.mkdirSync(path.dirname(archivo), { recursive: true });
  fs.writeFileSync(archivo, b);
  await espera(300);
  return b;
}

// Reconstruye las líneas de una página agrupando los trozos de texto por su altura (y), de arriba
// hacia abajo y de izquierda a derecha.
async function lineasDePagina(page) {
  const { items } = await page.getTextContent();
  const filas = [];
  for (const it of items) {
    if (!("str" in it) || !it.str) continue;
    const [, , , , x, y] = it.transform;
    const alto = Math.abs(it.transform[3]) || 10;
    let fila = filas.find((f) => Math.abs(f.y - y) < alto * 0.5);
    if (!fila) filas.push((fila = { y, trozos: [] }));
    fila.trozos.push({ x, fin: x + (it.width ?? 0), alto, s: it.str });
  }
  filas.sort((a, b) => b.y - a.y);
  return filas.map((f) => {
    // pdf.js corta palabras en varios trozos («Electr» «omecánica»): solo va un espacio si hay hueco.
    let s = "";
    let fin = null;
    for (const t of f.trozos.sort((a, b) => a.x - b.x)) {
      const hueco = fin === null ? 0 : t.x - fin;
      if (s && hueco > t.alto * 0.2 && !/\s$/.test(s) && !/^\s/.test(t.s)) s += " ";
      s += t.s;
      fin = Math.max(fin ?? t.fin, t.fin);
    }
    return s.replace(/\s+/g, " ").trim();
  });
}

// Basura de un escaneo con OCR viejo («~de ~/l;, C@iem!iac?~iá»): pocas letras o muchos símbolos raros.
function esBasura(l) {
  const sinEsp = l.replace(/\s/g, "");
  if (!sinEsp) return true;
  const raros = (sinEsp.match(/[~@#{}\[\]|\\^`¬<>]/g) ?? []).length;
  const buenos = (sinEsp.match(/[\p{L}\p{N}.,;:()°º%/–-]/gu) ?? []).length;
  return raros >= 2 || buenos / sinEsp.length < 0.7 || /^[-_.\s]{4,}$/.test(l);
}

// ---------- Tablas de correlatividades ----------
//
// Una tabla de correlatividades extraída queda como «9 Física II 1-3 -»: un modelo chico no sabe que
// «1-3» son los números de otras materias ni qué columna es cuál, y responde mal con cita. Las filas
// que se reconocen («N materia lista lista», con o sin horas) se reescriben (ver QUITAR_CORRELATIVAS).
// Las de tablas de tres columnas o con filas cortadas quedan como estaban.

const LISTA = /^(?:-|todas|\d+(?:-\d+)*)$/i;
const MARCA_NIVEL = /^(?:I{1,3}|IV|V|VI|[1-6]\s?º|[1-6]°|CUAT\.?|año)$/i;

function tipoDeTabla(lineas) {
  const t = lineas.join(" ").toLowerCase();
  if (/equivalencia|homologaci/.test(t) && !/correlatividad/.test(t)) return null;
  if (/para\s+cursar\s+y\s+rendir/.test(t) && /cursada/.test(t) && /aprobada/.test(t)) return "cursar-y-rendir";
  const requiere = (t.match(/requiere\s+tener/g) ?? []).length;
  if (requiere === 2 && /regularizada/.test(t) && /aprobada/.test(t)) return /\bhor|hs\./.test(t) ? "cursar-rendir-horas" : "cursar-rendir";
  return null;
}

function parsearFila(l, conHoras) {
  const t = l
    .replace(/(\d)\s*-\s*(?=\d)/g, "$1-")
    .split(" ")
    .filter(Boolean)
    .flatMap((x) => (/^\d+(?:-\d+)*-$/.test(x) ? [x.slice(0, -1), "-"] : [x])); // «1-2-» = «1-2» «-»
  while (t.length && MARCA_NIVEL.test(t[0])) t.shift();
  if (t.length < 4 || !/^\d{1,2}$/.test(t[0])) return null;
  const n = Number(t[0]);
  const b = t.at(-1);
  const a = t.at(-2);
  if (!LISTA.test(a) || !LISTA.test(b)) return null;
  const resto = t.slice(1, -2);
  let horas = null;
  if (conHoras) {
    if (resto.length < 2 || !/^\d{1,3}$/.test(resto.at(-1))) return null;
    horas = resto.pop();
  }
  const nombre = resto.join(" ");
  if (!/\p{L}{3}/u.test(nombre) || /\d$/.test(nombre)) return null;
  return { n, nombre, a, b, horas };
}

function nombrar(lista, nombres) {
  if (/^todas$/i.test(lista)) return "todas las anteriores";
  const ns = lista.split("-").filter(Boolean).map(Number);
  if (!ns.length) return "ninguna";
  const partes = ns.map((k) => (nombres.has(k) ? `${nombres.get(k)} (n.º ${k})` : `la materia n.º ${k}`));
  return partes.length === 1 ? partes[0] : `${partes.slice(0, -1).join(", ")} y ${partes.at(-1)}`;
}

// Reescribe las filas de correlatividades. Con QUITAR_CORRELATIVAS (por defecto) cada fila queda
// como «Física II (materia n.º 9)»: se conserva la lista de materias del plan y se sacan los números
// de correlativas, con una nota que manda al PDF. Probado con gemma3:4b: aun con las filas escritas
// como oraciones con nombres, mezclaba las correlativas de materias vecinas o de otra carrera y
// respondía datos falsos con cita. Es preferible derivar al documento que inventar.
// Sin QUITAR_CORRELATIVAS (variable de entorno CORRELATIVAS=1) escribe cada fila como oración.
const QUITAR_CORRELATIVAS = process.env.CORRELATIVAS !== "1";
const NOTA_CORRELATIVAS =
  "Nota: las correlatividades de cada materia (qué hay que tener cursado o aprobado para cursarla y rendirla) están en la tabla del documento original en PDF; no se transcriben acá.";

function reescribirCorrelatividades(paginas) {
  const filas = [];
  const nombres = new Map();
  paginas.forEach((p, ip) => {
    const tipo = tipoDeTabla(p);
    p.forEach((l, il) => {
      // Con encabezado reconocido se sabe si hay columna de horas; sin él (tablas dentro de los
      // diseños curriculares) se prueba sin horas y después con horas.
      const f = tipo ? parsearFila(l, tipo === "cursar-rendir-horas") : parsearFila(l, false) ?? parsearFila(l, true);
      if (!f) return;
      filas.push({ ip, il, tipo: tipo ?? "cursar-rendir", ...f });
      if (!nombres.has(f.n)) nombres.set(f.n, f.nombre);
    });
  });
  if (filas.length < 5) return { paginas, filas: 0 };
  const out = paginas.map((p) => [...p]);
  for (const [i, f] of filas.entries()) {
    const h = f.horas ? `, ${f.horas} h` : "";
    if (QUITAR_CORRELATIVAS) {
      const nota = i === 0 || f.ip !== filas[i - 1].ip ? `${NOTA_CORRELATIVAS}\n` : "";
      out[f.ip][f.il] = `${nota}${f.nombre} (materia n.º ${f.n}${h}).`;
      continue;
    }
    out[f.ip][f.il] =
      f.tipo === "cursar-y-rendir"
        ? `Correlativas de ${f.nombre} (n.º ${f.n}), para cursarla y para rendirla: cursadas (regularizadas): ${nombrar(f.a, nombres)}; aprobadas: ${nombrar(f.b, nombres)}.`
        : `Correlativas de ${f.nombre} (n.º ${f.n}${h}): para cursarla, regularizadas: ${nombrar(f.a, nombres)}; para rendirla, aprobadas: ${nombrar(f.b, nombres)}.`;
  }
  return { paginas: out, filas: filas.length };
}

const normLinea = (l) => l.replace(/\d+/g, "#").replace(/\s+/g, " ").trim().toLowerCase();

function limpiarPaginas(paginas) {
  // Encabezados y pies: líneas que se repiten (con los números cambiados) en la mitad de las páginas.
  const cuenta = new Map();
  if (paginas.length >= 3) {
    for (const p of paginas) {
      for (const l of new Set([...p.slice(0, 3), ...p.slice(-3)].map(normLinea))) {
        cuenta.set(l, (cuenta.get(l) ?? 0) + 1);
      }
    }
  }
  const repetida = (l) => paginas.length >= 3 && (cuenta.get(normLinea(l)) ?? 0) >= Math.max(3, paginas.length / 2);
  const numeroDePagina = (l) => /^(p[aá]g(ina)?\.?\s*)?\d{1,3}(\s*(de|\/)\s*\d{1,3})?$/i.test(l.trim());

  const lineas = [];
  for (const p of paginas) {
    for (const l of p) {
      if (!l || repetida(l) || numeroDePagina(l) || esBasura(l)) continue;
      lineas.push(l);
    }
    lineas.push(""); // corte de página = corte de párrafo
  }

  // Juntar líneas cortadas: guion al final, o línea que no cierra y la siguiente sigue en minúscula.
  const out = [];
  for (const l of lineas) {
    const prev = out[out.length - 1];
    if (prev && l) {
      if (/[a-záéíóúñ]-$/i.test(prev) && /^[a-záéíóúñ]/.test(l)) {
        out[out.length - 1] = prev.slice(0, -1) + l;
        continue;
      }
      if (!/[.:;?!)]$/.test(prev) && /^[a-záéíóúñ(,]/.test(l)) {
        out[out.length - 1] = `${prev} ${l}`;
        continue;
      }
    }
    out.push(l);
  }
  return out
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}

// Si el PDF no tiene capa de texto (escaneado) y está su OCR en corpus/pdf-ocr/<doc_id>.txt
// (src/tools/ocr-pdf-windows.ps1), se usa ese texto. Las páginas van separadas por \f.
async function convertir(buf, doc_id) {
  const pdf = await getDocumentProxy(new Uint8Array(buf));
  const paginas = [];
  for (let i = 1; i <= pdf.numPages; i++) paginas.push(await lineasDePagina(await pdf.getPage(i)));
  let r = reescribirCorrelatividades(paginas);
  let ocr = false;
  const archivoOCR = path.join(OCR, `${doc_id}.txt`);
  if (limpiarPaginas(r.paginas).length < pdf.numPages * MIN_CHARS_POR_PAGINA && fs.existsSync(archivoOCR)) {
    const pags = fs.readFileSync(archivoOCR, "utf8").split("\f").map((p) => p.split("\n").map((l) => l.replace(/\s+/g, " ").trim()));
    r = reescribirCorrelatividades(pags);
    ocr = true;
  }
  return { paginas: pdf.numPages, texto: limpiarPaginas(r.paginas), ocr, correlativas: r.filas };
}

async function main() {
  const { pdfs } = parse(fs.readFileSync(FUENTES, "utf8"));
  fs.mkdirSync(OUT, { recursive: true });
  const manifiesto = [];
  const escritos = new Set();
  for (const f of pdfs) {
    const doc_id = f.doc_id ?? docIdDeUrl(f.url);
    const fila = { doc_id, url: f.url, title: f.title };
    try {
      const buf = await bajar(f.url, path.join(CACHE, `${doc_id}.pdf`));
      const { paginas, texto, ocr, correlativas } = await convertir(buf, doc_id);
      fila.paginas = paginas;
      fila.caracteres = texto.length;
      if (ocr) fila.ocr = true;
      if (correlativas) fila.correlativas = correlativas;
      if (texto.length < paginas * MIN_CHARS_POR_PAGINA) {
        fila.estado = "descartado";
        fila.motivo = `poco texto (${texto.length} caracteres en ${paginas} páginas): escaneado; correr src/tools/ocr-pdf-windows.ps1`;
      } else if ((texto.match(/\uFFFD/g) ?? []).length > texto.length / 200) {
        fila.estado = "descartado";
        fila.motivo = "caracteres ilegibles (codificación rota)";
      } else {
        const fm = {
          source: "pdf",
          doc_id,
          title: f.title,
          url: f.url,
          site: new URL(f.url).host,
          aliases: [],
          pages: paginas,
          ...(ocr ? { ocr: true } : {}),
          fetched_at: new Date().toISOString(),
        };
        // Sin «# título» en el cuerpo: el runtime ya antepone el título a cada fragmento.
        fs.writeFileSync(path.join(OUT, `${doc_id}.md`), `---\n${stringify(fm, { lineWidth: 0 })}---\n\n${texto}\n`);
        escritos.add(`${doc_id}.md`);
        fila.estado = "convertido";
      }
    } catch (e) {
      fila.estado = "error";
      fila.motivo = e.message;
    }
    manifiesto.push(fila);
    const extra = [fila.ocr ? "OCR" : "", fila.correlativas ? `${fila.correlativas} correlativas reescritas` : "", fila.motivo ?? ""].filter(Boolean).join(" · ");
    console.log(`${fila.estado.padEnd(10)} ${doc_id.padEnd(60)} ${fila.paginas ?? "-"} pág. ${fila.caracteres ?? "-"} car. ${extra}`);
    if (REVISAR && fila.estado === "convertido") {
      const md = fs.readFileSync(path.join(OUT, `${doc_id}.md`), "utf8");
      console.log(md.split("---").slice(2).join("---").slice(0, 1500).replace(/^/gm, "    | "), "\n");
    }
  }
  for (const f of fs.readdirSync(OUT)) {
    if (f.endsWith(".md") && !escritos.has(f)) {
      fs.unlinkSync(path.join(OUT, f));
      console.log(`borrado    ${f} (ya no está en ${FUENTES})`);
    }
  }
  fs.writeFileSync(path.join(OUT, "_import.json"), `${JSON.stringify(manifiesto, null, 2)}\n`);
  const n = (e) => manifiesto.filter((m) => m.estado === e).length;
  console.log(`\n${n("convertido")} convertidos, ${n("descartado")} descartados, ${n("error")} con error (ver ${OUT}/_import.json)`);
}

await main();
