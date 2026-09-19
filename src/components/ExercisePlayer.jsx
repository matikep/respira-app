import { useBreathEngine } from "../hooks/useBreathEngine.js";
import BreathRing from "./BreathRing.jsx";
import { evidenceLevels } from "../data/exercises.js";

function fmt(seconds) {
  const s = Math.max(0, seconds);
  const mm = Math.floor(s / 60);
  const ss = Math.floor(s % 60);
  return `${mm}:${ss.toString().padStart(2, "0")}`;
}

export default function ExercisePlayer({ exercise, onDone, doneLabel = "Volver" }) {
  const engine = useBreathEngine(exercise.phases, {
    totalSeconds: exercise.totalSeconds,
    cycles: exercise.cycles,
  });

  const { running, done, phase, phaseRemaining, totalRemaining, cycleCount, ringSize, start, pause, reset } = engine;

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center">
      <h2 className="font-display text-2xl font-medium text-text">{exercise.title}</h2>
      <p className="mt-1 text-sm text-text-muted">{exercise.subtitle}</p>

      <div className="mt-8">
        <BreathRing
          size={done ? 0.62 : ringSize}
          colorRole={phase.color}
          label={done ? "Completado" : phase.label}
          sublabel={done ? "✓" : `${phaseRemaining.toFixed(1)}s`}
          idle={!running && !done}
        />
      </div>

      {phase.instruction && !done && (
        <p className="mt-4 max-w-xs text-center text-sm text-text-muted">{phase.instruction}</p>
      )}

      <div className="mt-5 font-mono text-xs uppercase tracking-wide text-text-muted">
        {exercise.totalSeconds != null && !done && `${fmt(totalRemaining)} restantes`}
        {exercise.cycles != null && !done && `Ciclo ${cycleCount + 1} de ${exercise.cycles}`}
        {done && "Sesión terminada"}
      </div>

      <div className="mt-6 flex gap-3">
        {!running ? (
          <button
            onClick={start}
            className="rounded-full bg-inhale px-7 py-3 text-sm font-semibold text-ink transition active:scale-95"
          >
            {done ? "Repetir" : "Iniciar"}
          </button>
        ) : (
          <button
            onClick={pause}
            className="rounded-full bg-surface-raised px-7 py-3 text-sm font-semibold text-text transition active:scale-95"
          >
            Pausar
          </button>
        )}
        <button
          onClick={reset}
          className="rounded-full border border-line px-7 py-3 text-sm font-semibold text-text-muted transition active:scale-95"
        >
          Reiniciar
        </button>
      </div>

      {exercise.indication && (
        <dl className="mt-8 w-full divide-y divide-line rounded-2xl border border-line bg-surface text-xs leading-relaxed">
          <div className="px-4 py-3">
            <dt className="font-semibold text-text">Cuándo usarlo</dt>
            <dd className="mt-0.5 text-text-muted">{exercise.indication}</dd>
          </div>
          {exercise.evidence && (
            <div className="px-4 py-3">
              <dt className="font-semibold text-text">{evidenceLevels[exercise.evidence].label}</dt>
              <dd className="mt-0.5 text-text-muted">{exercise.reference}</dd>
            </div>
          )}
          {exercise.caution && (
            <div className="bg-alert-dim/40 px-4 py-3">
              <dt className="font-semibold text-alert">Precaución</dt>
              <dd className="mt-0.5 text-text">{exercise.caution}</dd>
            </div>
          )}
        </dl>
      )}

      {onDone && (
        <button onClick={onDone} className="mt-4 text-xs text-text-muted underline underline-offset-2">
          {doneLabel}
        </button>
      )}
    </div>
  );
}
