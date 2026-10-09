import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import Cover from "@/components/Cover";
import CTA from "@/components/CTA";
import ReadProgress from "@/components/ReadProgress";
import { TLink } from "@/components/Transition";
import { Rich, stripPh } from "@/lib/rich";

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: `${p.client}: ${p.title}`, description: stripPh(p.tagline) } : {};
}

const Label = ({ n, children }: { n: string; children: string }) => (
  <p className="mono text-mute flex items-center gap-4"><span className="text-accent">{n}</span>{children}</p>
);

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];

  return (
    <article>
      <ReadProgress />
      {/* Title + cover */}
      <header className="relative pt-40 md:pt-52">
        <div className="wrap">
          <p className="mono text-mute mb-6" data-reveal>{p.client} · {p.year}</p>
          <h1 className="display h-xl max-w-[16ch]" data-split>{p.title}</h1>
          <p className="mt-8 text-xl md:text-2xl text-ink/80 max-w-[40ch]" data-reveal><Rich>{p.tagline}</Rich></p>
        </div>
        <div className="wrap mt-14 md:mt-20">
          <div className="relative aspect-[16/8] overflow-hidden border border-line">
            <div className="absolute -inset-y-[12%] inset-x-0" data-parallax="0.3"><Cover art={p.art} accent={p.accent} className="size-full" /></div>
          </div>
        </div>
      </header>

      {/* Recruiter TL;DR */}
      <section aria-label="At a glance" className="wrap py-14">
        <dl className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-8 border-y border-line py-8">
          {[["My role", p.role], ["Team", p.tldr.team], ["Scope", p.tldr.scope], ["Platform", p.tldr.platform], ["Headline result", p.tldr.metric]].map(([k, v]) => (
            <div key={k} data-reveal>
              <dt className="mono text-mute">{k}</dt>
              <dd className="mt-2 text-[0.98rem]"><Rich>{v}</Rich></dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 01 Problem */}
      <section className="wrap py-20 md:py-32 grid md:grid-cols-12 gap-10" aria-labelledby="problem-h">
        <div className="md:col-span-3"><Label n="01">The problem</Label></div>
        <div className="md:col-span-9">
          <h2 id="problem-h" className="display h-lg max-w-[20ch]" data-split>{p.problem.heading}</h2>
          <div className="mt-10 space-y-6 text-xl text-ink/80 max-w-[56ch]">
            {p.problem.body.map((b, i) => <p key={i} data-reveal><Rich>{b}</Rich></p>)}
          </div>
        </div>
      </section>

      {/* 02 Role */}
      <section className="wrap py-20 md:py-28 grid md:grid-cols-12 gap-10 rule" aria-labelledby="role-h">
        <div className="md:col-span-3"><Label n="02">My role</Label></div>
        <div className="md:col-span-9">
          <h2 id="role-h" className="sr-only">My role</h2>
          <ul className="space-y-5 text-xl max-w-[56ch]">
            {p.roleDetail.map((r, i) => <li key={i} className="flex gap-4" data-reveal><span className="text-accent mt-1.5" aria-hidden="true">→</span><span><Rich>{r}</Rich></span></li>)}
          </ul>
        </div>
      </section>

      {/* 03 Process */}
      <section className="wrap py-20 md:py-28 rule" aria-labelledby="process-h">
        <Label n="03">Process</Label>
        <h2 id="process-h" className="sr-only">Process</h2>
        <ol className="mt-12 grid gap-10 md:gap-6" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
          {p.process.map((s, i) => (
            <li key={s.t} data-reveal>
              <div className="h-px bg-line mb-6"><div data-line className="h-px bg-accent" /></div>
              <p className="mono text-accent">0{i + 1}</p>
              <h3 className="display h-md mt-3">{s.t}</h3>
              <p className="mt-4 text-ink/75"><Rich>{s.d}</Rich></p>
            </li>
          ))}
        </ol>
      </section>

      {/* 04 Decisions & trade-offs */}
      <section className="wrap py-20 md:py-28 rule" aria-labelledby="dec-h">
        <Label n="04">Decisions &amp; trade-offs</Label>
        <h2 id="dec-h" className="display h-lg mt-6 max-w-[16ch]" data-split>What I chose, and what it cost.</h2>
        <ul className="mt-14 space-y-px bg-line border border-line">
          {p.decisions.map((d, i) => (
            <li key={i} className="bg-bg grid md:grid-cols-12 gap-6 p-7 md:p-10" data-reveal>
              <h3 className="display h-md md:col-span-5"><Rich>{d.decision}</Rich></h3>
              <div className="md:col-span-4"><p className="mono text-mute mb-2">Because</p><p className="text-ink/85"><Rich>{d.because}</Rich></p></div>
              <div className="md:col-span-3"><p className="mono text-mute mb-2">Trade-off</p><p className="text-ink/85"><Rich>{d.tradeoff}</Rich></p></div>
            </li>
          ))}
        </ul>
      </section>

      {/* 05 Outcome */}
      <section className="wrap py-20 md:py-28 rule" aria-labelledby="out-h">
        <Label n="05">Outcome</Label>
        <h2 id="out-h" className="sr-only">Outcome and metrics</h2>
        <dl className="mt-12 grid md:grid-cols-3 gap-10">
          {p.outcome.map((o, i) => (
            <div key={i} data-reveal>
              <dd className="display text-accent order-1" style={{ fontSize: "clamp(3.5rem,8vw,8rem)" }}><Rich>{o.value}</Rich></dd>
              <dt className="mt-3 text-ink/80"><Rich>{o.label}</Rich></dt>
            </div>
          ))}
        </dl>
        <p className="mt-14 text-xl md:text-2xl max-w-[48ch]" data-reveal><Rich>{p.outcomeBody}</Rich></p>
      </section>

      {/* 06 Next */}
      <section className="wrap py-20 md:py-28 grid md:grid-cols-12 gap-10 rule" aria-labelledby="next-h">
        <div className="md:col-span-3"><Label n="06">What I’d do next</Label></div>
        <div className="md:col-span-9">
          <h2 id="next-h" className="sr-only">What I would do next</h2>
          <ul className="space-y-5 text-xl max-w-[56ch]">
            {p.next.map((r, i) => <li key={i} className="flex gap-4" data-reveal><span className="text-accent mt-1.5" aria-hidden="true">→</span><span><Rich>{r}</Rich></span></li>)}
          </ul>
        </div>
      </section>

      {/* Next case */}
      <section className="rule">
        <TLink href={`/work/${next.slug}/`} className="group block wrap py-20 md:py-32" data-cursor="Next">
          <p className="mono text-mute">Next case study</p>
          <p className="display h-xl mt-4 transition-colors group-hover:text-accent max-w-[16ch]">{next.title}</p>
        </TLink>
      </section>
      <CTA />
    </article>
  );
}
