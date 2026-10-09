"use client";
import { useEffect, useRef } from "react";
import { pillars } from "@/content/site";
import { gsap, MQ } from "@/lib/gsap";

/**
 * Three value pillars. Desktop + motion: the section pins and the pillars swap as you scroll,
 * with each proof number counting up as it arrives. Otherwise: a plain, readable stacked list.
 */
export default function Pillars() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(`${MQ.motion} and ${MQ.desktop}`, () => {
      const el = root.current!;
      el.classList.add("is-pinned");
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", el);
      const dots = gsap.utils.toArray<HTMLElement>("[data-dot]", el);
      const count = (panel: HTMLElement) => {
        const n = panel.querySelector<HTMLElement>("[data-num]");
        if (!n) return;
        const end = parseFloat(n.dataset.num ?? "0");
        const o = { v: 0 };
        gsap.to(o, { v: end, duration: 1.2, ease: "power2.out", overwrite: true, onUpdate: () => (n.textContent = String(Math.round(o.v))) });
      };
      gsap.set(panels.slice(1), { autoAlpha: 0, y: 60 });
      gsap.set(dots, { opacity: 0.25 });
      gsap.set(dots[0], { opacity: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: { trigger: el, start: "top top", end: `+=${panels.length * 90}%`, pin: true, scrub: 0.6, anticipatePin: 1 },
      });
      panels.forEach((p, i) => {
        if (i > 0) {
          tl.to(panels[i - 1], { autoAlpha: 0, y: -60, duration: 0.35 }, i - 0.35)
            .to(p, { autoAlpha: 1, y: 0, duration: 0.35 }, i - 0.1)
            .to(dots[i - 1], { opacity: 0.25, duration: 0.2 }, i - 0.1)
            .to(dots[i], { opacity: 1, duration: 0.2 }, i - 0.1)
            .call(() => count(p), undefined, i - 0.05);
        }
      });
      tl.to({}, { duration: 0.6 }); // hold on the last pillar
      return () => el.classList.remove("is-pinned");
    });
    return () => mm.revert();
  }, []);

  return (
    <div>{/* React-owned wrapper: GSAP's pin-spacer lives inside it, so unmounting stays safe */}
    <section ref={root} className="pillars relative border-b border-line" aria-labelledby="pillars-title">
      <div className="wrap grid min-h-[100svh] content-center gap-10 py-24 md:grid-cols-[18rem_1fr]">
        <div className="md:self-start md:pt-24">
          <p className="mono text-muted" data-reveal>Why me</p>
          <h2 id="pillars-title" className="display mt-4 text-5xl md:text-6xl" data-reveal>Design, strategy <em>and</em> code. One person.</h2>
          <div className="mt-10 hidden gap-2 md:flex" aria-hidden="true">
            {pillars.map((p) => <span key={p.n} data-dot className="mono">{p.n}</span>)}
          </div>
        </div>

        <div className="pillar-stack">
          {pillars.map((p) => (
            <article key={p.n} data-panel className="pillar-panel border-t border-line py-10 md:border-0 md:py-0">
              <p className="mono text-signal">{p.n}</p>
              <h3 className="display mt-3 text-[clamp(2.6rem,6vw,6rem)]">{p.title}</h3>
              <p className="mt-6 max-w-2xl text-2xl leading-snug">{p.line}</p>
              <p className="mt-4 max-w-2xl text-lg text-muted">{p.body}</p>
              <div className="mt-8 flex items-baseline gap-4 border-t border-line pt-6">
                <span className="display text-7xl text-signal md:text-8xl">
                  <span data-num={p.stat.value} suppressHydrationWarning>{p.stat.value}</span>{p.stat.suffix}
                </span>
                <span className="mono max-w-[16rem] text-muted">{p.stat.label}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        .pillars.is-pinned .pillar-stack { display: grid; }
        .pillars.is-pinned .pillar-panel { grid-area: 1 / 1; }
        .pillars.is-pinned .wrap { min-height: 100svh; }
      `}</style>
    </section>
    </div>
  );
}
