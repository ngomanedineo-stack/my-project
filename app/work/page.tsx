import type { Metadata } from "next";
import { caseStudies } from "@/content/work";
import TLink from "@/components/TLink";
import CoverArt from "@/components/CoverArt";
import Lines from "@/components/Lines";
import CTA from "@/components/CTA";

export const metadata: Metadata = { title: "Selected work", description: "Case studies in African fintech: problem, role, decisions and measured outcomes." };

export default function Work() {
  return (
    <>
      <section className="wrap pb-16 pt-40">
        <p className="mono text-muted" data-reveal>Selected work · {caseStudies.length} case studies</p>
        <Lines as="h1" hero lines={["Problems I owned.", "Outcomes I measured."]} em="measured" className="mt-6 text-[clamp(3rem,9vw,9rem)]" />
      </section>
      <section className="wrap" aria-label="Case studies">
        <ul className="border-t border-line">
          {caseStudies.map((c, i) => (
            <li key={c.slug} className="border-b border-line" data-reveal>
              <TLink href={`/work/${c.slug}`} label={c.client} data-cursor="View" className="group grid items-center gap-6 py-8 md:grid-cols-[4rem_1fr_16rem_8rem] md:py-12">
                <span className="mono text-muted">0{i + 1}</span>
                <div>
                  <h2 className="display text-4xl transition-transform duration-500 group-hover:translate-x-3 md:text-6xl">{c.title}</h2>
                  <p className="mt-3 text-muted">{c.client} · {c.tags.join(" · ")}</p>
                </div>
                <div className="relative hidden aspect-[3/2] overflow-hidden rounded-sm border border-line opacity-60 transition-opacity duration-500 group-hover:opacity-100 md:block">
                  <CoverArt seed={i + 3} accent={c.accent} />
                </div>
                <span className="display text-right text-4xl text-signal">{c.metrics[0].value}</span>
              </TLink>
            </li>
          ))}
        </ul>
      </section>
      <CTA />
    </>
  );
}
