# Reporte de curación del corpus

**Generado:** 2026-11-16
**En el corpus:** 228 documentos · **Fuentes:** `corpus/web` (180) y `corpus/faq` (48)
**Excluidos:** 30 (en `corpus-excluded/`, fuera del índice)
**Decisiones ya marcadas:** 124

> Este archivo vive en `docs/`, fuera de `corpus/`, para que el pipeline no lo ingiera.
> Se regenera con `npm run curation` y **conserva las casillas marcadas**.

---

## Cómo marcar este reporte

Cada documento tiene **tres casillas**. Marcá **una sola**, con `x`:

```markdown
  - [x] Queda                                       ← se conserva tal cual
  - [ ] Queda — vigente (año desactualizado)        ← se conserva y se marca como vigente
  - [ ] Excluir                                     ← sale del índice
```

| Marcás | Qué queda guardado | Efecto en el asistente |
|---|---|---|
| **Queda** | `status: keep` | Se indexa normal |
| **Queda — vigente** | `status: vigente` | Se indexa, pero el prompt recibe la orden de **no afirmar años ni fechas** de ese documento y derivar al calendario |
| **Excluir** | `status: excluir` + motivo | Se mueve a `corpus-excluded/` y no se indexa |

**Si no marcás nada, no pasa nada.** Nada se borra por defecto.

### Cuándo usar «Queda — vigente»

Cuando el documento **es el canal oficial hoy** pero el sitio conserva un año viejo en la URL o en el texto. El procedimiento se responde desde ahí; las fechas nunca.

---

## Resumen

| Veredicto | Docs | Qué significa |
|---|---|---|
| 🔴 Excluir | **1** | Evento con fecha vencida |
| 🟡 Revisar | **72** | Listados, contenido fino, duplicados o vigencia dudosa |
| 🔵 Opcional | **21** | Oferta de extensión e idiomas |
| 🟢 FAQ del bot | **48** | Respuestas del Dialogflow. Revisar si siguen vigentes |
| ⚪ Limpio | **86** | Contenido sustantivo y vigente |
| 🗄️ Ya excluidos | **30** | Fuera del índice. Marcá «Queda» para restaurar |

**Criterio central:** no se excluye por año, se excluye por **tipo**.
Un reglamento de 2019 sigue vigente hasta que lo deroguen; una jornada de 2022 no.

---

## ⚠️ Falsos positivos conocidos

| Documento | Por qué parece candidato | Qué es en realidad |
|---|---|---|
| `cursos-extension-ms-project-2016` | "2016" en el título | La **versión del software**, no la fecha del curso |
| `carreras-ea-calchaqui-tumi` ≡ `carreras-ea-san-javier-tumi` | 93% de texto idéntico | El mismo programa en **dos localidades**. Conservar ambos |
| `category-*` y `novedades` | 94–97% idénticos entre sí | Listados de WordPress. Esos sí son redundantes |

---

# 🔴 A excluir — eventos cerrados (1)

Recomendación: **excluir todos**. Varios son activamente peligrosos: el modelo puede responder *"la inscripción es hasta marzo de 2025"* en presente.

- [`www.frrq.utn.edu.ar-inscripciones-a-carreras-ciclo-lectivo-2023-iwmjmv.md`](../corpus/web/www.frrq.utn.edu.ar-inscripciones-a-carreras-ciclo-lectivo-2023-iwmjmv.md)
  - *Inscripciones a Carreras – Ciclo Lectivo 2023* · evento de 2023 · [original](<https://www.frrq.utn.edu.ar/inscripciones-a-carreras-ciclo-lectivo-2023/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

---

# 🟡 A revisar (72)

### Decisiones previas que cambiaron de categoría (1)

Su clasificación automática cambió, pero ya tenían una casilla marcada. Se mantienen visibles para no perder la decisión.

- [`www.frrq.utn.edu.ar-category-cursos-nnvcy8.md`](../corpus/web/www.frrq.utn.edu.ar-category-cursos-nnvcy8.md)
  - *Cursos* · ya tenía una decisión marcada · [original](<https://www.frrq.utn.edu.ar/category/cursos/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

---

### Listados de navegación (33)

Índices de WordPress. No contienen respuestas: contienen enlaces. Compiten con las páginas reales en el retrieval.

- [`sac.frrq.utn.edu.ar-utn-frrq-comunidad.html-5odg1s.md`](../corpus/web/sac.frrq.utn.edu.ar-utn-frrq-comunidad.html-5odg1s.md)
  - *Comunidad* · 39 ítems de lista — parece un índice · [original](<https://sac.frrq.utn.edu.ar/utn-frrq-comunidad.html>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`sac.frrq.utn.edu.ar-utn-frrq-contacto.html-mh0bww.md`](../corpus/web/sac.frrq.utn.edu.ar-utn-frrq-contacto.html-mh0bww.md)
  - *Contacto* · 43 ítems de lista — parece un índice · [original](<https://sac.frrq.utn.edu.ar/utn-frrq-contacto.html>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`sac.frrq.utn.edu.ar-utn-frrq.html-mh0bww.md`](../corpus/web/sac.frrq.utn.edu.ar-utn-frrq.html-mh0bww.md)
  - *Educación que impulsa el desarrollo* · 24 ítems de lista — parece un índice · [original](<https://sac.frrq.utn.edu.ar/utn-frrq.html>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-2026-introduccion-al-diseno-3d-con-solidworks-3jrcy8.md`](../corpus/web/www.frrq.utn.edu.ar-2026-introduccion-al-diseno-3d-con-solidworks-3jrcy8.md)
  - *INTRODUCCIÓN AL DISEÑO 3D CON SOLIDWORKS* · 19 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/2026/introduccion-al-diseno-3d-con-solidworks/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-carreras-carreras-a-distancia-ll-online-gluzs8.md`](../corpus/web/www.frrq.utn.edu.ar-carreras-carreras-a-distancia-ll-online-gluzs8.md)
  - *Licenciatura en Logística – Cursado 100% a distancia* · 32 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/carreras/carreras-a-distancia/ll-online/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-carreras-carreras-a-distancia-tuti-online-aw5llw.md`](../corpus/web/www.frrq.utn.edu.ar-carreras-carreras-a-distancia-tuti-online-aw5llw.md)
  - *Tecnicatura Universitaria en Tecnologías de la Información – Cursado 100% a distancia* · 19 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/carreras/carreras-a-distancia/tuti-online/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-carreras-ea-calchaqui-tumi-dw1plw.md`](../corpus/web/www.frrq.utn.edu.ar-carreras-ea-calchaqui-tumi-dw1plw.md)
  - *EA Calchaquí TUMI* · 22 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/carreras/ea-calchaqui-tumi/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-carreras-ea-san-javier-tuhst-voc3qv.md`](../corpus/web/www.frrq.utn.edu.ar-carreras-ea-san-javier-tuhst-voc3qv.md)
  - *EA San Javier TUHST* · 25 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/carreras/ea-san-javier-tuhst/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-carreras-ea-san-javier-tumi-hvtas8.md`](../corpus/web/www.frrq.utn.edu.ar-carreras-ea-san-javier-tumi-hvtas8.md)
  - *EA San Javier TUMI* · 22 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/carreras/ea-san-javier-tumi/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-carreras-ie-l2lllw.md`](../corpus/web/www.frrq.utn.edu.ar-carreras-ie-l2lllw.md)
  - *2025* · 23 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/carreras/ie/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-carreras-ii-l2lplw.md`](../corpus/web/www.frrq.utn.edu.ar-carreras-ii-l2lplw.md)
  - *2025* · 22 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/carreras/ii/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-carreras-pdgea-z2vhlw.md`](../corpus/web/www.frrq.utn.edu.ar-carreras-pdgea-z2vhlw.md)
  - *Posgrado Dirección y Gestión de Empresas Agroindustriales* · 18 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/carreras/pdgea/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-carreras-posgrado-maestria-en-redes-de-datos-dg9zlw.md`](../corpus/web/www.frrq.utn.edu.ar-carreras-posgrado-maestria-en-redes-de-datos-dg9zlw.md)
  - *Posgrado Maestría en Redes de Datos* · 19 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/carreras/posgrado-maestria-en-redes-de-datos/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-carreras-tup-3r1cc8.md`](../corpus/web/www.frrq.utn.edu.ar-carreras-tup-3r1cc8.md)
  - *Tecnicatura Universitaria en Programación* · 16 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/carreras/tup/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-contactos-utn-reconquista-lzdgev.md`](../corpus/web/www.frrq.utn.edu.ar-contactos-utn-reconquista-lzdgev.md)
  - *Contactos UTN Reconquista* · 17 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/contactos-utn-reconquista/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-cursos-extension-ms-project-2016-mde2lw.md`](../corpus/web/www.frrq.utn.edu.ar-cursos-extension-ms-project-2016-mde2lw.md)
  - *MS PROJECT 2016* · 43 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/cursos-extension/ms-project-2016/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-cursos-extension-oratoria-9yawev.md`](../corpus/web/www.frrq.utn.edu.ar-cursos-extension-oratoria-9yawev.md)
  - *Oratoria* · 16 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/cursos-extension/oratoria/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-cursos-extension-orientacion-vocacional-25hbc8.md`](../corpus/web/www.frrq.utn.edu.ar-cursos-extension-orientacion-vocacional-25hbc8.md)
  - *Orientacion-Vocacional* · 17 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/cursos-extension/orientacion-vocacional/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-departamentos-dpto-lar-1syxiv.md`](../corpus/web/www.frrq.utn.edu.ar-departamentos-dpto-lar-1syxiv.md)
  - *Departamento LAR* · 31 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/departamentos/dpto-lar/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-ingresantes-dgvzlw.md`](../corpus/web/www.frrq.utn.edu.ar-ingresantes-dgvzlw.md)
  - *Ingresantes* · 40 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/ingresantes/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-inscripcion-a-carreras-2027-jayny8.md`](../corpus/web/www.frrq.utn.edu.ar-inscripcion-a-carreras-2027-jayny8.md)
  - *Inscripción a Carreras 2027* · 16 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/inscripcion-a-carreras-2027/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-pagina-de-inicio-autoridades-fkzxmv.md`](../corpus/web/www.frrq.utn.edu.ar-pagina-de-inicio-autoridades-fkzxmv.md)
  - *Autoridades* · 23 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/pagina-de-inicio/autoridades/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-pagina-de-inicio-consejo-directivo-rpdm8v.md`](../corpus/web/www.frrq.utn.edu.ar-pagina-de-inicio-consejo-directivo-rpdm8v.md)
  - *Consejo Directivo* · 20 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/pagina-de-inicio/consejo-directivo/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-diplomaturas-y-cursos-online-gluzs8.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-diplomaturas-y-cursos-online-gluzs8.md)
  - *DIPLOMATURAS Y CURSOS ONLINE* · 40 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/diplomaturas-y-cursos-online/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-npb24v.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-npb24v.md)
  - *Secretaría Extensión Universitaria* · 46 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-secretaria-cyt-cyt-adscripciones-bmvzlw.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-secretaria-cyt-cyt-adscripciones-bmvzlw.md)
  - *Ciencia y Tecnología – Adscripciones a proyectos I+D+i* · 40 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/secretarias/secretaria-cyt/cyt-adscripciones/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-secretaria-cyt-cyt-carrera-investigador-wrvci8.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-secretaria-cyt-cyt-carrera-investigador-wrvci8.md)
  - *Ciencia y Tecnología – Carrera del Investigador* · 41 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/secretarias/secretaria-cyt/cyt-carrera-investigador/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-secretaria-cyt-cyt-centros-grupos-xbvcy8.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-secretaria-cyt-cyt-centros-grupos-xbvcy8.md)
  - *Ciencia y Tecnología – Centros y Grupos* · 56 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/secretarias/secretaria-cyt/cyt-centros-grupos/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-secretaria-cyt-cyt-proyectos-idi-awrplw.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-secretaria-cyt-cyt-proyectos-idi-awrplw.md)
  - *Ciencia y Tecnología – Proyectos I+D+i* · 53 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/secretarias/secretaria-cyt/cyt-proyectos-idi/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-secretaria-cyt-y3l0lw.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-secretaria-cyt-y3l0lw.md)
  - *Secretaría Ciencia y Tecnología* · 41 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/secretarias/secretaria-cyt/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-secretaria-cyt2-3l0mi8.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-secretaria-cyt2-3l0mi8.md)
  - *Secretaría Ciencia y Tecnología (demo)* · 224 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/secretarias/secretaria-cyt2/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec_academica-1py2ev.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec_academica-1py2ev.md)
  - *Secretaría Académica* · 20 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/secretarias/sec_academica/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-unidad-atencion-casos-xnvcy8.md`](../corpus/web/www.frrq.utn.edu.ar-unidad-atencion-casos-xnvcy8.md)
  - *Unidad de Atención de Casos* · 26 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/unidad-atencion-casos/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

