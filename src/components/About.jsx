import { categories, exercises } from "../data/exercises.js";

const SOURCES = [
  { label: "Cochrane 2020 · Ejercicios respiratorios en adultos con asma", url: "https://pubmed.ncbi.nlm.nih.gov/32212422/" },
  { label: "Guía BTS/SIGN · Manejo no farmacológico del asma", url: "https://rightdecisions.scot.nhs.uk/asthma-pathway-bts-nice-sign-sign-244/managing-chronic-asthma/non-pharmacological-management/secondary-prevention/" },
  { label: "Holloway & West, Thorax 2007 · Método Papworth", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2094294/" },
  { label: "Balban et al., Cell Reports Medicine 2023 · Suspiro cíclico", url: "https://pubmed.ncbi.nlm.nih.gov/36630953/" },
  { label: "Cleveland Clinic · Respiración con labios fruncidos", url: "https://my.clevelandclinic.org/health/treatments/9443-pursed-lip-breathing" },
  { label: "ACPRC · Posiciones de alivio para la falta de aire", url: "https://www.acprc.org.uk/media/nq3abhma/gl-01howtocopewithbeingsob-positions-1.pdf" },
];

function Card({ title, children }) {
  return (
    <section className="rounded-3xl border border-line bg-surface p-6">
      <h3 className="font-display text-lg font-semibold text-text">{title}</h3>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-text-muted">{children}</div>
    </section>
  );
}

export default function About() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      <header>
        <h2 className="font-display text-3xl font-semibold leading-tight text-text sm:text-4xl">Acerca del proyecto</h2>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">
          Respira es una app de autorregulación del patrón respiratorio: {exercises.length} prácticas guiadas en{" "}
          {categories.length} categorías, con un temporizador visual que marca cada fase para no tener que contar
          mentalmente.
        </p>
      </header>

      <Card title="Cómo se eligieron los ejercicios">
        <p>
          Cada práctica se revisó contra guías clínicas y estudios publicados. Por eso cada ficha declara su nivel de
          evidencia, la fuente concreta y, cuando corresponde, sus precauciones y contraindicaciones.
        </p>
        <p>
          «Práctica tradicional» significa justamente eso: uso contemplativo de larga data, con poca investigación
          clínica detrás. Está etiquetado así a propósito, para que la diferencia con lo demás quede a la vista.
        </p>
        <ul className="mt-1 space-y-1.5">
          {SOURCES.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text underline decoration-line underline-offset-4 transition hover:decoration-inhale"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Qué no es">
        <p>
          No reemplaza la evaluación, el diagnóstico ni el tratamiento médico, y ninguna práctica sustituye al inhalador
          de rescate durante una crisis. Ante señales de alarma, urgencias: en Chile, 131 (SAMU).
        </p>
        <p>
          Tampoco recopila datos: no hay cuentas, analítica ni servidor. Todo corre en tu dispositivo y funciona sin
          conexión una vez instalada.
        </p>
      </Card>

      <Card title="Quién lo hizo">
        <p>
          Un proyecto personal de <span className="font-semibold text-text">Matías Lobos</span>, hecho por necesidad
          propia: tener a mano, y bien explicadas, las técnicas que sirven cuando cuesta respirar.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <a
            href="https://matiaslobos.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-inhale px-4 py-2 text-sm font-semibold text-ink transition hover:brightness-110"
          >
            matiaslobos.cl
          </a>
          <a
            href="https://github.com/matikep/respira-app"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-text transition hover:border-inhale"
          >
            Código en GitHub
          </a>
        </div>
      </Card>
    </div>
  );
}
