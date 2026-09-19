/**
 * Ilustración animada por cada paso del protocolo del inhalador.
 *
 * Regla de la casa: la animación reproduce el gesto real del paso (agitar,
 * vaciar, sellar, disparar una vez, retener, esperar, enjuagar). Nada de
 * movimiento decorativo — si la animación no enseña la técnica, sobra.
 *
 * Todo el color sale de los tokens de `@theme`, igual que BreathRing:
 * inhale = el dispositivo, exhale = el aire y el fármaco en movimiento,
 * hold = referencias de postura y tiempo.
 *
 * Con `prefers-reduced-motion` el CSS global congela las animaciones en su
 * primer frame; por eso el estado base de cada dibujo ya es legible por sí solo.
 */

const KEYFRAMES = `
@keyframes ig-shake {
  0%, 100% { transform: translateX(-3px) rotate(-4deg); }
  50%      { transform: translateX(3px)  rotate(4deg); }
}
@keyframes ig-vent {
  0%   { stroke-dashoffset: 34; opacity: 0; }
  25%  { opacity: 1; }
  100% { stroke-dashoffset: -34; opacity: 0; }
}
@keyframes ig-chest {
  0%, 100% { transform: scale(1); }
  55%      { transform: scale(0.93); }
}
@keyframes ig-lip-top {
  0%, 15%   { transform: translateY(-5px); }
  45%, 100% { transform: translateY(0); }
}
@keyframes ig-lip-bottom {
  0%, 15%   { transform: translateY(5px); }
  45%, 100% { transform: translateY(0); }
}
@keyframes ig-seal {
  0%, 45% { opacity: 0; transform: scale(0.86); }
  65%     { opacity: 1; transform: scale(1); }
  100%    { opacity: 0; transform: scale(1.12); }
}
@keyframes ig-press {
  0%, 8%    { transform: translateY(0); }
  16%, 34%  { transform: translateY(5px); }
  46%, 100% { transform: translateY(0); }
}
@keyframes ig-puff {
  0%, 16%   { opacity: 0; transform: scale(0.3); }
  30%       { opacity: 0.9; transform: scale(1); }
  58%, 100% { opacity: 0; transform: scale(1.35); }
}
@keyframes ig-travel {
  0%       { opacity: 0; transform: translate(0, 0); }
  12%      { opacity: 1; }
  38%      { opacity: 1; transform: translate(34px, 26px); }
  46%, 100%{ opacity: 0; transform: translate(34px, 26px); }
}
@keyframes ig-lungs {
  0%        { transform: scale(0.82); }
  38%, 86%  { transform: scale(1); }
  100%      { transform: scale(0.82); }
}
@keyframes ig-cycle {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes ig-slosh {
  0%, 100% { transform: translateX(-3px); }
  50%      { transform: translateX(3px); }
}
@keyframes ig-drop {
  0%       { opacity: 0; transform: translateY(-4px); }
  30%      { opacity: 1; }
  100%     { opacity: 0; transform: translateY(12px); }
}
`;

const DEVICE = "var(--color-inhale)";
const FLOW = "var(--color-exhale)";
const BODY = "var(--color-text-muted)";
const GUIDE = "var(--color-hold)";

/** Cartucho + carcasa + boquilla. Se reutiliza en los pasos 1 y 4. */
function InhalerBody({ canisterClass }) {
  return (
    <>
      <rect
        x="34" y="26" width="15" height="21" rx="3"
        fill="none" stroke={DEVICE} strokeWidth="2"
        style={canisterClass}
      />
      <path
        d="M31 47 h21 v20 q0 6 -6 6 h-9 q-6 0 -6 -6 z"
        fill="none" stroke={DEVICE} strokeWidth="2" strokeLinejoin="round"
      />
      <path d="M52 55 h10 v10 h-10" fill="none" stroke={DEVICE} strokeWidth="2" strokeLinejoin="round" />
    </>
  );
}

