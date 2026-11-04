import type { SourceInfo, TrustLevel } from "@/lib/types";

const META: Record<TrustLevel, { label: string; cls: string; icon: string }> = {
  official: { label: "Official", cls: "bg-emerald-100 text-emerald-900", icon: "✔" },
  verified: { label: "Verified", cls: "bg-teal-100 text-teal-900", icon: "✓" },
  provisional: { label: "Provisional", cls: "bg-amber-100 text-amber-900", icon: "◐" },
  reported: { label: "Reported", cls: "bg-sky-100 text-sky-900", icon: "❝" },
  community: { label: "Community-submitted", cls: "bg-violet-100 text-violet-900", icon: "☺" },
  historical: { label: "Historical", cls: "bg-slate-200 text-slate-800", icon: "⌚" },
  unavailable: { label: "Data unavailable", cls: "bg-zinc-200 text-zinc-800", icon: "∅" },
  demo: { label: "Demo data", cls: "bg-rose-100 text-rose-900", icon: "⚠" },
};

export function TrustBadge({ level }: { level: TrustLevel }) {
  const m = META[level];
  return <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${m.cls}`}><span aria-hidden>{m.icon}</span>{m.label}</span>;
}

/** "How do we know this?" panel — native <details> keeps it keyboard/screen-reader friendly and works without JS. */
export function HowDoWeKnow({ source }: { source: SourceInfo }) {
  return (
    <details className="mt-2 text-sm">
      <summary className="cursor-pointer font-medium text-teal-600 underline min-h-[44px] flex items-center">How do we know this?</summary>
      <dl className="mt-1 grid grid-cols-[8rem_1fr] gap-x-3 gap-y-1 text-mute">
        <dt className="font-semibold">Source</dt><dd>{source.owner}{source.url && <> — <a className="underline" href={source.url} rel="noopener noreferrer">link</a></>}</dd>
        <dt className="font-semibold">Period</dt><dd>{source.period}</dd>
        <dt className="font-semibold">Coverage</dt><dd>{source.geography}</dd>
        <dt className="font-semibold">Last verified</dt><dd>{source.lastVerified}</dd>
        <dt className="font-semibold">Method</dt><dd>{source.method}</dd>
        <dt className="font-semibold">Limitations</dt><dd>{source.limitations}</dd>
      </dl>
    </details>
  );
}

export function DemoBanner() {
  return (
    <div role="note" className="bg-rose-50 border-b border-rose-200 text-rose-900 text-sm px-4 py-2 text-center">
      <strong>Demonstration data.</strong> Parties, people, boundaries and figures shown are fictional examples — no official source is connected yet.
    </div>
  );
}
