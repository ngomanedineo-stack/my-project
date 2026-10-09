"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { whenReady } from "@/lib/motion";
import { projects } from "@/content/projects";
import { TLink } from "./Transition";
import Cover from "./Cover";
import Button from "./Button";

/**
 * Selected work. Desktop + motion: section pins and the track travels horizontally with scroll,
 * covers drift inside their frames (parallax via containerAnimation).
 * Mobile / reduced motion: native swipeable, snap-scrolling row, no pinning.
 */
export default function WorkStrip() {
  const pinEl = useRef<HTMLDivElement>(null); // GSAP pins an INNER node: pinning a React-owned top-level node breaks unmount
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    let dead = false;
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const v = viewport.current!, t = track.current!;
      gsap.set(v, { overflow: "visible" });
      const dist = () => t.scrollWidth - window.innerWidth + 0;
      const tween = gsap.to(t, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: { trigger: pinEl.current, pin: true, start: "top top", end: () => `+=${dist()}`, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 },
      });
      gsap.utils.toArray<HTMLElement>(".hcard-art").forEach((art) => {
        gsap.fromTo(art, { xPercent: -8 }, { xPercent: 8, ease: "none", scrollTrigger: { trigger: art.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
      });
      gsap.fromTo(".work-progress", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: pinEl.current, start: "top top", end: () => `+=${dist()}`, scrub: true } });
      void whenReady().then(() => !dead && ScrollTrigger.refresh());
    });
    return () => {
      dead = true;
      mm.revert();
    };
  }, []);

  return (
    <section aria-labelledby="work-h" className="rule">
    <div ref={pinEl} className="min-h-[100svh] flex flex-col justify-center py-20 md:py-0 overflow-hidden">
      <div className="wrap w-full flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-12 md:pt-24">
        <h2 id="work-h" className="display h-lg" data-split>Selected work</h2>
        <Button href="/work/" label="Work">All case studies</Button>
      </div>

      <div ref={viewport} className="hscroll md:!overflow-hidden md:!p-0" style={{ paddingBlockEnd: "0.5rem" }}>
        <div ref={track} className="flex gap-[clamp(1rem,2.5vw,2.5rem)] md:pl-[clamp(1.25rem,4vw,3.5rem)] md:pr-[clamp(1.25rem,4vw,3.5rem)] md:w-max">
          {projects.map((p, i) => (
            <article key={p.slug} className="hcard md:!flex-none md:w-[min(52vw,760px)] group">
              <TLink href={`/work/${p.slug}/`} className="block" data-cursor="View" aria-label={`${p.client}: ${p.title}`}>
                <div className="relative aspect-[4/3] md:aspect-[16/11] overflow-hidden border border-line bg-bg2">
                  <div className="hcard-art absolute -inset-[10%] transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]">
                    <Cover art={p.art} accent={p.accent} className="size-full" />
                  </div>
                  <span className="absolute left-5 top-5 mono bg-bg/80 px-3 py-1.5 backdrop-blur">0{i + 1}</span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <p className="mono text-mute">{p.client} · {p.year}</p>
                    <h3 className="display h-md mt-2 max-w-[22ch]">{p.title}</h3>
                  </div>
                  <span className="mono text-accent mt-1 shrink-0">{p.tldr.metric.startsWith("[[") ? "" : p.tldr.metric}</span>
                </div>
              </TLink>
            </article>
          ))}
        </div>
      </div>
      <div className="wrap w-full hidden md:block mt-10" aria-hidden="true">
        <div className="h-px bg-line"><div className="work-progress h-px bg-accent origin-left" /></div>
      </div>
    </div>
    </section>
  );
}
