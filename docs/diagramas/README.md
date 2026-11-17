# Diagramas interactivos

Dos mapas del sistema, generados con [Archify](https://github.com/tt-a1i/archify).
Cada uno es un **HTML autocontenido**: se abre en el navegador sin instalar nada
y se puede mandar por correo o publicar.

| Archivo | Qué muestra |
|---|---|
| [`sistema-global.html`](./sistema-global.html) | El sistema completo: corpus curado → ingesta → Postgres → búsqueda híbrida → prompt → Ollama, más los datos vigentes y la caché |
| [`runtime-go.html`](./runtime-go.html) | Una consulta a través de los paquetes Go: `api_publica` → `Servicio` → `Hibrido` → `ArmarMensajes` → LLM → `ValidarCitas` |

Cada `.html` tiene su fuente en el `.json` del mismo nombre, que es lo que se edita.

## Cómo se leen

- Clic en un nodo: detalle y relaciones.
- `R` o **PATH**: sigue una ruta entre dos nodos.
- `M` o **MAP**: vista general.
- `S` cambia el estilo, `T` el tema, `E` exporta imagen.

## Cómo se regeneran

Son una **foto**, no documentación viva: si cambia la arquitectura, hay que
regenerarlos. La skill está instalada en `~/.agents/skills/archify`.

```powershell
$archify = "$env:USERPROFILE\.agents\skills\archify\bin\archify.mjs"
node $archify finalize architecture docs\diagramas\sistema-global.json docs\diagramas\sistema-global.html --quality showcase
node $archify finalize architecture docs\diagramas\runtime-go.json docs\diagramas\runtime-go.html --quality showcase
```

`finalize` valida el esquema, renderiza el HTML y lo verifica en un navegador
real antes de dejarlo. Si falla, el mensaje dice qué nodo o etiqueta ajustar.

## Nota sobre la fidelidad

Se generaron **desde una descripción**, no escaneando el código, porque la
arquitectura cruza dos repositorios (`rag` y `webapp-utn`) y una base de datos:
un escaneo de cualquiera de los dos mostraría media verdad. Los datos —253
documentos, 4.162 fragmentos, 56 vigentes— corresponden al 17/11/2026.

Si el diagrama y el código discrepan, gana el código.
