"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { SearchResult } from "@/lib/search";

export default function SearchBox() {
  const [q, setQ] = useState("");
  const [res, setRes] = useState<SearchResult | null>(null);
  const [sugg, setSugg] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const router = useRouter();
  const t = useRef<ReturnType<typeof setTimeout>>();

  async function run(query: string) {
    setBusy(true); setErr(""); setRes(null);
    try {
      const r = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!r.ok) throw new Error();
      const data: SearchResult = await r.json();
      if (data.kind === "match" && data.hits[0].confidence === "exact" && data.hits.length === 1) router.push(`/area/${data.hits[0].ward.id}`);
      else setRes(data);
    } catch { setErr("Search is unavailable right now. Please try again."); }
    setBusy(false);
  }
  function onInput(v: string) {
    setQ(v); clearTimeout(t.current);
    t.current = setTimeout(async () => {
      if (v.trim().length < 2) return setSugg([]);
      try { setSugg((await (await fetch(`/api/suggest?q=${encodeURIComponent(v)}`)).json()).suggestions); } catch { setSugg([]); }
    }, 200);
  }
  function gps() {
    if (!navigator.geolocation) return setErr("Location is not supported on this device.");
    navigator.geolocation.getCurrentPosition(
      (p) => run(`${p.coords.latitude},${p.coords.longitude}`),
      () => setErr("Location permission was not granted. You can type your area instead."), { timeout: 10000 });
  }
  return (
    <div>
      <form role="search" onSubmit={(e) => { e.preventDefault(); setSugg([]); run(q); }} className="flex flex-col sm:flex-row gap-2">
        <label htmlFor="loc" className="sr-only">Search for your location</label>
        <input id="loc" list="sugg" value={q} onChange={(e) => onInput(e.target.value)} autoComplete="off"
          placeholder="Enter your address, township, suburb, village, ward or city"
          className="flex-1 min-h-[52px] rounded-xl px-4 text-ink text-base" />
        <datalist id="sugg">{sugg.map((s) => <option key={s} value={s} />)}</datalist>
        <button className="btn bg-teal-500 text-white" disabled={busy}>{busy ? "Searching…" : "Find my area"}</button>
        <button type="button" onClick={gps} className="btn bg-white/10 text-white border border-white/40">Use my location</button>
      </form>
      <p className="mt-2 text-xs text-white/70">Location is only used when you tap “Use my location”, and is never stored.</p>
      <div aria-live="polite" className="mt-3">
        {err && <p className="rounded-lg bg-rose-100 text-rose-900 p-3">{err}</p>}
        {res && res.hits.length === 0 && (
          <p className="rounded-lg bg-white text-ink p-3">{res.note ?? "We couldn't find that place."} Try a suburb, township or ward number such as “Johannesburg Ward 80”.</p>
        )}
        {res && res.hits.length > 0 && (
          <div className="rounded-lg bg-white text-ink p-3">
            <p className="font-semibold">{res.note ?? "Select the correct ward"}</p>
            <ul className="mt-2 divide-y">
              {res.hits.map((h) => (
                <li key={h.ward.id}><a className="flex min-h-[48px] items-center justify-between py-2 hover:underline" href={`/area/${h.ward.id}`}>
                  <span><strong>{h.ward.name}</strong><br /><span className="text-sm text-mute">{h.municipalityName}, {h.province} · {h.reason}</span></span><span aria-hidden>→</span></a></li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
