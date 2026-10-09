import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Statement from "@/components/Statement";
import Pillars from "@/components/Pillars";
import Proof from "@/components/Proof";
import WorkStrip from "@/components/WorkStrip";
import CTA from "@/components/CTA";
import { TLink } from "@/components/Transition";
import { experience } from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Statement />
      <Pillars />
      <WorkStrip />
      <Proof />

      <section aria-labelledby="exp-h" className="rule py-24 md:py-36">
        <div className="wrap">
          <h2 id="exp-h" className="display h-lg mb-14" data-split>Where I’ve done it.</h2>
          <ul>
            {experience.map((e) => (
              <li key={e.company} className="border-t border-line first:border-t-0">
                <TLink href="/experience/" label="Experience" className="group grid md:grid-cols-12 gap-3 items-baseline py-8 md:py-10 transition-colors hover:text-accent" data-cursor="CV">
                  <span className="display h-md md:col-span-6">{e.company}</span>
                  <span className="md:col-span-4 text-ink/80 group-hover:text-accent">{e.role}</span>
                  <span className="md:col-span-2 mono text-mute md:text-right">{e.period}</span>
                </TLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTA />
    </>
  );
}
