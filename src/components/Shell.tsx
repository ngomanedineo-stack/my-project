import Link from "next/link";
const NAV = [["/", "Home"], ["/elections", "Elections"], ["/voter-guide", "Voter guide"], ["/data-sources", "Data & trust"]];
export function Header() {
  return (
    <header className="bg-navy-900 text-white">
      <div className="mx-auto max-w-5xl px-4 min-h-[56px] flex items-center justify-between gap-4 flex-wrap">
        <Link href="/" className="font-bold text-lg py-2">Mzansi Votes</Link>
        <nav aria-label="Main"><ul className="flex gap-1 flex-wrap">
          {NAV.map(([h, l]) => <li key={h}><Link className="inline-flex min-h-[44px] items-center px-3 rounded hover:bg-white/10" href={h}>{l}</Link></li>)}
        </ul></nav>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="mt-12 border-t border-[var(--line)] py-8 text-sm text-mute">
      <div className="mx-auto max-w-5xl px-4 space-y-1">
        <p>Mzansi Votes is independent and nonpartisan. We do not endorse any party or candidate.</p>
        <p>Searching an address does not confirm your voter registration or voting station. Check with the <a className="underline" href="https://www.elections.org.za" rel="noopener noreferrer">Electoral Commission of South Africa</a>.</p>
      </div>
    </footer>
  );
}
