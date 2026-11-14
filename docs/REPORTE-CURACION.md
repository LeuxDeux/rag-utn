# Reporte de curación del corpus

**Generado:** 2026-11-14
**Documentos analizados:** 210 · **Fuente:** `corpus/web/`

> Este archivo vive en `docs/`, fuera de `corpus/`, para que el pipeline no lo ingiera.

---

## Cómo marcar este reporte

Cada documento tiene **dos casillas**. Marcá una sola, con `x`:

```markdown
  - [x] Queda      ← se conserva, y queda registrado como decisión
  - [ ] Excluir    ← se mueve a corpus-excluded/ y sale del índice
```

**Si no marcás nada, no pasa nada.** El corpus queda como está. Nada se borra por defecto: la sugerencia del reporte no es una orden.

Cuando termines, avisame y armo `corpus/excluded.yaml` con lo marcado, más el registro de lo que decidiste conservar.

---

## Resumen

| Veredicto | Docs | Qué significa |
|---|---|---|
| 🔴 Excluir | **16** | Evento con fecha vencida. No aporta y puede inducir respuestas en presente sobre algo que ya pasó |
| 🟡 Revisar | **83** | Necesita decisión humana: listados, contenido fino, duplicados o vigencia dudosa |
| 🔵 Opcional | **25** | Oferta de extensión e idiomas. Depende de si el asistente responde sobre cursos |
| ⚪ Limpio | **86** | Contenido sustantivo y vigente. Sin acción |

**Criterio central:** no se excluye por año, se excluye por **tipo**.
Un reglamento de 2019 sigue vigente hasta que lo deroguen; una jornada de 2022 no.

---

## ⚠️ Falsos positivos conocidos

El clasificador se equivoca. Estos casos ya están anotados:

| Documento | Por qué parece candidato | Qué es en realidad |
|---|---|---|
| `cursos-extension-ms-project-2016` | "2016" en el título | La **versión del software**, no la fecha del curso |
| `carreras-ea-calchaqui-tumi` ≡ `carreras-ea-san-javier-tumi` | 93% de texto idéntico | El mismo programa (TUMI) en **dos localidades**. No son duplicados: conservar ambos |
| `category-cursos`, `category-extension`, `category-noticias`, `novedades` | 94–97% idénticos entre sí | **Listados de WordPress**: solo cambia el título. Esos sí son redundantes |

---

# 🔴 A excluir — eventos cerrados (16)

Recomendación: **excluir todos**. Son eventos terminados, elecciones pasadas y ciclos de inscripción vencidos. Varios son activamente peligrosos: el modelo puede responder *"la inscripción es hasta marzo de 2025"* en presente, con cita y todo.

