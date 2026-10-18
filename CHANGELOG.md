# Changelog — StructSolver I

## v1.6.0 — Octubre 2026 (cargas distribuidas con dirección)
### Agregado
- **Dirección configurable en distribuidas:** las cargas uniforme y triangular
  aceptan dirección: Vertical (defecto), Horizontal, Perpendicular a la barra
  o Ángulo personalizado (grados antihorario desde +x). Nueva función
  `dirVector` como única fuente de verdad; el solucionador descompone la
  resultante en (Fx,Fy) con brazos cruzados; `internalForcesAt` y
  `memberEquations` usan la componente transversa (d·ŷ) y axial (d·x̂);
  el dibujo traza las flechas en la dirección elegida. Permite modelar W1
  (horizontal sobre barra inclinada) y W3 (triangular horizontal sobre
  columna) sin discretizar en puntuales. Verificado: mismas reacciones que
  la discretización (A:91,42,429; H:-86,84).
- Caché del service worker: `structsolver-v152` → `structsolver-v160`.

## v1.5.2 — Octubre 2026 (renombre de rótula)
### Cambiado
- **"Rótula interna" → "Rótula extrema":** en leyenda, menú contextual,
  tabla de barras y mensajes. El nombre anterior confundía (parecía dentro
  de la barra); el nuevo alude a que va en un extremo.
- Caché del service worker: `structsolver-v151` → `structsolver-v152`.

## v1.5.1 — Octubre 2026 (tramo de distribuida por coordenada X)
### Agregado
- **Modo de tramo por coordenada X:** en las cargas distribuidas (uniforme y
  triangular), el tramo puede definirse por **coordenada X global** (m) en vez
  de fracción de barra (0–1). Útil cuando el enunciado da la carga por
  proyección horizontal: se entra el rango en X y la app lo convierte a
  fracción. En barras verticales el modo X se deshabilita (ahí solo vale
  fracción). Disponible tanto en el menú contextual de la barra como en
  "Agregar carga".
- Caché del service worker: `structsolver-v150` → `structsolver-v151`.

## v1.5.0 — Octubre 2026 (cargas posicionadas y distribuidas parciales)
### Agregado
- **Posición para cargas puntuales y pares:** el formulario "Agregar carga" ahora
  pide la posición en la barra (0 = inicio, 1 = fin) cuando el elemento es una
  barra. Las puntuales y los pares sobre barras se dibujan en su posición y
  entran al despiece con su brazo de momento correcto.
- **Distribuidas parciales:** las cargas uniforme y triangular aceptan
  "Desde" y "Hasta" (fracción de barra). Permite modelar, por ejemplo, una
  triangular que empieza a medio vano.
### Corregido
- **Centroide de la carga triangular:** la fórmula estaba invertida
  (`L·(2·qi+qj)/(3·(qi+qj))` en vez de `L·(qi+2·qj)/(3·(qi+qj))`); para un
  triángulo 0→máx daba el centroide a 1/3 del extremo cero en vez de 2/3.
  Nunca se había ejercitado con una triangular real.
- **Diagramas V(s)/M(s) exactos por tramos:** nueva función `internalForcesAt`
  que integra cada carga parcial en su intervalo (la triangular genera la
  cúbica correcta en M, no la aproximación parabólica anterior) e incluye los
  saltos de los pares concentrados. Las ecuaciones del despiece se muestran
  por tramos.
- Caché del service worker: `structsolver-v144` → `structsolver-v150`.

## v1.4.4 — Octubre 2026 (parábola de momento suavizada)
### Corregido
- **Diagrama de momento facetado:** la curva M(s) se dibujaba con solo 5 puntos
  y a gran escala se veía como una V puntiaguda en vez de una parábola.
  Ahora los diagramas se muestrean con 25 puntos (curva suave), tanto en el
  canvas como en el PDF.
- Caché del service worker: `structsolver-v143` → `structsolver-v144`.

## v1.4.3 — Octubre 2026 (diagramas y PDF corregidos)
### Corregido
- **Valores de diagramas por miembro:** `Vmax`/`Mmax` se construían con un
  cálculo legado que usaba reacciones de apoyo en vez de los extremos de barra
  del solucionador (la viga mostraba V_max = 30 en vez de 15). Ahora los puntos
  V(s)/M(s)/N(s) salen del despiece verificado; se agrega columna `N_max`.
- **PDF sin diagrama:** la exportación SVG→PNG fallaba en silencio porque el
  SVG no tenía `width`/`height` (rasterizaba a 0×0). Se clona con dimensiones
  explícitas y se protege la altura de la imagen.
- **Caracteres corruptos en el PDF:** `θ` y `⊣⊢` no existen en las fuentes de
  jsPDF y salían como basura; se reemplazaron por `Ang.` y `(rot.)`.
### Agregado
- **Diagramas V–M por miembro en el PDF:** mini-diagramas cartesianos elegantes
  (eje cero, curva, valor máximo rotulado) con sus ecuaciones V(s)/M(s).