---

### Contenido muy fino (38)

Menos de 600 caracteres. Revisar de a uno: una página de contacto **sirve**; una plantilla vacía **no**.

- [`sac.frrq.utn.edu.ar-utn-frrq-carreras.html-mh0bww.md`](../corpus/web/sac.frrq.utn.edu.ar-utn-frrq-carreras.html-mh0bww.md)
  - *Carreras* · 579 caracteres · [original](<https://sac.frrq.utn.edu.ar/utn-frrq-carreras.html>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`sac.frrq.utn.edu.ar-utn-frrq-extension.html-5odg1s.md`](../corpus/web/sac.frrq.utn.edu.ar-utn-frrq-extension.html-5odg1s.md)
  - *Extensión Universitaria* · 263 caracteres · [original](<https://sac.frrq.utn.edu.ar/utn-frrq-extension.html>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`sac.frrq.utn.edu.ar-utn-frrq-extracurricular.html-5odg1s.md`](../corpus/web/sac.frrq.utn.edu.ar-utn-frrq-extracurricular.html-5odg1s.md)
  - *Más allá del aula* · 236 caracteres · [original](<https://sac.frrq.utn.edu.ar/utn-frrq-extracurricular.html>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`sac.frrq.utn.edu.ar-utn-frrq-laboratorios.html-5odg1s.md`](../corpus/web/sac.frrq.utn.edu.ar-utn-frrq-laboratorios.html-5odg1s.md)
  - *Laboratorios* · 383 caracteres · [original](<https://sac.frrq.utn.edu.ar/utn-frrq-laboratorios.html>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`sac.frrq.utn.edu.ar-utn-frrq-sistemas.html-mh0bww.md`](../corpus/web/sac.frrq.utn.edu.ar-utn-frrq-sistemas.html-mh0bww.md)
  - *Sistemas de Gestión* · 458 caracteres · [original](<https://sac.frrq.utn.edu.ar/utn-frrq-sistemas.html>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`sac.frrq.utn.edu.ar-utn-frrq-solicitar-servicio.html-5odg1s.md`](../corpus/web/sac.frrq.utn.edu.ar-utn-frrq-solicitar-servicio.html-5odg1s.md)
  - *Solicitar un servicio* · 357 caracteres · [original](<https://sac.frrq.utn.edu.ar/utn-frrq-solicitar-servicio.html>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`sac.frrq.utn.edu.ar-utn-frrq-vinculacion.html-mh0bww.md`](../corpus/web/sac.frrq.utn.edu.ar-utn-frrq-vinculacion.html-mh0bww.md)
  - *Vinculación tecnológica* · 559 caracteres · [original](<https://sac.frrq.utn.edu.ar/utn-frrq-vinculacion.html>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-beca-ayuda-social-economica-2026-mdi2lw.md`](../corpus/web/www.frrq.utn.edu.ar-beca-ayuda-social-economica-2026-mdi2lw.md)
  - *Beca Ayuda Social Económica 2026* · 418 caracteres · [original](<https://www.frrq.utn.edu.ar/beca-ayuda-social-economica-2026/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-bibl-colecciones-9uzxmv.md`](../corpus/web/www.frrq.utn.edu.ar-bibl-colecciones-9uzxmv.md)
  - *Biblioteca Colecciones* · 339 caracteres · [original](<https://www.frrq.utn.edu.ar/bibl-colecciones/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-bibl-mision-vision-2lvbi8.md`](../corpus/web/www.frrq.utn.edu.ar-bibl-mision-vision-2lvbi8.md)
  - *Biblioteca Misión y Visión* · 560 caracteres · [original](<https://www.frrq.utn.edu.ar/bibl-mision-vision/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-bibl-servicios-aw9zlw.md`](../corpus/web/www.frrq.utn.edu.ar-bibl-servicios-aw9zlw.md)
  - *Biblioteca Servicios* · 505 caracteres · [original](<https://www.frrq.utn.edu.ar/bibl-servicios/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-biblioteca-info-w5mby8.md`](../corpus/web/www.frrq.utn.edu.ar-biblioteca-info-w5mby8.md)
  - *Biblioteca info* · 321 caracteres · [original](<https://www.frrq.utn.edu.ar/biblioteca-info/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-calendario-de-mesas-de-examenes-vuzxmv.md`](../corpus/web/www.frrq.utn.edu.ar-calendario-de-mesas-de-examenes-vuzxmv.md)
  - *Calendario de Mesas de Exámenes* · 266 caracteres · [original](<https://www.frrq.utn.edu.ar/calendario-de-mesas-de-examenes/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-carreras-clhst-formulario-clhst-xoc3qv.md`](../corpus/web/www.frrq.utn.edu.ar-carreras-clhst-formulario-clhst-xoc3qv.md)
  - *Formulario CLHST* · 286 caracteres · [original](<https://www.frrq.utn.edu.ar/carreras/clhst/formulario-clhst/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-conoce-nuestra-facultad-dgfklw.md`](../corpus/web/www.frrq.utn.edu.ar-conoce-nuestra-facultad-dgfklw.md)
  - *Conocé nuestra Facultad* · 311 caracteres · [original](<https://www.frrq.utn.edu.ar/conoce-nuestra-facultad/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-departamentos-50b3mv.md`](../corpus/web/www.frrq.utn.edu.ar-departamentos-50b3mv.md)
  - *Departamentos* · 442 caracteres · [original](<https://www.frrq.utn.edu.ar/departamentos/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-departamentos-dpto-basicas-y2fzlw.md`](../corpus/web/www.frrq.utn.edu.ar-departamentos-dpto-basicas-y2fzlw.md)
  - *Departamento Básicas* · 579 caracteres · [original](<https://www.frrq.utn.edu.ar/departamentos/dpto-basicas/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-departamentos-dpto-electromecanica-5py2ev.md`](../corpus/web/www.frrq.utn.edu.ar-departamentos-dpto-electromecanica-5py2ev.md)
  - *Departamento Electromecánica* · 570 caracteres · [original](<https://www.frrq.utn.edu.ar/departamentos/dpto-electromecanica/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-docdocentes-frrq-zycnev.md`](../corpus/web/www.frrq.utn.edu.ar-docdocentes-frrq-zycnev.md)
  - *DocDocentes FRRq* · 525 caracteres · [original](<https://www.frrq.utn.edu.ar/docdocentes-frrq/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-id-l2lklw.md`](../corpus/web/www.frrq.utn.edu.ar-id-l2lklw.md)
  - *Investigación y Desarrollo* · 584 caracteres · [original](<https://www.frrq.utn.edu.ar/id/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-nodocentes-formularios-de-licencias-y-franquicias-npyxmv.md`](../corpus/web/www.frrq.utn.edu.ar-nodocentes-formularios-de-licencias-y-franquicias-npyxmv.md)
  - *Formularios de Licencias y Franquicias* · 254 caracteres · [original](<https://www.frrq.utn.edu.ar/nodocentes/formularios-de-licencias-y-franquicias/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-pagina-de-inicio-info-acad-y2fklw.md`](../corpus/web/www.frrq.utn.edu.ar-pagina-de-inicio-info-acad-y2fklw.md)
  - *Información Académica* · 362 caracteres · [original](<https://www.frrq.utn.edu.ar/pagina-de-inicio/info-acad/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-disenador-grafico-expres-jlc3mv.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-disenador-grafico-expres-jlc3mv.md)
  - *AO – Diseño – Diseñador Gráfico Express* · 540 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-diseno-disenador-grafico-express/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-disenador-multimedial-glhbc8.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-disenador-multimedial-glhbc8.md)
  - *AO – Diseño – Diseñador Multimedial* · 420 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-diseno-disenador-multimedial/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-disenador-web-13zwiv.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-disenador-web-13zwiv.md)
  - *AO – Diseño – Diseñador Web* · 491 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-diseno-disenador-web/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-inmobilturist-asistente-de-inmo-cmlhlw.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-inmobilturist-asistente-de-inmo-cmlhlw.md)
  - *AO – InmobilTurist – Asistente de Inmobiliaria* · 558 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-inmobilturist-asistente-de-inmobiliaria/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-rrhh-asistente-de-rrhh-express-zxnzlw.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-rrhh-asistente-de-rrhh-express-zxnzlw.md)
  - *AO – RRHH – Asistente de RRHH Express* · 545 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-rrhh-asistente-de-rrhh-express/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-rrhh-liderazgo-y-coaching-mod-o-2ljby8.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-rrhh-liderazgo-y-coaching-mod-o-2ljby8.md)
  - *AO – RRHH – Liderazgo y Coaching Mod Ontológico* · 529 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-rrhh-liderazgo-y-coaching-mod-ontologico/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-secretariado-informatico-awnvlw.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-secretariado-informatico-awnvlw.md)
  - *ao-secretariado-informático* · 508 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-secretariado-informatico/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-seguridad-dip-accidentologia-vi-awfslw.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-seguridad-dip-accidentologia-vi-awfslw.md)
  - *AO – Seguridad – Dip Accidentología Vial* · 583 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-seguridad-dip-accidentologia-vial/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-seguridad-riesgo-electrico-jpy28v.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-seguridad-riesgo-electrico-jpy28v.md)
  - *AO – Seguridad – Riesgo Eléctrico* · 590 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-seguridad-riesgo-electrico/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-auxiliar-de-logistica-rpy2ev.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-auxiliar-de-logistica-rpy2ev.md)
  - *AO – Temario – Auxiliar de Logística* · 497 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-temario-auxiliar-de-logistica/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-diplomatura-en-asistenc-rpy28v.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-diplomatura-en-asistenc-rpy28v.md)
  - *AO – Temario – Diplomatura en Asistencia de Estudio Jurídico* · 544 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-temario-diplomatura-en-asistencia-de-estudio-juridico/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-educacion-virtual-r1ywwv.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-educacion-virtual-r1ywwv.md)
  - *Educación Virtual* · 492 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/educacion-virtual/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-obra-ynjhlw.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-obra-ynjhlw.md)
  - *Secretaría Obra, Mantenimiento y Servicios Generales* · 335 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-obra/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec_academica-office365-solicitud-de-licencia-of-50zxmv.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec_academica-office365-solicitud-de-licencia-of-50zxmv.md)
  - *Solicitud de licencia Office 365 para estudiantes* · 347 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec_academica/office365/solicitud-de-licencia-office-365-para-estudiantes/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-solicitud-cuenta-zoom-m9vbs8.md`](../corpus/web/www.frrq.utn.edu.ar-solicitud-cuenta-zoom-m9vbs8.md)
  - *Solicitud cuenta Zoom* · 313 caracteres · [original](<https://www.frrq.utn.edu.ar/solicitud-cuenta-zoom/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-solicitud-de-compra-de-material-bibliografico-mljby8.md`](../corpus/web/www.frrq.utn.edu.ar-solicitud-de-compra-de-material-bibliografico-mljby8.md)
  - *SOLICITUD DE COMPRA DE MATERIAL BIBLIOGRÁFICO* · 362 caracteres · [original](<https://www.frrq.utn.edu.ar/solicitud-de-compra-de-material-bibliografico/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir


---

# 🟢 FAQ importada de Dialogflow (48)

Respuestas curadas del bot anterior. Son la mejor fuente de **formulaciones reales** (cada documento incluye las frases de entrenamiento), pero el contenido es de hace años.

**Riesgo principal:** pueden contradecir a la web actual en costos y contactos. Si la web ya cubre el tema y el dato cambió, excluirlas o marcarlas **vigente** evita que el asistente responda datos viejos.

- [`abono-cuota.md`](../corpus/faq/abono-cuota.md)
  - *Abono Cuota* · respuesta del bot · 788 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`ano-de-gracia.md`](../corpus/faq/ano-de-gracia.md)
  - *Año De Gracia* · respuesta del bot · 453 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`aprobracion-directa.md`](../corpus/faq/aprobracion-directa.md)
  - *Aprobracion Directa* · respuesta del bot · 445 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`becas.md`](../corpus/faq/becas.md)
  - *Becas* · respuesta del bot · 699 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`boleto-educativo.md`](../corpus/faq/boleto-educativo.md)
  - *Boleto Educativo* · respuesta del bot · 344 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`calendario-academico.md`](../corpus/faq/calendario-academico.md)
  - *Calendario Académico* · respuesta del bot · 309 chars · [original](<https://www.frrq.utn.edu.ar/calendario-academico-2023-2024/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`carreras-distancia.md`](../corpus/faq/carreras-distancia.md)
  - *Carreras Distancia* · respuesta del bot · 1302 chars · [original](<https://www.frrq.utn.edu.ar/carreras/carreras-a-distancia/tuti-online/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`carreras-grado.md`](../corpus/faq/carreras-grado.md)
  - *Carreras Grado* · respuesta del bot · 344 chars · [original](<https://www.frrq.utn.edu.ar/carreras/ie/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`carreras-posgrado.md`](../corpus/faq/carreras-posgrado.md)
  - *Carreras Posgrado* · respuesta del bot · 312 chars · [original](<https://www.frrq.utn.edu.ar/carreras/pdgea/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`carreras-tecnicaturas.md`](../corpus/faq/carreras-tecnicaturas.md)
  - *Carreras Tecnicaturas* · respuesta del bot · 333 chars · [original](<https://www.frrq.utn.edu.ar/carreras/tuhst/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`correo-institucional.md`](../corpus/faq/correo-institucional.md)
  - *Correo Institucional* · respuesta del bot · 660 chars · [original](<https://www.frrq.utn.edu.ar/secretarias/sec_academica/office365/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`criterios-evaluacion.md`](../corpus/faq/criterios-evaluacion.md)
  - *Criterios Evaluación* · respuesta del bot · 540 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`cursado-condicional.md`](../corpus/faq/cursado-condicional.md)
  - *Cursado Condicional* · respuesta del bot · 590 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`cursillo-ingreso.md`](../corpus/faq/cursillo-ingreso.md)
  - *Cursillo Ingreso* · respuesta del bot · 265 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`cursos-online.md`](../corpus/faq/cursos-online.md)
  - *Cursos Online* · respuesta del bot · 512 chars · [original](<https://aprenderonline.frrq.utn.edu.ar>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`ejemplo-examen-final.md`](../corpus/faq/ejemplo-examen-final.md)
  - *Ejemplo Examen Final* · respuesta del bot · 338 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`extension-regularidad.md`](../corpus/faq/extension-regularidad.md)
  - *Extensión Regularidad* · respuesta del bot · 616 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`gen-electromecanica.md`](../corpus/faq/gen-electromecanica.md)
  - *GEN Electromecánica* · respuesta del bot · 248 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`gen-higiene-yseguridad.md`](../corpus/faq/gen-higiene-yseguridad.md)
  - *GEN Higiene YSeguridad* · respuesta del bot · 337 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`gen-lar.md`](../corpus/faq/gen-lar.md)
  - *GEN LAR* · respuesta del bot · 227 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`gen-mecatronica.md`](../corpus/faq/gen-mecatronica.md)
  - *GEN Mecatrónica* · respuesta del bot · 144 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`gen-pdgea.md`](../corpus/faq/gen-pdgea.md)
  - *GEN Pdgea* · respuesta del bot · 307 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`gen-programacion.md`](../corpus/faq/gen-programacion.md)
  - *GEN Programación* · respuesta del bot · 269 chars · [original](<https://www.frrq.utn.edu.ar/carreras/tup/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`horarios-fechas.md`](../corpus/faq/horarios-fechas.md)
  - *Horarios Fechas* · respuesta del bot · 418 chars · [original](<https://bit.ly/3OxZQh9>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`ingreso-regional.md`](../corpus/faq/ingreso-regional.md)
  - *Ingreso Regional* · respuesta del bot · 442 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`inscripcion-carreras.md`](../corpus/faq/inscripcion-carreras.md)
  - *Inscripción Carreras* · respuesta del bot · 570 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`inscripcion-materias.md`](../corpus/faq/inscripcion-materias.md)
  - *Inscripción Materias* · respuesta del bot · 988 chars · [original](<http://www3.frrq.utn.edu.ar/sysacadweb/loginalumno.asp>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`inscripcion-rendir.md`](../corpus/faq/inscripcion-rendir.md)
  - *Inscripción Rendir* · respuesta del bot · 635 chars · [original](<http://www3.frrq.utn.edu.ar/sysacadweb/loginalumno.asp>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`licencia-estudiantil.md`](../corpus/faq/licencia-estudiantil.md)
  - *Licencia Estudiantil* · respuesta del bot · 827 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`llamados-examenes.md`](../corpus/faq/llamados-examenes.md)
  - *Llamados Exámenes* · respuesta del bot · 385 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`moodle.md`](../corpus/faq/moodle.md)
  - *Moodle* · respuesta del bot · 395 chars · [original](<https://frrq.cvg.utn.edu.ar>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`plan-estudios.md`](../corpus/faq/plan-estudios.md)
  - *Plan Estudios* · respuesta del bot · 316 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`pps.md`](../corpus/faq/pps.md)
  - *PPS* · respuesta del bot · 425 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`recuperacion.md`](../corpus/faq/recuperacion.md)
  - *Recuperación* · respuesta del bot · 419 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`reglamento-estudio.md`](../corpus/faq/reglamento-estudio.md)
  - *Reglamento Estudio* · respuesta del bot · 333 chars · [original](<http://csu.rec.utn.edu.ar/docs/php/salida.php3?tipo=ORD&numero=1549&anio=0&facultad=CSU>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`regularidad.md`](../corpus/faq/regularidad.md)
  - *Regularidad* · respuesta del bot · 842 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`respuesta-autogestion.md`](../corpus/faq/respuesta-autogestion.md)
  - *Respuesta Autogestión* · respuesta del bot · 881 chars · [original](<http://www3.frrq.utn.edu.ar/sysacadweb/logindocente.asp>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`respuesta-carreras.md`](../corpus/faq/respuesta-carreras.md)
  - *Respuesta Carreras* · respuesta del bot · 366 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`respuesta-costo-carrera.md`](../corpus/faq/respuesta-costo-carrera.md)
  - *Respuesta Costo Carrera* · respuesta del bot · 552 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`respuesta-faltas-inasistencias.md`](../corpus/faq/respuesta-faltas-inasistencias.md)
  - *Respuesta Faltas Inasistencias* · respuesta del bot · 810 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`respuesta-legajo.md`](../corpus/faq/respuesta-legajo.md)
  - *Respuesta Legajo* · respuesta del bot · 981 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`respuesta-material-estudio.md`](../corpus/faq/respuesta-material-estudio.md)
  - *Respuesta Material Estudio* · respuesta del bot · 471 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`respuesta-programador.md`](../corpus/faq/respuesta-programador.md)
  - *Respuesta Programador* · respuesta del bot · 229 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`respuesta-redes-sociales.md`](../corpus/faq/respuesta-redes-sociales.md)
  - *Respuesta Redes Sociales* · respuesta del bot · 334 chars · [original](<https://www.facebook.com/utnreconquista>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`respuesta-titulo.md`](../corpus/faq/respuesta-titulo.md)
  - *Respuesta Título* · respuesta del bot · 462 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`respuesta-ubicacion.md`](../corpus/faq/respuesta-ubicacion.md)
  - *Respuesta Ubicación* · respuesta del bot · 471 chars · [original](<https://www.google.com/maps/place/UTN+-+Facultad+Regional+Reconquista/@-29.14637,-59.664332,16z/data=!4m6!3m5!1s0x944eb070e4b85b65:0x2aae9b3904deeb0f!8m2!3d-29.1463697!4d-59.6643319!16s%2Fg%2F124sthswl?hl=es&entry=ttu>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`respuestas-dudas-persona-real.md`](../corpus/faq/respuestas-dudas-persona-real.md)
  - *Respuestas Dudas Persona Real* · respuesta del bot · 295 chars
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`ubicacion-facultad.md`](../corpus/faq/ubicacion-facultad.md)
  - *Ubicación de la Facultad* · respuesta del bot · 960 chars · [original](<https://www.google.com/maps?ll=-29.14637,-59.664332&z=16&t=m&hl=es-419&gl=US&mapclient=embed&cid=3075566264737786639>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

---

# 🔵 Opcional — oferta de extensión e idiomas (21)

Depende de si el asistente responde *"¿qué cursos hay?"* o solo *"¿cuándo me inscribo?"*.

- [`www.frrq.utn.edu.ar-2026-curso-diplomatura-en-habilidades-gerenciales-management-glvbi8.md`](../corpus/web/www.frrq.utn.edu.ar-2026-curso-diplomatura-en-habilidades-gerenciales-management-glvbi8.md)
  - *CURSO | DIPLOMATURA EN HABILIDADES GERENCIALES* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/2026/curso-diplomatura-en-habilidades-gerenciales-management-administration/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-cursos-escuela-de-idiomas-9tyxmv.md`](../corpus/web/www.frrq.utn.edu.ar-cursos-escuela-de-idiomas-9tyxmv.md)
  - *Cursos Escuela de Idiomas* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/cursos-escuela-de-idiomas/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-cursos-extension-curso-virtual-leer-para-aprender-5kzxiv.md`](../corpus/web/www.frrq.utn.edu.ar-cursos-extension-curso-virtual-leer-para-aprender-5kzxiv.md)
  - *Curso virtual – Leer para aprender* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/cursos-extension/curso-virtual-leer-para-aprender/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-cursos-extension-diplomatura-en-literatura-brasilena-xlbmev.md`](../corpus/web/www.frrq.utn.edu.ar-cursos-extension-diplomatura-en-literatura-brasilena-xlbmev.md)
  - *Diplomatura en Literatura Brasileña* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/cursos-extension/diplomatura-en-literatura-brasilena/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-cursos-extension-diplomatura-en-literatura-lusofona-m9uys8.md`](../corpus/web/www.frrq.utn.edu.ar-cursos-extension-diplomatura-en-literatura-lusofona-m9uys8.md)
  - *Diplomatura en Literatura Lusófona* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/cursos-extension/diplomatura-en-literatura-lusofona/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-cursos-extension-fotografia-wzpys8.md`](../corpus/web/www.frrq.utn.edu.ar-cursos-extension-fotografia-wzpys8.md)
  - *Fotografia* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/cursos-extension/fotografia/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-cursos-extension-npb24v.md`](../corpus/web/www.frrq.utn.edu.ar-cursos-extension-npb24v.md)
  - *Cursos de Extensión* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/cursos-extension/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-cursos-extension-sistema-info-geo-wdlby8.md`](../corpus/web/www.frrq.utn.edu.ar-cursos-extension-sistema-info-geo-wdlby8.md)
  - *Sistema-info-geo* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/cursos-extension/sistema-info-geo/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-ei-curso-online-de-aleman-nivel-a-1-1-0xltev.md`](../corpus/web/www.frrq.utn.edu.ar-ei-curso-online-de-aleman-nivel-a-1-1-0xltev.md)
  - *EI – CURSO ONLINE DE ALEMÁN NIVEL A 1.1* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/ei-curso-online-de-aleman-nivel-a-1-1/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-ei-curso-online-de-portugues-nivel-basico-awnvlw.md`](../corpus/web/www.frrq.utn.edu.ar-ei-curso-online-de-portugues-nivel-basico-awnvlw.md)
  - *EI – CURSO ONLINE DE PORTUGUÉS – NIVEL BÁSICO* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/ei-curso-online-de-portugues-nivel-basico/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-ei-curso-virtual-de-italiano-nivel-a1-wtytev.md`](../corpus/web/www.frrq.utn.edu.ar-ei-curso-virtual-de-italiano-nivel-a1-wtytev.md)
  - *EI – Curso Virtual de Italiano – Nivel A1* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/ei-curso-virtual-de-italiano-nivel-a1/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-escuela-de-idiomas-21hcy8.md`](../corpus/web/www.frrq.utn.edu.ar-escuela-de-idiomas-21hcy8.md)
  - *Escuela de Idiomas* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/escuela-de-idiomas/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-escuela-tecnologica-dpy2ev.md`](../corpus/web/www.frrq.utn.edu.ar-escuela-tecnologica-dpy2ev.md)
  - *2025* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/escuela-tecnologica/>)
  - [x] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-agro-diplomatura-en-administrac-xjhbc8.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-agro-diplomatura-en-administrac-xjhbc8.md)
  - *AO – Agro – Diplomatura en Administración Rural* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-agro-diplomatura-en-administracion-rural/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diplomatura-en-grafologia-2dpys8.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diplomatura-en-grafologia-2dpys8.md)
  - *ao-diplomatura-en-grafología* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-diplomatura-en-grafologia/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diplomatura-en-operador-adminis-ltzxmv.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diplomatura-en-operador-adminis-ltzxmv.md)
  - *ao-diplomatura-en-operador-administrativo-avanzado-de-PyMEs* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-diplomatura-en-operador-administrativo-avanzado-de-pymes/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diplomatura-en-preceptoria-esco-2xhci8.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diplomatura-en-preceptoria-esco-2xhci8.md)
  - *ao-diplomatura-en-preceptoría-escolar* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-diplomatura-en-preceptoria-escolar/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-diplomatura-en-diseno-y--3jlcy8.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-diplomatura-en-diseno-y--3jlcy8.md)
  - *AO – Diseño – Diplomatura en Diseño y Decoración de Interiores* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-diseno-diplomatura-en-diseno-y-decoracion-de-interiores/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-diplomatura-en-administ-zxnzlw.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-diplomatura-en-administ-zxnzlw.md)
  - *AO – Temario – Diplomatura en Administración de Empresas Express* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-temario-diplomatura-en-administracion-de-empresas-express/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-diplomatura-en-asistenc-cmfslw.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-diplomatura-en-asistenc-cmfslw.md)
  - *AO – Temario – Diplomatura en Asistencia Contable, Impositiva y Laboral* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-temario-diplomatura-en-asistencia-contable-impositiva-y-laboral/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-diplomatura-en-auxiliar-xjhcy8.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-diplomatura-en-auxiliar-xjhcy8.md)
  - *AO – Temario – Diplomatura en Auxiliar de Bancos y Financieras* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-temario-diplomatura-en-auxiliar-de-bancos-y-financieras/>)
  - [ ] Queda
  - [x] Queda — vigente (año desactualizado en el sitio)
  - [ ] Excluir

