import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import CTA from "@/components/CTA";
import Cover from "@/components/Cover";
import { TLink } from "@/components/Transition";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Selected work", description: "Case studies in mobile money and banking: problem, role, decisions, outcome." };

export default function Work() {
  return (
    <>
      <PageHead eyebrow="Selected work" title="Problems worth solving, with receipts.">
        Each case study follows the same arc: the problem, my role, the decisions and trade-offs, the outcome, and what I’d do next.
      </PageHead>
      <section aria-label="Case studies" className="wrap pb-24">
        <ul>
          {projects.map((p, i) => (
            <li key={p.slug} className="border-t border-line last:border-b" data-reveal>
              <TLink href={`/work/${p.slug}/`} className="group grid md:grid-cols-12 gap-6 items-center py-8 md:py-10" data-cursor="View" aria-label={`${p.client}: ${p.title}`}>
                <span className="mono text-mute md:col-span-1">0{i + 1}</span>
                <div className="md:col-span-6">
                  <p className="mono text-mute">{p.client} · {p.role} · {p.year}</p>
                  <h2 className="display h-md mt-3 transition-colors group-hover:text-accent">{p.title}</h2>
                  <p className="mt-3 text-ink/70 max-w-[48ch]">{p.tagline}</p>
                </div>
                <div className="md:col-span-5 relative aspect-[16/9] overflow-hidden border border-line">
                  <Cover art={p.art} accent={p.accent} className="size-full transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-105" />
                </div>
              </TLink>
            </li>
          ))}
        </ul>
      </section>
      <CTA />
    </>
  );
}