## v1.4.2 — Octubre 2026 (notación del profesor)
### Cambiado
- **Notación del método de clase:** `GL = 3n − p` → **`GD = 3N − V`**,
  tal como la escribe el profesor en el pizarrón del video n.º 1
  (N = n.º de elementos, V = Vext + Vint). Etiquetas del Módulo 1, tabla
  comparativa, panel de conversión y mensajes de estado actualizados;
  la matemática no cambia (mismos resultados). Los métodos secundarios
  ②③④ conservan su notación propia.
- Caché del service worker: `structsolver-v141` → `structsolver-v142`
  (obliga al teléfono a tomar la versión nueva).

## v1.4.1 — Octubre 2026 (corrección Bug #1)
### Corregido
- **Choque de notación en el Módulo 1:** el apartado a) Identificación usaba `n` para nudos
  mientras el método ① `GL = 3n − p` usa `n` para barras — el panel mostraba `n = 10`
  y `n = 11` a la vez y parecía un error de cálculo. Ahora el apartado a) usa
  etiquetas por palabras (`Nudos:`, `Barras:`, `Reacciones:`) y el método ① aclara
  `n = 11 (n° de barras — en el método de clase, n cuenta barras)`; se conserva
  `GL = 3n − p` como lo enseña el profesor
- **Aviso de resultados desactualizados:** si la estructura cambia después de calcular,
  el panel muestra `⚠ desactualizado` y un banner "presiona ▶ Calcular para actualizar
  los resultados" (firma del modelo + `checkStale()`); antes los resultados viejos
  quedaban visibles sin advertencia

## v1.4.0 — Octubre 2026
### Agregado
- Módulo 1: **método de clase GL = 3n − p como método principal** (①), con tabla de
  restricciones externas e internas por nudo (rígido: 3(k−1), rótula: −1); los
  métodos anteriores pasan a ②③④ como verificación
- **Conversión guiada a isostática**: panel interactivo que libera vínculos uno por
  vez (cambio de apoyo / inserción de rótula con extremo elegible), con historial,
  deshacer y verificación de GL = 0 en vivo
- **Solucionador isostático por despiece** (método de los miembros): resuelve
  reacciones de pórticos isostáticos con rótulas internas, por sistema lineal
  (3 ecuaciones por barra + 3 por nudo interior, eliminación gaussiana)
- **Despiece elemento por elemento**: N, V, M en cada extremo de barra, ecuaciones
  V(s) y M(s), M máximo y su posición, verificación de equilibrio por nudo
- Rótulas con extremo asignable (ni/nj) en tabla de barras y menú contextual
- PDF del Módulo 1 incluye el método de clase
- **PWA**: manifest.json, iconos (192/512/maskable/Apple) con ícono nuevo,
  service worker con caché offline, instalable en el teléfono

## v1.3.0 — Octubre 2026
### Agregado
- Módulo 1: tres métodos de análisis en paralelo
  - Método clásico: `f = 3m + r − 3n − h`
  - Cadena Cinemática Mixta (CCM): `GL = 3n + 2a − 2Σmi`
  - Indeterminación estática: `I = 3B + R_ext` vs `E = 3N + Ec`
- Tabla comparativa de los tres métodos en pantalla y PDF
- Plan de estabilización con opciones concretas (sección d)
- PDF exporta secciones a), b), c), d) completas con cajas de color

## v1.2.0 — Septiembre 2026
### Agregado
- Rótulas internas ⊣⊢ en barras
  - Símbolo visual en canvas (líneas perpendiculares + círculo amarillo + M=0)
  - Checkbox en tabla de barras
  - Menú contextual: insertar / quitar rótula
  - Descuento automático en fórmula: `−h`
- Ejemplo precargado Módulo 1 con pórtico tipo asignación 1er corte
- Contador de rótulas en barra de estado inferior

### Corregido
- Bug: fórmula de armadura aplicada a pórticos (ahora detecta tipo automáticamente)
- Bug: tipo de barra siempre `truss` en módulos 1–4
- Importador JSON compatible con formato externo (`i/j`, `rollerY`, `free`, `hinge`)

## v1.1.0 — Septiembre 2026
### Agregado
- Módulo 1: secciones a) Identificación, b) Análisis, c) Estabilización, d) Inclusión/eliminación
- Verificación de estabilidad geométrica (reacciones paralelas, rodillos concurrentes, nodos aislados)
- Exportación PDF mejorada con imagen del canvas y pie de página numerado

## v1.0.0 — Septiembre 2026
### Inicial
- Canvas SVG interactivo (nodos, barras, cargas, apoyos)
- Módulos 1–5 funcionales
- Motor matemático: Gauss, Cramer 2×2 y 3×3
- Exportación PDF básica
- Guardar / cargar sesión JSON
- Motor matricial de rigidez reservado para Estructura II
