const COLOR_MAP = {
  inhale: "var(--color-inhale)",
  exhale: "var(--color-exhale)",
  hold: "var(--color-hold)",
};

/**
 * Orbe de respiración: crece en inhalación, se encoge en exhalación y queda
 * quieto (con un pulso ambiental sutil) en retenciones. Es el mismo
 * componente en triage, ejercicios y protocolo del inhalador, para que toda
 * la app se sienta como un solo instrumento.
 */
export default function BreathRing({ size = 0.62, colorRole = "hold", label, sublabel, idle = false }) {
  const color = COLOR_MAP[colorRole] ?? COLOR_MAP.hold;
  const px = 280;
  const live = {
    width: px,
    height: px,
    transform: `scale(${size})`,
  };

  return (
    <div className="relative mx-auto flex items-center justify-center" style={{ width: px, height: px }}>
      {/* órbitas guía fijas */}
      <div className="absolute inset-0 rounded-full border border-line" />
      <div className="absolute inset-[19%] rounded-full border border-dashed border-line" />
      {/* halo difuso que sigue al orbe */}
      <div
        className="absolute rounded-full blur-2xl"
        style={{ ...live, background: color, opacity: 0.35, transition: "background 600ms" }}
      />
      {/* orbe vivo */}
      <div
        className={`absolute rounded-full ${idle ? "animate-[pulse_4s_ease-in-out_infinite]" : ""}`}
        style={{
          ...live,
          background: `radial-gradient(circle at 35% 30%, color-mix(in srgb, ${color} 55%, white) 0%, ${color} 45%, color-mix(in srgb, ${color} 40%, var(--color-ink)) 100%)`,
          boxShadow: `inset 0 -20px 60px -20px color-mix(in srgb, var(--color-ink) 60%, transparent), 0 0 80px -10px ${color}`,
          transition: "background 600ms",
        }}
      />
      <div className="relative z-10 flex flex-col items-center px-10 text-center text-ink">
        {label && <div className="font-display text-lg font-semibold leading-tight tracking-tight">{label}</div>}
        {sublabel && <div className="mt-1 font-mono text-3xl font-medium">{sublabel}</div>}
      </div>
    </div>
  );
}