- `www.frrq.utn.edu.ar-secretarias-sec_academica-concurso-docente-2023-mdizlw.md`
  - *concurso-docente-2023* · evento de 2023
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-secretarias-sec_academica-concurso-docente-2023-mesnoviembre-wjyzs8.md`
  - *concurso-docente-2023-mesnoviembre* · evento de 2023
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-concurso-docente-2025-jayns8.md`
  - *concurso-docente-2025* · evento de 2025
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-elecciones-utn-2022-iwmjiv.md`
  - *Elecciones UTN 2022* · evento de 2022
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-elecciones-utn-2024-iwmjqv.md`
  - *Elecciones UTN 2024* · evento de 2024
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-innovatec-2025-mdi1lw.md`
  - *Innovatec 2025* · evento de 2025
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-inscripcion-a-carreras-clhst-2025-jayns8.md`
  - *Inscripción a Carreras CLHST 2025* · evento de 2025
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-inscripcion-tuci-distancia-2023-iwmjmv.md`
  - *inscripción-tuci-distancia-2023* · evento de 2023
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-inscripciones-a-carreras-ciclo-lectivo-2023-iwmjmv.md`
  - *Inscripciones a Carreras – Ciclo Lectivo 2023* · evento de 2023
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-jit-2022-mdiylw.md`
  - *JIT 2022* · evento de 2022
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-jit-2022-jit-2022-formato-poster-dgvylw.md`
  - *JIT 2022 – FORMATO POSTER* · evento de 2022
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-jit-2022-jit-2022-formato-trabajos-fqb3mv.md`
  - *JIT 2022 – FORMATO TRABAJOS* · evento de 2022
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-jit-2022-jit-2022-instructivo-easy-chair-hhaxiv.md`
  - *JIT 2022 – INSTRUCTIVO EASY CHAIR* · evento de 2022
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-llamado-elecciones-nacionales-cs-2021-iwmjev.md`
  - *Llamado a elecciones nacionales para la renovación de representantes en el Consejo Superior* · evento de 2021
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-simposio-siar-2023-jaymy8.md`
  - *Simposio SIAR 2023* · evento de 2023
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-vivi-tu-eleccion-2021-feria-de-las-carreras-vyyxmv.md`
  - *Vivi tu elección 2021 – Feria de las Carreras* · evento de 2021
  - [ ] Queda
  - [ ] Excluir

---

# 🟡 A revisar (83)

### Listados de navegación (36)

Índices de WordPress o de secciones. No contienen respuestas: contienen enlaces. Compiten con las páginas reales en el retrieval.

- `www.frrq.utn.edu.ar-carreras-ie-l2lllw.md`
  - *2025* · 23 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-carreras-ii-l2lplw.md`
  - *2025* · 22 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-pagina-de-inicio-autoridades-fkzxmv.md`
  - *Autoridades* · 23 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-secretarias-secretaria-cyt-cyt-adscripciones-bmvzlw.md`
  - *Ciencia y Tecnología – Adscripciones a proyectos I+D+i* · 40 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-secretarias-secretaria-cyt-cyt-carrera-investigador-wrvci8.md`
  - *Ciencia y Tecnología – Carrera del Investigador* · 41 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-secretarias-secretaria-cyt-cyt-centros-grupos-xbvcy8.md`
  - *Ciencia y Tecnología – Centros y Grupos* · 56 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-secretarias-secretaria-cyt-cyt-proyectos-idi-awrplw.md`
  - *Ciencia y Tecnología – Proyectos I+D+i* · 53 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `sac.frrq.utn.edu.ar-utn-frrq-comunidad.html-5odg1s.md`
  - *Comunidad* · 39 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-pagina-de-inicio-consejo-directivo-rpdm8v.md`
  - *Consejo Directivo* · 20 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `sac.frrq.utn.edu.ar-utn-frrq-contacto.html-mh0bww.md`
  - *Contacto* · 43 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-contactos-utn-reconquista-lzdgev.md`
  - *Contactos UTN Reconquista* · 17 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-2026-curso-analisis-de-movimiento-y-cinematica-mecanica-en-s-3jrcy8.md`
  - *CURSO* · 17 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-departamentos-dpto-lar-1syxiv.md`
  - *Departamento LAR* · 31 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-secretarias-sec-extension-diplomaturas-y-cursos-online-gluzs8.md`
  - *DIPLOMATURAS Y CURSOS ONLINE* · 40 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-carreras-ea-avellaneda-tup-dhvwlw.md`
  - *EA Avellaneda TUP* · 20 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-carreras-ea-calchaqui-tumi-dw1plw.md`
  - *EA Calchaquí TUMI* · 22 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-carreras-ea-san-javier-tuhst-voc3qv.md`
  - *EA San Javier TUHST* · 25 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-carreras-ea-san-javier-tumi-hvtas8.md`
  - *EA San Javier TUMI* · 22 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `sac.frrq.utn.edu.ar-utn-frrq.html-mh0bww.md`
  - *Educación que impulsa el desarrollo* · 24 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-ingresantes-dgvzlw.md`
  - *Ingresantes* · 40 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-inscripcion-a-carreras-2027-jayny8.md`
  - *Inscripción a Carreras 2027* · 16 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-2026-introduccion-al-diseno-3d-con-solidworks-3jrcy8.md`
  - *INTRODUCCIÓN AL DISEÑO 3D CON SOLIDWORKS* · 19 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-jit2022-premiacion-2lvbi8.md`
  - *jit2022-premiacion* · 22 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-carreras-carreras-a-distancia-ll-online-gluzs8.md`
  - *Licenciatura en Logística – Cursado 100% a distancia* · 32 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-cursos-extension-ms-project-2016-mde2lw.md`
  - *MS PROJECT 2016* · 43 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-cursos-extension-oratoria-9yawev.md`
  - *Oratoria* · 16 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-cursos-extension-orientacion-vocacional-25hbc8.md`
  - *Orientacion-Vocacional* · 17 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-carreras-pdgea-z2vhlw.md`
  - *Posgrado Dirección y Gestión de Empresas Agroindustriales* · 18 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-carreras-posgrado-maestria-en-redes-de-datos-dg9zlw.md`
  - *Posgrado Maestría en Redes de Datos* · 19 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-secretarias-sec_academica-1py2ev.md`
  - *Secretaría Académica* · 20 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-secretarias-secretaria-cyt-y3l0lw.md`
  - *Secretaría Ciencia y Tecnología* · 41 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-secretarias-secretaria-cyt2-3l0mi8.md`
  - *Secretaría Ciencia y Tecnología (demo)* · 224 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-secretarias-sec-extension-npb24v.md`
  - *Secretaría Extensión Universitaria* · 46 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-carreras-tup-3r1cc8.md`
  - *Tecnicatura Universitaria en Programación* · 16 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-carreras-carreras-a-distancia-tuti-online-aw5llw.md`
  - *Tecnicatura Universitaria en Tecnologías de la Información – Cursado 100% a distancia* · 19 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-unidad-atencion-casos-xnvcy8.md`
  - *Unidad de Atención de Casos* · 26 ítems de lista — parece un índice
  - [ ] Queda
  - [ ] Excluir

---

### Contenido muy fino (43)

Menos de 600 caracteres de cuerpo. Revisar de a uno: una página de contacto con teléfono y horario **sirve**; una plantilla vacía **no**.

- `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-disenador-grafico-expres-jlc3mv.md`
  - *AO – Diseño – Diseñador Gráfico Express* · 540 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-disenador-multimedial-glhbc8.md`
  - *AO – Diseño – Diseñador Multimedial* · 420 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-disenador-web-13zwiv.md`
  - *AO – Diseño – Diseñador Web* · 491 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-inmobilturist-asistente-de-inmo-cmlhlw.md`
  - *AO – InmobilTurist – Asistente de Inmobiliaria* · 558 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-rrhh-asistente-de-rrhh-express-zxnzlw.md`
  - *AO – RRHH – Asistente de RRHH Express* · 545 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-rrhh-liderazgo-y-coaching-mod-o-2ljby8.md`
  - *AO – RRHH – Liderazgo y Coaching Mod Ontológico* · 529 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-seguridad-dip-accidentologia-vi-awfslw.md`
  - *AO – Seguridad – Dip Accidentología Vial* · 583 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-seguridad-riesgo-electrico-jpy28v.md`
  - *AO – Seguridad – Riesgo Eléctrico* · 590 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-auxiliar-de-logistica-rpy2ev.md`
  - *AO – Temario – Auxiliar de Logística* · 497 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-diplomatura-en-asistenc-rpy28v.md`
  - *AO – Temario – Diplomatura en Asistencia de Estudio Jurídico* · 544 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-secretariado-informatico-awnvlw.md`
  - *ao-secretariado-informático* · 508 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-beca-ayuda-social-economica-2026-mdi2lw.md`
  - *Beca Ayuda Social Económica 2026* · 418 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-bibl-colecciones-9uzxmv.md`
  - *Biblioteca Colecciones* · 339 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-biblioteca-info-w5mby8.md`
  - *Biblioteca info* · 321 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-bibl-mision-vision-2lvbi8.md`
  - *Biblioteca Misión y Visión* · 560 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-bibl-servicios-aw9zlw.md`
  - *Biblioteca Servicios* · 505 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-calendario-de-mesas-de-examenes-vuzxmv.md`
  - *Calendario de Mesas de Exámenes* · 266 caracteres
  - [ ] Queda
  - [ ] Excluir
- `sac.frrq.utn.edu.ar-utn-frrq-carreras.html-mh0bww.md`
  - *Carreras* · 579 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-conoce-nuestra-facultad-dgfklw.md`
  - *Conocé nuestra Facultad* · 311 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-departamentos-dpto-basicas-y2fzlw.md`
  - *Departamento Básicas* · 579 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-departamentos-dpto-electromecanica-5py2ev.md`
  - *Departamento Electromecánica* · 570 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-departamentos-50b3mv.md`
  - *Departamentos* · 442 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-docdocentes-frrq-zycnev.md`
  - *DocDocentes FRRq* · 525 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-secretarias-sec-extension-educacion-virtual-r1ywwv.md`
  - *Educación Virtual* · 492 caracteres
  - [ ] Queda
  - [ ] Excluir
- `sac.frrq.utn.edu.ar-utn-frrq-extension.html-5odg1s.md`
  - *Extensión Universitaria* · 263 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-carreras-clhst-formulario-clhst-xoc3qv.md`
  - *Formulario CLHST* · 286 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-nodocentes-formularios-de-licencias-y-franquicias-npyxmv.md`
  - *Formularios de Licencias y Franquicias* · 254 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-info_jit2022-jaymi8.md`
  - *info_jit2022* · 280 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-pagina-de-inicio-info-acad-y2fklw.md`
  - *Información Académica* · 362 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-id-l2lklw.md`
  - *Investigación y Desarrollo* · 584 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-jit2022-exposicion-2lvbi8.md`
  - *jit2022-exposición* · 232 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-jit2022-programa-jhbwev.md`
  - *jit2022-Programa* · 223 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-jit2022-ubicacion-aw9ulw.md`
  - *jit2022-Ubicación* · 225 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-jornada-de-programacion-aw9ulw.md`
  - *Jornada de programación* · 490 caracteres
  - [ ] Queda
  - [ ] Excluir
