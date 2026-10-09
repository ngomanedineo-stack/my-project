import { TLink } from "./Transition";
import { nav, site } from "@/content/site";
import { stripPh } from "@/lib/rich";

export default function Footer() {
  return (
    <footer className="rule">
      <div className="wrap py-10 flex flex-col md:flex-row gap-6 md:items-center justify-between text-sm text-mute">
        <p>© {new Date().getFullYear()} {site.name} · {site.location}</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-2">
          {nav.map((n) => <TLink key={n.href} href={n.href} className="link-u hover:text-ink">{n.label}</TLink>)}
          <a href={stripPh(site.linkedin)} target="_blank" rel="noopener noreferrer" className="link-u hover:text-ink">LinkedIn</a>
          <a href={site.cv} download className="link-u hover:text-ink">CV (PDF)</a>
        </nav>
      </div>
    </footer>
  );
}
