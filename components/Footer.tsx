import { site } from "@/content/site";
import Magnetic from "./Magnetic";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mono text-muted">{site.availability}</p>
          <a href={`mailto:${site.email}`} className="display link-u mt-4 inline-block text-[clamp(2rem,6vw,5rem)]">{site.email}</a>
        </div>
        <ul className="flex flex-wrap gap-3">
          <li><Magnetic><a className="btn" href={site.cv}>View CV</a></Magnetic></li>
          <li><Magnetic><a className="btn" href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></Magnetic></li>
          <li><Magnetic><a className="btn btn-primary" href={site.book} target="_blank" rel="noopener noreferrer">Book a chat</a></Magnetic></li>
        </ul>
      </div>
      <div className="wrap mono flex justify-between pb-8 text-muted">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>{site.location}</span>
      </div>
    </footer>
  );
}