- `sac.frrq.utn.edu.ar-utn-frrq-laboratorios.html-5odg1s.md`
  - *Laboratorios* · 383 caracteres
  - [ ] Queda
  - [ ] Excluir
- `sac.frrq.utn.edu.ar-utn-frrq-extracurricular.html-5odg1s.md`
  - *Más allá del aula* · 236 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-secretarias-sec-obra-ynjhlw.md`
  - *Secretaría Obra, Mantenimiento y Servicios Generales* · 335 caracteres
  - [ ] Queda
  - [ ] Excluir
- `sac.frrq.utn.edu.ar-utn-frrq-sistemas.html-mh0bww.md`
  - *Sistemas de Gestión* · 458 caracteres
  - [ ] Queda
  - [ ] Excluir
- `sac.frrq.utn.edu.ar-utn-frrq-solicitar-servicio.html-5odg1s.md`
  - *Solicitar un servicio* · 357 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-solicitud-cuenta-zoom-m9vbs8.md`
  - *Solicitud cuenta Zoom* · 313 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-solicitud-de-compra-de-material-bibliografico-mljby8.md`
  - *SOLICITUD DE COMPRA DE MATERIAL BIBLIOGRÁFICO* · 362 caracteres
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-secretarias-sec_academica-office365-solicitud-de-licencia-of-50zxmv.md`
  - *Solicitud de licencia Office 365 para estudiantes* · 347 caracteres
  - [ ] Queda
  - [ ] Excluir
