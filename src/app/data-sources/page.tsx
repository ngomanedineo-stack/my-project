import { TrustBadge } from "@/components/Trust";
import type { TrustLevel } from "@/lib/types";
const LEVELS: [TrustLevel, string][] = [["official","Confirmed by an authoritative source."],["verified","Independently corroborated."],["provisional","Officially published but not final."],["reported","Attributed to a source, not independently established."],["community","Citizen-submitted; awaiting or under verification."],["historical","From an earlier reporting period."],["unavailable","No reliable data. We show this instead of inventing numbers."],["demo","Fictional example used to demonstrate the product."]];
const SRC: [string, string][] = [
  ["IEC election results & candidate lists", "Not connected"], ["IEC / Municipal Demarcation Board ward boundaries", "Not connected (demo boxes in use)"],
  ["National Treasury Municipal Money", "Not connected"], ["Auditor-General South Africa", "Not connected"],
  ["SAPS crime statistics", "Not connected"], ["Stats SA census / labour data", "Not connected"], ["Geocoding provider", "Not connected (gazetteer of demo names)"],
];
export default function Sources() {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Data &amp; trust</h1>
      <section className="card"><h2 className="font-semibold">Trust labels</h2>
        <ul className="mt-2 space-y-2">{LEVELS.map(([l, d]) => <li key={l} className="flex gap-3 items-start"><TrustBadge level={l} /><span className="text-sm">{d}</span></li>)}</ul></section>
      <section className="card"><h2 className="font-semibold">Integration status (honest)</h2>
        <ul className="mt-2 divide-y text-sm">{SRC.map(([s, st]) => <li key={s} className="py-2 flex justify-between gap-3"><span>{s}</span><span className="text-mute">{st}</span></li>)}</ul>
        <p className="text-xs text-mute mt-2">Adapters for each live in <code>src/lib/adapters</code>; see docs/DATA_SOURCES.md.</p></section>
    </div>
  );
}
