import { partyById } from "@/lib/results";

/** Accessible horizontal bar chart: label + number + pattern marker, so colour is never the only cue. */
export function PartyBars({ rows, caption }: { rows: { partyId: string; votes: number; pct: number }[]; caption: string }) {
  return (
    <figure>
      <figcaption className="sr-only">{caption}</figcaption>
      <ul className="space-y-2" role="list">
        {rows.map((r) => {
          const p = partyById(r.partyId);
          return (
            <li key={r.partyId}>
              <div className="flex justify-between text-sm"><span>{p.name} ({p.short})</span><span className="tabular-nums">{r.pct.toFixed(1)}% · {r.votes.toLocaleString("en-ZA")}</span></div>
              <div className="h-3 rounded bg-slate-200 overflow-hidden" aria-hidden>
                <div style={{ width: `${r.pct}%`, background: p.color, backgroundImage: p.pattern === "stripes" ? "repeating-linear-gradient(45deg,#0003 0 4px,transparent 4px 8px)" : p.pattern === "dots" ? "radial-gradient(#fff6 1.5px,transparent 1.5px)" : p.pattern === "cross" ? "repeating-linear-gradient(90deg,#fff5 0 2px,transparent 2px 8px)" : undefined, backgroundSize: p.pattern === "dots" ? "8px 8px" : undefined }} className="h-full" />
              </div>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}
