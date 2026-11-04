import { notFound } from "next/navigation";
import nextDynamic from "next/dynamic";
export const dynamic = "force-dynamic";
import Link from "next/link";
import { wardById, munById, partyById, historicalWard, summarise, councilMajority } from "@/lib/results";
import { getElection } from "@/lib/store";
import { wards, DEMO_SOURCE } from "@/data/demo";
import { TrustBadge, HowDoWeKnow } from "@/components/Trust";
import { PartyBars } from "@/components/Chart";
import type { ElectionState } from "@/lib/types";

const WardMap = nextDynamic(() => import("@/components/WardMap"), { ssr: false, loading: () => <div className="h-80 animate-pulse rounded-xl bg-slate-200" aria-label="Loading map" /> });

const STATE_LABEL: Record<ElectionState, string> = {
  awaiting: "Awaiting election", voting: "Voting underway", counting: "Counting underway", provisional: "Provisional results",
  official: "Official results declared", council_pending: "Council formation pending", administration_confirmed: "New administration confirmed",
};
const AFTER_TEXT: Record<ElectionState, string> = {
  awaiting: "The election has not happened yet. No results or new administration exist.",
  voting: "Voting is underway. No results are available.",
  counting: "Counting is underway. Reporting progress is not a result — do not treat partial counts as final.",
  provisional: "Provisional results only. They may change until the IEC declares official results.",
  official: "Official ward results are declared. The municipality's government is not yet decided — that happens when the new council meets.",
  council_pending: "The council has not yet been constituted. No party or coalition is confirmed as governing.",
  administration_confirmed: "The new administration has been confirmed by the council.",
};
const CATS = ["Water", "Electricity", "Roads & transport", "Crime & safety", "Employment & economy", "Healthcare", "Education", "Sanitation & waste", "Housing", "Municipal finances", "Other indicators"];
const RESP: Record<string, string> = { Water: "Municipality (water services authority); bulk supply may be a water board.", Electricity: "Municipality OR Eskom depending on your supply area; national grid load-shedding is separate.", "Crime & safety": "SAPS (national). Municipalities run metro police and lighting.", Healthcare: "Provincial health department; municipalities may run some clinics.", Education: "Provincial education department." };

