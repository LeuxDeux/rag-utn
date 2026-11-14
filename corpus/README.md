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

## Recordatorio

- Los datos volátiles (aranceles, fechas que cambian) **no van acá**.
  Van como fuente `mode: live` en `sources.yaml`.
- Si el corpus es privado, descomentá `corpus/*` en `.gitignore`.
