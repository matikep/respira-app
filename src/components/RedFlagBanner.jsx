import { useState } from "react";
import { redFlags } from "../data/protocolContent.js";

export default function RedFlagBanner() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-alert-dim bg-alert-dim/30 px-5 py-4">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between text-left">
        <span className="font-semibold text-alert">Señales de alarma: acude a urgencias si presentas...</span>
        <span className="font-mono text-alert">{open ? "–" : "+"}</span>
      </button>
      {open && (
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-text">
          {redFlags.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
