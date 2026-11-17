# Corpus

Documentos crudos que el asistente puede citar.

## Fase 0

Poné acá 10 archivos `.txt` o `.md` copiados y pegados de la web de la
universidad: calendario, aranceles, admisión, equivalencias, becas, contacto.

`ejemplo.txt` es un documento de prueba para que el pipeline tenga algo que
indexar desde el minuto cero. Borralo cuando tengas material real.

## Fase 1

PDFs (reglamentos, planes de estudio). Antes de indexar, **leé el texto
extraído a ojo**. Si tiene columnas mezcladas o encabezados repetidos, pará
y arreglá el parseo: ningún modelo lo compensa.

`pdf/` sale de `npm run import:pdf` (lista en `pdf-fuentes.yaml`, manifiesto en
`pdf/_import.json`). El conversor quita encabezados y pies repetidos, números de
página y líneas de OCR ilegibles, junta las líneas cortadas y descarta los
escaneados sin texto. En las tablas de correlatividades deja solo la lista de
materias («Física II (materia n.º 9).») y una nota que manda al PDF: con los
números de correlativas, el modelo chico las mezclaba y respondía datos falsos.
`CORRELATIVAS=1 npm run import:pdf` las escribe como oraciones, para probar con
un modelo más grande.

## Recordatorio

- Los datos volátiles (aranceles, fechas que cambian) **no van acá**.
  Van como fuente `mode: live` en `sources.yaml`.
- Si el corpus es privado, descomentá `corpus/*` en `.gitignore`.
