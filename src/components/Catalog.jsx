import { useState } from "react";
import { categories, evidenceLevels, exercises, sessionSeconds } from "../data/exercises.js";

const MAX_PATTERN_PHASES = 4;

/** "4 · 7 · 8" para ritmos cortos; las secuencias guiadas se describen por pasos. */
function pattern(ex) {
  if (ex.phases.length === 0) return "2 fases";
  if (ex.phases.length > MAX_PATTERN_PHASES) return `guiada · ${ex.phases.length} pasos`;
  return ex.phases.map((p) => p.duration.toString().replace(".", ",")).join(" · ");
}

function minutes(ex) {
  const s = sessionSeconds(ex);
  return s < 60 ? `${Math.round(s)} s` : `${Math.round(s / 60)} min`;
}

/** Una sugerencia según la hora: activar suave de día, soltar de noche. */
function recommendedId() {
  const h = new Date().getHours();
  if (h >= 21 || h < 6) return "dormir";
  if (h < 12) return "coherente";
  return "suspiro-fisiologico";
}

const toneOf = (ex) => categories.find((c) => c.id === ex.category).tone;

function Orb({ tone, className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`block rounded-full ${className}`}
      style={{
        background: `radial-gradient(circle at 35% 30%, color-mix(in srgb, ${tone} 60%, white), ${tone} 50%, color-mix(in srgb, ${tone} 20%, transparent) 75%)`,
        boxShadow: `0 0 36px -8px ${tone}`,
      }}
    />
  );
}

function ExerciseCard({ ex, onSelect }) {
  return (
    <button
      onClick={() => onSelect(ex.id)}
      style={{ "--tone": toneOf(ex) }}
      className="group flex w-64 shrink-0 snap-start flex-col rounded-3xl border border-line bg-surface p-5 text-left transition duration-300 ease-(--ease-out-expo) hover:-translate-y-1 hover:border-(--tone) active:scale-[0.98] sm:w-72"
    >
      <span className="flex items-start justify-between">
        <Orb tone="var(--tone)" className="h-10 w-10 transition duration-500 group-hover:scale-125" />
        <span className="rounded-full bg-surface-raised px-2.5 py-1 font-mono text-[11px] text-text-muted">{minutes(ex)}</span>
      </span>
      <span className="mt-5 font-display text-lg font-semibold leading-snug text-text">{ex.title}</span>
      <span className="mt-0.5 text-xs text-text-muted">{ex.subtitle}</span>
      <span className="mt-3 line-clamp-3 text-sm leading-relaxed text-text-muted">{ex.indication}</span>
      <span className="mt-auto flex items-center justify-between gap-3 pt-5 text-[11px]">
        <span className="font-mono text-(--tone)">{pattern(ex)}</span>
        <span className="text-right text-text-muted">{evidenceLevels[ex.evidence].label}</span>
      </span>
    </button>
  );
}

function Featured({ ex, onSelect }) {
  const tone = toneOf(ex);
  return (
    <button
      onClick={() => onSelect(ex.id)}
      style={{ "--tone": tone }}
      className="group mt-6 flex w-full flex-col gap-6 rounded-[2rem] border border-line bg-surface p-6 text-left transition hover:border-(--tone) sm:flex-row sm:items-center sm:p-8"
    >
      <Orb tone={tone} className="h-20 w-20 shrink-0 animate-[pulse_6s_ease-in-out_infinite] sm:h-32 sm:w-32" />
      <span className="flex flex-col">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-(--tone)">Recomendado ahora</span>
        <span className="mt-2 font-display text-2xl font-semibold text-text sm:text-3xl">{ex.title}</span>
        <span className="mt-1 max-w-md text-sm text-text-muted">{ex.indication}</span>
        <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-(--tone) px-4 py-2 text-sm font-semibold text-ink transition-all group-hover:gap-3">
          Empezar · {minutes(ex)} <span aria-hidden="true">→</span>
        </span>
      </span>
    </button>
  );
}

export default function Catalog({ onSelect }) {
  const [filter, setFilter] = useState("todas");
  const visible = filter === "todas" ? categories : categories.filter((c) => c.id === filter);
  const featured = exercises.find((e) => e.id === recommendedId());

  return (
    <div className="mx-auto max-w-5xl">
      <h2 className="font-display text-3xl font-semibold leading-tight text-text sm:text-4xl">¿Qué necesitas respirar hoy?</h2>

      <Featured ex={featured} onSelect={onSelect} />

      <div role="group" aria-label="Filtrar por categoría" className="no-scrollbar -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-1">
        {[{ id: "todas", label: "Todas", tone: "var(--color-text)" }, ...categories].map((c) => {
          const active = filter === c.id;
          return (
            <button
              key={c.id}
              aria-pressed={active}
              onClick={() => setFilter(c.id)}
              style={{ "--tone": c.tone }}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                active ? "border-(--tone) bg-(--tone) text-ink" : "border-line bg-surface text-text-muted hover:text-text"
              }`}
            >
              {c.id !== "todas" && <span className={`h-2 w-2 rounded-full ${active ? "bg-ink" : "bg-(--tone)"}`} />}
              {c.label}
            </button>
          );
        })}
      </div>

      {visible.map((cat) => {
        const items = exercises.filter((e) => e.category === cat.id);
        return (
          <section key={cat.id} aria-labelledby={`cat-${cat.id}`} className="mt-10">
            <header className="mb-4 flex items-end justify-between gap-4">
              <div>
                <h3 id={`cat-${cat.id}`} className="flex items-center gap-2.5 font-display text-xl font-semibold text-text">
                  <Orb tone={cat.tone} className="h-3.5 w-3.5" />
                  {cat.label}
                </h3>
                <p className="mt-1 max-w-xl text-sm text-text-muted">{cat.blurb}</p>
              </div>
              <span className="shrink-0 font-mono text-xs text-text-muted">{items.length}</span>
            </header>
            <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-3">
              {items.map((ex) => (
                <ExerciseCard key={ex.id} ex={ex} onSelect={onSelect} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
