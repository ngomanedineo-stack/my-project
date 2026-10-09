import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import CTA from "@/components/CTA";
import Button from "@/components/Button";
import { education, experience, site } from "@/content/site";
import { Rich } from "@/lib/rich";

export const metadata: Metadata = { title: "Experience", description: "MTN MoMo, Standard Bank, Capitec Business Bank: roles, scope and results." };

export default function Experience() {
  return (
    <>
      <PageHead eyebrow="Experience" title="Five years in African fintech.">
        Mobile money and banking, for products used by people on every kind of phone.
        <span className="block mt-8"><Button href={site.cv} variant="primary" download>Download CV (PDF)</Button></span>
      </PageHead>

      <section aria-label="Roles" className="wrap pb-24">
        <ol>
          {experience.map((e) => (
            <li key={e.company} className="border-t border-line py-12 md:py-16 grid md:grid-cols-12 gap-8">
              <div className="md:col-span-4" data-reveal>
                <p className="mono text-mute">{e.period}</p>
                <h2 className="display h-md mt-3">{e.company}</h2>
                <p className="mt-2 text-accent">{e.role}</p>
              </div>
              <div className="md:col-span-8">
                <p className="text-xl md:text-2xl max-w-[40ch]" data-reveal>{e.summary}</p>
                <ul className="mt-8 space-y-4 text-ink/80 max-w-[60ch]">
                  {e.bullets.map((b, i) => <li key={i} className="flex gap-4" data-reveal><span className="text-accent" aria-hidden="true">→</span><span><Rich>{b}</Rich></span></li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="rule py-20 md:py-28" aria-labelledby="edu-h">
        <div className="wrap grid md:grid-cols-12 gap-10">
          <h2 id="edu-h" className="display h-md md:col-span-4" data-split>Education &amp; training</h2>
          <ul className="md:col-span-8 divide-y divide-line border-y border-line">
            {education.map((e) => (
              <li key={e.name} className="py-6 grid sm:grid-cols-[7rem_1fr] gap-2" data-reveal>
                <span className="mono text-mute">{e.year}</span>
                <span><span className="block text-xl">{e.name}</span><span className="text-ink/70">{e.detail}</span></span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTA />
    </>
  );
}
