import type { Metadata } from "next";
import Image from "next/image";
import PageHead from "@/components/PageHead";
import CTA from "@/components/CTA";
import { about, principles, process, toolkit } from "@/content/site";
import { Rich } from "@/lib/rich";

export const metadata: Metadata = { title: "How I work", description: "Principles, process and toolkit: how I turn retention goals into shipped product." };

export default function About() {
  return (
    <>
      <PageHead eyebrow="How I work" title={about.headline} />

      <section className="wrap grid md:grid-cols-12 gap-10 pb-24 md:pb-36">
        <div className="md:col-span-4">
          <div className="relative aspect-[4/5] overflow-hidden bg-accent" data-reveal>
            <Image src="/img/deneo.jpg" alt="Deneo Ngomane smiling, holding a camera" width={700} height={787} className="size-full object-cover grayscale contrast-125 mix-blend-multiply" data-parallax="0.08" priority />
          </div>
        </div>
        <div className="md:col-span-7 md:col-start-6 space-y-6 text-xl text-ink/85">
          {about.paras.map((p, i) => <p key={i} data-reveal>{p}</p>)}
        </div>
      </section>

      <section className="rule py-24 md:py-32" aria-labelledby="princ-h">
        <div className="wrap">
          <h2 id="princ-h" className="display h-lg mb-14" data-split>Principles I work by.</h2>
          <ol className="grid md:grid-cols-2 gap-px bg-line border border-line">
            {principles.map((p, i) => (
              <li key={p.t} className="bg-bg p-8 md:p-12" data-reveal>
                <p className="mono text-accent">0{i + 1}</p>
                <h3 className="display h-md mt-4">{p.t}</h3>
                <p className="mt-4 text-ink/75 max-w-[44ch]">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rule py-24 md:py-32" aria-labelledby="proc-h">
        <div className="wrap">
          <h2 id="proc-h" className="display h-lg mb-14" data-split>From fuzzy to shipped.</h2>
          <ol className="grid gap-10" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
            {process.map((s) => (
              <li key={s.n} data-reveal>
                <div className="h-px bg-line mb-6"><div data-line className="h-px bg-accent" /></div>
                <p className="mono text-accent">{s.n}</p>
                <h3 className="display h-md mt-3">{s.t}</h3>
                <p className="mt-3 text-ink/75">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rule py-24 md:py-32" aria-labelledby="kit-h">
        <div className="wrap">
          <h2 id="kit-h" className="display h-lg mb-14" data-split>Design + strategy + code.</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {Object.entries(toolkit).map(([k, v]) => (
              <div key={k} data-reveal>
                <h3 className="mono text-accent mb-5">{k}</h3>
                <ul className="space-y-3 text-xl">{v.map((t) => <li key={t} className="border-b border-line pb-3"><Rich>{t}</Rich></li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