---

# ⚪ Limpio (86)

<details>
<summary>Ver los 86 documentos</summary>

- [*La Facultad*](../corpus/web/sac.frrq.utn.edu.ar-utn-frrq-facultad.html-mh0bww.md) · 622 chars
- [*Internacionales*](../corpus/web/sac.frrq.utn.edu.ar-utn-frrq-internacionales.html-5odg1s.md) · 835 chars
- [*ASAMBLEA GENERAL ORDINARIA*](../corpus/web/www.frrq.utn.edu.ar-2026-asamblea-general-ordinaria-fundacion-frrq-zycnev.md) · 607 chars
- [*CURSO | AIRES MINISPLIT, PISO TECHO Y BAJA SILUETA: MANTENIMIENTO E INSTALACION*](../corpus/web/www.frrq.utn.edu.ar-2026-curso-aa-minisplit-techo-y2hvlw.md) · 1821 chars
- [*CURSO | FOTOGRAFÍA DIGITAL*](../corpus/web/www.frrq.utn.edu.ar-2026-curso-fotografia-digital-nivel-1-vsltev.md) · 1375 chars
- [*CURSO*](../corpus/web/www.frrq.utn.edu.ar-2026-curso-gestion-de-costos-de-obra-2jyys8.md) · 2625 chars
- [*CURSO*](../corpus/web/www.frrq.utn.edu.ar-2026-curso-prod-hidropo-b3bvlw.md) · 1629 chars
- [*CURSO: PROTECCIONES ELÉCTRICAS*](../corpus/web/www.frrq.utn.edu.ar-2026-curso-protect-elect-gvjdc8.md) · 1632 chars
- [*DIPLOMATURA*](../corpus/web/www.frrq.utn.edu.ar-2026-diplomatura-ia-en-accion-aw9ulw.md) · 1663 chars
- [*Actas / Resoluciones*](../corpus/web/www.frrq.utn.edu.ar-actas-y-resoluciones-actas-resoluciones-25lcy8.md) · 110634 chars
- [*Beca de Investigación y Servicios 2026*](../corpus/web/www.frrq.utn.edu.ar-beca-de-investigacion-y-servicios-2026-mdi2lw.md) · 666 chars
- [*Becas 2026*](../corpus/web/www.frrq.utn.edu.ar-becas-2026-iwmjyv.md) · 2367 chars
- [*SOLICITUD DE LIBRE DEUDA DE BIBLIOTECA*](../corpus/web/www.frrq.utn.edu.ar-biblioteca-libre-deuda-biblioteca-gvjys8.md) · 651 chars
- [*Biblioteca repositorio*](../corpus/web/www.frrq.utn.edu.ar-biblioteca-repositorio-9yaw8v.md) · 1259 chars
- [*Biblioteca*](../corpus/web/www.frrq.utn.edu.ar-biblioteca-rly2ev.md) · 5179 chars
- [*Bibliotea_Historia*](../corpus/web/www.frrq.utn.edu.ar-bibl_historia-9yawev.md) · 2551 chars
- [*Calendario Académico 2025/2026*](../corpus/web/www.frrq.utn.edu.ar-calendario-academico-2025-2026-jayni8.md) · 1708 chars
- [*Calendario Académico 2026/2027*](../corpus/web/www.frrq.utn.edu.ar-calendario-academico-2026-2027-jayny8.md) · 1725 chars
- [*calendario-de-reuniones-ordinarias-de-consejo-directivo-2026*](../corpus/web/www.frrq.utn.edu.ar-calendario-de-reuniones-ordinarias-de-consejo-directivo-2026-jayni8.md) · 2405 chars
- [*Calendario de Reuniones Ordinarias de Consejo Directivo*](../corpus/web/www.frrq.utn.edu.ar-calendario-de-reuniones-ordinarias-de-consejo-directivo-rpdm8v.md) · 6344 chars
- [*Carreras a Distancia*](../corpus/web/www.frrq.utn.edu.ar-carreras-carreras-a-distancia-y2lhlw.md) · 1668 chars
- [*Ciclo de Licenciatura en Higiene y Seguridad en el Trabajo*](../corpus/web/www.frrq.utn.edu.ar-carreras-clhst-ahn0lw.md) · 2672 chars
- [*2025*](../corpus/web/www.frrq.utn.edu.ar-carreras-cmfzlw.md) · 1162 chars
- [*Cursos demo*](../corpus/web/www.frrq.utn.edu.ar-carreras-cursos-demo-zw1vlw.md) · 6941 chars
- [*PLANTILLA DOCENTE IEM – NIVEL 1*](../corpus/web/www.frrq.utn.edu.ar-carreras-ie-plantilla-docente-iem-nivel-1-bc0xlw.md) · 2149 chars
- [*PLANTILLA DOCENTE IEM – NIVEL 2*](../corpus/web/www.frrq.utn.edu.ar-carreras-ie-plantilla-docente-iem-nivel-2-bc0ylw.md) · 2412 chars
- [*PLANTILLA DOCENTE IEM – NIVEL 3*](../corpus/web/www.frrq.utn.edu.ar-carreras-ie-plantilla-docente-iem-nivel-3-bc0zlw.md) · 2164 chars
- [*PLANTILLA DOCENTE IEM – NIVEL 4*](../corpus/web/www.frrq.utn.edu.ar-carreras-ie-plantilla-docente-iem-nivel-4-bc00lw.md) · 1941 chars
- [*PLANTILLA DOCENTE IEM – NIVEL 5*](../corpus/web/www.frrq.utn.edu.ar-carreras-ie-plantilla-docente-iem-nivel-5-bc01lw.md) · 2958 chars
- [*2025*](../corpus/web/www.frrq.utn.edu.ar-carreras-lar-2xhci8.md) · 1877 chars
- [*Posgrado Especialización y Maestría en Minería de Datos*](../corpus/web/www.frrq.utn.edu.ar-carreras-posgrado-especializacion-y-maestria-en-mineria-de-d-f0b3mv.md) · 23802 chars
- [*Tecnicatura Universitaria en Ciudades Inteligentes*](../corpus/web/www.frrq.utn.edu.ar-carreras-tuci-r1y2kv.md) · 2627 chars
- [*2025*](../corpus/web/www.frrq.utn.edu.ar-carreras-tuhst-ahn0lw.md) · 3049 chars
- [*2025*](../corpus/web/www.frrq.utn.edu.ar-carreras-tul-3r1bc8.md) · 1375 chars
- [*2025*](../corpus/web/www.frrq.utn.edu.ar-carreras-tum-3r1bs8.md) · 1555 chars
- [*2024*](../corpus/web/www.frrq.utn.edu.ar-carreras-tup-avda-dmrhlw.md) · 1916 chars
- [*Tecnicatura Universitaria en Procesos Industriales*](../corpus/web/www.frrq.utn.edu.ar-carreras-tupi-r1cgkv.md) · 1491 chars
- [*1° Congreso de Transición Energética del Norte Santafesino – Comité científico*](../corpus/web/www.frrq.utn.edu.ar-ctensf-comitecientifico-awnvlw.md) · 10398 chars
- [*1° Congreso de Transición Energética del Norte Santafesino – Disertantes*](../corpus/web/www.frrq.utn.edu.ar-ctensf-disertantes-nrlcy8.md) · 7326 chars
- [*1° Congreso de Transición Energética del Norte Santafesino – Inscripción*](../corpus/web/www.frrq.utn.edu.ar-ctensf-inscripcion-2lvbi8.md) · 1127 chars
- [*1° Congreso de Transición Energética del Norte Santafesino – Objetivos*](../corpus/web/www.frrq.utn.edu.ar-ctensf-objetivo-gl2by8.md) · 2195 chars
- [*1° Congreso de Transición Energética del Norte Santafesino – Como participar*](../corpus/web/www.frrq.utn.edu.ar-ctensf-participa-npcgev.md) · 6138 chars
- [*1° Congreso de Transición Energética del Norte Santafesino*](../corpus/web/www.frrq.utn.edu.ar-ctensf-w5zzi8.md) · 635 chars
- [*Cursos de idiomas*](../corpus/web/www.frrq.utn.edu.ar-cursos-de-idiomas-bwfzlw.md) · 625 chars
- [*Horarios Carreras Grado*](../corpus/web/www.frrq.utn.edu.ar-horarios-carreras-grado-ywrvlw.md) · 5330 chars
- [*Horarios Tecnicaturas*](../corpus/web/www.frrq.utn.edu.ar-horarios-tecnicaturas-xjhcy8.md) · 3402 chars
- [*Jornadas de Promoción*](../corpus/web/www.frrq.utn.edu.ar-id-jornadas-de-promocion-2lvbi8.md) · 6699 chars
- [*Institucional*](../corpus/web/www.frrq.utn.edu.ar-institucional-9uywwv.md) · 5592 chars
- [*Internos-correos*](../corpus/web/www.frrq.utn.edu.ar-internos-correos-jlb3mv.md) · 4033 chars
- [*jornada-de-programación – inscripción*](../corpus/web/www.frrq.utn.edu.ar-jornada-de-programacion-inscripcion-aw9ulw.md) · 679 chars
- [*jornada-de-programación – jornada*](../corpus/web/www.frrq.utn.edu.ar-jornada-de-programacion-jornada-5hzgev.md) · 822 chars
- [*Laboratorios*](../corpus/web/www.frrq.utn.edu.ar-laboratorios-2-cy0ylw.md) · 3679 chars
- [*Laboratorios*](../corpus/web/www.frrq.utn.edu.ar-laboratorios-mlvcy8.md) · 12090 chars
- [*Lista de Graduados*](../corpus/web/www.frrq.utn.edu.ar-lista-de-graduados-wrvcy8.md) · 5697 chars
- [*UTN RECONQUISTA*](../corpus/web/www.frrq.utn.edu.ar-lmfylw.md) · 3248 chars
- [*Nodocentes FRRq*](../corpus/web/www.frrq.utn.edu.ar-nodocentes-frrq-njycs8.md) · 1499 chars
- [*Noticias*](../corpus/web/www.frrq.utn.edu.ar-novedades-noticias-2lhcy8.md) · 2237 chars
- [*PLANIFICAR SANTA FE*](../corpus/web/www.frrq.utn.edu.ar-planificar-santafe-gfmzs8.md) · 2277 chars
- [*Retiro de licencias Microsoft A1 Plus para estudiantes*](../corpus/web/www.frrq.utn.edu.ar-retiro-de-licencias-microsoft-a1-plus-para-estudiantes-nrlcy8.md) · 1484 chars
- [*Secretarías*](../corpus/web/www.frrq.utn.edu.ar-secretarias-awfzlw.md) · 760 chars
- [*AO – Agro – Administración Rural Express*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-agro-administracion-rural-expre-zxnzlw.md) · 747 chars
- [*AO – Agro – Producción Agropecuaria Express*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-agro-produccion-agropecuaria-ex-zxnzlw.md) · 630 chars
- [*AO – Agro – Programa de Formación en Producción Agropecuaria*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-agro-programa-de-formacion-en-p-fyawev.md) · 722 chars
- [*AO – Escolaridad – Auxiliar de Bibliotecas Express*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-auxiliar-de-bibliotecas--jlc3mv.md) · 929 chars
- [*AO – Diseño – Diseñador CAD*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-disenador-cad-1jywqv.md) · 685 chars
- [*AO – Diseño – Diseñador Gráfico Publicitario*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-disenador-grafico-public-xjpby8.md) · 649 chars
- [*AO – Diseño – Fotografía Básica*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-fotografia-basica-awnhlw.md) · 637 chars
- [*AO – Escolaridad – Programa de Formación de Preceptores*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-escolaridad-programa-de-formaci-cmvzlw.md) · 1220 chars
- [*AO – Escolaridad – Diplomatura Secretariado Escolar*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-escolaridad-secretariado-escola-9syxiv.md) · 928 chars
- [*AO – InmobilTurist – Agente de viajes*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-inmobilturist-agente-de-viajes-amvzlw.md) · 690 chars
- [*AO – InmobilTurist – Asistente Hotelero y Turístico*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-inmobilturist-asistente-hoteler-rpy28v.md) · 664 chars
- [*AO – Oficios – Armador y Reparador de PC*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-oficios-armador-y-reparador-de--lxbjlw.md) · 648 chars
- [*AO – Oficios – Instalaciones Eléctricas en Hogares y Edificios*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-oficios-instalaciones-electrica-2lvcy8.md) · 734 chars
- [*AO – RRHH – Operador en Violencia Familiar*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-rrhh-operador-en-violencia-fami-xpyxiv.md) · 670 chars
- [*AO – Salud – Aux Adm de Farmacia*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-salud-aux-adm-de-farmacia-wnpys8.md) · 754 chars
- [*AO – Salud – Dip Sec Adm Médico*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-salud-dip-sec-adm-medico-awnvlw.md) · 685 chars
- [*AO – Seguridad – Dip Higiene y Seguridad*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-seguridad-dip-higiene-y-segurid-zgfklw.md) · 635 chars
- [*AO – Temario – Diplomatura en Secretariado Ejecutivo Express*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-adm-de-empresas-express-cy0ylw.md) · 603 chars
- [*AO – Temario – Liquidador/a Básico/a de Sueldos y Jornales*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-liquidador-a-basico-a-d-bgvzlw.md) · 729 chars
- [*AO – Ventas – Programa de Formación de Vendedores*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-ventas-programa-de-formacion-de-cmvzlw.md) · 625 chars
- [*inicio_extension*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-inicio_extension-2lvbi8.md) · 628 chars
- [*Vinculación Tecnológica*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-vinculacion-tecnologica-dpy2ev.md) · 1354 chars
- [*Concurso Docente*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec_academica-concurso-docente-w50zs8.md) · 1660 chars
- [*Office365*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec_academica-office365-mzy1lw.md) · 2645 chars
- [*Secretaría Administrativa*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec_administrativa-gl2ys8.md) · 3076 chars
- [*Solicitud Autodesk Educativo*](../corpus/web/www.frrq.utn.edu.ar-solicitud-autodesk-educativo-rpdm8v.md) · 1077 chars

