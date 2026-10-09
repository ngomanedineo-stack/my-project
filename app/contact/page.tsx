import type { Metadata } from "next";
import { site } from "@/content/site";
import Lines from "@/components/Lines";
import Magnetic from "@/components/Magnetic";

export const metadata: Metadata = { title: "Contact", description: "Book a chat, email, or connect on LinkedIn." };

export default function Contact() {
  const rows = [
    ["Book a chat", "30 minutes, no prep needed", site.book, true],
    ["Email", site.email, `mailto:${site.email}`, false],
    ["LinkedIn", "Connect or message", site.linkedin, true],
    ["CV", "PDF, one click", site.cv, false],
  ] as const;
  return (
    <section className="wrap min-h-[90svh] pb-24 pt-40">
      <p className="mono text-muted" data-reveal>{site.availability}</p>
      <Lines as="h1" hero lines={["Let's talk about", "your next hire."]} em="hire" className="mt-6 text-[clamp(3rem,10vw,10rem)]" />
      <ul className="mt-16 border-t border-line">
        {rows.map(([t, d, href, ext]) => (
          <li key={t} className="border-b border-line" data-reveal>
            <a href={href} data-cursor="Go" {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex items-center justify-between gap-6 py-8 md:py-10">
              <span className="display text-4xl transition-transform duration-500 group-hover:translate-x-3 md:text-7xl">{t}</span>
              <span className="mono hidden text-muted md:block">{d}</span>
              <span className="display text-4xl text-signal md:text-6xl" aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mono mt-10 text-muted" data-reveal>{site.location} · {site.phone}</p>
    </section>
  );
}
