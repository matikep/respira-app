# Sistema de Regulación Respiratoria

App React (Vite + Tailwind v4) para el triage, los ejercicios y el protocolo de inhalador descritos en [`docs/guia-respiratoria.md`](docs/guia-respiratoria.md).

## Cómo correrlo

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # build de producción en dist/
npm run preview   # sirve el build de producción
```

Requiere Node 18+. La única dependencia externa en tiempo de ejecución es la carga de fuentes de Google Fonts (Fraunces, IBM Plex Sans, IBM Plex Mono) vía `@import` en `src/index.css` — si vas a desplegarlo sin acceso a internet en el cliente, aloja esas fuentes localmente.

## Estructura

```
src/
  data/
    exercises.js          # fases de cada ejercicio (labios fruncidos, CO2, box breathing, vagal)
    protocolContent.js     # triage, pasos del inhalador, tabla comparativa, red flags
  hooks/
    useBreathEngine.js      # motor genérico de fases/ciclos/duración para cualquier ejercicio
  components/
    BreathRing.jsx          # elemento firma: el anillo que crece/encoge con la respiración
    ExercisePlayer.jsx      # reproductor genérico (usa el motor + el anillo)
    VagalReset.jsx          # encadena Fase A (reps isométricas) y Fase B (suspiro fisiológico)
    InhalerProtocol.jsx     # stepper del protocolo clínico, con temporizadores propios
    Triage.jsx
    ComparisonTable.jsx
    RedFlagBanner.jsx
    CalmaRapidaButton.jsx   # acceso directo flotante a labios fruncidos, sin pasar por el triage
  App.jsx                   # navegación por pestañas (Triage / Catálogo / Inhalador / Referencia)
```

Todo el contenido clínico vive en `src/data/`, no está mezclado en el JSX — así el markdown de referencia y la app pueden mantenerse sincronizados editando un solo lugar.

## Decisiones de diseño

**Color.** Base carbón azulado (`#0f1618`), no negro puro — más clínico, menos "app de moda". Acento de inhalación verde-azulado apagado (`#5fa8a0`), acento de exhalación arena cálida (`#d3ab74`, deliberadamente evitando el terracota genérico), acento de retención azul grisáceo (`#8aa6c8`). El rojo de alarma (`#c4574b`) está apagado y reservado *solo* para la sección de señales médicas — nunca se usa como acento decorativo.

**Tipografía.** `Fraunces` (serif humanista) para títulos, con restricción; `IBM Plex Sans` para cuerpo de texto; `IBM Plex Mono` con cifras tabulares para los números del temporizador — la precisión clínica del monoespaciado le da peso a la cuenta regresiva.

**El elemento firma: el Anillo de Respiración.** En vez de una barra de progreso circular que se "rellena" y debe resetearse de golpe entre fases (el problema de la versión HTML anterior), el anillo escala literalmente: crece durante la inhalación, se encoge durante la exhalación y queda quieto en las retenciones. Como cada fase continúa desde el tamaño exacto donde terminó la anterior, nunca hay un salto ni una animación "hacia atrás" — el ciclo es continuo por diseño, no por parche. El mismo componente se reutiliza en las cuatro pantallas de la app.

**Reduced motion.** `src/index.css` respeta `prefers-reduced-motion` desactivando animaciones y transiciones.