- `sac.frrq.utn.edu.ar-utn-frrq-vinculacion.html-mh0bww.md`
  - *Vinculación tecnológica* · 559 caracteres
  - [ ] Queda
  - [ ] Excluir

---

### Duplicados (4)

Casi idénticos entre sí. Conservar uno y excluir el resto.

- `www.frrq.utn.edu.ar-category-cursos-nnvcy8.md`
  - *Cursos* · contenido casi idéntico a otro documento
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-category-extension-2lvbi8.md`
  - *Extensión* · contenido casi idéntico a otro documento
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-category-noticias-awfzlw.md`
  - *Noticias* · contenido casi idéntico a otro documento
  - [ ] Queda
  - [ ] Excluir
- `www.frrq.utn.edu.ar-novedades-wrlcy8.md`
  - *Novedades* · contenido casi idéntico a otro documento
  - [ ] Queda
  - [ ] Excluir


---

# 🔵 Opcional — oferta de extensión e idiomas (25)

Depende de si el asistente responde *"¿qué cursos hay?"* o solo *"¿cuándo me inscribo?"*.
Si el alcance es trámites y vida académica, esta sección es ruido. Si es atención general, se conserva.

- `www.frrq.utn.edu.ar-escuela-tecnologica-dpy2ev.md`
  - *2025* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-agro-diplomatura-en-administrac-xjhbc8.md`
  - *AO – Agro – Diplomatura en Administración Rural* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-diplomatura-en-diseno-y--3jlcy8.md`
  - *AO – Diseño – Diplomatura en Diseño y Decoración de Interiores* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-diplomatura-en-administ-zxnzlw.md`
  - *AO – Temario – Diplomatura en Administración de Empresas Express* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-diplomatura-en-asistenc-cmfslw.md`
  - *AO – Temario – Diplomatura en Asistencia Contable, Impositiva y Laboral* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-diplomatura-en-auxiliar-xjhcy8.md`
  - *AO – Temario – Diplomatura en Auxiliar de Bancos y Financieras* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diplomatura-en-grafologia-2dpys8.md`
  - *ao-diplomatura-en-grafología* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diplomatura-en-operador-adminis-ltzxmv.md`
  - *ao-diplomatura-en-operador-administrativo-avanzado-de-PyMEs* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diplomatura-en-preceptoria-esco-2xhci8.md`
  - *ao-diplomatura-en-preceptoría-escolar* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-2026-curso-diplomatura-en-habilidades-gerenciales-management-glvbi8.md`
  - *CURSO | DIPLOMATURA EN HABILIDADES GERENCIALES* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-cursos-extension-curso-virtual-leer-para-aprender-5kzxiv.md`
  - *Curso virtual – Leer para aprender* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-cursos-extension-npb24v.md`
  - *Cursos de Extensión* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-cursos-escuela-de-idiomas-9tyxmv.md`
  - *Cursos Escuela de Idiomas* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-cursos-extension-diplomatura-en-literatura-brasilena-xlbmev.md`
  - *Diplomatura en Literatura Brasileña* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-cursos-extension-diplomatura-en-literatura-lusofona-m9uys8.md`
  - *Diplomatura en Literatura Lusófona* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-ei-curso-online-de-aleman-nivel-a-1-1-0xltev.md`
  - *EI – CURSO ONLINE DE ALEMÁN NIVEL A 1.1* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-ei-curso-online-de-portugues-nivel-basico-awnvlw.md`
  - *EI – CURSO ONLINE DE PORTUGUÉS – NIVEL BÁSICO* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-ei-curso-virtual-de-italiano-nivel-a1-wtytev.md`
  - *EI – Curso Virtual de Italiano – Nivel A1* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-escuela-de-idiomas-21hcy8.md`
  - *Escuela de Idiomas* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-cursos-extension-fotografia-wzpys8.md`
  - *Fotografia* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-oferta-laboral-cmfslw.md`
  - *Oferta Laboral* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-cursos-extension-seminario-claves-para-la-rentabilidad-wrhzc8.md`
  - *Seminario Claves para la Rentabilidad* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-cursos-extension-seminario-de-literatura-infantil-50awwv.md`
  - *Seminario de Literatura Infantil* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-cursos-extension-sistema-info-geo-wdlby8.md`
  - *Sistema-info-geo* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

- `www.frrq.utn.edu.ar-cursos-extension-sistema-info-geo2-dlbziv.md`
  - *Sistema-info-geo2* · oferta de extensión / idiomas
  - [ ] Queda
  - [ ] Excluir

---

# ⚪ Limpio (86)

Contenido sustantivo y vigente. Sin acción.

<details>
<summary>Ver los 86 documentos</summary>

- *1° Congreso de Transición Energética del Norte Santafesino* · 635 chars
- *1° Congreso de Transición Energética del Norte Santafesino – Comité científico* · 10398 chars
- *1° Congreso de Transición Energética del Norte Santafesino – Como participar* · 6138 chars
- *1° Congreso de Transición Energética del Norte Santafesino – Disertantes* · 7326 chars
- *1° Congreso de Transición Energética del Norte Santafesino – Inscripción* · 1127 chars
- *1° Congreso de Transición Energética del Norte Santafesino – Objetivos* · 2195 chars
- *2024* · 1916 chars
- *2025* · 1162 chars
- *2025* · 1877 chars
- *2025* · 3049 chars
- *2025* · 1375 chars
- *2025* · 1555 chars
- *Actas / Resoluciones* · 110634 chars
- *AO – Agro – Administración Rural Express* · 747 chars
- *AO – Agro – Producción Agropecuaria Express* · 630 chars
- *AO – Agro – Programa de Formación en Producción Agropecuaria* · 722 chars
- *AO – Diseño – Diseñador CAD* · 685 chars
- *AO – Diseño – Diseñador Gráfico Publicitario* · 649 chars
- *AO – Diseño – Fotografía Básica* · 637 chars
- *AO – Escolaridad – Auxiliar de Bibliotecas Express* · 929 chars
- *AO – Escolaridad – Diplomatura Secretariado Escolar* · 928 chars
- *AO – Escolaridad – Programa de Formación de Preceptores* · 1220 chars
- *AO – InmobilTurist – Agente de viajes* · 690 chars
- *AO – InmobilTurist – Asistente Hotelero y Turístico* · 664 chars
- *AO – Oficios – Armador y Reparador de PC* · 648 chars
- *AO – Oficios – Instalaciones Eléctricas en Hogares y Edificios* · 734 chars
- *AO – RRHH – Operador en Violencia Familiar* · 670 chars
- *AO – Salud – Aux Adm de Farmacia* · 754 chars
- *AO – Salud – Dip Sec Adm Médico* · 685 chars
- *AO – Seguridad – Dip Higiene y Seguridad* · 635 chars
- *AO – Temario – Diplomatura en Secretariado Ejecutivo Express* · 603 chars
- *AO – Temario – Liquidador/a Básico/a de Sueldos y Jornales* · 729 chars
- *AO – Ventas – Programa de Formación de Vendedores* · 625 chars
- *ASAMBLEA GENERAL ORDINARIA* · 607 chars
- *Beca de Investigación y Servicios 2026* · 666 chars
- *Becas 2026* · 2367 chars
- *Bibliotea_Historia* · 2551 chars
- *Biblioteca* · 5179 chars
- *Biblioteca repositorio* · 1259 chars
- *Calendario Académico 2025/2026* · 1708 chars
- *Calendario Académico 2026/2027* · 1725 chars
- *Calendario de Reuniones Ordinarias de Consejo Directivo* · 6344 chars
- *calendario-de-reuniones-ordinarias-de-consejo-directivo-2026* · 2405 chars
- *Carreras a Distancia* · 1668 chars
- *Ciclo de Licenciatura en Higiene y Seguridad en el Trabajo* · 2672 chars
- *Concurso Docente* · 1660 chars
- *CURSO* · 2625 chars
- *CURSO* · 1629 chars
- *CURSO | AIRES MINISPLIT, PISO TECHO Y BAJA SILUETA: MANTENIMIENTO E INSTALACION* · 1821 chars
- *CURSO | FOTOGRAFÍA DIGITAL* · 1375 chars
- *CURSO: PROTECCIONES ELÉCTRICAS* · 1632 chars
- *Cursos de idiomas* · 625 chars
- *Cursos demo* · 6941 chars
- *DIPLOMATURA* · 1663 chars
- *Horarios Carreras Grado* · 5330 chars
- *Horarios Tecnicaturas* · 3402 chars
- *inicio_extension* · 628 chars
- *Institucional* · 5592 chars
- *Internacionales* · 835 chars
- *Internos-correos* · 4033 chars
- *jornada-de-programación – inscripción* · 679 chars
- *jornada-de-programación – jornada* · 822 chars
- *Jornadas de Promoción* · 6699 chars
- *La Facultad* · 622 chars
- *Laboratorios* · 3679 chars
- *Laboratorios* · 12090 chars
- *Lista de Graduados* · 5697 chars
- *Nodocentes FRRq* · 1499 chars
- *Noticias* · 2237 chars
- *Office365* · 2645 chars
- *PLANIFICAR SANTA FE* · 2277 chars
- *PLANTILLA DOCENTE IEM – NIVEL 1* · 2149 chars
- *PLANTILLA DOCENTE IEM – NIVEL 2* · 2412 chars
- *PLANTILLA DOCENTE IEM – NIVEL 3* · 2164 chars
- *PLANTILLA DOCENTE IEM – NIVEL 4* · 1941 chars
- *PLANTILLA DOCENTE IEM – NIVEL 5* · 2958 chars
- *Posgrado Especialización y Maestría en Minería de Datos* · 23802 chars
- *Retiro de licencias Microsoft A1 Plus para estudiantes* · 1484 chars
- *Secretaría Administrativa* · 3076 chars
- *Secretarías* · 760 chars
- *Solicitud Autodesk Educativo* · 1077 chars
- *SOLICITUD DE LIBRE DEUDA DE BIBLIOTECA* · 651 chars
- *Tecnicatura Universitaria en Ciudades Inteligentes* · 2627 chars
- *Tecnicatura Universitaria en Procesos Industriales* · 1491 chars
- *UTN RECONQUISTA* · 3248 chars
- *Vinculación Tecnológica* · 1354 chars

</details>

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

## Qué pasa cuando apruebes

1. Se escribe `corpus/excluded.yaml` con el patrón, el motivo y la fecha de cada exclusión.
2. `npm run corpus:prune` mueve los archivos a `corpus-excluded/` — **fuera** de `corpus/`, reversible sin git.
3. El ingest indexa `corpus/` menos lo excluido. El índice se **deriva**, no se edita.
4. Se regenera `_manifest.json` para que la procedencia siga exacta.

**Por qué así:** una exclusión es una decisión, no un archivo faltante. Queda escrita, con motivo y fecha, y se revierte borrando una línea.
