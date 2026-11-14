# Asistente virtual para consultas universitarias

**Un asistente que responde dudas de estudiantes usando el material oficial de la facultad —no la memoria del modelo— citando siempre la fuente, y que sabe decir «no lo sé» y derivar a una persona.**

🚧 **En desarrollo.** El corpus ya está cosechado y las piezas base funcionan; el pipeline de consulta (`/api/ask`) todavía no está implementado. Ver [Estado actual](#estado-actual).

---

## El problema

La información existe, es pública y está actualizada. El problema es **dónde está y cómo se llega a ella**:

- Repartida en **200+ páginas web** y **450+ PDFs** (reglamentos, planes de estudio, calendario, correlatividades, becas).
- Navegar cuesta. Preguntar es gratis.
- Entonces la gente escribe al WhatsApp o llama a recepción.
- Recepción responde las mismas veinte preguntas todo el día, y las que ya están publicadas compiten por atención con las que sí necesitan a una persona.

El resultado es un cuello de botella humano causado por un problema de acceso a la información.

## La solución

Un asistente que:

1. **Busca en los documentos reales** de la facultad (web, PDFs, APIs internas).
2. **Responde citando** el documento y la página: `«La inscripción cierra el 28/02/2027 [1]»`.
3. **Sabe decir que no.** Si la respuesta no está en el corpus, no inventa: deriva a una persona con el contexto ya armado.
4. **Vive donde ya está la gente:** el mismo motor atiende la web, WhatsApp y un panel para recepción.

Un solo cerebro, varios canales.

## Qué NO es

| No es | Por qué importa |
|---|---|
| Un modelo entrenado con la información de la facultad | No se entrena nada. Se buscan fragmentos y se los damos al modelo en el momento |
| Un reemplazo de recepción | Es una herramienta de recepción: le sugiere respuestas y le pasa lo difícil con contexto |
| Un chatbot que improvisa | Si no está en el corpus, escala. Un arancel inventado con el nombre de la universidad es un problema legal |
| Un proyecto de investigación en IA | Es ingeniería de producto: recuperación de información + redacción anclada + evaluación |

## Cómo funciona

RAG (*Retrieval-Augmented Generation*): no se le pide al modelo que recuerde, se le da el texto y se le pide que lo lea.

```
INDEXAR (una vez, o cuando cambia un documento)
  documento → fragmentos → vector de cada fragmento → índice

RESPONDER (en cada pregunta)
  pregunta → vector → comparar con el índice → 5 fragmentos más parecidos
           → meterlos en el prompt → modelo → respuesta + citas
```

Las cinco piezas, sin magia:

| Pieza | Qué hace |
|---|---|
| **Embedding** | Convierte un texto en un array de números que representa su significado |
| **Chunk** | Fragmento indexable: un párrafo, un artículo, una sección |
| **Similitud coseno** | Mide qué tan parecidos son dos vectores. Es todo el motor de búsqueda |
| **Retrieval** | Recupera los fragmentos más parecidos a la pregunta |
| **Grounding** | Obliga al modelo a responder solo con esos fragmentos y citarlos |

### La decisión de diseño central: dos tipos de conocimiento

| Tipo | Ejemplos | Estrategia |
|---|---|---|
| **Estable** | Reglamentos, planes de estudio, FAQ, guías | Se indexa, con metadatos de vigencia |
| **Volátil** | Aranceles, fechas de inscripción, estado del campus | Se consulta **en vivo** (API/HTML) con fecha visible. **Nunca se indexa como verdad** |

> **Regla:** si el dato tiene vencimiento y equivocarse cuesta plata o plazos → consultar en vivo.
> Si es texto normativo o explicativo → indexar.

Sin esta separación el asistente cita aranceles de hace tres años con total seguridad. Es el error que hunde este tipo de proyecto.

## Alcance: dos etapas, en este orden

| Etapa | Usuarios | Fuente de conocimiento | Estado |
|---|---|---|---|
| **1. Consultas públicas** | Cualquiera, sin login | Web institucional, PDFs públicos, APIs de datos cambiantes | **En desarrollo** |
| **2. Material bibliográfico** | Estudiantes con matrícula al día | Material de cátedra, con permisos por curso | Futuro — depende de que la etapa 1 funcione |

La etapa 2 **no es «la etapa 1 con login»**: el control de acceso tiene que aplicarse en la recuperación, no en la respuesta. Si se filtra después de recuperar, el modelo ya vio el material que el alumno no debía ver. Por eso se hace última.

## Estado actual

**Corpus cosechado** del sitio institucional:

| Métrica | Valor |
|---|---|
| Documentos | **210** (198 de `www.frrq.utn.edu.ar`, 12 de `sac.frrq.utn.edu.ar`) |
| Texto | ~681 KB · ≈ 870 fragmentos estimados |
| PDFs descubiertos | **458**, de los cuales **28** son reglamentos, planes de estudio, correlatividades y becas |
| Formato | `.md` con frontmatter (`url`, `title`, `site`, `fetched_at`) listo para citar |

**Componentes:**

| Componente | Estado |
|---|---|
| Configuración, cliente de Ollama, chunking, similitud, prompt | ✅ implementado |
| Crawler con `robots.txt`, delay y exclusiones | ✅ implementado |
| Servidor con `/health` | ✅ implementado |
| `/api/ask` (el pipeline de consulta) | 🟡 devuelve 501 — siguiente paso |
| Ingesta a índice (`store.json`) | ⬜ pendiente |
| Loaders de PDF y API | ⬜ pendiente |
| Caché de respuestas | ⬜ pendiente |
| Evaluación con golden set | ⬜ pendiente |

La tabla archivo por archivo está en [la guía, §17](./guia-rag-asistente-universitario.md#17-bitácora-de-implementación).

## Stack

- **Node.js 24** (ESM), Express.
- **Ollama** local para embeddings y generación. `CHAT_BASE_URL` permite mover la generación a una API sin tocar código.
- **Sin frameworks de RAG** (LangChain, LlamaIndex) a propósito: el pipeline son ~70 líneas y se entiende leyéndolo. Se agregan solo si algún día hacen falta.
- **Sin base vectorial** todavía: los vectores viven en un JSON y la similitud es un bucle. Alcanza hasta ~5.000 fragmentos.
- `cheerio` para HTML, `unpdf` para PDF.

## Cómo correrlo

```bash
# 1. Dependencias
npm install

# 2. Modelos (una sola vez)
ollama serve
ollama pull embeddinggemma   # embeddings, corre en CPU
ollama pull gemma3:4b        # generación

# 3. Levantar
npm start
# → http://localhost:3000          (widget de prueba)
# → http://localhost:3000/health   (estado)
```

```bash
# Recolectar el corpus del sitio institucional
npm run crawl -- --sitemap https://www.frrq.utn.edu.ar/wp-sitemap-posts-page-1.xml \
                 --max 300 --delay 250 --out corpus/web
npm run crawl -- --seed https://sac.frrq.utn.edu.ar/ --max 40 --delay 250 \
                 --exclude "utn-frrq-noticias\.html,/noticias/" --out corpus/web

# Indexar (pendiente de implementar)
npm run ingest

# Evaluar (pendiente de implementar)
npm run eval
```

## Estructura del repositorio

```
rag/
├── corpus/               Documentos crudos y corpus cosechado (web/, ejemplo.txt)
├── data/                 store.json (índice) y cache.json — artefactos, no versionados
├── eval/                 Golden set y runner de evaluación
├── public/               Widget de prueba
├── src/
│   ├── config.js         Configuración y lectura de sources.yaml
│   ├── lib/              ollama, chunk, similarity — las primitivas
│   ├── ingest/           Crawler, orquestador y loaders (file, url, api, image)
│   ├── ask/              retrieve, prompt, cache
│   └── server.js         Express: /health y /api/ask
├── sources.yaml          Inventario de fuentes: qué sabe el asistente
└── guia-rag-asistente-universitario.md
```

## Hoja de ruta

| Fase | Entregable | Criterio de aceptación |
|---|---|---|
| **0** | Ingesta de `.txt`/`.md` + `/api/ask` | Una pregunta responde citando `[1]` |
| **1** | PDFs reales y fuentes `live` | Un reglamento indexado y legible |
| **2** | Caché y citas con metadatos | Segunda consulta idéntica en < 200 ms |
| **3** | Widget web y WhatsApp | Una pregunta por WhatsApp responde con fuente |
| **4** | Evaluación con golden set | `hit@5` y tasa de invención medidas |
| **5** | Deploy en VPS | Servicio con HTTPS y systemd |

## Invariantes

Reglas que no se rompen sin medir el impacto:

- **Mismo modelo de embeddings** en la ingesta y en la consulta. Si cambia, se reindexa todo. Mezclarlos no da error: devuelve resultados malos en silencio.
- **`mode: live` nunca se indexa.** Los datos volátiles se consultan al momento.
- **`num_ctx` siempre explícito** (8k). El default de Ollama trunca el contexto sin avisar.
- **Toda respuesta cita o escala.** Nunca las dos cosas a medias.
- **Todo cambio de chunking, prompt o modelo** se valida con `npm run eval` antes y después.
- **El título del documento va dentro de cada fragmento**: un fragmento que dice «cierra el 28/02» no sirve sin saber de qué documento viene.

## Documentación

[`guia-rag-asistente-universitario.md`](./guia-rag-asistente-universitario.md) — 17 secciones con el detalle completo:

- Conceptos, arquitectura y estructura de archivos.
- Las cinco fases de implementación, con criterios de aceptación.
- Evaluación (hit@5, fidelidad, escalado) y el orden correcto para arreglar fallas.
- Elección de modelos según hardware, deploy en VPS y costos.
- Errores comunes, checklist de aceptación e invariantes para agentes.
- §17: **bitácora** con las decisiones, los bugs y el estado real del desarrollo.

---

Proyecto interno de la **UTN Facultad Regional Reconquista**. El corpus se construye a partir de información pública del sitio institucional, respetando `robots.txt` y con límite de velocidad.
