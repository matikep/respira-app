import { triageOptions } from "../data/protocolContent.js";
import BreathRing from "./BreathRing.jsx";

export default function Triage({ onSelect }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center">
      <BreathRing size={0.68} colorRole="hold" idle />
      <h1 className="mt-6 text-center font-display text-3xl font-medium text-text">
        ¿Cómo se siente tu respiración ahora?
      </h1>
      <p className="mt-2 text-center text-sm text-text-muted">
        Elige la descripción que más se parezca a lo que sientes en este momento.
      </p>

      <div className="mt-8 flex w-full flex-col gap-3">
        {triageOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt)}
            className="group rounded-2xl border border-line bg-surface px-5 py-4 text-left transition hover:border-inhale hover:bg-surface-raised"
          >
            <p className="text-sm leading-relaxed text-text">{opt.prompt}</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-wide text-text-muted group-hover:text-inhale">
              {opt.result}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
