# Contrato de runtime

**Para quien implementa la ingesta y `/api/ask`** (y para el agente de IA que lo asiste).

> Si sos un agente trabajando en esta rama: leé este archivo completo antes de tocar
> `src/ingest/`, `src/ask/` o `src/server.js`. No es una revisión de código: son las
> reglas que hacen que el asistente no desinforme.

Mapa técnico general: [`../AGENTS.md`](../AGENTS.md). Guía humana: [`../guia-rag-asistente-universitario.md`](../guia-rag-asistente-universitario.md). Búsqueda y escalado: [`ARQUITECTURA-BUSQUEDA.md`](./ARQUITECTURA-BUSQUEDA.md).

---

## 0. Contexto: esto es una prueba

No hay preocupación por rendimiento, escala ni elegancia. El objetivo de esta etapa es **que las respuestas sean correctas y citadas**, y que el sistema sepa callarse.

Las decisiones de arquitectura que todavía **no** importan:

- Base vectorial vs. `store.json`. Con ~1.000 chunks cualquiera funciona. Si ya está corriendo, adelante.
- Permisos por año/carrera, multi-tenant, ACL por curso.
- Latencia, caché, concurrencia, deploy.

Lo que **sí** importa está en la sección 2. Son seis reglas, y cada una existe porque su ausencia produce una respuesta falsa con tono de certeza.

## 1. Alcance de esta etapa

**Solo información pública.** El asistente responde sobre el sitio institucional y las FAQ del bot anterior.

Fuera de alcance (etapa 2, con login y matrícula al día):

- Material bibliográfico de cátedra.
- Datos personales del alumno (notas, legajo, inscripciones).
- Cualquier contenido que dependa de quién pregunta.

## 2. Reglas duras

### R1 — Resolver las decisiones de curación por `doc_id`

`corpus/decisions.yaml` es la fuente de verdad de qué se indexa. **124 decisiones tomadas.**

```yaml
- file: corpus/web/archivo.md     # ubicación (pista)
  doc_id: mi-documento           # identidad (clave real)
  status: keep | vigente | excluir
```

| status | Qué hacer |
|---|---|
| `keep` | Indexar normal |
| `vigente` | Indexar con `meta.vigencia_ambigua = true` |
| `excluir` | **No indexar** (el archivo ni siquiera está en `corpus/`) |

Si ignorás este archivo, los 30 documentos excluidos vuelven al índice: eventos de 2022, elecciones pasadas, listados de navegación. El modelo los va a citar como si fueran actuales.

El prompt ya soporta la marca (`src/ask/prompt.js`, regla 8 y `[VIGENTE-AMBIGUA]`). Solo hay que pasar `vigencia_ambigua` desde el chunk.

### R2 — Aranceles y cuotas: **nunca** se responden desde el índice

> Los importes de matrícula y cuotas **no son información pública**. Se consultan, no se indexan.

Reglas concretas:

1. **No indexar** ningún documento con montos de matrícula, cuotas o aranceles de carreras.
2. Si alguien pregunta por costos, la respuesta correcta es **derivar**, no buscar:

   > «El costo depende de la carrera. Esa información la maneja Alumnado: 3482-420048 int. 8201, de 9 a 21 h, o auxalumnado@frrq.utn.edu.ar.»

3. **Excepción acotada:** los precios de **cursos de extensión y diplomaturas** sí están publicados por la facultad en el sitio. Se pueden responder, siempre con la fecha del dato y sabiendo que cambian por cohorte.
4. Si en el futuro existe un endpoint de aranceles, va como fuente `mode: live` — nunca como documento indexado.

**Ojo con el FAQ importado:** `faq-abono-cuota` y `faq-respuesta-costo-carrera` **no contienen importes** (uno explica el procedimiento de pago, el otro deriva a Alumnado). Son seguros como *procedimiento*. No los uses como fuente de montos.

Chequeo antes de publicar:

```bash
# documentos con montos ($ + 3 cifras) junto a palabras de costos
grep -rniE '\$\s?[0-9][0-9.,]{2,}' corpus/ | grep -iE 'cuota|matr|arancel'
```

### R3 — Datos volátiles: en vivo, con fecha

`mode: live` en `sources.yaml` significa **no indexar**. Se consulta al momento y se inyecta al prompt con `fetched_at`.

Aplica a: fechas de inscripción, estado del campus, cronograma de exámenes del turno vigente.

Formato que ya espera el prompt:

```
[VIVO] (Aranceles, consultado 2026-11-14)
...
```

Si el dato no está disponible en vivo, la respuesta es «no pude consultarlo ahora», no el valor viejo del índice.

### R4 — Un solo modelo de embeddings, registrado con el índice

El mismo `EMBEDDING_MODEL` en la ingesta y en la consulta. Guardalo dentro del índice y **validalo al arrancar**:

```js
if (store.embedding_model !== config.ollama.embeddingModel) {
  throw new Error(`índice generado con ${store.embedding_model}; reindexá con ${config.ollama.embeddingModel}`);
}
```

