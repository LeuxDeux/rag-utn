# Reporte de curación del corpus

**Generado:** 2026-11-14 · **Documentos analizados:** 210
**Fuente:** `corpus/web/` (www.frrq.utn.edu.ar + sac.frrq.utn.edu.ar)

> Este archivo **no** se ingiere: vive en `docs/`, fuera de `corpus/`.
> Marcá con `[x]` lo que aprobás y con eso armamos `corpus/excluded.yaml`.

## Resumen

| Veredicto | Documentos | Significado |
|---|---|---|
| 🔴 Excluir | **16** | Evento con fecha vencida. No aporta y puede generar respuestas en presente sobre algo que ya pasó |
| 🟡 Revisar | **83** | Requiere decisión humana: normativa vieja, contenido fino, listados o duplicados |
| 🔵 Opcional | **25** | Oferta de extensión / idiomas. Sirve si el asistente responde sobre cursos, molesta si solo responde trámites |
| ⚪ Limpio | **86** | Contenido sustantivo y vigente |

**Criterio central:** no se excluye por año, se excluye por **tipo**. Un reglamento de 2019 sigue vigente hasta que lo deroguen; una jornada de 2022 no.

---

## ⚠️ Falsos positivos detectados (leer antes de aprobar)

El clasificador automático se equivoca en estos casos. Ya están corregidos o anotados:

| Documento | Por qué parece candidato | Qué es en realidad |
|---|---|---|
| `cursos-extension-ms-project-2016` | "2016" en el título | La **versión del software**, no la fecha del curso. Ya no se clasifica como evento pasado; aparece en 🟡 por ser una página con muchos ítems de lista |
| `carreras-ea-calchaqui-tumi` ≡ `carreras-ea-san-javier-tumi` | 93% de texto idéntico | Es el mismo programa (TUMI) en **dos localidades distintas**. No son duplicados: conservar ambos |
| `category-cursos`, `category-extension`, `category-noticias`, `novedades` | 94–97% idénticos entre sí | Son **listados de WordPress**: solo cambia el título. Sí son redundantes entre sí |

**Regla:** el 80% de las veces el clasificador tiene razón. El 20% restante es exactamente donde una decisión humana evita romper el corpus.

---

## 🔴 A excluir — eventos con fecha vencida (16)

| Archivo | Título | Señal | chars |
|---|---|---|---|
| `www.frrq.utn.edu.ar-secretarias-sec_academica-concurso-docente-2023-mdizlw.md` | concurso-docente-2023 | evento de 2023 | 12767 |
| `www.frrq.utn.edu.ar-secretarias-sec_academica-concurso-docente-2023-mesnoviembre-wjyzs8.md` | concurso-docente-2023-mesnoviembre | evento de 2023 | 3680 |
| `www.frrq.utn.edu.ar-concurso-docente-2025-jayns8.md` | concurso-docente-2025 | evento de 2025 | 19456 |
| `www.frrq.utn.edu.ar-elecciones-utn-2022-iwmjiv.md` | Elecciones UTN 2022 | evento de 2022 | 1204 |
| `www.frrq.utn.edu.ar-elecciones-utn-2024-iwmjqv.md` | Elecciones UTN 2024 | evento de 2024 | 869 |
| `www.frrq.utn.edu.ar-innovatec-2025-mdi1lw.md` | Innovatec 2025 | evento de 2025 | 551 |
| `www.frrq.utn.edu.ar-inscripcion-a-carreras-clhst-2025-jayns8.md` | Inscripción a Carreras CLHST 2025 | evento de 2025 | 326 |
| `www.frrq.utn.edu.ar-inscripcion-tuci-distancia-2023-iwmjmv.md` | inscripción-tuci-distancia-2023 | evento de 2023 | 531 |
| `www.frrq.utn.edu.ar-inscripciones-a-carreras-ciclo-lectivo-2023-iwmjmv.md` | Inscripciones a Carreras – Ciclo Lectivo 2023 | evento de 2023 | 3297 |
| `www.frrq.utn.edu.ar-jit-2022-mdiylw.md` | JIT 2022 | evento de 2022 | 6073 |
| `www.frrq.utn.edu.ar-jit-2022-jit-2022-formato-poster-dgvylw.md` | JIT 2022 – FORMATO POSTER | evento de 2022 | 1794 |
| `www.frrq.utn.edu.ar-jit-2022-jit-2022-formato-trabajos-fqb3mv.md` | JIT 2022 – FORMATO TRABAJOS | evento de 2022 | 9006 |
| `www.frrq.utn.edu.ar-jit-2022-jit-2022-instructivo-easy-chair-hhaxiv.md` | JIT 2022 – INSTRUCTIVO EASY CHAIR | evento de 2022 | 1817 |
| `www.frrq.utn.edu.ar-llamado-elecciones-nacionales-cs-2021-iwmjev.md` | Llamado a elecciones nacionales para la renovación de represen | evento de 2021 | 6933 |
| `www.frrq.utn.edu.ar-simposio-siar-2023-jaymy8.md` | Simposio SIAR 2023 | evento de 2023 | 2469 |
| `www.frrq.utn.edu.ar-vivi-tu-eleccion-2021-feria-de-las-carreras-vyyxmv.md` | Vivi tu elección 2021 – Feria de las Carreras | evento de 2021 | 399 |

