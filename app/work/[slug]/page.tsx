import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/content/work";
import TLink from "@/components/TLink";
import CoverArt from "@/components/CoverArt";
import Lines from "@/components/Lines";
import HScrollSteps from "@/components/HScrollSteps";
import CTA from "@/components/CTA";

export const dynamicParams = false;
export const generateStaticParams = () => caseStudies.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCaseStudy((await params).slug);
  return c ? { title: `${c.client}: ${c.title}`, description: c.tagline } : {};
}

const isNum = (v: string) => /^\d+$/.test(v);

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();
  const i = caseStudies.indexOf(c);
  const next = caseStudies[(i + 1) % caseStudies.length];

  return (
    <article>
      {/* 1 · Header + snapshot */}
      <header className="wrap pb-12 pt-40">
        <p className="mono text-muted" data-reveal>{c.client} · {c.year}</p>
        <Lines as="h1" hero lines={[c.title]} className="mt-6 max-w-6xl text-[clamp(2.8rem,8vw,8rem)]" />
        <p className="mt-8 max-w-2xl text-xl text-muted" data-reveal>{c.tagline}</p>
      </header>

      <div className="wrap" data-reveal>
        <div className="relative aspect-[16/8] overflow-hidden rounded-sm border border-line">
          <div data-parallax="0.18" className="absolute inset-x-0 -inset-y-[12%]"><CoverArt seed={i + 3} accent={c.accent} label={`${c.client} cover artwork`} /></div>
        </div>
      </div>

      <section className="wrap mt-12 grid gap-10 border-y border-line py-10 md:grid-cols-[1fr_1fr_1fr_2fr]" aria-label="Snapshot">
        {[["Role", c.role], ["Team", c.team], ["Timeline", c.timeline], ["Platform", c.platform]].slice(0, 3).map(([k, v]) => (
          <div key={k} data-reveal><dt className="mono text-muted">{k}</dt><dd className="mt-2">{v}</dd></div>
        ))}
        <dl className="grid grid-cols-3 gap-6">
          {c.metrics.map((m) => (
            <div key={m.label} data-reveal>
              <dd className="display text-5xl text-signal md:text-6xl">{m.value}</dd>
              <dt className="mono mt-2 text-muted normal-case">{m.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* 2 · Problem */}
      <section className="wrap grid gap-8 py-24 md:grid-cols-[18rem_1fr] md:py-36">
        <h2 className="mono text-muted" data-reveal>01 · The problem</h2>
        <p className="display max-w-4xl text-3xl leading-[1.1] md:text-5xl" data-reveal>{c.problem}</p>
      </section>

      {/* 3 · My role */}
      <section className="wrap grid gap-8 border-t border-line py-24 md:grid-cols-[18rem_1fr] md:py-32">
        <h2 className="mono text-muted" data-reveal>02 · My role</h2>
        <div className="grid gap-12 md:grid-cols-2">
          <div data-reveal><h3 className="display text-3xl">I owned</h3><ul className="mt-5 space-y-3 text-lg">{c.myRole.owned.map((x) => <li key={x} className="border-t border-line pt-3">{x}</li>)}</ul></div>
          <div data-reveal><h3 className="display text-3xl text-muted">I shared</h3><ul className="mt-5 space-y-3 text-lg text-muted">{c.myRole.shared.map((x) => <li key={x} className="border-t border-line pt-3">{x}</li>)}</ul></div>
        </div>
      </section>

      {/* 4 · Process (horizontal scroll) */}
      <HScrollSteps title="How we got there." steps={c.process} />

      {/* 5 · Decisions & trade-offs */}
      <section className="wrap py-24 md:py-36" aria-labelledby="decisions">
        <h2 id="decisions" className="mono text-muted" data-reveal>03 · Decisions and trade-offs</h2>
        <div className="mt-10 grid gap-6">
          {c.decisions.map((d) => (
            <div key={d.title} className="rounded-sm border border-line bg-bg2 p-6 md:p-10" data-reveal>
              <h3 className="display text-3xl md:text-5xl">{d.title}</h3>
              <dl className="mt-8 grid gap-8 md:grid-cols-4">
                {[["Options", d.options], ["I chose", d.chose], ["I gave up", d.gaveUp], ["Because", d.why]].map(([k, v]) => (
                  <div key={k}><dt className="mono text-signal">{k}</dt><dd className="mt-2 text-lg">{v}</dd></div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* 6 · Solution */}
      <section className="wrap grid gap-8 border-t border-line py-24 md:grid-cols-[18rem_1fr] md:py-32">
        <h2 className="mono text-muted" data-reveal>04 · The solution</h2>
        <p className="max-w-3xl text-2xl leading-snug" data-reveal>{c.solution}</p>
      </section>

      {/* 7 · Outcome */}
      <section className="border-y border-line bg-bg2 py-24 md:py-36" aria-labelledby="outcome">
        <div className="wrap">
          <h2 id="outcome" className="mono text-muted" data-reveal>05 · Outcome</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {c.metrics.map((m) => (
              <div key={m.label} data-reveal>
                <p className="display text-[clamp(4rem,10vw,9rem)] text-signal">
                  {isNum(m.value.replace("%", "")) ? <span data-count={m.value.replace("%", "")} suppressHydrationWarning>{m.value.replace("%", "")}</span> : <span>{m.value.replace("%", "")}</span>}
                  {m.value.includes("%") && "%"}
                </p>
                <p className="mt-2 max-w-[18rem] text-muted">{m.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-14 max-w-3xl text-2xl leading-snug" data-reveal>{c.outcome}</p>
        </div>
      </section>

      {/* 8 · What I'd do next */}
      <section className="wrap grid gap-8 py-24 md:grid-cols-[18rem_1fr] md:py-32">
        <h2 className="mono text-muted" data-reveal>06 · What I'd do next</h2>
        <ul className="grid gap-4 md:grid-cols-3">{c.next.map((n) => <li key={n} className="border-t border-fg pt-4 text-lg" data-reveal>{n}</li>)}</ul>
      </section>

      {/* Next case study */}
      <TLink href={`/work/${next.slug}`} label={next.client} data-cursor="Next" className="group block border-t border-line">
        <div className="wrap py-24 md:py-36">
          <p className="mono text-muted">Next case study</p>
          <p className="display mt-4 text-[clamp(2.6rem,8vw,8rem)] transition-transform duration-500 group-hover:translate-x-4">{next.title} <span className="text-signal">→</span></p>
        </div>
      </TLink>
      <CTA />
    </article>
  );
}
