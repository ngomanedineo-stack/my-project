"use client";
import { useEffect, useRef } from "react";
import { gsap, MQ } from "@/lib/gsap";

/** Pinned horizontal-scroll row of process steps for case studies. Native swipe on touch / reduced motion. */
export default function HScrollSteps({ title, steps }: { title: string; steps: { t: string; d: string }[] }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(`${MQ.motion} and ${MQ.desktop}`, () => {
      const t = track.current!;
      const dist = () => Math.max(0, t.scrollWidth - window.innerWidth + 64);
      gsap.to(t, { x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 } });
    });
    return () => mm.revert();
  }, []);

  return (
    <div>{/* React-owned wrapper: GSAP's pin-spacer lives inside it, so unmounting stays safe */}
    <section ref={root} className="flex min-h-[80svh] flex-col justify-center overflow-hidden border-t border-line py-20 md:py-0" aria-labelledby="process-title">
      <div className="wrap w-full pb-10"><p className="mono text-muted">Process</p><h2 id="process-title" className="display mt-3 text-5xl md:text-7xl">{title}</h2></div>
      <div className="overflow-x-auto md:overflow-visible">
        <div ref={track} className="flex w-max gap-6 px-[clamp(1.25rem,4vw,4rem)]">
          {steps.map((s, i) => (
            <div key={s.t} className="w-[78vw] shrink-0 border-t border-fg pt-6 md:w-[26rem]">
              <p className="mono text-signal">0{i + 1}</p>
              <h3 className="display mt-3 text-4xl md:text-5xl">{s.t}</h3>
              <p className="mt-4 text-lg text-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}
