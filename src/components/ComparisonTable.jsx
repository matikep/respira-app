import { comparisonTable } from "../data/protocolContent.js";

export default function ComparisonTable() {
  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="font-display text-xl font-medium text-text">
        Diferenciación rápida: obstrucción real vs. tensión
      </h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-line">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-surface-raised">
              {comparisonTable.headers.map((h) => (
                <th key={h} className="px-4 py-3 font-semibold text-text">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonTable.rows.map(([param, a, b]) => (
              <tr key={param} className="border-t border-line">
                <td className="px-4 py-3 font-mono text-xs uppercase tracking-wide text-text-muted">{param}</td>
                <td className="px-4 py-3 text-text">{a}</td>
                <td className="px-4 py-3 text-text">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
