import type { Metadata } from "next";
import { experience, education, site } from "@/content/site";
import Lines from "@/components/Lines";
import Magnetic from "@/components/Magnetic";
import CTA from "@/components/CTA";

export const metadata: Metadata = { title: "Experience", description: "Roles at MTN MoMo, Standard Bank and Capitec, plus education." };

export default function Experience() {
  return (
    <>
      <section className="wrap pb-16 pt-40">
        <p className="mono text-muted" data-reveal>Experience</p>
        <Lines as="h1" hero lines={["Fintech, from", "branch to wallet."]} em="wallet" className="mt-6 text-[clamp(3rem,9vw,9rem)]" />
        <div className="mt-10" data-reveal><Magnetic><a className="btn btn-primary" href={site.cv}>Download CV (PDF)</a></Magnetic></div>
      </section>

      <section className="wrap" aria-label="Work experience">
        <ol className="border-t border-line">
          {experience.map((e) => (
            <li key={e.company} className="grid gap-6 border-b border-line py-12 md:grid-cols-[14rem_1fr_1fr] md:py-16" data-reveal>
              <p className="mono text-muted">{e.period}</p>
              <div>
                <h2 className="display text-5xl md:text-6xl">{e.company}</h2>
                <p className="mt-3 text-xl text-signal">{e.role}</p>
                <p className="mt-4 max-w-md text-muted">{e.summary}</p>
              </div>
              <ul className="space-y-3 text-lg">{e.points.map((p) => <li key={p} className="border-t border-line pt-3">{p}</li>)}</ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap py-24" aria-labelledby="edu">
        <h2 id="edu" className="mono text-muted" data-reveal>Education & qualifications</h2>
        <ul className="mt-8 border-t border-line">
          {education.map((e) => (
            <li key={e.year + e.name} className="grid gap-2 border-b border-line py-6 md:grid-cols-[14rem_1fr_1fr]" data-reveal>
              <span className="mono text-muted">{e.year}</span>
              <span className="display text-3xl">{e.name}</span>
              <span className="text-muted">{e.detail}</span>
            </li>
          ))}
        </ul>
      </section>
      <CTA />
    </>
  );
}