</details>

---

# 🗄️ Ya excluidos (30)

Están en `corpus-excluded/`, fuera del índice. **Marcá «Queda» o «Queda — vigente» para devolverlos al corpus**; dejarlos en «Excluir» no cambia nada.

<details>
<summary>Ver los 30 excluidos</summary>

- [`www.frrq.utn.edu.ar-2026-curso-analisis-de-movimiento-y-cinematica-mecanica-en-s-3jrcy8.md`](../corpus-excluded/www.frrq.utn.edu.ar-2026-curso-analisis-de-movimiento-y-cinematica-mecanica-en-s-3jrcy8.md)
  - *CURSO* · ya excluido · [original](<https://www.frrq.utn.edu.ar/2026/curso-analisis-de-movimiento-y-cinematica-mecanica-en-solidworks/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-carreras-ea-avellaneda-tup-dhvwlw.md`](../corpus-excluded/www.frrq.utn.edu.ar-carreras-ea-avellaneda-tup-dhvwlw.md)
  - *EA Avellaneda TUP* · ya excluido · [original](<https://www.frrq.utn.edu.ar/carreras/ea-avellaneda-tup/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-category-extension-2lvbi8.md`](../corpus-excluded/www.frrq.utn.edu.ar-category-extension-2lvbi8.md)
  - *Extensión* · ya excluido · [original](<https://www.frrq.utn.edu.ar/category/extension/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-category-noticias-awfzlw.md`](../corpus-excluded/www.frrq.utn.edu.ar-category-noticias-awfzlw.md)
  - *Noticias* · ya excluido · [original](<https://www.frrq.utn.edu.ar/category/noticias/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-concurso-docente-2025-jayns8.md`](../corpus-excluded/www.frrq.utn.edu.ar-concurso-docente-2025-jayns8.md)
  - *concurso-docente-2025* · ya excluido · [original](<https://www.frrq.utn.edu.ar/concurso-docente-2025/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-cursos-extension-seminario-claves-para-la-rentabilidad-wrhzc8.md`](../corpus-excluded/www.frrq.utn.edu.ar-cursos-extension-seminario-claves-para-la-rentabilidad-wrhzc8.md)
  - *Seminario Claves para la Rentabilidad* · ya excluido · [original](<https://www.frrq.utn.edu.ar/cursos-extension/seminario-claves-para-la-rentabilidad/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-cursos-extension-seminario-de-literatura-infantil-50awwv.md`](../corpus-excluded/www.frrq.utn.edu.ar-cursos-extension-seminario-de-literatura-infantil-50awwv.md)
  - *Seminario de Literatura Infantil* · ya excluido · [original](<https://www.frrq.utn.edu.ar/cursos-extension/seminario-de-literatura-infantil/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-cursos-extension-sistema-info-geo2-dlbziv.md`](../corpus-excluded/www.frrq.utn.edu.ar-cursos-extension-sistema-info-geo2-dlbziv.md)
  - *Sistema-info-geo2* · ya excluido · [original](<https://www.frrq.utn.edu.ar/cursos-extension/sistema-info-geo2/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-elecciones-utn-2022-iwmjiv.md`](../corpus-excluded/www.frrq.utn.edu.ar-elecciones-utn-2022-iwmjiv.md)
  - *Elecciones UTN 2022* · ya excluido · [original](<https://www.frrq.utn.edu.ar/elecciones-utn-2022/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-elecciones-utn-2024-iwmjqv.md`](../corpus-excluded/www.frrq.utn.edu.ar-elecciones-utn-2024-iwmjqv.md)
  - *Elecciones UTN 2024* · ya excluido · [original](<https://www.frrq.utn.edu.ar/elecciones-utn-2024/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-info_jit2022-jaymi8.md`](../corpus-excluded/www.frrq.utn.edu.ar-info_jit2022-jaymi8.md)
  - *info_jit2022* · ya excluido · [original](<https://www.frrq.utn.edu.ar/info_jit2022/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-innovatec-2025-mdi1lw.md`](../corpus-excluded/www.frrq.utn.edu.ar-innovatec-2025-mdi1lw.md)
  - *Innovatec 2025* · ya excluido · [original](<https://www.frrq.utn.edu.ar/innovatec-2025/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-inscripcion-a-carreras-clhst-2025-jayns8.md`](../corpus-excluded/www.frrq.utn.edu.ar-inscripcion-a-carreras-clhst-2025-jayns8.md)
  - *Inscripción a Carreras CLHST 2025* · ya excluido · [original](<https://www.frrq.utn.edu.ar/inscripcion-a-carreras-clhst-2025/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-inscripcion-tuci-distancia-2023-iwmjmv.md`](../corpus-excluded/www.frrq.utn.edu.ar-inscripcion-tuci-distancia-2023-iwmjmv.md)
  - *inscripción-tuci-distancia-2023* · ya excluido · [original](<https://www.frrq.utn.edu.ar/inscripcion-tuci-distancia-2023/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-jit-2022-jit-2022-formato-poster-dgvylw.md`](../corpus-excluded/www.frrq.utn.edu.ar-jit-2022-jit-2022-formato-poster-dgvylw.md)
  - *JIT 2022 – FORMATO POSTER* · ya excluido · [original](<https://www.frrq.utn.edu.ar/jit-2022/jit-2022-formato-poster/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-jit-2022-jit-2022-formato-trabajos-fqb3mv.md`](../corpus-excluded/www.frrq.utn.edu.ar-jit-2022-jit-2022-formato-trabajos-fqb3mv.md)
  - *JIT 2022 – FORMATO TRABAJOS* · ya excluido · [original](<https://www.frrq.utn.edu.ar/jit-2022/jit-2022-formato-trabajos/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-jit-2022-jit-2022-instructivo-easy-chair-hhaxiv.md`](../corpus-excluded/www.frrq.utn.edu.ar-jit-2022-jit-2022-instructivo-easy-chair-hhaxiv.md)
  - *JIT 2022 – INSTRUCTIVO EASY CHAIR* · ya excluido · [original](<https://www.frrq.utn.edu.ar/jit-2022/jit-2022-instructivo-easy-chair/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-jit-2022-mdiylw.md`](../corpus-excluded/www.frrq.utn.edu.ar-jit-2022-mdiylw.md)
  - *JIT 2022* · ya excluido · [original](<https://www.frrq.utn.edu.ar/jit-2022/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-jit2022-exposicion-2lvbi8.md`](../corpus-excluded/www.frrq.utn.edu.ar-jit2022-exposicion-2lvbi8.md)
  - *jit2022-exposición* · ya excluido · [original](<https://www.frrq.utn.edu.ar/jit2022-exposicion/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-jit2022-premiacion-2lvbi8.md`](../corpus-excluded/www.frrq.utn.edu.ar-jit2022-premiacion-2lvbi8.md)
  - *jit2022-premiacion* · ya excluido · [original](<https://www.frrq.utn.edu.ar/jit2022-premiacion/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-jit2022-programa-jhbwev.md`](../corpus-excluded/www.frrq.utn.edu.ar-jit2022-programa-jhbwev.md)
  - *jit2022-Programa* · ya excluido · [original](<https://www.frrq.utn.edu.ar/jit2022-programa/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-jit2022-ubicacion-aw9ulw.md`](../corpus-excluded/www.frrq.utn.edu.ar-jit2022-ubicacion-aw9ulw.md)
  - *jit2022-Ubicación* · ya excluido · [original](<https://www.frrq.utn.edu.ar/jit2022-ubicacion/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-jornada-de-programacion-aw9ulw.md`](../corpus-excluded/www.frrq.utn.edu.ar-jornada-de-programacion-aw9ulw.md)
  - *Jornada de programación* · ya excluido · [original](<https://www.frrq.utn.edu.ar/jornada-de-programacion/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-llamado-elecciones-nacionales-cs-2021-iwmjev.md`](../corpus-excluded/www.frrq.utn.edu.ar-llamado-elecciones-nacionales-cs-2021-iwmjev.md)
  - *Llamado a elecciones nacionales para la renovación de representantes en el Consejo Superior* · ya excluido · [original](<https://www.frrq.utn.edu.ar/llamado-elecciones-nacionales-cs-2021/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-novedades-wrlcy8.md`](../corpus-excluded/www.frrq.utn.edu.ar-novedades-wrlcy8.md)
  - *Novedades* · ya excluido · [original](<https://www.frrq.utn.edu.ar/novedades/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-oferta-laboral-cmfslw.md`](../corpus-excluded/www.frrq.utn.edu.ar-oferta-laboral-cmfslw.md)
  - *Oferta Laboral* · ya excluido · [original](<https://www.frrq.utn.edu.ar/oferta-laboral/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-secretarias-sec_academica-concurso-docente-2023-mdizlw.md`](../corpus-excluded/www.frrq.utn.edu.ar-secretarias-sec_academica-concurso-docente-2023-mdizlw.md)
  - *concurso-docente-2023* · ya excluido · [original](<https://www.frrq.utn.edu.ar/secretarias/sec_academica/concurso-docente-2023/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-secretarias-sec_academica-concurso-docente-2023-mesnoviembre-wjyzs8.md`](../corpus-excluded/www.frrq.utn.edu.ar-secretarias-sec_academica-concurso-docente-2023-mesnoviembre-wjyzs8.md)
  - *concurso-docente-2023-mesnoviembre* · ya excluido · [original](<https://www.frrq.utn.edu.ar/secretarias/sec_academica/concurso-docente-2023-mesnoviembre/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-simposio-siar-2023-jaymy8.md`](../corpus-excluded/www.frrq.utn.edu.ar-simposio-siar-2023-jaymy8.md)
  - *Simposio SIAR 2023* · ya excluido · [original](<https://www.frrq.utn.edu.ar/simposio-siar-2023/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

- [`www.frrq.utn.edu.ar-vivi-tu-eleccion-2021-feria-de-las-carreras-vyyxmv.md`](../corpus-excluded/www.frrq.utn.edu.ar-vivi-tu-eleccion-2021-feria-de-las-carreras-vyyxmv.md)
  - *Vivi tu elección 2021 – Feria de las Carreras* · ya excluido · [original](<https://www.frrq.utn.edu.ar/vivi-tu-eleccion-2021-feria-de-las-carreras/>)
  - [ ] Queda
  - [ ] Queda — vigente (año desactualizado en el sitio)
  - [x] Excluir

</details>

---

## Duplicados detectados (sitio web)

- Ninguno exacto.

- **Casi iguales (0.93):** `www.frrq.utn.edu.ar-carreras-ea-calchaqui-tumi-dw1plw.md` ≡ `www.frrq.utn.edu.ar-carreras-ea-san-javier-tumi-hvtas8.md`

---

## Qué pasa cuando termines de marcar

```bash
npm run decisions             # dry-run
npm run decisions -- --apply  # escribe corpus/decisions.yaml y mueve los excluidos
```

1. Lee este reporte y escribe `corpus/decisions.yaml` con estado, motivo y fecha.
2. Los marcados como **Excluir** se mueven a `corpus-excluded/`, reversible sin git.
3. Regenera `_manifest.json` y actualiza los links de este reporte.
