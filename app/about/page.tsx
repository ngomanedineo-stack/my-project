import type { Metadata } from "next";
import Image from "next/image";
import { principles, process, toolkit, site } from "@/content/site";
import Lines from "@/components/Lines";
import Magnetic from "@/components/Magnetic";
import CTA from "@/components/CTA";

export const metadata: Metadata = { title: "About & how I work", description: "Who I am, the principles I work by, and how I take a product from problem to measured outcome." };

export default function About() {
  return (
    <>
      <section className="wrap grid items-end gap-12 pb-24 pt-40 md:grid-cols-[1fr_24rem]">
        <div>
          <p className="mono text-muted" data-reveal>About & how I work</p>
          <Lines as="h1" hero lines={["Design, strategy", "and code. One", "accountable person."]} em="accountable" className="mt-6 text-[clamp(3rem,8vw,8rem)]" />
        </div>
        <div className="relative overflow-hidden rounded-sm bg-signal" data-reveal>
          <div className="relative aspect-[4/5]">
            <Image src="/img/portrait.jpg" alt="Portrait of Deneo Ngomane holding a camera" fill priority sizes="24rem" className="object-cover object-top mix-blend-multiply grayscale contrast-125" />
          </div>
        </div>
      </section>

      <section className="wrap grid gap-8 border-t border-line py-20 md:grid-cols-[18rem_1fr]">
        <h2 className="mono text-muted" data-reveal>Story</h2>
        <div className="max-w-3xl space-y-6 text-xl leading-snug" data-reveal>
          <p>I'm a senior product designer working in African fintech. I'm from White River, South Africa, and I started in 2011 across graphic design, development and photography.</p>
          <p className="text-muted">That led me to UX, which combined creativity with problem-solving. I studied UX design at the University of Cape Town and have since worked on banking and mobile-money products at Capitec, Standard Bank and MTN MoMo.</p>
          <p className="text-muted">On the business banking redesign at Capitec, I was part of the team that lifted user engagement by 15%. At MTN MoMo today, I own design strategy, research and visual design for a high-trust wallet, and I work to keep strategy and execution connected.</p>
        </div>
      </section>

      <section className="wrap border-t border-line py-20" aria-labelledby="principles">
        <h2 id="principles" className="mono text-muted" data-reveal>Principles</h2>
        <ul className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <li key={p.t} className="border-t border-fg pt-5" data-reveal>
              <span className="mono text-signal">0{i + 1}</span>
              <h3 className="display mt-2 text-4xl">{p.t}</h3>
              <p className="mt-3 text-lg text-muted">{p.d}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap border-t border-line py-20" aria-labelledby="process">
        <h2 id="process" className="mono text-muted" data-reveal>How a project runs</h2>
        <ol className="mt-10">
          {process.map((s) => (
            <li key={s.n} className="grid gap-3 border-t border-line py-8 md:grid-cols-[6rem_18rem_1fr] md:gap-8" data-reveal>
              <span className="mono text-signal">{s.n}</span>
              <h3 className="display text-4xl">{s.t}</h3>
              <p className="max-w-2xl text-lg text-muted">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap border-t border-line py-20" aria-labelledby="toolkit">
        <h2 id="toolkit" className="mono text-muted" data-reveal>Toolkit</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {toolkit.map((g) => (
            <div key={g.group} data-reveal>
              <h3 className="display text-4xl">{g.group}</h3>
              <ul className="mt-4 space-y-2 text-lg text-muted">{g.items.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="mt-12" data-reveal><Magnetic><a className="btn" href={site.cv}>View CV</a></Magnetic></div>
      </section>
      <CTA />
    </>
  );
}
