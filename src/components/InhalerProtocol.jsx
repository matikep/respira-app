import { useEffect, useRef, useState } from "react";
import { inhalerSteps } from "../data/protocolContent.js";
import BreathRing from "./BreathRing.jsx";
import InhalerVisualGuide from "./InhalerVisualGuide.jsx";

export default function InhalerProtocol({ onDone }) {
  const [index, setIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);

  const step = inhalerSteps[index];
  const hasTimer = !!step.timerSeconds;

  useEffect(() => {
    setElapsed(0);
    lastTsRef.current = null;
    if (!hasTimer) return;

    const tick = (ts) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setElapsed((prev) => Math.min(step.timerSeconds, prev + dt));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const fraction = hasTimer ? Math.min(1, elapsed / step.timerSeconds) : 0;
  const ringSize = 0.62 + 0.38 * fraction;
  const remaining = hasTimer ? Math.max(0, step.timerSeconds - elapsed) : null;
  const canAdvance = !hasTimer || elapsed >= step.timerSeconds || step.optional;

  const isLast = index === inhalerSteps.length - 1;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-display text-3xl font-medium text-text">Protocolo del Inhalador</h2>
        <p className="mt-1 text-sm text-text-muted">Guía paso a paso con técnica correcta</p>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1.5 justify-center">
        {inhalerSteps.map((_, i) => (
          <div
            key={i}
            className="h-2 rounded-full transition-all"
            style={{
              width: `${100 / inhalerSteps.length}%`,
              background: i <= index ? "var(--color-inhale)" : "var(--color-line)",
            }}
          />
        ))}
      </div>

      {/* Gesto del paso: ilustración animada + nombre + cue */}
      <div className="flex flex-col items-center gap-4">
        <InhalerVisualGuide stepIndex={index} />
        <div className="text-center">
          <h3 className="font-display text-2xl font-medium text-text">{step.title}</h3>
          <p className="mt-1 text-sm text-text-muted">{step.cue}</p>
        </div>
      </div>

      {/* Timer Ring (si hay timer) */}
      {hasTimer && (
        <div className="flex flex-col items-center gap-2">
          <BreathRing
            size={ringSize}
            colorRole="inhale"
            label={`${remaining.toFixed(1)}s`}
            idle={true}
          />
          <p className="text-xs uppercase tracking-wide text-text-muted">{step.timerLabel}</p>
        </div>
      )}

      {/* Instrucción completa del protocolo */}
      <div className="rounded-2xl border border-line bg-surface p-5 text-center">
        <p className="text-sm leading-relaxed text-text">{step.text}</p>
      </div>

      {/* Detalles de técnica */}
      <div className="rounded-2xl border border-line bg-surface-raised p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-inhale">Técnica</p>
        <ul className="flex flex-col gap-2">
          {step.tips.map((tip) => (
            <li key={tip} className="flex gap-2.5 text-sm leading-relaxed text-text-muted">
              <span aria-hidden="true" className="text-inhale">·</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Botones de navegación */}
      <div className="flex flex-col gap-3 items-center">
        <div className="flex gap-3">
          <button
            disabled={!canAdvance}
            onClick={() => (isLast ? onDone?.() : setIndex((i) => i + 1))}
            className="rounded-full bg-inhale px-7 py-3 text-sm font-semibold text-ink hover:opacity-90 transition active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLast ? "Finalizar" : "Siguiente"}
          </button>
        </div>

        {index > 0 && (
          <button
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            className="text-xs text-text-muted hover:text-text transition underline underline-offset-2"
          >
            ← Paso anterior
          </button>
        )}
      </div>

      {/* Indicador de paso */}
      <p className="text-center text-xs text-text-muted">
        Paso {index + 1} de {inhalerSteps.length}
      </p>
    </div>
  );
}
