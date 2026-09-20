// Contenido clínico-educativo extraído y ordenado de la guía original.
// Todo el texto vive acá para que la UI sea una sola fuente de verdad editable.

export const disclaimer =
  "Esta herramienta y sus ejercicios tienen fines exclusivamente educativos, de apoyo técnico y de autorregulación del patrón respiratorio. No reemplazan la evaluación, diagnóstico ni tratamiento médico profesional. Ante una crisis respiratoria aguda severa, dolor de pecho opresivo, cianosis o cualquier señal de alarma, suspende el uso y llama al 131 (SAMU) o acude de inmediato al servicio de urgencia más cercano (SAPU, SAR u hospital).";

export const redFlags = [
  "Dificultad para pronunciar frases completas de corrido sin perder el aire.",
  "Hundimiento de la piel entre las costillas o base del cuello al inhalar (tiraje).",
  "Sin mejoría tras 10 puffs del inhalador de rescate (1 cada 30–60 s), o empeoras en cualquier momento.",
  "Agotamiento, somnolencia o confusión durante la falta de aire.",
  "Labios, lengua o uñas pálidas o azuladas (cianosis).",
  "Dolor torácico opresivo, punzante o irradiado al brazo/cuello.",
];

// Árbol de decisión del triage inicial.
export const triageOptions = [
  {
    id: "A",
    prompt: "Siento pitos o silbidos audibles al botar aire, o me cuesta hablar oraciones seguidas.",
    result: "Alerta bronquial (posible crisis obstructiva / asma)",
    action: "alerts",
    actionLabel: "Usa tu inhalador de rescate y revisa las señales de alarma",
  },
  {
    id: "B",
    prompt: "Tengo la nariz tapada o congestionada y siento que me falta el aire al respirar por la boca.",
    result: "Congestión nasal con sensación de falta de aire",
    action: "exercise",
    exerciseId: "labios-fruncidos",
    actionLabel: "Empezar respiración con labios fruncidos",
  },
  {
    id: "C",
    prompt: "Siento que no puedo llenar los pulmones al 100%, pero el aire pasa sin silbidos y puedo hablar bien.",
    result: "Patrón de hambre de aire (air hunger / hiperventilación)",
    action: "exercise",
    exerciseId: "pausa-co2",
    actionLabel: "Empezar respiración de pausa y control",
  },
  {
    id: "D",
    prompt: "Siento un peso, nudo o tensión física en el pecho/hombros y estoy muy acelerado.",
    result: "Tensión muscular y activación por estrés",
    action: "exercise",
    exerciseId: "reset-vagal",
    actionLabel: "Empezar descarga de tensión torácica",
  },
  {
    id: "E",
    prompt: "Tengo asma, hoy respiro sin silbidos y quiero practicar para mantenerla bajo control.",
    result: "Asma estable: reentrenamiento respiratorio",
    action: "exercise",
    exerciseId: "control-respiratorio",
    actionLabel: "Empezar control respiratorio",
  },
];

