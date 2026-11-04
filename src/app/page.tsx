import Link from "next/link";
import SearchBox from "@/components/SearchBox";
const EX = ["Soweto", "Sandton", "Alexandra, Johannesburg", "Khayelitsha", "Umlazi", "Walkerville", "Johannesburg Ward 80"];
export default function Home() {
  return (
    <>
      <section className="rounded-2xl bg-navy-900 text-white p-5 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold">Know Your Area. Know Your Leaders. Know Your Vote.</h1>
        <p className="mt-2 text-white/80 max-w-prose">Find your ward, councillor and municipality, see what government is responsible for, and explore elections with the sources shown.</p>
        <div className="mt-5"><SearchBox /></div>
        <p className="mt-4 text-sm text-white/70">Try: {EX.map((e, i) => <span key={e}>{i > 0 && " · "}<span className="underline decoration-dotted">{e}</span></span>)}</p>
      </section>
      <section className="mt-8 grid gap-4 sm:grid-cols-3" aria-label="What you can do">
        {[["/elections", "Elections", "Reporting progress, results and what is official versus provisional."],
          ["/voter-guide", "Your Voting Guide", "Registration, ID, ballots, and how councils choose mayors."],
          ["/data-sources", "How we know", "Trust labels, sources and what is not yet connected."]].map(([h, t, d]) => (
          <Link key={h} href={h} className="card hover:border-teal-500 block min-h-[44px]"><h2 className="font-semibold">{t}</h2><p className="text-sm text-mute mt-1">{d}</p></Link>))}
      </section>
    </>
  );
}
