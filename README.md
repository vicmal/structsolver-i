# StructSolver I — carpeta lista para publicar

Aplicación web de análisis estructural estático e hiperestático en un solo
archivo HTML, con service worker para uso sin conexión.

## Contenido

- `index.html` — la aplicación completa (versión corregida 25/11/2026).
- `sw.js` — service worker: guarda la aplicación en caché tras la primera
  carga; las fuentes de Google y jsPDF del CDN se guardan en la primera
  visita y se revalidan en segundo plano.
- `manifest.json` — manifiesto PWA (nombre, colores, íconos, pantalla completa).
- `icons/` — `favicon-32.png`, `icon-192.png`, `icon-512.png` y
  `apple-touch-icon.png`, con el logo de la aplicación.

## Correcciones aplicadas (25/11/2026)

- Módulo 3 (`calcNodos`): las cargas puntuales verticales (`Fy`) sobre nodos
  ahora entran en el equilibrio nodal.
- Módulo 2 (`calcArco`): los momentos concentrados a la derecha de la rótula
  ya no contaminan la ecuación de la clave izquierda.
- `deleteNode`: al eliminar un nodo se eliminan también sus barras y todas
  las cargas sobre el nodo y sobre esas barras.
- `addBar`: no permite crear barras de longitud cero (mismo nodo en ambos
  extremos).
- `saveSession`: descarga del JSON por `Blob` en lugar de Data URI.
- `confirmNode`: entradas no numéricas ya no producen `NaN`.
- Config: etiquetas `<label for>` en todos los controles; regla responsiva
  para pantallas de menos de 900 px.
- Sintaxis: el archivo original traía escapes `\n` emitidos como saltos de
  línea reales dentro de cadenas y de un regex, por lo que el `<script>`
  principal no se podía interpretar; todos quedaron reparados.

## Publicar en GitHub Pages

1. Crea un repositorio (por ejemplo `structsolver`) y sube el contenido de
   esta carpeta a la rama principal.
2. En el repositorio: Settings → Pages → Source: Deploy from a branch →
   Branch: `main` → carpeta `/ (root)` → Save.
3. La aplicación quedará en `https://<usuario>.github.io/structsolver/`.

## Probar en local antes de publicar

Desde esta carpeta, ejecuta `python3 -m http.server 8000` y abre
`http://localhost:8000/` en el navegador. El service worker solo funciona
servido por http(s) o localhost, no abriendo el archivo con doble clic.