const ILLUSTRATIONS = [
  // 1 · Preparación — el inhalador se sacude de verdad.
  () => (
    <>
      <path d="M22 40 q-5 8 0 16" fill="none" stroke={FLOW} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <path d="M14 36 q-7 12 0 24" fill="none" stroke={FLOW} strokeWidth="2" strokeLinecap="round" opacity="0.25" />
      <path d="M74 40 q5 8 0 16" fill="none" stroke={FLOW} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <path d="M82 36 q7 12 0 24" fill="none" stroke={FLOW} strokeWidth="2" strokeLinecap="round" opacity="0.25" />
      <g style={{ animation: "ig-shake 0.32s ease-in-out infinite", transformOrigin: "48px 50px" }}>
        <InhalerBody />
      </g>
    </>
  ),

  // 2 · Postura y vaciado — espalda recta, el tórax se hunde y el aire sale.
  () => (
    <>
      <line
        x1="34" y1="20" x2="34" y2="92"
        stroke={GUIDE} strokeWidth="1.5" strokeDasharray="3 4" opacity="0.7"
      />
      <circle cx="34" cy="27" r="10" fill="none" stroke={BODY} strokeWidth="2" />
      <g style={{ animation: "ig-chest 3.4s ease-in-out infinite", transformOrigin: "34px 62px" }}>
        <path
          d="M24 46 q10 -4 20 0 l3 32 q-13 5 -26 0 z"
          fill="none" stroke={BODY} strokeWidth="2" strokeLinejoin="round"
        />
      </g>
      {[0, 0.45, 0.9].map((delay, i) => (
        <path
          key={i}
          d={`M46 ${28 + i * 7} q16 ${4 - i * 4} 32 ${2 + i * 3}`}
          fill="none" stroke={FLOW} strokeWidth="2" strokeLinecap="round"
          strokeDasharray="34"
          style={{ animation: `ig-vent 3.4s ease-out ${delay}s infinite` }}
        />
      ))}
    </>
  ),

  // 3 · Sellado — los labios se cierran sobre la boquilla y el sello confirma.
  () => (
    <>
      <ellipse cx="60" cy="58" rx="11" ry="15" fill="none" stroke={DEVICE} strokeWidth="2" />
      <line x1="60" y1="43" x2="60" y2="73" stroke={DEVICE} strokeWidth="2" opacity="0.35" />
      <ellipse
        cx="60" cy="58" rx="21" ry="25"
        fill="none" stroke={DEVICE} strokeWidth="2"
        style={{ animation: "ig-seal 2.8s ease-out infinite", transformOrigin: "60px 58px" }}
      />
      <path
        d="M34 50 q26 -13 52 0"
        fill="none" stroke={BODY} strokeWidth="2.5" strokeLinecap="round"
        style={{ animation: "ig-lip-top 2.8s ease-in-out infinite" }}
      />
      <path
        d="M34 66 q26 13 52 0"
        fill="none" stroke={BODY} strokeWidth="2.5" strokeLinecap="round"
        style={{ animation: "ig-lip-bottom 2.8s ease-in-out infinite" }}
      />
    </>
  ),

  // 4 · Disparo único — un pulso, y después una pausa larga a propósito.
  () => (
    <>
      <ellipse cx="41" cy="18" rx="9" ry="6" fill="none" stroke={BODY} strokeWidth="2"
        style={{ animation: "ig-press 3.2s ease-in-out infinite" }} />
      <InhalerBody canisterClass={{ animation: "ig-press 3.2s ease-in-out infinite" }} />
      <ellipse cx="86" cy="60" rx="22" ry="15" fill="none" stroke={DEVICE} strokeWidth="2" />
      <path d="M108 55 h8 v10 h-8" fill="none" stroke={DEVICE} strokeWidth="2" strokeLinejoin="round" />
      {[
        { cx: 72, cy: 60, r: 4, d: 0 },
        { cx: 84, cy: 55, r: 5, d: 0.06 },
        { cx: 92, cy: 64, r: 4, d: 0.12 },
      ].map((p, i) => (
        <circle
          key={i} cx={p.cx} cy={p.cy} r={p.r} fill={FLOW}
          style={{
            animation: `ig-puff 3.2s ease-out ${p.d}s infinite`,
            transformOrigin: `${p.cx}px ${p.cy}px`,
          }}
        />
      ))}
      <text x="41" y="98" textAnchor="middle" fill={BODY} fontSize="11" fontFamily="var(--font-mono)">
        1 puff
      </text>
    </>
  ),

  // 5 · Inhalación y retención — el fármaco viaja y los pulmones se quedan llenos.
  () => (
    <>
      <ellipse cx="26" cy="34" rx="17" ry="12" fill="none" stroke={DEVICE} strokeWidth="2" />
      <path d="M40 42 q12 6 18 16" fill="none" stroke={BODY} strokeWidth="2" strokeDasharray="3 4" />
      <g style={{ animation: "ig-lungs 5s ease-in-out infinite", transformOrigin: "70px 80px" }}>
        <path d="M62 62 q-14 6 -14 22 q0 12 10 12 q6 0 6 -10 z" fill="none" stroke={BODY} strokeWidth="2" strokeLinejoin="round" />
        <path d="M78 62 q14 6 14 22 q0 12 -10 12 q-6 0 -6 -10 z" fill="none" stroke={BODY} strokeWidth="2" strokeLinejoin="round" />
        <line x1="70" y1="56" x2="70" y2="70" stroke={BODY} strokeWidth="2" strokeLinecap="round" />
      </g>
      {[0, 0.22, 0.44].map((delay, i) => (
        <circle
          key={i} cx="34" cy="42" r="3" fill={FLOW}
          style={{ animation: `ig-travel 5s ease-in ${delay}s infinite` }}
        />
      ))}
    </>
  ),

  // 6 · Espera — el anillo ya lleva la cuenta, así que acá se ilustra lo que
  // el reloj no dice: hay que volver a agitar y repetir la secuencia entera.
  () => (
    <>
      <g style={{ animation: "ig-cycle 7s linear infinite", transformOrigin: "60px 58px" }}>
        <path d="M26 52 A 34 34 0 0 1 94 52" fill="none" stroke={FLOW} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M87 45 L95 52 L87 59" fill="none" stroke={FLOW} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M94 64 A 34 34 0 0 1 26 64" fill="none" stroke={FLOW} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M33 57 L25 64 L33 71" fill="none" stroke={FLOW} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g style={{ animation: "ig-shake 0.32s ease-in-out infinite", transformOrigin: "60px 58px" }}>
        <rect x="54" y="40" width="12" height="16" rx="2.5" fill="none" stroke={DEVICE} strokeWidth="2" />
        <path d="M51 56 h18 v14 q0 5 -5 5 h-8 q-5 0 -5 -5 z" fill="none" stroke={DEVICE} strokeWidth="2" strokeLinejoin="round" />
      </g>
    </>
  ),

  // 7 · Higiene — el agua se mueve en la boca y se escupe.
  () => (
    <>
      <path d="M28 46 q26 -14 52 0" fill="none" stroke={BODY} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M28 46 q26 26 52 0" fill="none" stroke={BODY} strokeWidth="2.5" strokeLinecap="round" />
      <g style={{ animation: "ig-slosh 1.6s ease-in-out infinite" }}>
        <path d="M38 52 q7 5 13 0 q7 -5 13 0" fill="none" stroke={FLOW} strokeWidth="2" strokeLinecap="round" />
        <path d="M40 60 q7 5 13 0 q7 -5 13 0" fill="none" stroke={FLOW} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </g>
      {[0, 0.5].map((delay, i) => (
        <circle
          key={i} cx={50 + i * 12} cy="80" r="2.5" fill={FLOW}
          style={{ animation: `ig-drop 1.8s ease-in ${delay}s infinite` }}
        />
      ))}
      <path d="M88 60 l3 30 h14 l3 -30 z" fill="none" stroke={BODY} strokeWidth="2" strokeLinejoin="round" />
      <path d="M90 72 q4 3 8 0 q4 -3 8 0" fill="none" stroke={FLOW} strokeWidth="2" strokeLinecap="round" />
    </>
  ),
];

export default function InhalerVisualGuide({ stepIndex }) {
  const Illustration = ILLUSTRATIONS[stepIndex] ?? ILLUSTRATIONS[0];

  return (
    <div className="flex justify-center rounded-3xl border border-line bg-surface p-6">
      <svg viewBox="0 0 120 120" className="h-36 w-36" role="presentation">
        <style>{KEYFRAMES}</style>
        <Illustration />
      </svg>
    </div>
  );
}
