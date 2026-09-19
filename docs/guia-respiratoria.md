# Sistema Integral de Regulación Respiratoria y Manejo de Crisis

> **Aviso médico obligatorio.** Esta herramienta y sus ejercicios tienen fines exclusivamente educativos, de apoyo técnico y de autorregulación del patrón respiratorio. **No reemplazan la evaluación, diagnóstico ni tratamiento médico profesional.** Ante una crisis respiratoria aguda severa, dolor de pecho opresivo, cianosis o cualquier señal de alarma, suspende el uso y acude de inmediato al centro asistencial de urgencia más cercano (SAPU, CESFAM, Hospital).

Este documento es la fuente de contenido del proyecto en `src/data/`. Si editas un ejercicio o paso acá, refleja el cambio también en `protocolContent.js` o `exercises.js` para que la app y la guía no queden desincronizadas.

---

## 1. Triage: ¿qué ejercicio o protocolo necesitas ahora?

| Si sientes... | Interpretación | Acción |
|---|---|---|
| Pitos o silbidos audibles al botar aire, o te cuesta hablar oraciones seguidas | Alerta bronquial (posible crisis obstructiva / asma) | Ir al **protocolo del inhalador con aerocámara** (sección 2) |
| Nariz tapada o congestionada y falta de aire al respirar por la boca | Resistencia nasal perdida | **Respiración con resistencia bucal / labios fruncidos** (3.1) |
| No puedes llenar los pulmones al 100%, pero el aire pasa sin silbidos y hablas bien | Patrón de hambre de aire (*air hunger* / hiperventilación) | **Respiración de pausa y control de CO₂** (3.2) |
| Peso, nudo o tensión física en el pecho/hombros, muy acelerado | Tensión biomecánica y alerta nerviosa | **Reset vagal: descarga muscular + suspiro fisiológico** (3.3) |

---

## 2. Protocolo clínico: uso correcto del inhalador con aerocámara

Durante una crisis obstructiva real, la técnica de inhalación define si el medicamento llega a los bronquios distales o se queda en la garganta.

1. **Preparación** — Destapa el inhalador, agítalo vigorosamente en vertical por **5 segundos** y conéctalo en la parte trasera de la aerocámara.
2. **Postura y vaciado** — Siéntate derecho. Bota todo el aire de tus pulmones con suavidad hacia afuera (lejos de la mascarilla/boquilla).
3. **Sellado** — Ajusta la boquilla entre los labios sellando bien (o cubre nariz y mentón con la mascarilla sin fugas).
4. **Disparo único** — Presiona el cartucho **una sola vez** (1 puff).
5. **Inhalación y retención** — Inhala lento y profundo por la boca a través de la cámara (o haz 5 a 6 respiraciones tranquilas dentro de la cámara si estás muy agitado). Retira la boquilla y **aguanta la respiración 8 a 10 segundos** para que el fármaco decante.
6. **Espera entre disparos** — Si requieres un 2º puff, **espera mínimo 1 minuto**, vuelve a agitar el cartucho y repite la secuencia completa. *Nunca dispares 2 puffs juntos en la misma cámara.*
7. **Higiene** — Si el inhalador contiene corticoides (ej. fluticasona, budesonida), enjuágate la boca con agua y escúpela.

---

## 3. Catálogo de ejercicios

### 3.1 Respiración con resistencia bucal (labios fruncidos)
- **Indicación:** nariz tapada por resfriado, congestión o tendencia a tragar bocanadas de aire.
- **Mecánica:** inhalación corta bucal sin forzar + exhalación suave y prolongada por un orificio diminuto entre los labios.
- **Timer:** inhala 2–3 s · exhala 5–6 s · pausa 1–2 s · sesión de 2 minutos.

### 3.2 Respiración de pausa y control (restauración de CO₂)
- **Indicación:** hambre de aire, suspiros compulsivos, vías nasales despejadas.
- **Mecánica:** respiración nasal diafragmática de bajo volumen con pausas confortables al final de la exhalación.
- **Timer:** inhala nasal 3 s (volumen pequeño, solo abdomen) · exhala nasal 4 s · pausa en vacío 4–5 s · sesión de 2–3 minutos.

### 3.3 Reset vagal y liberación biomecánica del tórax
- **Indicación:** ansiedad en el pecho, rigidez intercostal, taquicardia refleja o alerta simpática.
- **Fase A — Descarga isométrica (3 repeticiones):** sube los hombros con fuerza hacia las orejas apretando los omóplatos hacia atrás por 3 s; suelta todo el aire por la boca y deja caer los hombros de golpe.
- **Fase B — Suspiro fisiológico (2–3 ciclos):** inhalación nasal suave (2 s) → micro-inhalación corta extra para llenar los pulmones al 100 % → exhalación larga y sonora por la boca (6–8 s).

### 3.4 Respiración en caja (box breathing 4×4)
- **Indicación:** regulación general del sistema nervioso y foco mental.
- **Timer:** inhala 4 s · retén con aire 4 s · exhala 4 s · retén vacío 4 s · 4 ciclos completos.

---

## 4. Diferenciación rápida: obstrucción real vs. tensión / "air hunger"

| Parámetro | Crisis obstructiva / asma | Hambre de aire / hiperventilación |
|---|---|---|
| Sonido | Silbidos o sibilancias al botar el aire | Paso de aire limpio, sin silbidos audibles |
| Dificultad clave | Cuesta **botar/expulsar** el aire | Sensación de no poder **llenar** el pulmón al 100 % |
| Distracción | Persiste o empeora con la actividad | Se reduce o desaparece al concentrarse en otra tarea |
| Causa física | Inflamación y broncoconstricción muscular | Desbalance de gases (CO₂ bajo) y tensión muscular torácica |
| Respuesta inmediata | Broncodilatador de rescate con aerocámara | Ejercicios de exhalación prolongada y relajación torácica |

---

## 5. Señales de alarma médica (red flags)

Si aparece cualquiera de estos síntomas, deriva de inmediato a urgencias:

- Dificultad para pronunciar frases completas de corrido sin perder el aire.
- Hundimiento de la piel entre las costillas o base del cuello al inhalar (tiraje).
- Falta de mejoría 15 minutos después de usar el inhalador de rescate.
- Labios, lengua o uñas pálidas o azuladas (cianosis).
- Dolor torácico opresivo, punzante o irradiado al brazo/cuello.

---

## 6. Notas de diseño de este proyecto

El proyecto en este repositorio implementa esta guía como una app React con un solo elemento visual recurrente: el **Anillo de Respiración** (`BreathRing`). Crece en cada inhalación, se encoge en cada exhalación y se mantiene quieto (con un pulso ambiental) en cada retención — la misma pieza se reutiliza en el triage, en los cuatro ejercicios, en el reset vagal y en el protocolo del inhalador, para que la app se sienta como un solo instrumento y no como cuatro mini-apps distintas.

Paleta, tipografía y demás decisiones de diseño están documentadas en `src/index.css` (bloque `@theme`) y en el `README.md`.