export default function Area({ params }: { params: { wardId: string } }) {
  const ward = wardById(params.wardId);
  if (!ward) notFound();
  const m = munById(ward.municipalityId);
  const e = getElection();
  const cp = partyById(ward.councillor.partyId);
  const h = historicalWard(ward.id);
  const hist = h ? summarise(h.votes, h.registered) : null;
  const { total, needed } = councilMajority(m.seats);
  const seatRows = Object.entries(m.seats).map(([partyId, v]) => ({ partyId, votes: v, pct: (v / total) * 100 })).sort((a, b) => b.votes - a.votes);
  const mapWards = wards.filter((w) => w.municipalityId === m.id).map((w) => ({ id: w.id, name: w.name, ring: w.ring, color: partyById(w.councillor.partyId).color, selected: w.id === ward.id }));

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-mute"><Link href="/" className="underline">Home</Link> › My Area</p>
        <h1 className="text-2xl sm:text-3xl font-bold">{ward.name}</h1>
        <p className="text-mute">{m.name} · {m.province}{m.district ? ` · ${m.district} District` : ""} · {m.category === "A" ? "Metropolitan" : "Local"} municipality</p>
        <p className="mt-2 text-sm rounded bg-amber-50 border border-amber-200 text-amber-900 p-2">Your searched location does not prove where you are registered or which voting station you must use. <Link href="/voter-guide" className="underline">Check with the IEC</Link>.</p>
      </header>

      <section aria-labelledby="map" className="card">
        <h2 id="map" className="font-semibold mb-2">Map <TrustBadge level="demo" /></h2>
        <WardMap wards={mapWards} center={ward.center} />
        <ul className="sr-only">{mapWards.map((w) => <li key={w.id}>{w.name}</li>)}</ul>
        <p className="text-xs text-mute mt-1">Illustrative boundaries (version {ward.boundaryVersion}). Official IEC/MDB ward boundaries for the 2026 cycle are not yet loaded.</p>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <section aria-labelledby="cur" className="card">
          <h2 id="cur" className="font-semibold text-lg">Current governance</h2>
          <dl className="mt-2 space-y-2 text-sm">
            <div><dt className="text-mute">Ward councillor</dt><dd className="font-medium">{ward.councillor.name} — {cp.name} <TrustBadge level="demo" /></dd></div>
            <div><dt className="text-mute">Municipality governed by</dt><dd className="font-medium">{m.governing.kind === "coalition" ? "Coalition: " : ""}{m.governing.partyIds.map((id) => partyById(id).name).join(" + ")} (since {m.governing.since})</dd></div>
            <div><dt className="text-mute">Mayor</dt><dd className="font-medium">{m.mayor.name} — {partyById(m.mayor.partyId).name}</dd></div>
          </dl>
          <p className="mt-2 text-xs text-mute">Your ward councillor and the party running the municipality can be different. Council needs {needed} of {total} seats for a majority.</p>
          <h3 className="mt-3 text-sm font-semibold">Council seat distribution</h3>
          <PartyBars rows={seatRows} caption={`Council seats in ${m.name}`} />
          <HowDoWeKnow source={DEMO_SOURCE} />
        </section>

        <section aria-labelledby="aft" className="card">
          <h2 id="aft" className="font-semibold text-lg">After the election</h2>
          <p className="mt-1"><span className="inline-block rounded bg-navy-800 text-white px-2 py-0.5 text-sm font-semibold">{STATE_LABEL[e.state]}</span></p>
          <p className="mt-2 text-sm">{AFTER_TEXT[e.state]}</p>
          <ol className="mt-3 space-y-1 text-sm" aria-label="Election stages">
            {(Object.keys(STATE_LABEL) as ElectionState[]).map((s, i, a) => {
              const cur = s === e.state, done = a.indexOf(e.state) > i;
              return <li key={s} aria-current={cur ? "step" : undefined} className={cur ? "font-bold" : done ? "text-mute" : "text-mute opacity-70"}>{done ? "✔" : cur ? "●" : "○"} {STATE_LABEL[s]}</li>;
            })}
          </ol>
          <p className="mt-3 text-sm text-mute">Winning the most votes does not automatically mean governing: coalitions, independents and council votes decide.</p>
          <HowDoWeKnow source={{ ...DEMO_SOURCE, owner: "Election state set by an administrator (demo)", method: "Read at request time from data/election-state.json; no rebuild needed." }} />
        </section>
      </div>

      <section aria-labelledby="hist" className="card">
        <h2 id="hist" className="font-semibold text-lg">2021 ward result <TrustBadge level="historical" /> <TrustBadge level="demo" /></h2>
        {hist ? (<><p className="text-sm text-mute">{hist.total.toLocaleString("en-ZA")} valid votes · turnout {hist.turnoutPct.toFixed(1)}%</p>
          <PartyBars rows={hist.rows} caption="2021 ward votes by party" /></>) : <p>Data unavailable.</p>}
        <p className="text-xs text-mute mt-2">Ward boundaries may have changed since 2021; compare with care.</p>
        <HowDoWeKnow source={DEMO_SOURCE} />
      </section>

      <section aria-labelledby="perf" className="card">
        <h2 id="perf" className="font-semibold text-lg">How is my area doing?</h2>
        <p className="text-sm text-mute">No service-delivery data source is connected yet, so nothing is shown rather than inventing numbers. Each indicator will show source, date, geography and verification status.</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {CATS.map((c) => (
            <li key={c} className="rounded-lg border border-[var(--line)] p-3">
              <div className="flex items-center justify-between gap-2"><strong>{c}</strong><TrustBadge level="unavailable" /></div>
              <p className="text-xs text-mute mt-1">Status: Insufficient data</p>
              {RESP[c] && <p className="text-xs text-mute mt-1"><em>Who is responsible:</em> {RESP[c]}</p>}
            </li>))}
        </ul>
      </section>
    </div>
  );
}
