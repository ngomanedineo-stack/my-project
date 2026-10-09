"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { whenReady } from "@/lib/motion";
import { pillars } from "@/content/site";
import { Rich } from "@/lib/rich";

/**
 * Three value pillars.
 * Desktop + motion: the stage PINS and scroll scrubs through the pillars one at a time
 * (giant numeral swaps, progress rail fills). Mobile / reduced motion: a plain stacked list.
 */
export default function Pillars() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    let dead = false;
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const items = gsap.utils.toArray<HTMLElement>(".pillar", el);
      const nums = gsap.utils.toArray<HTMLElement>(".pillar-num", el);
      gsap.set(items.slice(1), { autoAlpha: 0, y: 60 });
      gsap.set(nums.slice(1), { autoAlpha: 0, yPercent: 40 });
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: { trigger: el.querySelector(".pillars-stage"), pin: true, start: "top top", end: `+=${items.length * 90}%`, scrub: 0.6, anticipatePin: 1 },
      });
      tl.fromTo(".pillar-rail", { scaleY: 0.1 }, { scaleY: 1, ease: "none", duration: items.length }, 0);
      items.forEach((_, i) => {
        if (i === 0) return;
        const at = i - 0.0;
        tl.to(items[i - 1], { autoAlpha: 0, y: -60, duration: 0.45 }, at - 0.1)
          .to(nums[i - 1], { autoAlpha: 0, yPercent: -40, duration: 0.45 }, at - 0.1)
          .to(items[i], { autoAlpha: 1, y: 0, duration: 0.5 }, at + 0.1)
          .to(nums[i], { autoAlpha: 1, yPercent: 0, duration: 0.5 }, at + 0.1);
      });
      tl.to({}, { duration: 0.6 }); // hold the last pillar
      void whenReady().then(() => !dead && ScrollTrigger.refresh());
    });
    return () => {
      dead = true;
      mm.revert();
    };
  }, []);

  return (
    <section ref={section} aria-labelledby="pillars-h" className="rule">
      <div className="pillars-stage wrap py-24 lg:py-0 flex flex-col lg:justify-center">
        <div className="lg:absolute lg:top-28 lg:left-[clamp(1.25rem,4vw,3.5rem)]">
          <p className="mono text-mute" data-reveal>What I bring to your team</p>
          <h2 id="pillars-h" className="sr-only">Three value pillars</h2>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-10 items-center">
          {/* giant numeral (pinned layout only) */}
          <div className="hidden lg:block lg:col-span-5 relative h-[40vh]" aria-hidden="true">
            {pillars.map((p) => (
              <span key={p.n} className="pillar-num display absolute inset-0 flex items-center text-accent" style={{ fontSize: "clamp(8rem,22vw,22rem)" }}>
                {p.n}
              </span>
            ))}
          </div>

          <ol className="lg:col-span-7 lg:relative lg:h-[48vh] space-y-16 lg:space-y-0">
            {pillars.map((p) => (
              <li key={p.n} className="pillar" data-reveal>
                <p className="mono text-accent lg:hidden mb-4">{p.n}</p>
                <h3 className="display h-lg">{p.title}</h3>
                <p className="mt-6 text-xl text-ink/80 max-w-[44ch]">{p.body}</p>
                <p className="mt-6 mono text-mute border-t border-line pt-4 max-w-[44ch]">
                  Proof: <span className="text-ink normal-case tracking-normal font-sans"><Rich>{p.proof}</Rich></span>
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="pillar-rail hidden lg:block absolute right-[clamp(1.25rem,4vw,3.5rem)] top-1/4 h-1/2 w-px bg-accent origin-top" aria-hidden="true" />
      </div>
    </section>
  );
}
