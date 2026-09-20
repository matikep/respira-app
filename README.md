# Sistema de Regulación Respiratoria

App React (Vite + Tailwind v4) de regulación respiratoria: triage y 30 ejercicios guiados en 5 categorías (asma, alivio, calma, zen y relajación). La base clínica está en [`docs/guia-respiratoria.md`](docs/guia-respiratoria.md).

Cada ejercicio indica su nivel de evidencia, la fuente contra la que se validó y sus precauciones. **Uso educativo: no reemplaza la evaluación ni el tratamiento médico.**

## Cómo correrlo

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # build de producción en dist/
npm run preview   # sirve el build de producción
```

Requiere Node 18+. La única dependencia externa en tiempo de ejecución es la carga de fuentes de Google Fonts (Sora, Figtree, JetBrains Mono) vía `@import` en `src/index.css` — si vas a desplegarlo sin acceso a internet en el cliente, aloja esas fuentes localmente.

## Estructura

```
src/
  data/
    exercises.js          # categorías, niveles de evidencia y fases de cada ejercicio
    protocolContent.js     # triage, pasos del inhalador, tabla comparativa, red flags
  hooks/
    useBreathEngine.js      # motor genérico de fases/ciclos/duración para cualquier ejercicio
  components/
    BreathRing.jsx          # elemento firma: el orbe que crece/encoge con la respiración
    ExercisePlayer.jsx      # reproductor genérico (usa el motor + el anillo)
    VagalReset.jsx          # descarga de tensión: Fase A (hombros) + Fase B (suspiro cíclico)
    Catalog.jsx             # recomendado según la hora, filtros y carruseles por categoría
    About.jsx               # acerca del proyecto, fuentes y autoría
    InhalerProtocol.jsx     # protocolo del inhalador — fuera de la navegación por ahora, pendiente de mejorar
    Triage.jsx
    ComparisonTable.jsx
    RedFlagBanner.jsx
  App.jsx                   # dock inferior (Inicio / Ejercicios / Calma / Alertas / Acerca)
```

Todo el contenido clínico vive en `src/data/`, no está mezclado en el JSX — así el markdown de referencia y la app pueden mantenerse sincronizados editando un solo lugar.

## Decisiones de diseño

**Dirección visual: Aurora.** Cielo nocturno con auroras que derivan lento detrás de superficies de vidrio esmerilado; en modo claro, un amanecer lavanda. Se adapta a `prefers-color-scheme`.

**Color semántico.** Menta = inhalar / calma, durazno = exhalar / alivio, pervinca = retener / zen, orquídea = relajación, cielo = asma. El coral queda reservado *solo* para señales médicas y precauciones.

**Tipografía.** `Sora` para títulos, `Figtree` para texto y `JetBrains Mono` para los temporizadores y ritmos.

**El elemento firma: el orbe de respiración.** En vez de una barra de progreso circular que se "rellena" y debe resetearse de golpe entre fases (el problema de la versión HTML anterior), el orbe escala literalmente: crece durante la inhalación, se encoge durante la exhalación y queda quieto en las retenciones. Como cada fase continúa desde el tamaño exacto donde terminó la anterior, nunca hay un salto ni una animación "hacia atrás" — el ciclo es continuo por diseño, no por parche. El mismo componente se reutiliza en las cuatro pantallas de la app.

**Reduced motion.** `src/index.css` respeta `prefers-reduced-motion` desactivando animaciones y transiciones.