// Protocolo clínico de uso del inhalador (sección 2).
// "cue" es el gesto en tres palabras (va bajo la ilustración animada) y
// "tips" son los detalles de técnica que deciden si el fármaco llega al
// bronquio o se queda en la garganta.
export const inhalerSteps = [
  {
    title: "Preparación",
    cue: "Agita en vertical, 5 segundos",
    text: "Destapa el inhalador, agítalo vigorosamente en vertical por 5 segundos y conéctalo en la parte trasera de la aerocámara.",
    tips: [
      "Sostén el inhalador en vertical, con el cartucho hacia arriba.",
      "Agita con movimientos firmes y cortos, no suaves.",
      "Si es nuevo, no lo usas hace ~2 semanas o se cayó, cébalo disparando al aire (Ventolin HFA: 4 puffs; en otros, revisa el prospecto).",
    ],
    timerSeconds: 5,
    timerLabel: "Agitando",
  },
  {
    title: "Postura y vaciado",
    cue: "Espalda recta, bota todo el aire",
    text: "Siéntate derecho. Bota todo el aire de tus pulmones con suavidad hacia afuera, lejos de la mascarilla o boquilla.",
    tips: [
      "Siéntate derecho o ponte de pie: encorvado no entra el aire.",
      "Bota el aire de forma suave y continua, sin soplar fuerte.",
      "Vacía los pulmones antes de sellar, no después.",
    ],
  },
  {
    title: "Sellado",
    cue: "Labios cerrados, sin fugas",
    text: "Ajusta la boquilla entre los labios sellando bien (o cubre nariz y mentón con la mascarilla, sin fugas).",
    tips: [
      "La boquilla va entre los labios, no entre los dientes.",
      "Cierra los labios alrededor sin dejar espacios.",
      "Con mascarilla: cubre nariz y mentón, apoyada sin apretar.",
    ],
  },
  {
    title: "Disparo único",
    cue: "Un solo puff",
    text: "Presiona el cartucho una sola vez (1 puff).",
    tips: [
      "Presiona con decisión, hasta el fondo, una sola vez.",
      "Nunca dispares 2 puffs juntos en la misma cámara.",
      "Si necesitas un 2° puff, se hace la secuencia completa de nuevo.",
    ],
  },
  {
    title: "Inhalación y retención",
    cue: "Inhala lento, retén hasta 10 segundos",
    text: "Inhala lento y profundo por la boca a través de la cámara (o haz 5 a 6 respiraciones tranquilas dentro de la cámara si estás muy agitado). Retira la boquilla y aguanta la respiración para que el fármaco decante.",
    tips: [
      "Inhala lento y profundo por la boca, no por la nariz.",
      "Si estás muy agitado: 5 a 6 respiraciones tranquilas dentro de la cámara.",
      "Retira la boquilla antes de aguantar la respiración.",
      "La apnea es lo que deja el fármaco en el bronquio: no la saltes.",
    ],
    timerSeconds: 9,
    timerLabel: "Apnea (hasta 10 s, lo que toleres)",
  },
  {
    title: "Espera entre disparos",
    cue: "30 a 60 segundos",
    text: "Si requieres otro puff, espera 30 a 60 segundos, vuelve a agitar y repite la secuencia completa. Nunca dispares 2 puffs juntos en la misma cámara.",
    tips: [
      "Respira normal durante la espera.",
      "Vuelve a agitar el cartucho antes del segundo puff.",
      "Repite la secuencia completa, desde el vaciado.",
      "En crisis: 1 puff cada 30–60 s, hasta 10 (o según tu plan de acción). Si empeoras o no mejoras tras 10, llama al 131.",
    ],
    timerSeconds: 30,
    timerLabel: "Espera mínima (30 s)",
    optional: true,
  },
  {
    title: "Higiene",
    cue: "Enjuaga y escupe",
    text: "Si el inhalador contiene corticoides (ej. fluticasona, budesonida), enjuágate la boca con agua y escúpela.",
    tips: [
      "Aplica solo si el inhalador lleva corticoides (fluticasona, budesonida).",
      "Enjuaga y escupe el agua, no la tragues.",
      "Evita candidiasis oral y ronquera.",
    ],
  },
];

// Tabla comparativa (sección 4).
export const comparisonTable = {
  headers: ["Parámetro", "Crisis obstructiva / asma", "Hambre de aire / hiperventilación"],
  rows: [
    ["Sonido", "Silbidos o sibilancias al botar el aire.", "Paso de aire limpio, sin silbidos audibles."],
    ["Dificultad clave", "Cuesta botar / expulsar el aire.", "Sensación de no poder llenar el pulmón al 100%."],
    ["Distracción", "Persiste o empeora con la actividad.", "Se reduce o desaparece al concentrarse en otra tarea."],
    ["Causa física", "Inflamación y broncoconstricción muscular.", "Desbalance de gases (CO₂ bajo) y tensión muscular torácica."],
    ["Respuesta inmediata", "Broncodilatador de rescate con aerocámara.", "Ejercicios de exhalación prolongada y relajación torácica."],
  ],
};