- [ ] Aprobar los 16 documentos de esta sección

**Recomendación:** excluir todos. Son eventos cerrados, elecciones pasadas y ciclos de inscripción vencidos. Ninguno responde una pregunta actual, y varios inducen a error (el modelo puede decir "la inscripción es hasta marzo de 2025" en presente).

---

## 🟡 A revisar — decisión humana (83)

Estos no se excluyen en bloque: cada uno necesita un criterio.

| Archivo | Título | Señal | chars |
|---|---|---|---|
| `www.frrq.utn.edu.ar-carreras-ie-l2lllw.md` | 2025 | 23 ítems de lista | 3433 |
| `www.frrq.utn.edu.ar-carreras-ii-l2lplw.md` | 2025 | 22 ítems de lista | 2207 |
| `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-disenador-grafico-expres-jlc3mv.md` | AO – Diseño – Diseñador Gráfico Express | 540 chars | 540 |
| `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-disenador-multimedial-glhbc8.md` | AO – Diseño – Diseñador Multimedial | 420 chars | 420 |
| `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-disenador-web-13zwiv.md` | AO – Diseño – Diseñador Web | 491 chars | 491 |
| `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-inmobilturist-asistente-de-inmo-cmlhlw.md` | AO – InmobilTurist – Asistente de Inmobiliaria | 558 chars | 558 |
| `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-rrhh-asistente-de-rrhh-express-zxnzlw.md` | AO – RRHH – Asistente de RRHH Express | 545 chars | 545 |
| `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-rrhh-liderazgo-y-coaching-mod-o-2ljby8.md` | AO – RRHH – Liderazgo y Coaching Mod Ontológico | 529 chars | 529 |
| `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-seguridad-dip-accidentologia-vi-awfslw.md` | AO – Seguridad – Dip Accidentología Vial | 583 chars | 583 |
| `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-seguridad-riesgo-electrico-jpy28v.md` | AO – Seguridad – Riesgo Eléctrico | 590 chars | 590 |
| `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-auxiliar-de-logistica-rpy2ev.md` | AO – Temario – Auxiliar de Logística | 497 chars | 497 |
| `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-diplomatura-en-asistenc-rpy28v.md` | AO – Temario – Diplomatura en Asistencia de Estudio Jurídico | 544 chars | 544 |
| `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-secretariado-informatico-awnvlw.md` | ao-secretariado-informático | 508 chars | 508 |
| `www.frrq.utn.edu.ar-pagina-de-inicio-autoridades-fkzxmv.md` | Autoridades | 23 ítems de lista | 935 |
| `www.frrq.utn.edu.ar-beca-ayuda-social-economica-2026-mdi2lw.md` | Beca Ayuda Social Económica 2026 | 418 chars | 418 |
| `www.frrq.utn.edu.ar-bibl-colecciones-9uzxmv.md` | Biblioteca Colecciones | 339 chars | 339 |
| `www.frrq.utn.edu.ar-biblioteca-info-w5mby8.md` | Biblioteca info | 321 chars | 321 |
| `www.frrq.utn.edu.ar-bibl-mision-vision-2lvbi8.md` | Biblioteca Misión y Visión | 560 chars | 560 |
| `www.frrq.utn.edu.ar-bibl-servicios-aw9zlw.md` | Biblioteca Servicios | 505 chars | 505 |
| `www.frrq.utn.edu.ar-calendario-de-mesas-de-examenes-vuzxmv.md` | Calendario de Mesas de Exámenes | 266 chars | 266 |
| `sac.frrq.utn.edu.ar-utn-frrq-carreras.html-mh0bww.md` | Carreras | 579 chars | 579 |
| `www.frrq.utn.edu.ar-secretarias-secretaria-cyt-cyt-adscripciones-bmvzlw.md` | Ciencia y Tecnología – Adscripciones a proyectos I+D+i | 40 ítems de lista | 7036 |
| `www.frrq.utn.edu.ar-secretarias-secretaria-cyt-cyt-carrera-investigador-wrvci8.md` | Ciencia y Tecnología – Carrera del Investigador | 41 ítems de lista | 7920 |
| `www.frrq.utn.edu.ar-secretarias-secretaria-cyt-cyt-centros-grupos-xbvcy8.md` | Ciencia y Tecnología – Centros y Grupos | 56 ítems de lista | 8226 |
| `www.frrq.utn.edu.ar-secretarias-secretaria-cyt-cyt-proyectos-idi-awrplw.md` | Ciencia y Tecnología – Proyectos I+D+i | 53 ítems de lista | 8994 |
| `sac.frrq.utn.edu.ar-utn-frrq-comunidad.html-5odg1s.md` | Comunidad | 39 ítems de lista | 8048 |
| `www.frrq.utn.edu.ar-conoce-nuestra-facultad-dgfklw.md` | Conocé nuestra Facultad | 311 chars | 311 |
| `www.frrq.utn.edu.ar-pagina-de-inicio-consejo-directivo-rpdm8v.md` | Consejo Directivo | 20 ítems de lista | 762 |
| `sac.frrq.utn.edu.ar-utn-frrq-contacto.html-mh0bww.md` | Contacto | 43 ítems de lista | 3592 |
| `www.frrq.utn.edu.ar-contactos-utn-reconquista-lzdgev.md` | Contactos UTN Reconquista | 17 ítems de lista | 691 |
| `www.frrq.utn.edu.ar-2026-curso-analisis-de-movimiento-y-cinematica-mecanica-en-s-3jrcy8.md` | CURSO | 17 ítems de lista | 2221 |
| `www.frrq.utn.edu.ar-category-cursos-nnvcy8.md` | Cursos | contenido casi idéntico a otro documento | 759 |
| `www.frrq.utn.edu.ar-departamentos-dpto-basicas-y2fzlw.md` | Departamento Básicas | 579 chars | 579 |
| `www.frrq.utn.edu.ar-departamentos-dpto-electromecanica-5py2ev.md` | Departamento Electromecánica | 570 chars | 570 |
| `www.frrq.utn.edu.ar-departamentos-dpto-lar-1syxiv.md` | Departamento LAR | 31 ítems de lista | 1673 |
| `www.frrq.utn.edu.ar-departamentos-50b3mv.md` | Departamentos | 442 chars | 442 |
| `www.frrq.utn.edu.ar-secretarias-sec-extension-diplomaturas-y-cursos-online-gluzs8.md` | DIPLOMATURAS Y CURSOS ONLINE | 40 ítems de lista | 1771 |
| `www.frrq.utn.edu.ar-docdocentes-frrq-zycnev.md` | DocDocentes FRRq | 525 chars | 525 |
| `www.frrq.utn.edu.ar-carreras-ea-avellaneda-tup-dhvwlw.md` | EA Avellaneda TUP | 20 ítems de lista | 2740 |
| `www.frrq.utn.edu.ar-carreras-ea-calchaqui-tumi-dw1plw.md` | EA Calchaquí TUMI | 22 ítems de lista | 2927 |
| `www.frrq.utn.edu.ar-carreras-ea-san-javier-tuhst-voc3qv.md` | EA San Javier TUHST | 25 ítems de lista | 3294 |
| `www.frrq.utn.edu.ar-carreras-ea-san-javier-tumi-hvtas8.md` | EA San Javier TUMI | 22 ítems de lista | 2931 |
| `sac.frrq.utn.edu.ar-utn-frrq.html-mh0bww.md` | Educación que impulsa el desarrollo | 24 ítems de lista | 4529 |
| `www.frrq.utn.edu.ar-secretarias-sec-extension-educacion-virtual-r1ywwv.md` | Educación Virtual | 492 chars | 492 |
| `www.frrq.utn.edu.ar-category-extension-2lvbi8.md` | Extensión | contenido casi idéntico a otro documento | 762 |
| `sac.frrq.utn.edu.ar-utn-frrq-extension.html-5odg1s.md` | Extensión Universitaria | 263 chars | 263 |
| `www.frrq.utn.edu.ar-carreras-clhst-formulario-clhst-xoc3qv.md` | Formulario CLHST | 286 chars | 286 |
| `www.frrq.utn.edu.ar-nodocentes-formularios-de-licencias-y-franquicias-npyxmv.md` | Formularios de Licencias y Franquicias | 254 chars | 254 |
| `www.frrq.utn.edu.ar-info_jit2022-jaymi8.md` | info_jit2022 | 280 chars | 280 |
| `www.frrq.utn.edu.ar-pagina-de-inicio-info-acad-y2fklw.md` | Información Académica | 362 chars | 362 |
| `www.frrq.utn.edu.ar-ingresantes-dgvzlw.md` | Ingresantes | 40 ítems de lista | 8233 |
| `www.frrq.utn.edu.ar-inscripcion-a-carreras-2027-jayny8.md` | Inscripción a Carreras 2027 | 16 ítems de lista | 2598 |
| `www.frrq.utn.edu.ar-2026-introduccion-al-diseno-3d-con-solidworks-3jrcy8.md` | INTRODUCCIÓN AL DISEÑO 3D CON SOLIDWORKS | 19 ítems de lista | 2541 |
| `www.frrq.utn.edu.ar-id-l2lklw.md` | Investigación y Desarrollo | 584 chars | 584 |
| `www.frrq.utn.edu.ar-jit2022-exposicion-2lvbi8.md` | jit2022-exposición | 232 chars | 232 |
| `www.frrq.utn.edu.ar-jit2022-premiacion-2lvbi8.md` | jit2022-premiacion | 22 ítems de lista | 4741 |
| `www.frrq.utn.edu.ar-jit2022-programa-jhbwev.md` | jit2022-Programa | 223 chars | 223 |
| `www.frrq.utn.edu.ar-jit2022-ubicacion-aw9ulw.md` | jit2022-Ubicación | 225 chars | 225 |
| `www.frrq.utn.edu.ar-jornada-de-programacion-aw9ulw.md` | Jornada de programación | 490 chars | 490 |
| `sac.frrq.utn.edu.ar-utn-frrq-laboratorios.html-5odg1s.md` | Laboratorios | 383 chars | 383 |
| `www.frrq.utn.edu.ar-carreras-carreras-a-distancia-ll-online-gluzs8.md` | Licenciatura en Logística – Cursado 100% a distancia | 32 ítems de lista | 6459 |
| `sac.frrq.utn.edu.ar-utn-frrq-extracurricular.html-5odg1s.md` | Más allá del aula | 236 chars | 236 |
| `www.frrq.utn.edu.ar-cursos-extension-ms-project-2016-mde2lw.md` | MS PROJECT 2016 | 43 ítems de lista | 1823 |
| `www.frrq.utn.edu.ar-category-noticias-awfzlw.md` | Noticias | contenido casi idéntico a otro documento | 761 |
| `www.frrq.utn.edu.ar-novedades-wrlcy8.md` | Novedades | contenido casi idéntico a otro documento | 762 |
| `www.frrq.utn.edu.ar-cursos-extension-oratoria-9yawev.md` | Oratoria | 16 ítems de lista | 2239 |
| `www.frrq.utn.edu.ar-cursos-extension-orientacion-vocacional-25hbc8.md` | Orientacion-Vocacional | 17 ítems de lista | 2600 |
| `www.frrq.utn.edu.ar-carreras-pdgea-z2vhlw.md` | Posgrado Dirección y Gestión de Empresas Agroindustriales | 18 ítems de lista | 2501 |
| `www.frrq.utn.edu.ar-carreras-posgrado-maestria-en-redes-de-datos-dg9zlw.md` | Posgrado Maestría en Redes de Datos | 19 ítems de lista | 5993 |
| `www.frrq.utn.edu.ar-secretarias-sec_academica-1py2ev.md` | Secretaría Académica | 20 ítems de lista | 4273 |
| `www.frrq.utn.edu.ar-secretarias-secretaria-cyt-y3l0lw.md` | Secretaría Ciencia y Tecnología | 41 ítems de lista | 7934 |
| `www.frrq.utn.edu.ar-secretarias-secretaria-cyt2-3l0mi8.md` | Secretaría Ciencia y Tecnología (demo) | 224 ítems de lista | 33434 |
| `www.frrq.utn.edu.ar-secretarias-sec-extension-npb24v.md` | Secretaría Extensión Universitaria | 46 ítems de lista | 11306 |
| `www.frrq.utn.edu.ar-secretarias-sec-obra-ynjhlw.md` | Secretaría Obra, Mantenimiento y Servicios Generales | 335 chars | 335 |
| `sac.frrq.utn.edu.ar-utn-frrq-sistemas.html-mh0bww.md` | Sistemas de Gestión | 458 chars | 458 |
| `sac.frrq.utn.edu.ar-utn-frrq-solicitar-servicio.html-5odg1s.md` | Solicitar un servicio | 357 chars | 357 |
| `www.frrq.utn.edu.ar-solicitud-cuenta-zoom-m9vbs8.md` | Solicitud cuenta Zoom | 313 chars | 313 |
| `www.frrq.utn.edu.ar-solicitud-de-compra-de-material-bibliografico-mljby8.md` | SOLICITUD DE COMPRA DE MATERIAL BIBLIOGRÁFICO | 362 chars | 362 |
| `www.frrq.utn.edu.ar-secretarias-sec_academica-office365-solicitud-de-licencia-of-50zxmv.md` | Solicitud de licencia Office 365 para estudiantes | 347 chars | 347 |
| `www.frrq.utn.edu.ar-carreras-tup-3r1cc8.md` | Tecnicatura Universitaria en Programación | 16 ítems de lista | 1696 |
| `www.frrq.utn.edu.ar-carreras-carreras-a-distancia-tuti-online-aw5llw.md` | Tecnicatura Universitaria en Tecnologías de la Información – C | 19 ítems de lista | 4067 |
| `www.frrq.utn.edu.ar-unidad-atencion-casos-xnvcy8.md` | Unidad de Atención de Casos | 26 ítems de lista | 8166 |
| `sac.frrq.utn.edu.ar-utn-frrq-vinculacion.html-mh0bww.md` | Vinculación tecnológica | 559 chars | 559 |

