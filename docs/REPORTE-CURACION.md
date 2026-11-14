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

### Cómo leer un documento

- El **nombre en azul** abre el `.md` extraído que se va a indexar (lo que realmente lee el modelo).
- **original** abre la página viva del sitio, para comparar con la versión actual.

Conviene mirar el `.md`: si el texto se ve cortado o con menús pegados, el problema no es el documento sino el parseo.

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

- [`www.frrq.utn.edu.ar-secretarias-sec_academica-concurso-docente-2023-mdizlw.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec_academica-concurso-docente-2023-mdizlw.md)
  - *concurso-docente-2023* · evento de 2023 · [original](<https://www.frrq.utn.edu.ar/secretarias/sec_academica/concurso-docente-2023/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-secretarias-sec_academica-concurso-docente-2023-mesnoviembre-wjyzs8.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec_academica-concurso-docente-2023-mesnoviembre-wjyzs8.md)
  - *concurso-docente-2023-mesnoviembre* · evento de 2023 · [original](<https://www.frrq.utn.edu.ar/secretarias/sec_academica/concurso-docente-2023-mesnoviembre/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-concurso-docente-2025-jayns8.md`](../corpus/web/www.frrq.utn.edu.ar-concurso-docente-2025-jayns8.md)
  - *concurso-docente-2025* · evento de 2025 · [original](<https://www.frrq.utn.edu.ar/concurso-docente-2025/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-elecciones-utn-2022-iwmjiv.md`](../corpus/web/www.frrq.utn.edu.ar-elecciones-utn-2022-iwmjiv.md)
  - *Elecciones UTN 2022* · evento de 2022 · [original](<https://www.frrq.utn.edu.ar/elecciones-utn-2022/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-elecciones-utn-2024-iwmjqv.md`](../corpus/web/www.frrq.utn.edu.ar-elecciones-utn-2024-iwmjqv.md)
  - *Elecciones UTN 2024* · evento de 2024 · [original](<https://www.frrq.utn.edu.ar/elecciones-utn-2024/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-innovatec-2025-mdi1lw.md`](../corpus/web/www.frrq.utn.edu.ar-innovatec-2025-mdi1lw.md)
  - *Innovatec 2025* · evento de 2025 · [original](<https://www.frrq.utn.edu.ar/innovatec-2025/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-inscripcion-a-carreras-clhst-2025-jayns8.md`](../corpus/web/www.frrq.utn.edu.ar-inscripcion-a-carreras-clhst-2025-jayns8.md)
  - *Inscripción a Carreras CLHST 2025* · evento de 2025 · [original](<https://www.frrq.utn.edu.ar/inscripcion-a-carreras-clhst-2025/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-inscripcion-tuci-distancia-2023-iwmjmv.md`](../corpus/web/www.frrq.utn.edu.ar-inscripcion-tuci-distancia-2023-iwmjmv.md)
  - *inscripción-tuci-distancia-2023* · evento de 2023 · [original](<https://www.frrq.utn.edu.ar/inscripcion-tuci-distancia-2023/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-inscripciones-a-carreras-ciclo-lectivo-2023-iwmjmv.md`](../corpus/web/www.frrq.utn.edu.ar-inscripciones-a-carreras-ciclo-lectivo-2023-iwmjmv.md)
  - *Inscripciones a Carreras – Ciclo Lectivo 2023* · evento de 2023 · [original](<https://www.frrq.utn.edu.ar/inscripciones-a-carreras-ciclo-lectivo-2023/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-jit-2022-mdiylw.md`](../corpus/web/www.frrq.utn.edu.ar-jit-2022-mdiylw.md)
  - *JIT 2022* · evento de 2022 · [original](<https://www.frrq.utn.edu.ar/jit-2022/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-jit-2022-jit-2022-formato-poster-dgvylw.md`](../corpus/web/www.frrq.utn.edu.ar-jit-2022-jit-2022-formato-poster-dgvylw.md)
  - *JIT 2022 – FORMATO POSTER* · evento de 2022 · [original](<https://www.frrq.utn.edu.ar/jit-2022/jit-2022-formato-poster/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-jit-2022-jit-2022-formato-trabajos-fqb3mv.md`](../corpus/web/www.frrq.utn.edu.ar-jit-2022-jit-2022-formato-trabajos-fqb3mv.md)
  - *JIT 2022 – FORMATO TRABAJOS* · evento de 2022 · [original](<https://www.frrq.utn.edu.ar/jit-2022/jit-2022-formato-trabajos/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-jit-2022-jit-2022-instructivo-easy-chair-hhaxiv.md`](../corpus/web/www.frrq.utn.edu.ar-jit-2022-jit-2022-instructivo-easy-chair-hhaxiv.md)
  - *JIT 2022 – INSTRUCTIVO EASY CHAIR* · evento de 2022 · [original](<https://www.frrq.utn.edu.ar/jit-2022/jit-2022-instructivo-easy-chair/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-llamado-elecciones-nacionales-cs-2021-iwmjev.md`](../corpus/web/www.frrq.utn.edu.ar-llamado-elecciones-nacionales-cs-2021-iwmjev.md)
  - *Llamado a elecciones nacionales para la renovación de representantes en el Consejo Superior* · evento de 2021 · [original](<https://www.frrq.utn.edu.ar/llamado-elecciones-nacionales-cs-2021/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-simposio-siar-2023-jaymy8.md`](../corpus/web/www.frrq.utn.edu.ar-simposio-siar-2023-jaymy8.md)
  - *Simposio SIAR 2023* · evento de 2023 · [original](<https://www.frrq.utn.edu.ar/simposio-siar-2023/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-vivi-tu-eleccion-2021-feria-de-las-carreras-vyyxmv.md`](../corpus/web/www.frrq.utn.edu.ar-vivi-tu-eleccion-2021-feria-de-las-carreras-vyyxmv.md)
  - *Vivi tu elección 2021 – Feria de las Carreras* · evento de 2021 · [original](<https://www.frrq.utn.edu.ar/vivi-tu-eleccion-2021-feria-de-las-carreras/>)
  - [ ] Queda
  - [ ] Excluir

---

# 🟡 A revisar (83)

### Listados de navegación (36)

Índices de WordPress o de secciones. No contienen respuestas: contienen enlaces. Compiten con las páginas reales en el retrieval.

- [`www.frrq.utn.edu.ar-carreras-ie-l2lllw.md`](../corpus/web/www.frrq.utn.edu.ar-carreras-ie-l2lllw.md)
  - *2025* · 23 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/carreras/ie/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-carreras-ii-l2lplw.md`](../corpus/web/www.frrq.utn.edu.ar-carreras-ii-l2lplw.md)
  - *2025* · 22 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/carreras/ii/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-pagina-de-inicio-autoridades-fkzxmv.md`](../corpus/web/www.frrq.utn.edu.ar-pagina-de-inicio-autoridades-fkzxmv.md)
  - *Autoridades* · 23 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/pagina-de-inicio/autoridades/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-secretaria-cyt-cyt-adscripciones-bmvzlw.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-secretaria-cyt-cyt-adscripciones-bmvzlw.md)
  - *Ciencia y Tecnología – Adscripciones a proyectos I+D+i* · 40 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/secretarias/secretaria-cyt/cyt-adscripciones/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-secretaria-cyt-cyt-carrera-investigador-wrvci8.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-secretaria-cyt-cyt-carrera-investigador-wrvci8.md)
  - *Ciencia y Tecnología – Carrera del Investigador* · 41 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/secretarias/secretaria-cyt/cyt-carrera-investigador/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-secretaria-cyt-cyt-centros-grupos-xbvcy8.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-secretaria-cyt-cyt-centros-grupos-xbvcy8.md)
  - *Ciencia y Tecnología – Centros y Grupos* · 56 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/secretarias/secretaria-cyt/cyt-centros-grupos/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-secretaria-cyt-cyt-proyectos-idi-awrplw.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-secretaria-cyt-cyt-proyectos-idi-awrplw.md)
  - *Ciencia y Tecnología – Proyectos I+D+i* · 53 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/secretarias/secretaria-cyt/cyt-proyectos-idi/>)
  - [ ] Queda
  - [ ] Excluir
- [`sac.frrq.utn.edu.ar-utn-frrq-comunidad.html-5odg1s.md`](../corpus/web/sac.frrq.utn.edu.ar-utn-frrq-comunidad.html-5odg1s.md)
  - *Comunidad* · 39 ítems de lista — parece un índice · [original](<https://sac.frrq.utn.edu.ar/utn-frrq-comunidad.html>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-pagina-de-inicio-consejo-directivo-rpdm8v.md`](../corpus/web/www.frrq.utn.edu.ar-pagina-de-inicio-consejo-directivo-rpdm8v.md)
  - *Consejo Directivo* · 20 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/pagina-de-inicio/consejo-directivo/>)
  - [ ] Queda
  - [ ] Excluir
- [`sac.frrq.utn.edu.ar-utn-frrq-contacto.html-mh0bww.md`](../corpus/web/sac.frrq.utn.edu.ar-utn-frrq-contacto.html-mh0bww.md)
  - *Contacto* · 43 ítems de lista — parece un índice · [original](<https://sac.frrq.utn.edu.ar/utn-frrq-contacto.html>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-contactos-utn-reconquista-lzdgev.md`](../corpus/web/www.frrq.utn.edu.ar-contactos-utn-reconquista-lzdgev.md)
  - *Contactos UTN Reconquista* · 17 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/contactos-utn-reconquista/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-2026-curso-analisis-de-movimiento-y-cinematica-mecanica-en-s-3jrcy8.md`](../corpus/web/www.frrq.utn.edu.ar-2026-curso-analisis-de-movimiento-y-cinematica-mecanica-en-s-3jrcy8.md)
  - *CURSO* · 17 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/2026/curso-analisis-de-movimiento-y-cinematica-mecanica-en-solidworks/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-departamentos-dpto-lar-1syxiv.md`](../corpus/web/www.frrq.utn.edu.ar-departamentos-dpto-lar-1syxiv.md)
  - *Departamento LAR* · 31 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/departamentos/dpto-lar/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-diplomaturas-y-cursos-online-gluzs8.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-diplomaturas-y-cursos-online-gluzs8.md)
  - *DIPLOMATURAS Y CURSOS ONLINE* · 40 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/diplomaturas-y-cursos-online/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-carreras-ea-avellaneda-tup-dhvwlw.md`](../corpus/web/www.frrq.utn.edu.ar-carreras-ea-avellaneda-tup-dhvwlw.md)
  - *EA Avellaneda TUP* · 20 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/carreras/ea-avellaneda-tup/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-carreras-ea-calchaqui-tumi-dw1plw.md`](../corpus/web/www.frrq.utn.edu.ar-carreras-ea-calchaqui-tumi-dw1plw.md)
  - *EA Calchaquí TUMI* · 22 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/carreras/ea-calchaqui-tumi/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-carreras-ea-san-javier-tuhst-voc3qv.md`](../corpus/web/www.frrq.utn.edu.ar-carreras-ea-san-javier-tuhst-voc3qv.md)
  - *EA San Javier TUHST* · 25 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/carreras/ea-san-javier-tuhst/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-carreras-ea-san-javier-tumi-hvtas8.md`](../corpus/web/www.frrq.utn.edu.ar-carreras-ea-san-javier-tumi-hvtas8.md)
  - *EA San Javier TUMI* · 22 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/carreras/ea-san-javier-tumi/>)
  - [ ] Queda
  - [ ] Excluir
- [`sac.frrq.utn.edu.ar-utn-frrq.html-mh0bww.md`](../corpus/web/sac.frrq.utn.edu.ar-utn-frrq.html-mh0bww.md)
  - *Educación que impulsa el desarrollo* · 24 ítems de lista — parece un índice · [original](<https://sac.frrq.utn.edu.ar/utn-frrq.html>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-ingresantes-dgvzlw.md`](../corpus/web/www.frrq.utn.edu.ar-ingresantes-dgvzlw.md)
  - *Ingresantes* · 40 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/ingresantes/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-inscripcion-a-carreras-2027-jayny8.md`](../corpus/web/www.frrq.utn.edu.ar-inscripcion-a-carreras-2027-jayny8.md)
  - *Inscripción a Carreras 2027* · 16 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/inscripcion-a-carreras-2027/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-2026-introduccion-al-diseno-3d-con-solidworks-3jrcy8.md`](../corpus/web/www.frrq.utn.edu.ar-2026-introduccion-al-diseno-3d-con-solidworks-3jrcy8.md)
  - *INTRODUCCIÓN AL DISEÑO 3D CON SOLIDWORKS* · 19 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/2026/introduccion-al-diseno-3d-con-solidworks/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-jit2022-premiacion-2lvbi8.md`](../corpus/web/www.frrq.utn.edu.ar-jit2022-premiacion-2lvbi8.md)
  - *jit2022-premiacion* · 22 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/jit2022-premiacion/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-carreras-carreras-a-distancia-ll-online-gluzs8.md`](../corpus/web/www.frrq.utn.edu.ar-carreras-carreras-a-distancia-ll-online-gluzs8.md)
  - *Licenciatura en Logística – Cursado 100% a distancia* · 32 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/carreras/carreras-a-distancia/ll-online/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-cursos-extension-ms-project-2016-mde2lw.md`](../corpus/web/www.frrq.utn.edu.ar-cursos-extension-ms-project-2016-mde2lw.md)
  - *MS PROJECT 2016* · 43 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/cursos-extension/ms-project-2016/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-cursos-extension-oratoria-9yawev.md`](../corpus/web/www.frrq.utn.edu.ar-cursos-extension-oratoria-9yawev.md)
  - *Oratoria* · 16 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/cursos-extension/oratoria/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-cursos-extension-orientacion-vocacional-25hbc8.md`](../corpus/web/www.frrq.utn.edu.ar-cursos-extension-orientacion-vocacional-25hbc8.md)
  - *Orientacion-Vocacional* · 17 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/cursos-extension/orientacion-vocacional/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-carreras-pdgea-z2vhlw.md`](../corpus/web/www.frrq.utn.edu.ar-carreras-pdgea-z2vhlw.md)
  - *Posgrado Dirección y Gestión de Empresas Agroindustriales* · 18 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/carreras/pdgea/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-carreras-posgrado-maestria-en-redes-de-datos-dg9zlw.md`](../corpus/web/www.frrq.utn.edu.ar-carreras-posgrado-maestria-en-redes-de-datos-dg9zlw.md)
  - *Posgrado Maestría en Redes de Datos* · 19 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/carreras/posgrado-maestria-en-redes-de-datos/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec_academica-1py2ev.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec_academica-1py2ev.md)
  - *Secretaría Académica* · 20 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/secretarias/sec_academica/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-secretaria-cyt-y3l0lw.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-secretaria-cyt-y3l0lw.md)
  - *Secretaría Ciencia y Tecnología* · 41 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/secretarias/secretaria-cyt/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-secretaria-cyt2-3l0mi8.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-secretaria-cyt2-3l0mi8.md)
  - *Secretaría Ciencia y Tecnología (demo)* · 224 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/secretarias/secretaria-cyt2/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-npb24v.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-npb24v.md)
  - *Secretaría Extensión Universitaria* · 46 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-carreras-tup-3r1cc8.md`](../corpus/web/www.frrq.utn.edu.ar-carreras-tup-3r1cc8.md)
  - *Tecnicatura Universitaria en Programación* · 16 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/carreras/tup/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-carreras-carreras-a-distancia-tuti-online-aw5llw.md`](../corpus/web/www.frrq.utn.edu.ar-carreras-carreras-a-distancia-tuti-online-aw5llw.md)
  - *Tecnicatura Universitaria en Tecnologías de la Información – Cursado 100% a distancia* · 19 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/carreras/carreras-a-distancia/tuti-online/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-unidad-atencion-casos-xnvcy8.md`](../corpus/web/www.frrq.utn.edu.ar-unidad-atencion-casos-xnvcy8.md)
  - *Unidad de Atención de Casos* · 26 ítems de lista — parece un índice · [original](<https://www.frrq.utn.edu.ar/unidad-atencion-casos/>)
  - [ ] Queda
  - [ ] Excluir

---

### Contenido muy fino (43)

Menos de 600 caracteres de cuerpo. Revisar de a uno: una página de contacto con teléfono y horario **sirve**; una plantilla vacía **no**.

- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-disenador-grafico-expres-jlc3mv.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-disenador-grafico-expres-jlc3mv.md)
  - *AO – Diseño – Diseñador Gráfico Express* · 540 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-diseno-disenador-grafico-express/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-disenador-multimedial-glhbc8.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-disenador-multimedial-glhbc8.md)
  - *AO – Diseño – Diseñador Multimedial* · 420 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-diseno-disenador-multimedial/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-disenador-web-13zwiv.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-disenador-web-13zwiv.md)
  - *AO – Diseño – Diseñador Web* · 491 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-diseno-disenador-web/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-inmobilturist-asistente-de-inmo-cmlhlw.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-inmobilturist-asistente-de-inmo-cmlhlw.md)
  - *AO – InmobilTurist – Asistente de Inmobiliaria* · 558 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-inmobilturist-asistente-de-inmobiliaria/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-rrhh-asistente-de-rrhh-express-zxnzlw.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-rrhh-asistente-de-rrhh-express-zxnzlw.md)
  - *AO – RRHH – Asistente de RRHH Express* · 545 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-rrhh-asistente-de-rrhh-express/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-rrhh-liderazgo-y-coaching-mod-o-2ljby8.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-rrhh-liderazgo-y-coaching-mod-o-2ljby8.md)
  - *AO – RRHH – Liderazgo y Coaching Mod Ontológico* · 529 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-rrhh-liderazgo-y-coaching-mod-ontologico/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-seguridad-dip-accidentologia-vi-awfslw.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-seguridad-dip-accidentologia-vi-awfslw.md)
  - *AO – Seguridad – Dip Accidentología Vial* · 583 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-seguridad-dip-accidentologia-vial/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-seguridad-riesgo-electrico-jpy28v.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-seguridad-riesgo-electrico-jpy28v.md)
  - *AO – Seguridad – Riesgo Eléctrico* · 590 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-seguridad-riesgo-electrico/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-auxiliar-de-logistica-rpy2ev.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-auxiliar-de-logistica-rpy2ev.md)
  - *AO – Temario – Auxiliar de Logística* · 497 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-temario-auxiliar-de-logistica/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-diplomatura-en-asistenc-rpy28v.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-diplomatura-en-asistenc-rpy28v.md)
  - *AO – Temario – Diplomatura en Asistencia de Estudio Jurídico* · 544 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-temario-diplomatura-en-asistencia-de-estudio-juridico/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-secretariado-informatico-awnvlw.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-secretariado-informatico-awnvlw.md)
  - *ao-secretariado-informático* · 508 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-secretariado-informatico/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-beca-ayuda-social-economica-2026-mdi2lw.md`](../corpus/web/www.frrq.utn.edu.ar-beca-ayuda-social-economica-2026-mdi2lw.md)
  - *Beca Ayuda Social Económica 2026* · 418 caracteres · [original](<https://www.frrq.utn.edu.ar/beca-ayuda-social-economica-2026/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-bibl-colecciones-9uzxmv.md`](../corpus/web/www.frrq.utn.edu.ar-bibl-colecciones-9uzxmv.md)
  - *Biblioteca Colecciones* · 339 caracteres · [original](<https://www.frrq.utn.edu.ar/bibl-colecciones/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-biblioteca-info-w5mby8.md`](../corpus/web/www.frrq.utn.edu.ar-biblioteca-info-w5mby8.md)
  - *Biblioteca info* · 321 caracteres · [original](<https://www.frrq.utn.edu.ar/biblioteca-info/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-bibl-mision-vision-2lvbi8.md`](../corpus/web/www.frrq.utn.edu.ar-bibl-mision-vision-2lvbi8.md)
  - *Biblioteca Misión y Visión* · 560 caracteres · [original](<https://www.frrq.utn.edu.ar/bibl-mision-vision/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-bibl-servicios-aw9zlw.md`](../corpus/web/www.frrq.utn.edu.ar-bibl-servicios-aw9zlw.md)
  - *Biblioteca Servicios* · 505 caracteres · [original](<https://www.frrq.utn.edu.ar/bibl-servicios/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-calendario-de-mesas-de-examenes-vuzxmv.md`](../corpus/web/www.frrq.utn.edu.ar-calendario-de-mesas-de-examenes-vuzxmv.md)
  - *Calendario de Mesas de Exámenes* · 266 caracteres · [original](<https://www.frrq.utn.edu.ar/calendario-de-mesas-de-examenes/>)
  - [ ] Queda
  - [ ] Excluir
- [`sac.frrq.utn.edu.ar-utn-frrq-carreras.html-mh0bww.md`](../corpus/web/sac.frrq.utn.edu.ar-utn-frrq-carreras.html-mh0bww.md)
  - *Carreras* · 579 caracteres · [original](<https://sac.frrq.utn.edu.ar/utn-frrq-carreras.html>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-conoce-nuestra-facultad-dgfklw.md`](../corpus/web/www.frrq.utn.edu.ar-conoce-nuestra-facultad-dgfklw.md)
  - *Conocé nuestra Facultad* · 311 caracteres · [original](<https://www.frrq.utn.edu.ar/conoce-nuestra-facultad/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-departamentos-dpto-basicas-y2fzlw.md`](../corpus/web/www.frrq.utn.edu.ar-departamentos-dpto-basicas-y2fzlw.md)
  - *Departamento Básicas* · 579 caracteres · [original](<https://www.frrq.utn.edu.ar/departamentos/dpto-basicas/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-departamentos-dpto-electromecanica-5py2ev.md`](../corpus/web/www.frrq.utn.edu.ar-departamentos-dpto-electromecanica-5py2ev.md)
  - *Departamento Electromecánica* · 570 caracteres · [original](<https://www.frrq.utn.edu.ar/departamentos/dpto-electromecanica/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-departamentos-50b3mv.md`](../corpus/web/www.frrq.utn.edu.ar-departamentos-50b3mv.md)
  - *Departamentos* · 442 caracteres · [original](<https://www.frrq.utn.edu.ar/departamentos/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-docdocentes-frrq-zycnev.md`](../corpus/web/www.frrq.utn.edu.ar-docdocentes-frrq-zycnev.md)
  - *DocDocentes FRRq* · 525 caracteres · [original](<https://www.frrq.utn.edu.ar/docdocentes-frrq/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-extension-educacion-virtual-r1ywwv.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-educacion-virtual-r1ywwv.md)
  - *Educación Virtual* · 492 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/educacion-virtual/>)
  - [ ] Queda
  - [ ] Excluir
- [`sac.frrq.utn.edu.ar-utn-frrq-extension.html-5odg1s.md`](../corpus/web/sac.frrq.utn.edu.ar-utn-frrq-extension.html-5odg1s.md)
  - *Extensión Universitaria* · 263 caracteres · [original](<https://sac.frrq.utn.edu.ar/utn-frrq-extension.html>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-carreras-clhst-formulario-clhst-xoc3qv.md`](../corpus/web/www.frrq.utn.edu.ar-carreras-clhst-formulario-clhst-xoc3qv.md)
  - *Formulario CLHST* · 286 caracteres · [original](<https://www.frrq.utn.edu.ar/carreras/clhst/formulario-clhst/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-nodocentes-formularios-de-licencias-y-franquicias-npyxmv.md`](../corpus/web/www.frrq.utn.edu.ar-nodocentes-formularios-de-licencias-y-franquicias-npyxmv.md)
  - *Formularios de Licencias y Franquicias* · 254 caracteres · [original](<https://www.frrq.utn.edu.ar/nodocentes/formularios-de-licencias-y-franquicias/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-info_jit2022-jaymi8.md`](../corpus/web/www.frrq.utn.edu.ar-info_jit2022-jaymi8.md)
  - *info_jit2022* · 280 caracteres · [original](<https://www.frrq.utn.edu.ar/info_jit2022/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-pagina-de-inicio-info-acad-y2fklw.md`](../corpus/web/www.frrq.utn.edu.ar-pagina-de-inicio-info-acad-y2fklw.md)
  - *Información Académica* · 362 caracteres · [original](<https://www.frrq.utn.edu.ar/pagina-de-inicio/info-acad/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-id-l2lklw.md`](../corpus/web/www.frrq.utn.edu.ar-id-l2lklw.md)
  - *Investigación y Desarrollo* · 584 caracteres · [original](<https://www.frrq.utn.edu.ar/id/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-jit2022-exposicion-2lvbi8.md`](../corpus/web/www.frrq.utn.edu.ar-jit2022-exposicion-2lvbi8.md)
  - *jit2022-exposición* · 232 caracteres · [original](<https://www.frrq.utn.edu.ar/jit2022-exposicion/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-jit2022-programa-jhbwev.md`](../corpus/web/www.frrq.utn.edu.ar-jit2022-programa-jhbwev.md)
  - *jit2022-Programa* · 223 caracteres · [original](<https://www.frrq.utn.edu.ar/jit2022-programa/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-jit2022-ubicacion-aw9ulw.md`](../corpus/web/www.frrq.utn.edu.ar-jit2022-ubicacion-aw9ulw.md)
  - *jit2022-Ubicación* · 225 caracteres · [original](<https://www.frrq.utn.edu.ar/jit2022-ubicacion/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-jornada-de-programacion-aw9ulw.md`](../corpus/web/www.frrq.utn.edu.ar-jornada-de-programacion-aw9ulw.md)
  - *Jornada de programación* · 490 caracteres · [original](<https://www.frrq.utn.edu.ar/jornada-de-programacion/>)
  - [ ] Queda
  - [ ] Excluir
- [`sac.frrq.utn.edu.ar-utn-frrq-laboratorios.html-5odg1s.md`](../corpus/web/sac.frrq.utn.edu.ar-utn-frrq-laboratorios.html-5odg1s.md)
  - *Laboratorios* · 383 caracteres · [original](<https://sac.frrq.utn.edu.ar/utn-frrq-laboratorios.html>)
  - [ ] Queda
  - [ ] Excluir
- [`sac.frrq.utn.edu.ar-utn-frrq-extracurricular.html-5odg1s.md`](../corpus/web/sac.frrq.utn.edu.ar-utn-frrq-extracurricular.html-5odg1s.md)
  - *Más allá del aula* · 236 caracteres · [original](<https://sac.frrq.utn.edu.ar/utn-frrq-extracurricular.html>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec-obra-ynjhlw.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-obra-ynjhlw.md)
  - *Secretaría Obra, Mantenimiento y Servicios Generales* · 335 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-obra/>)
  - [ ] Queda
  - [ ] Excluir
- [`sac.frrq.utn.edu.ar-utn-frrq-sistemas.html-mh0bww.md`](../corpus/web/sac.frrq.utn.edu.ar-utn-frrq-sistemas.html-mh0bww.md)
  - *Sistemas de Gestión* · 458 caracteres · [original](<https://sac.frrq.utn.edu.ar/utn-frrq-sistemas.html>)
  - [ ] Queda
  - [ ] Excluir
- [`sac.frrq.utn.edu.ar-utn-frrq-solicitar-servicio.html-5odg1s.md`](../corpus/web/sac.frrq.utn.edu.ar-utn-frrq-solicitar-servicio.html-5odg1s.md)
  - *Solicitar un servicio* · 357 caracteres · [original](<https://sac.frrq.utn.edu.ar/utn-frrq-solicitar-servicio.html>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-solicitud-cuenta-zoom-m9vbs8.md`](../corpus/web/www.frrq.utn.edu.ar-solicitud-cuenta-zoom-m9vbs8.md)
  - *Solicitud cuenta Zoom* · 313 caracteres · [original](<https://www.frrq.utn.edu.ar/solicitud-cuenta-zoom/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-solicitud-de-compra-de-material-bibliografico-mljby8.md`](../corpus/web/www.frrq.utn.edu.ar-solicitud-de-compra-de-material-bibliografico-mljby8.md)
  - *SOLICITUD DE COMPRA DE MATERIAL BIBLIOGRÁFICO* · 362 caracteres · [original](<https://www.frrq.utn.edu.ar/solicitud-de-compra-de-material-bibliografico/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-secretarias-sec_academica-office365-solicitud-de-licencia-of-50zxmv.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec_academica-office365-solicitud-de-licencia-of-50zxmv.md)
  - *Solicitud de licencia Office 365 para estudiantes* · 347 caracteres · [original](<https://www.frrq.utn.edu.ar/secretarias/sec_academica/office365/solicitud-de-licencia-office-365-para-estudiantes/>)
  - [ ] Queda
  - [ ] Excluir
- [`sac.frrq.utn.edu.ar-utn-frrq-vinculacion.html-mh0bww.md`](../corpus/web/sac.frrq.utn.edu.ar-utn-frrq-vinculacion.html-mh0bww.md)
  - *Vinculación tecnológica* · 559 caracteres · [original](<https://sac.frrq.utn.edu.ar/utn-frrq-vinculacion.html>)
  - [ ] Queda
  - [ ] Excluir

---

### Duplicados (4)

Casi idénticos entre sí. Conservar uno y excluir el resto.

- [`www.frrq.utn.edu.ar-category-cursos-nnvcy8.md`](../corpus/web/www.frrq.utn.edu.ar-category-cursos-nnvcy8.md)
  - *Cursos* · contenido casi idéntico a otro documento · [original](<https://www.frrq.utn.edu.ar/category/cursos/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-category-extension-2lvbi8.md`](../corpus/web/www.frrq.utn.edu.ar-category-extension-2lvbi8.md)
  - *Extensión* · contenido casi idéntico a otro documento · [original](<https://www.frrq.utn.edu.ar/category/extension/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-category-noticias-awfzlw.md`](../corpus/web/www.frrq.utn.edu.ar-category-noticias-awfzlw.md)
  - *Noticias* · contenido casi idéntico a otro documento · [original](<https://www.frrq.utn.edu.ar/category/noticias/>)
  - [ ] Queda
  - [ ] Excluir
- [`www.frrq.utn.edu.ar-novedades-wrlcy8.md`](../corpus/web/www.frrq.utn.edu.ar-novedades-wrlcy8.md)
  - *Novedades* · contenido casi idéntico a otro documento · [original](<https://www.frrq.utn.edu.ar/novedades/>)
  - [ ] Queda
  - [ ] Excluir


---

# 🔵 Opcional — oferta de extensión e idiomas (25)

Depende de si el asistente responde *"¿qué cursos hay?"* o solo *"¿cuándo me inscribo?"*.
Si el alcance es trámites y vida académica, esta sección es ruido. Si es atención general, se conserva.

- [`www.frrq.utn.edu.ar-escuela-tecnologica-dpy2ev.md`](../corpus/web/www.frrq.utn.edu.ar-escuela-tecnologica-dpy2ev.md)
  - *2025* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/escuela-tecnologica/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-agro-diplomatura-en-administrac-xjhbc8.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-agro-diplomatura-en-administrac-xjhbc8.md)
  - *AO – Agro – Diplomatura en Administración Rural* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-agro-diplomatura-en-administracion-rural/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-diplomatura-en-diseno-y--3jlcy8.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-diplomatura-en-diseno-y--3jlcy8.md)
  - *AO – Diseño – Diplomatura en Diseño y Decoración de Interiores* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-diseno-diplomatura-en-diseno-y-decoracion-de-interiores/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-diplomatura-en-administ-zxnzlw.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-diplomatura-en-administ-zxnzlw.md)
  - *AO – Temario – Diplomatura en Administración de Empresas Express* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-temario-diplomatura-en-administracion-de-empresas-express/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-diplomatura-en-asistenc-cmfslw.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-diplomatura-en-asistenc-cmfslw.md)
  - *AO – Temario – Diplomatura en Asistencia Contable, Impositiva y Laboral* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-temario-diplomatura-en-asistencia-contable-impositiva-y-laboral/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-diplomatura-en-auxiliar-xjhcy8.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-temario-diplomatura-en-auxiliar-xjhcy8.md)
  - *AO – Temario – Diplomatura en Auxiliar de Bancos y Financieras* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-temario-diplomatura-en-auxiliar-de-bancos-y-financieras/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diplomatura-en-grafologia-2dpys8.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diplomatura-en-grafologia-2dpys8.md)
  - *ao-diplomatura-en-grafología* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-diplomatura-en-grafologia/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diplomatura-en-operador-adminis-ltzxmv.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diplomatura-en-operador-adminis-ltzxmv.md)
  - *ao-diplomatura-en-operador-administrativo-avanzado-de-PyMEs* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-diplomatura-en-operador-administrativo-avanzado-de-pymes/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diplomatura-en-preceptoria-esco-2xhci8.md`](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diplomatura-en-preceptoria-esco-2xhci8.md)
  - *ao-diplomatura-en-preceptoría-escolar* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/secretarias/sec-extension/ao-diplomatura-en-preceptoria-escolar/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-2026-curso-diplomatura-en-habilidades-gerenciales-management-glvbi8.md`](../corpus/web/www.frrq.utn.edu.ar-2026-curso-diplomatura-en-habilidades-gerenciales-management-glvbi8.md)
  - *CURSO | DIPLOMATURA EN HABILIDADES GERENCIALES* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/2026/curso-diplomatura-en-habilidades-gerenciales-management-administration/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-cursos-extension-curso-virtual-leer-para-aprender-5kzxiv.md`](../corpus/web/www.frrq.utn.edu.ar-cursos-extension-curso-virtual-leer-para-aprender-5kzxiv.md)
  - *Curso virtual – Leer para aprender* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/cursos-extension/curso-virtual-leer-para-aprender/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-cursos-extension-npb24v.md`](../corpus/web/www.frrq.utn.edu.ar-cursos-extension-npb24v.md)
  - *Cursos de Extensión* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/cursos-extension/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-cursos-escuela-de-idiomas-9tyxmv.md`](../corpus/web/www.frrq.utn.edu.ar-cursos-escuela-de-idiomas-9tyxmv.md)
  - *Cursos Escuela de Idiomas* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/cursos-escuela-de-idiomas/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-cursos-extension-diplomatura-en-literatura-brasilena-xlbmev.md`](../corpus/web/www.frrq.utn.edu.ar-cursos-extension-diplomatura-en-literatura-brasilena-xlbmev.md)
  - *Diplomatura en Literatura Brasileña* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/cursos-extension/diplomatura-en-literatura-brasilena/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-cursos-extension-diplomatura-en-literatura-lusofona-m9uys8.md`](../corpus/web/www.frrq.utn.edu.ar-cursos-extension-diplomatura-en-literatura-lusofona-m9uys8.md)
  - *Diplomatura en Literatura Lusófona* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/cursos-extension/diplomatura-en-literatura-lusofona/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-ei-curso-online-de-aleman-nivel-a-1-1-0xltev.md`](../corpus/web/www.frrq.utn.edu.ar-ei-curso-online-de-aleman-nivel-a-1-1-0xltev.md)
  - *EI – CURSO ONLINE DE ALEMÁN NIVEL A 1.1* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/ei-curso-online-de-aleman-nivel-a-1-1/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-ei-curso-online-de-portugues-nivel-basico-awnvlw.md`](../corpus/web/www.frrq.utn.edu.ar-ei-curso-online-de-portugues-nivel-basico-awnvlw.md)
  - *EI – CURSO ONLINE DE PORTUGUÉS – NIVEL BÁSICO* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/ei-curso-online-de-portugues-nivel-basico/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-ei-curso-virtual-de-italiano-nivel-a1-wtytev.md`](../corpus/web/www.frrq.utn.edu.ar-ei-curso-virtual-de-italiano-nivel-a1-wtytev.md)
  - *EI – Curso Virtual de Italiano – Nivel A1* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/ei-curso-virtual-de-italiano-nivel-a1/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-escuela-de-idiomas-21hcy8.md`](../corpus/web/www.frrq.utn.edu.ar-escuela-de-idiomas-21hcy8.md)
  - *Escuela de Idiomas* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/escuela-de-idiomas/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-cursos-extension-fotografia-wzpys8.md`](../corpus/web/www.frrq.utn.edu.ar-cursos-extension-fotografia-wzpys8.md)
  - *Fotografia* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/cursos-extension/fotografia/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-oferta-laboral-cmfslw.md`](../corpus/web/www.frrq.utn.edu.ar-oferta-laboral-cmfslw.md)
  - *Oferta Laboral* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/oferta-laboral/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-cursos-extension-seminario-claves-para-la-rentabilidad-wrhzc8.md`](../corpus/web/www.frrq.utn.edu.ar-cursos-extension-seminario-claves-para-la-rentabilidad-wrhzc8.md)
  - *Seminario Claves para la Rentabilidad* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/cursos-extension/seminario-claves-para-la-rentabilidad/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-cursos-extension-seminario-de-literatura-infantil-50awwv.md`](../corpus/web/www.frrq.utn.edu.ar-cursos-extension-seminario-de-literatura-infantil-50awwv.md)
  - *Seminario de Literatura Infantil* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/cursos-extension/seminario-de-literatura-infantil/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-cursos-extension-sistema-info-geo-wdlby8.md`](../corpus/web/www.frrq.utn.edu.ar-cursos-extension-sistema-info-geo-wdlby8.md)
  - *Sistema-info-geo* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/cursos-extension/sistema-info-geo/>)
  - [ ] Queda
  - [ ] Excluir

- [`www.frrq.utn.edu.ar-cursos-extension-sistema-info-geo2-dlbziv.md`](../corpus/web/www.frrq.utn.edu.ar-cursos-extension-sistema-info-geo2-dlbziv.md)
  - *Sistema-info-geo2* · oferta de extensión / idiomas · [original](<https://www.frrq.utn.edu.ar/cursos-extension/sistema-info-geo2/>)
  - [ ] Queda
  - [ ] Excluir

---

# ⚪ Limpio (86)

Contenido sustantivo y vigente. Sin acción.

<details>
<summary>Ver los 86 documentos</summary>

- [*1° Congreso de Transición Energética del Norte Santafesino*](../corpus/web/www.frrq.utn.edu.ar-ctensf-w5zzi8.md) · 635 chars
- [*1° Congreso de Transición Energética del Norte Santafesino – Comité científico*](../corpus/web/www.frrq.utn.edu.ar-ctensf-comitecientifico-awnvlw.md) · 10398 chars
- [*1° Congreso de Transición Energética del Norte Santafesino – Como participar*](../corpus/web/www.frrq.utn.edu.ar-ctensf-participa-npcgev.md) · 6138 chars
- [*1° Congreso de Transición Energética del Norte Santafesino – Disertantes*](../corpus/web/www.frrq.utn.edu.ar-ctensf-disertantes-nrlcy8.md) · 7326 chars
- [*1° Congreso de Transición Energética del Norte Santafesino – Inscripción*](../corpus/web/www.frrq.utn.edu.ar-ctensf-inscripcion-2lvbi8.md) · 1127 chars
- [*1° Congreso de Transición Energética del Norte Santafesino – Objetivos*](../corpus/web/www.frrq.utn.edu.ar-ctensf-objetivo-gl2by8.md) · 2195 chars
- [*2024*](../corpus/web/www.frrq.utn.edu.ar-carreras-tup-avda-dmrhlw.md) · 1916 chars
- [*2025*](../corpus/web/www.frrq.utn.edu.ar-carreras-cmfzlw.md) · 1162 chars
- [*2025*](../corpus/web/www.frrq.utn.edu.ar-carreras-lar-2xhci8.md) · 1877 chars
- [*2025*](../corpus/web/www.frrq.utn.edu.ar-carreras-tuhst-ahn0lw.md) · 3049 chars
- [*2025*](../corpus/web/www.frrq.utn.edu.ar-carreras-tul-3r1bc8.md) · 1375 chars
- [*2025*](../corpus/web/www.frrq.utn.edu.ar-carreras-tum-3r1bs8.md) · 1555 chars
- [*Actas / Resoluciones*](../corpus/web/www.frrq.utn.edu.ar-actas-y-resoluciones-actas-resoluciones-25lcy8.md) · 110634 chars
- [*AO – Agro – Administración Rural Express*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-agro-administracion-rural-expre-zxnzlw.md) · 747 chars
- [*AO – Agro – Producción Agropecuaria Express*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-agro-produccion-agropecuaria-ex-zxnzlw.md) · 630 chars
- [*AO – Agro – Programa de Formación en Producción Agropecuaria*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-agro-programa-de-formacion-en-p-fyawev.md) · 722 chars
- [*AO – Diseño – Diseñador CAD*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-disenador-cad-1jywqv.md) · 685 chars
- [*AO – Diseño – Diseñador Gráfico Publicitario*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-disenador-grafico-public-xjpby8.md) · 649 chars
- [*AO – Diseño – Fotografía Básica*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-fotografia-basica-awnhlw.md) · 637 chars
- [*AO – Escolaridad – Auxiliar de Bibliotecas Express*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-diseno-auxiliar-de-bibliotecas--jlc3mv.md) · 929 chars
- [*AO – Escolaridad – Diplomatura Secretariado Escolar*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-escolaridad-secretariado-escola-9syxiv.md) · 928 chars
- [*AO – Escolaridad – Programa de Formación de Preceptores*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-ao-escolaridad-programa-de-formaci-cmvzlw.md) · 1220 chars
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
- [*ASAMBLEA GENERAL ORDINARIA*](../corpus/web/www.frrq.utn.edu.ar-2026-asamblea-general-ordinaria-fundacion-frrq-zycnev.md) · 607 chars
- [*Beca de Investigación y Servicios 2026*](../corpus/web/www.frrq.utn.edu.ar-beca-de-investigacion-y-servicios-2026-mdi2lw.md) · 666 chars
- [*Becas 2026*](../corpus/web/www.frrq.utn.edu.ar-becas-2026-iwmjyv.md) · 2367 chars
- [*Bibliotea_Historia*](../corpus/web/www.frrq.utn.edu.ar-bibl_historia-9yawev.md) · 2551 chars
- [*Biblioteca*](../corpus/web/www.frrq.utn.edu.ar-biblioteca-rly2ev.md) · 5179 chars
- [*Biblioteca repositorio*](../corpus/web/www.frrq.utn.edu.ar-biblioteca-repositorio-9yaw8v.md) · 1259 chars
- [*Calendario Académico 2025/2026*](../corpus/web/www.frrq.utn.edu.ar-calendario-academico-2025-2026-jayni8.md) · 1708 chars
- [*Calendario Académico 2026/2027*](../corpus/web/www.frrq.utn.edu.ar-calendario-academico-2026-2027-jayny8.md) · 1725 chars
- [*Calendario de Reuniones Ordinarias de Consejo Directivo*](../corpus/web/www.frrq.utn.edu.ar-calendario-de-reuniones-ordinarias-de-consejo-directivo-rpdm8v.md) · 6344 chars
- [*calendario-de-reuniones-ordinarias-de-consejo-directivo-2026*](../corpus/web/www.frrq.utn.edu.ar-calendario-de-reuniones-ordinarias-de-consejo-directivo-2026-jayni8.md) · 2405 chars
- [*Carreras a Distancia*](../corpus/web/www.frrq.utn.edu.ar-carreras-carreras-a-distancia-y2lhlw.md) · 1668 chars
- [*Ciclo de Licenciatura en Higiene y Seguridad en el Trabajo*](../corpus/web/www.frrq.utn.edu.ar-carreras-clhst-ahn0lw.md) · 2672 chars
- [*Concurso Docente*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec_academica-concurso-docente-w50zs8.md) · 1660 chars
- [*CURSO*](../corpus/web/www.frrq.utn.edu.ar-2026-curso-gestion-de-costos-de-obra-2jyys8.md) · 2625 chars
- [*CURSO*](../corpus/web/www.frrq.utn.edu.ar-2026-curso-prod-hidropo-b3bvlw.md) · 1629 chars
- [*CURSO | AIRES MINISPLIT, PISO TECHO Y BAJA SILUETA: MANTENIMIENTO E INSTALACION*](../corpus/web/www.frrq.utn.edu.ar-2026-curso-aa-minisplit-techo-y2hvlw.md) · 1821 chars
- [*CURSO | FOTOGRAFÍA DIGITAL*](../corpus/web/www.frrq.utn.edu.ar-2026-curso-fotografia-digital-nivel-1-vsltev.md) · 1375 chars
- [*CURSO: PROTECCIONES ELÉCTRICAS*](../corpus/web/www.frrq.utn.edu.ar-2026-curso-protect-elect-gvjdc8.md) · 1632 chars
- [*Cursos de idiomas*](../corpus/web/www.frrq.utn.edu.ar-cursos-de-idiomas-bwfzlw.md) · 625 chars
- [*Cursos demo*](../corpus/web/www.frrq.utn.edu.ar-carreras-cursos-demo-zw1vlw.md) · 6941 chars
- [*DIPLOMATURA*](../corpus/web/www.frrq.utn.edu.ar-2026-diplomatura-ia-en-accion-aw9ulw.md) · 1663 chars
- [*Horarios Carreras Grado*](../corpus/web/www.frrq.utn.edu.ar-horarios-carreras-grado-ywrvlw.md) · 5330 chars
- [*Horarios Tecnicaturas*](../corpus/web/www.frrq.utn.edu.ar-horarios-tecnicaturas-xjhcy8.md) · 3402 chars
- [*inicio_extension*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-inicio_extension-2lvbi8.md) · 628 chars
- [*Institucional*](../corpus/web/www.frrq.utn.edu.ar-institucional-9uywwv.md) · 5592 chars
- [*Internacionales*](../corpus/web/sac.frrq.utn.edu.ar-utn-frrq-internacionales.html-5odg1s.md) · 835 chars
- [*Internos-correos*](../corpus/web/www.frrq.utn.edu.ar-internos-correos-jlb3mv.md) · 4033 chars
- [*jornada-de-programación – inscripción*](../corpus/web/www.frrq.utn.edu.ar-jornada-de-programacion-inscripcion-aw9ulw.md) · 679 chars
- [*jornada-de-programación – jornada*](../corpus/web/www.frrq.utn.edu.ar-jornada-de-programacion-jornada-5hzgev.md) · 822 chars
- [*Jornadas de Promoción*](../corpus/web/www.frrq.utn.edu.ar-id-jornadas-de-promocion-2lvbi8.md) · 6699 chars
- [*La Facultad*](../corpus/web/sac.frrq.utn.edu.ar-utn-frrq-facultad.html-mh0bww.md) · 622 chars
- [*Laboratorios*](../corpus/web/www.frrq.utn.edu.ar-laboratorios-2-cy0ylw.md) · 3679 chars
- [*Laboratorios*](../corpus/web/www.frrq.utn.edu.ar-laboratorios-mlvcy8.md) · 12090 chars
- [*Lista de Graduados*](../corpus/web/www.frrq.utn.edu.ar-lista-de-graduados-wrvcy8.md) · 5697 chars
- [*Nodocentes FRRq*](../corpus/web/www.frrq.utn.edu.ar-nodocentes-frrq-njycs8.md) · 1499 chars
- [*Noticias*](../corpus/web/www.frrq.utn.edu.ar-novedades-noticias-2lhcy8.md) · 2237 chars
- [*Office365*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec_academica-office365-mzy1lw.md) · 2645 chars
- [*PLANIFICAR SANTA FE*](../corpus/web/www.frrq.utn.edu.ar-planificar-santafe-gfmzs8.md) · 2277 chars
- [*PLANTILLA DOCENTE IEM – NIVEL 1*](../corpus/web/www.frrq.utn.edu.ar-carreras-ie-plantilla-docente-iem-nivel-1-bc0xlw.md) · 2149 chars
- [*PLANTILLA DOCENTE IEM – NIVEL 2*](../corpus/web/www.frrq.utn.edu.ar-carreras-ie-plantilla-docente-iem-nivel-2-bc0ylw.md) · 2412 chars
- [*PLANTILLA DOCENTE IEM – NIVEL 3*](../corpus/web/www.frrq.utn.edu.ar-carreras-ie-plantilla-docente-iem-nivel-3-bc0zlw.md) · 2164 chars
- [*PLANTILLA DOCENTE IEM – NIVEL 4*](../corpus/web/www.frrq.utn.edu.ar-carreras-ie-plantilla-docente-iem-nivel-4-bc00lw.md) · 1941 chars
- [*PLANTILLA DOCENTE IEM – NIVEL 5*](../corpus/web/www.frrq.utn.edu.ar-carreras-ie-plantilla-docente-iem-nivel-5-bc01lw.md) · 2958 chars
- [*Posgrado Especialización y Maestría en Minería de Datos*](../corpus/web/www.frrq.utn.edu.ar-carreras-posgrado-especializacion-y-maestria-en-mineria-de-d-f0b3mv.md) · 23802 chars
- [*Retiro de licencias Microsoft A1 Plus para estudiantes*](../corpus/web/www.frrq.utn.edu.ar-retiro-de-licencias-microsoft-a1-plus-para-estudiantes-nrlcy8.md) · 1484 chars
- [*Secretaría Administrativa*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec_administrativa-gl2ys8.md) · 3076 chars
- [*Secretarías*](../corpus/web/www.frrq.utn.edu.ar-secretarias-awfzlw.md) · 760 chars
- [*Solicitud Autodesk Educativo*](../corpus/web/www.frrq.utn.edu.ar-solicitud-autodesk-educativo-rpdm8v.md) · 1077 chars
- [*SOLICITUD DE LIBRE DEUDA DE BIBLIOTECA*](../corpus/web/www.frrq.utn.edu.ar-biblioteca-libre-deuda-biblioteca-gvjys8.md) · 651 chars
- [*Tecnicatura Universitaria en Ciudades Inteligentes*](../corpus/web/www.frrq.utn.edu.ar-carreras-tuci-r1y2kv.md) · 2627 chars
- [*Tecnicatura Universitaria en Procesos Industriales*](../corpus/web/www.frrq.utn.edu.ar-carreras-tupi-r1cgkv.md) · 1491 chars
- [*UTN RECONQUISTA*](../corpus/web/www.frrq.utn.edu.ar-lmfylw.md) · 3248 chars
- [*Vinculación Tecnológica*](../corpus/web/www.frrq.utn.edu.ar-secretarias-sec-extension-vinculacion-tecnologica-dpy2ev.md) · 1354 chars

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
