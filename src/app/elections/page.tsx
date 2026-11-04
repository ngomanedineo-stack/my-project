import Link from "next/link";
import { getElection } from "@/lib/store";
import { wards, municipalities } from "@/data/demo";
import { TrustBadge } from "@/components/Trust";
export const dynamic = "force-dynamic";
export default function Elections() {
  const e = getElection();
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Elections</h1>
      <section className="card">
        <h2 className="font-semibold">{e.name}</h2>
        <p className="text-sm">State: <strong>{e.state.replace("_", " ")}</strong> · updated {new Date(e.updatedAt).toLocaleString("en-ZA")} <TrustBadge level="demo" /></p>
        <p className="mt-2 text-sm text-mute">Official results come only from the IEC. Until an official feed is connected (see <Link className="underline" href="/data-sources">Data &amp; trust</Link>), this page shows no results and projects no winners. When counting starts you will see reporting progress separately from votes counted, and provisional results labelled as such.</p>
      </section>
      <section className="card">
        <h2 className="font-semibold">Browse by ward</h2>
        <ul className="mt-2 divide-y">{municipalities.map((m) => (
          <li key={m.id} className="py-2"><strong>{m.name}</strong>
            <ul className="flex flex-wrap gap-2 mt-1">{wards.filter((w) => w.municipalityId === m.id).map((w) => <li key={w.id}><Link className="inline-flex min-h-[44px] items-center rounded border px-3 hover:border-teal-500" href={`/area/${w.id}`}>Ward {w.number}</Link></li>)}</ul></li>))}
        </ul>
      </section>
    </div>
  );
}