**Recomendación por señal:**
- **Listados** (`category-*`, `novedades`): excluir. Son índices de navegación, no contenido; además son casi idénticos entre sí y compiten con las páginas reales en el retrieval.
- **Poco contenido**: revisar de a uno. Una página de contacto con teléfono y horario **sirve**; una plantilla vacía **no**.
- **Duplicados**: conservar uno y excluir el resto.
- **Normativa con año viejo**: **no excluir** sin verificar. Un reglamento de 2019 puede seguir vigente; consultá con secretaría académica antes.

Decisiones:

- [ ] Excluir los listados de categoría (`category-*`, `novedades`)
- [ ] Excluir los listados de eventos ya cerrados
- [ ] Revisar uno por uno los documentos con poco contenido
- [ ] Resolver los duplicados (conservar uno)

---

## 🔵 Opcional — oferta de extensión e idiomas (25)

Depende de si el asistente responde "¿qué cursos hay?" o solo "¿cuándo me inscribo?".

| Archivo | Título | Señal | chars |
|---|---|---|---|
| `www.frrq.utn.edu.ar-escuela-tecnologica-dpy2ev.md` | 2025 | oferta de extensión / idiomas | 1255 |
| `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-agro-diplomatura-en-administrac-xjhbc8.md` | AO – Agro – Diplomatura en Administración Rural | oferta de extensión / idiomas | 768 |
| `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-diplomatura-en-diseno-y--3jlcy8.md` | AO – Diseño – Diplomatura en Diseño y Decoración de Interiores | oferta de extensión / idiomas | 617 |
| `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-diplomatura-en-administ-zxnzlw.md` | AO – Temario – Diplomatura en Administración de Empresas Expre | oferta de extensión / idiomas | 657 |
| `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-diplomatura-en-asistenc-cmfslw.md` | AO – Temario – Diplomatura en Asistencia Contable, Impositiva  | oferta de extensión / idiomas | 731 |
| `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-diplomatura-en-auxiliar-xjhcy8.md` | AO – Temario – Diplomatura en Auxiliar de Bancos y Financieras | oferta de extensión / idiomas | 777 |
| `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diplomatura-en-grafologia-2dpys8.md` | ao-diplomatura-en-grafología | oferta de extensión / idiomas | 2028 |
| `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diplomatura-en-operador-adminis-ltzxmv.md` | ao-diplomatura-en-operador-administrativo-avanzado-de-PyMEs | oferta de extensión / idiomas | 699 |
| `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diplomatura-en-preceptoria-esco-2xhci8.md` | ao-diplomatura-en-preceptoría-escolar | oferta de extensión / idiomas | 1368 |
| `www.frrq.utn.edu.ar-2026-curso-diplomatura-en-habilidades-gerenciales-management-glvbi8.md` | CURSO \| DIPLOMATURA EN HABILIDADES GERENCIALES | oferta de extensión / idiomas | 1820 |
| `www.frrq.utn.edu.ar-cursos-extension-curso-virtual-leer-para-aprender-5kzxiv.md` | Curso virtual – Leer para aprender | oferta de extensión / idiomas | 2178 |
| `www.frrq.utn.edu.ar-cursos-extension-npb24v.md` | Cursos de Extensión | oferta de extensión / idiomas | 10246 |
| `www.frrq.utn.edu.ar-cursos-escuela-de-idiomas-9tyxmv.md` | Cursos Escuela de Idiomas | oferta de extensión / idiomas | 6531 |
| `www.frrq.utn.edu.ar-cursos-extension-diplomatura-en-literatura-brasilena-xlbmev.md` | Diplomatura en Literatura Brasileña | oferta de extensión / idiomas | 5602 |
| `www.frrq.utn.edu.ar-cursos-extension-diplomatura-en-literatura-lusofona-m9uys8.md` | Diplomatura en Literatura Lusófona | oferta de extensión / idiomas | 3670 |
| `www.frrq.utn.edu.ar-ei-curso-online-de-aleman-nivel-a-1-1-0xltev.md` | EI – CURSO ONLINE DE ALEMÁN NIVEL A 1.1 | oferta de extensión / idiomas | 734 |
| `www.frrq.utn.edu.ar-ei-curso-online-de-portugues-nivel-basico-awnvlw.md` | EI – CURSO ONLINE DE PORTUGUÉS – NIVEL BÁSICO | oferta de extensión / idiomas | 600 |
| `www.frrq.utn.edu.ar-ei-curso-virtual-de-italiano-nivel-a1-wtytev.md` | EI – Curso Virtual de Italiano – Nivel A1 | oferta de extensión / idiomas | 600 |
| `www.frrq.utn.edu.ar-escuela-de-idiomas-21hcy8.md` | Escuela de Idiomas | oferta de extensión / idiomas | 1423 |
| `www.frrq.utn.edu.ar-cursos-extension-fotografia-wzpys8.md` | Fotografia | oferta de extensión / idiomas | 1780 |
| `www.frrq.utn.edu.ar-oferta-laboral-cmfslw.md` | Oferta Laboral | oferta de extensión / idiomas | 3154 |
| `www.frrq.utn.edu.ar-cursos-extension-seminario-claves-para-la-rentabilidad-wrhzc8.md` | Seminario Claves para la Rentabilidad | oferta de extensión / idiomas | 1732 |
| `www.frrq.utn.edu.ar-cursos-extension-seminario-de-literatura-infantil-50awwv.md` | Seminario de Literatura Infantil | oferta de extensión / idiomas | 2328 |
| `www.frrq.utn.edu.ar-cursos-extension-sistema-info-geo-wdlby8.md` | Sistema-info-geo | oferta de extensión / idiomas | 3267 |
| `www.frrq.utn.edu.ar-cursos-extension-sistema-info-geo2-dlbziv.md` | Sistema-info-geo2 | oferta de extensión / idiomas | 1848 |