Mezclar modelos no da error: devuelve resultados malos en silencio.

### R5 — `num_ctx` explícito

8192. El default de Ollama trunca el contexto sin avisar y el modelo ignora los últimos fragmentos.

### R6 — Toda respuesta cita o escala

Si el modelo devuelve texto sin ninguna cita y sin derivación, marcá `confidence: low` y `escalate: true`. No lo muestres como respuesta buena.

### R7 — El runtime no edita el corpus

`corpus/`, `sources.yaml`, `decisions.yaml` y `docs/REPORTE-CURACION.md` los mantiene quien cura los datos. **El runtime los consume.**

Motivo práctico: cada regeneración reescribe 257 archivos. Si el runtime también los toca, el merge es un infierno y las decisiones se pierden.

Si necesitás un cambio de formato, pedilo.

## 3. Contrato de `AskResponse`

No cambia. Solo se agregan campos opcionales.

```ts
{
  answer: string;
  sources: { id: string; title: string; page?: number; url?: string; score: number }[];
  confidence: "high" | "medium" | "low";
  escalate: boolean;
  cached?: boolean;
  latency_ms: number;
}
```

`id` debería ser el `doc_id`. Es lo que permite auditar una respuesta después.

## 4. Cómo leer un documento del corpus

```yaml
source: web | dialogflow
doc_id: secretarias-sec-academica    # identidad estable, no cambia con la URL
title: Secretaría Académica
url: https://www.frrq.utn.edu.ar/... # URL canónica actual
site: www.frrq.utn.edu.ar
aliases: []                          # URLs anteriores, con valid_until
vigencia: 2026-01-01                 # opcional
fetched_at: 2026-11-14T09:47:55Z
```

- Usá `doc_id` como identidad en los chunks.
- Citá `url` si existe; si no, `title`.
- **Prependé el título al texto del chunk.** Un fragmento que dice «cierra el 28/02» no sirve sin saber de qué documento viene.

## 5. El camino del «no lo sé»

Es la funcionalidad más importante y la primera que hay que probar.

- Si el mejor `score` < `MIN_SCORE` (0.35 por defecto): **no llames al modelo**. Devolvé la respuesta de derivación y `escalate: true`.
- Si el modelo, con el contexto, no alcanza: el prompt ya lo obliga a decir «No tengo esa información. Te derivo…».
- Probá explícitamente algo que **no está** en el corpus («¿cuánto sale la carrera de medicina en Córdoba?»). Si contesta, hay un problema de grounding, no de cobertura.

## 6. Evaluación

Antes de mostrar el asistente a alguien:

```bash
npm run eval   # ← cuando esté implementado
```

Hay **189 preguntas reales** en `eval/questions-dialogflow.yaml`, con `expected_doc`. Sirven como baseline de `hit@5`: si el documento correcto aparece entre los 5 recuperados, el retrieval está sano.

Y `eval/questions.yaml` tiene 5 casos manuales, dos de ellos **trampa**: una excepción de cuota y una pregunta fuera de dominio. Ambas **deben** escalar.

Cada pregunta que probás a mano y te sirve para corregir algo, agregala al set. Así deja de ser anécdota y pasa a ser regresión.

## 7. Checklist antes de mostrar el demo

- [ ] El índice no incluye ninguno de los 30 excluidos.
- [ ] Los 56 documentos `vigente` llevan `vigencia_ambigua`.
- [ ] Preguntar por aranceles deriva a Alumnado, no inventa un monto.
- [ ] Una pregunta fuera del corpus escala en vez de responder.
- [ ] Las respuestas citan `[n]` y `sources` trae `doc_id`.
- [ ] La segunda consulta idéntica no cambia de respuesta.
- [ ] `num_ctx` está explícito y el modelo de embeddings coincide con el índice.

## 8. Decisiones ya tomadas (no re-abrir sin datos)

| Tema | Decisión | Motivo |
|---|---|---|
| Base vectorial | Opcional a esta escala | ~1.000 chunks; el cuello es el chunking, no el store |
| Filtrado por permisos | **No** en esta etapa | Solo información pública |
| Aranceles | Nunca indexados | No son públicos; se derivan |
| Modelo | `gemma3:4b` para empezar | Rápido en CPU; se cambia por env |
| Framework de RAG | Ninguno | 70 líneas legibles; se agrega si hace falta |
| Error de retrieval | Revisar chunking antes que el modelo | El 80% de los fallos está en el corpus |

## 9. Si algo falla

1. **El chunk correcto no aparece en el top 5** → problema de chunking o de corpus, no del modelo.
2. **Aparece y la respuesta es mala** → prompt.
3. **Aparece, responde bien y redacta mal** → recién ahí, otro modelo.
4. **Responde algo que fue excluido** → no está leyendo `decisions.yaml`.
5. **Afirma un año viejo** → el documento no está marcado `vigente`.

---

*Última actualización: 2026-11-14. Si cambiás una regla de este archivo, avisá: afecta el corpus, no solo el runtime.*
