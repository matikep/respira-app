import { useState } from "react";
import { exercises } from "./data/exercises.js";
import { disclaimer } from "./data/protocolContent.js";
import Triage from "./components/Triage.jsx";
import ExercisePlayer from "./components/ExercisePlayer.jsx";
import VagalResetFlow from "./components/VagalReset.jsx";
import InhalerProtocol from "./components/InhalerProtocol.jsx";
import ComparisonTable from "./components/ComparisonTable.jsx";
import RedFlagBanner from "./components/RedFlagBanner.jsx";
import Catalog from "./components/Catalog.jsx";

const QUICK_CALM_ID = "labios-fruncidos";

// Iconos de trazo simple, 24×24, heredan el color del botón.
const ICONS = {
  triage: "M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z",
  catalogo: "M3 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0M3 17c2-4 4-4 6 0s4 4 6 0 4-4 6 0M3 7c2-4 4-4 6 0s4 4 6 0 4-4 6 0",
  inhalador: "M9 3h4v6H9zM7 9h8v9a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3zM15 14h4v4h-4",
  referencia: "M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3ZM12 8v5M12 16h.01",
};

const TABS = [
  { id: "triage", label: "Inicio" },
  { id: "catalogo", label: "Ejercicios" },
  { id: "inhalador", label: "Inhalador" },
  { id: "referencia", label: "Alertas" },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 6 || h >= 20) return "Buenas noches";
  if (h < 13) return "Buenos días";
  return "Buenas tardes";
}

function DockButton({ tab, active, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`flex w-16 flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-semibold transition ${
        active ? "text-text" : "text-text-muted hover:text-text"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={ICONS[tab.id]} />
      </svg>
      {tab.label}
      <span className={`h-1 w-1 rounded-full transition ${active ? "bg-inhale" : "bg-transparent"}`} />
    </button>
  );
}

export default function App() {
  const [tab, setTab] = useState("triage");
  const [activeExerciseId, setActiveExerciseId] = useState(null);

  function openExercise(id) {
    setActiveExerciseId(id);
    setTab("catalogo");
    window.scrollTo({ top: 0 });
  }

  function goTo(id) {
    setTab(id);
    setActiveExerciseId(null);
    window.scrollTo({ top: 0 });
  }

  function handleTriageSelect(option) {
    if (option.action === "inhaler") goTo("inhalador");
    else openExercise(option.exerciseId);
  }

  function renderCatalogo() {
    if (activeExerciseId === "reset-vagal") {
      return <VagalResetFlow onDone={() => setActiveExerciseId(null)} />;
    }
    const exercise = exercises.find((e) => e.id === activeExerciseId);
    if (exercise) {
      return <ExercisePlayer key={exercise.id} exercise={exercise} onDone={() => setActiveExerciseId(null)} />;
    }
    return <Catalog onSelect={openExercise} />;
  }

  return (
    <div className="min-h-screen px-5 pb-36 pt-6 sm:pt-10">
      <header className="mx-auto mb-10 flex max-w-5xl items-center justify-between">
        <div>
          <p className="text-xs font-medium text-text-muted">{greeting()}</p>
          <p className="font-display text-2xl font-semibold tracking-tight text-text">
            respira
            <span className="ml-0.5 inline-block h-2 w-2 rounded-full bg-inhale align-baseline shadow-[0_0_12px_var(--color-inhale)]" />
          </p>
        </div>
        <span className="rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-text-muted">
          {exercises.length} prácticas
        </span>
      </header>

      <main>
        {tab === "triage" && <Triage onSelect={handleTriageSelect} />}
        {tab === "catalogo" && renderCatalogo()}
        {tab === "inhalador" && <InhalerProtocol onDone={() => goTo("triage")} />}
        {tab === "referencia" && (
          <div className="flex flex-col gap-8">
            <RedFlagBanner />
            <ComparisonTable />
          </div>
        )}
      </main>

      <footer className="mx-auto mt-20 max-w-2xl text-center text-[11px] leading-relaxed text-text-muted">
        {disclaimer}
      </footer>

      <nav
        aria-label="Secciones"
        className="fixed inset-x-0 bottom-4 z-30 mx-auto flex w-fit items-center gap-1 rounded-[1.75rem] border border-line bg-surface-raised px-2 py-1.5 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.5)]"
      >
        {TABS.slice(0, 2).map((t) => (
          <DockButton key={t.id} tab={t} active={tab === t.id} onClick={() => goTo(t.id)} />
        ))}
        <button
          onClick={() => openExercise(QUICK_CALM_ID)}
          aria-label="Calma rápida: respiración con labios fruncidos"
          className="mx-1 -mt-8 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-inhale text-[10px] font-bold leading-tight text-ink shadow-[0_10px_30px_-6px_var(--color-inhale)] transition active:scale-95 hover:scale-105"
        >
          <span className="relative mb-0.5 flex h-3 w-3">
            <span className="absolute inset-0 animate-ping rounded-full bg-ink/40" />
            <span className="relative h-3 w-3 rounded-full bg-ink/70" />
          </span>
          Calma
        </button>
        {TABS.slice(2).map((t) => (
          <DockButton key={t.id} tab={t} active={tab === t.id} onClick={() => goTo(t.id)} />
        ))}
      </nav>
    </div>
  );
}