- [ ] Excluir oferta de extensión
- [ ] Conservar oferta de extensión

---

## ⚪ Limpio (86)

Contenido sustantivo y vigente. Nada que hacer.

- 1° Congreso de Transición Energética del Norte Santafesino
- 1° Congreso de Transición Energética del Norte Santafesino – Comité científico
- 1° Congreso de Transición Energética del Norte Santafesino – Como participar
- 1° Congreso de Transición Energética del Norte Santafesino – Disertantes
- 1° Congreso de Transición Energética del Norte Santafesino – Inscripción
- 1° Congreso de Transición Energética del Norte Santafesino – Objetivos
- 2024
- 2025
- 2025
- 2025
- 2025
- 2025
- Actas / Resoluciones
- AO – Agro – Administración Rural Express
- AO – Agro – Producción Agropecuaria Express
- AO – Agro – Programa de Formación en Producción Agropecuaria
- AO – Diseño – Diseñador CAD
- AO – Diseño – Diseñador Gráfico Publicitario
- AO – Diseño – Fotografía Básica
- AO – Escolaridad – Auxiliar de Bibliotecas Express
- AO – Escolaridad – Diplomatura Secretariado Escolar
- AO – Escolaridad – Programa de Formación de Preceptores
- AO – InmobilTurist – Agente de viajes
- AO – InmobilTurist – Asistente Hotelero y Turístico
- AO – Oficios – Armador y Reparador de PC
- AO – Oficios – Instalaciones Eléctricas en Hogares y Edificios
- AO – RRHH – Operador en Violencia Familiar
- AO – Salud – Aux Adm de Farmacia
- AO – Salud – Dip Sec Adm Médico
- AO – Seguridad – Dip Higiene y Seguridad
- AO – Temario – Diplomatura en Secretariado Ejecutivo Express
- AO – Temario – Liquidador/a Básico/a de Sueldos y Jornales
- AO – Ventas – Programa de Formación de Vendedores
- ASAMBLEA GENERAL ORDINARIA
- Beca de Investigación y Servicios 2026
- Becas 2026
- Bibliotea_Historia
- Biblioteca
- Biblioteca repositorio
- Calendario Académico 2025/2026
- Calendario Académico 2026/2027
- Calendario de Reuniones Ordinarias de Consejo Directivo
- calendario-de-reuniones-ordinarias-de-consejo-directivo-2026
- Carreras a Distancia
- Ciclo de Licenciatura en Higiene y Seguridad en el Trabajo
- Concurso Docente
- CURSO
- CURSO
- CURSO | AIRES MINISPLIT, PISO TECHO Y BAJA SILUETA: MANTENIMIENTO E INSTALACION
- CURSO | FOTOGRAFÍA DIGITAL
- CURSO: PROTECCIONES ELÉCTRICAS
- Cursos de idiomas
- Cursos demo
- DIPLOMATURA
- Horarios Carreras Grado
- Horarios Tecnicaturas
- inicio_extension
- Institucional
- Internacionales
- Internos-correos
- jornada-de-programación – inscripción
- jornada-de-programación – jornada
- Jornadas de Promoción
- La Facultad
- Laboratorios
- Laboratorios
- Lista de Graduados
- Nodocentes FRRq
- Noticias
- Office365
- PLANIFICAR SANTA FE
- PLANTILLA DOCENTE IEM – NIVEL 1
- PLANTILLA DOCENTE IEM – NIVEL 2
- PLANTILLA DOCENTE IEM – NIVEL 3
- PLANTILLA DOCENTE IEM – NIVEL 4
- PLANTILLA DOCENTE IEM – NIVEL 5
- Posgrado Especialización y Maestría en Minería de Datos
- Retiro de licencias Microsoft A1 Plus para estudiantes
- Secretaría Administrativa
- Secretarías
- Solicitud Autodesk Educativo
- SOLICITUD DE LIBRE DEUDA DE BIBLIOTECA
- Tecnicatura Universitaria en Ciudades Inteligentes
- Tecnicatura Universitaria en Procesos Industriales
- UTN RECONQUISTA
- Vinculación Tecnológica

