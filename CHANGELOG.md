# Changelog — StructSolver I

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
