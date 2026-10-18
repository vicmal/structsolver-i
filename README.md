# StructSolver I — Análisis Estructural Estático

> **v1.5.2** — Cargas distribuidas con dirección vertical, horizontal,
> perpendicular a la barra o con ángulo personalizado; componentes globales y
> locales completas en reacciones, despiece y diagramas.
> **v1.5.1** — Tramo distribuido por coordenada X global.
> **v1.5.0** — Cargas puntuales y pares con posición; distribuidas parciales
> (uniforme/triangular con Desde/Hasta); centroide triangular corregido;
> diagramas V/M exactos por tramos.
> **v1.4.4** — Parábola de momento suavizada (25 puntos de muestreo en diagramas).
> Diagramas V/M/N por miembro corregidos (valores del solucionador), diagramas
> V–M por miembro en el PDF, exportación del diagrama de la estructura reparada.
> Método **GD = 3N − V** del profesor como método principal (notación GD/N/V
> del video n.º 1), conversión guiada a isostática, solucionador por despiece
> (reacciones con rótulas internas), despiece elemento por elemento con
> ecuaciones V(s)/M(s), e instalación como app (PWA) con ícono propio.

Aplicación web de ingeniería estructural en un único archivo `index.html`.  
Funciona completamente **offline** — abre con doble clic en cualquier navegador moderno.

---

## Módulos disponibles

| # | Módulo | Descripción |
|---|---|---|
| 1 | **Estabilidad y Determinación** | Cuatro métodos: **Clase (GD = 3N−V)** · Clásico · CCM · I vs E + conversión guiada |
| 2 | **Arco Triarticulado** | Reacciones externas + verificación |
| 3 | **Armadura — Método de Nodos** | Fuerzas T/C en cada barra |
| 4 | **Armadura — Método de Secciones** | Sistema 3×3 por corte |
| 5 | **Pórtico Isostático** | Reacciones (solucionador por despiece, con rótulas) + diagramas V, M, N + despiece elemento por elemento + ecuaciones V(s), M(s) |
| 6 | **Estructura II** *(reservado)* | Motor matricial de rigidez preparado |

---

## Funcionalidades

- Canvas SVG interactivo con snap-to-grid, zoom y pan
- Rótulas internas ⊣⊢ con símbolo visual y descuento en fórmula
- Cuatro métodos de análisis en Módulo 1 (el método de clase **GD = 3N − V** es el principal,
  con tabla de restricciones por nudo: rígido 3(k−1), rótula −1):
  - `f = 3m + r − 3n − h` (Método clásico)
  - `GL = 3n + 2a − 2Σmi` (Cadena Cinemática Mixta)
  - `I = 3B + R_ext` vs `E = 3N + Ec` (Indeterminación estática)
- Verificación de estabilidad geométrica automática
- **Conversión guiada a isostática**: libera vínculos (apoyo / rótula) uno por vez,
  con deshacer y verificación de GL = 0 en vivo
- **Solucionador isostático por despiece**: resuelve pórticos con rótulas internas
  (el método anterior solo cubría casos simples sin rótulas)
- **Despiece elemento por elemento**: N, V, M en cada extremo, ecuaciones V(s) y M(s),
  M máx y verificación de equilibrio por nudo
- Instalable como app (PWA): manifest + iconos + modo offline
- Exportación PDF con secciones a), b), c), d) completas
- Guardar / cargar sesión en JSON
- Compatible con formato JSON de otras herramientas

---

## Uso

```
1. Abrir index.html en el navegador
2. Seleccionar módulo en la barra superior
3. Colocar nodos con click en el canvas (herramienta Nodo)
4. Conectar barras arrastrando entre nodos (herramienta Barra)
5. Click derecho → aplicar cargas, apoyos, rótulas
6. Presionar ▶ Calcular
7. Exportar PDF con 📄
```

---

## Dependencias externas (CDN)

| Librería | Versión | Uso |
|---|---|---|
| jsPDF | 2.5.1 | Exportación PDF |
| Google Fonts (Inter, JetBrains Mono) | — | Tipografía |

No requiere instalación ni servidor local.

---

## Compatibilidad con JSON externo

El cargador acepta JSON de otras herramientas con campos:
- `i` / `j` en lugar de `ni` / `nj` para barras
- `support: "free"` → `none`, `"rollerY"` → `roller_v`, etc.
- `hinge: true` para rótulas internas

---

## Estructura del código

```
index.html
│
├── CSS (variables, layout, canvas, paneles)
│
└── JavaScript
    ├── 1. Estado global (AppState)
    ├── 2. Motor matemático (Gauss, Cramer)
    ├── 3. Motor SVG (drawNode, drawBar, drawLoad...)
    ├── 4. Interacción canvas (click, drag, zoom, pan)
    ├── 5. Tooltip de nodo y menú contextual
    ├── 6. Tablas formulario (nodos, barras, cargas)
    ├── 7. Módulos de cálculo (1–5)
    ├── 8. Motor pórticos (V, M, N por tramo)
    ├── 9. [Reservado] Motor matricial rigidez (Estructura II)
    ├── 10. Exportación PDF
    ├── 11. Guardar / cargar sesión JSON
    └── 12. Inicialización y ejemplos
```

---

## Asignatura

**Estructura I** — Instituto Universitario Politécnico "Santiago Mariño"  
Extensión Porlamar · Profa. Y. Mujica

---

## Versión

`1.4.0` — Octubre 2026 — Método GL de clase, conversión guiada, solucionador por
despiece, despiece con ecuaciones y PWA.

`1.3.0` — Octubre 2026  
Desarrollado con Claude (Anthropic) · StructSolver I