---

## Duplicados detectados

- Ninguno exacto.

- **Casi iguales (0.82):** `www.frrq.utn.edu.ar-secretarias-sec_academica-concurso-docente-2023-mdizlw.md` ≡ `www.frrq.utn.edu.ar-concurso-docente-2025-jayns8.md`
- **Casi iguales (0.94):** `www.frrq.utn.edu.ar-category-cursos-nnvcy8.md` ≡ `www.frrq.utn.edu.ar-category-extension-2lvbi8.md`
- **Casi iguales (0.97):** `www.frrq.utn.edu.ar-category-cursos-nnvcy8.md` ≡ `www.frrq.utn.edu.ar-category-noticias-awfzlw.md`
- **Casi iguales (0.94):** `www.frrq.utn.edu.ar-category-cursos-nnvcy8.md` ≡ `www.frrq.utn.edu.ar-novedades-wrlcy8.md`
- **Casi iguales (0.93):** `www.frrq.utn.edu.ar-carreras-ea-calchaqui-tumi-dw1plw.md` ≡ `www.frrq.utn.edu.ar-carreras-ea-san-javier-tumi-hvtas8.md`
- **Casi iguales (0.97):** `www.frrq.utn.edu.ar-category-extension-2lvbi8.md` ≡ `www.frrq.utn.edu.ar-category-noticias-awfzlw.md`
- **Casi iguales (0.94):** `www.frrq.utn.edu.ar-category-extension-2lvbi8.md` ≡ `www.frrq.utn.edu.ar-novedades-wrlcy8.md`
- **Casi iguales (0.97):** `www.frrq.utn.edu.ar-category-noticias-awfzlw.md` ≡ `www.frrq.utn.edu.ar-novedades-wrlcy8.md`

---

## Qué pasa cuando aprobemos

1. Se escribe `corpus/excluded.yaml` con el patrón y el motivo de cada exclusión.
2. `npm run corpus:prune` mueve los archivos a `corpus/_excluded/` (reversible, sin git).
3. El ingest ignora lo excluido: el índice se deriva del corpus **menos** las exclusiones.
4. Se regenera `_manifest.json` para que la procedencia siga siendo exacta.

**Por qué así y no borrando a mano:** una exclusión es una decisión, no un archivo faltante. Queda escrita, con motivo y fecha, y se puede revertir sin tocar git.
