"use client";
import { useEffect, useRef } from "react";
import { caseStudies } from "@/content/work";
import { gsap, MQ } from "@/lib/gsap";
import TLink from "./TLink";
import CoverArt from "./CoverArt";

/**
 * Selected work as a horizontal-scroll moment. Desktop + motion: the section pins and vertical scroll
 * drives the track sideways (covers drift against the card for depth). Touch/reduced motion: a native
 * swipeable, snap-scrolling row, which is the adapted version rather than a shrunken one.
 */
export default function WorkScroller() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(`${MQ.motion} and ${MQ.desktop}`, () => {
      const t = track.current!;
      const dist = () => Math.max(0, t.scrollWidth - window.innerWidth + 64);
      const tween = gsap.to(t, {
        x: () => -dist(), ease: "none",
        scrollTrigger: {
          trigger: root.current, start: "top top", end: () => `+=${dist()}`,
          pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: (self) => { if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`; },
        },
      });
      gsap.utils.toArray<HTMLElement>("[data-cover]", t).forEach((c) => {
        gsap.fromTo(c, { xPercent: -8 }, {
          xPercent: 8, ease: "none",
          scrollTrigger: { trigger: c.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div>{/* React-owned wrapper: GSAP's pin-spacer lives inside it, so unmounting stays safe */}
    <section ref={root} id="work" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-24 md:py-0" aria-labelledby="work-title">
      <div className="wrap flex w-full items-end justify-between pb-8 md:pt-24">
        <div>
          <p className="mono text-muted" data-reveal>Selected work</p>
          <h2 id="work-title" className="display mt-3 text-5xl md:text-7xl" data-reveal>Problems I owned, <em>outcomes</em> I measured.</h2>
        </div>
        <TLink href="/work" label="Work" className="btn hidden md:inline-flex" data-reveal>All work →</TLink>
      </div>

      <div className="overflow-x-auto md:overflow-visible" tabIndex={-1}>
        <div ref={track} className="flex w-max snap-x gap-6 px-[clamp(1.25rem,4vw,4rem)] md:gap-10">
          {caseStudies.map((c, i) => (
            <TLink key={c.slug} href={`/work/${c.slug}`} label={c.client} data-cursor="View"
              className="group block w-[82vw] shrink-0 snap-start md:w-[min(62vw,56rem,calc((100svh-30rem)*1.5))]" aria-label={`${c.client}: ${c.title}`}>
              <div className="relative aspect-[3/2] overflow-hidden rounded-sm border border-line">
                <div data-cover className="absolute -inset-x-[10%] inset-y-0 transition-transform duration-700 group-hover:scale-105">
                  <CoverArt seed={i + 3} accent={c.accent} />
                </div>
                <span className="mono absolute left-4 top-4 rounded-full bg-bg/80 px-3 py-1 backdrop-blur">0{i + 1} / 0{caseStudies.length}</span>
              </div>
              <div className="mt-5 flex items-start justify-between gap-6">
                <div>
                  <p className="mono text-muted">{c.client} · {c.year}</p>
                  <h3 className="display mt-2 max-w-xl text-3xl md:text-5xl">{c.title}</h3>
                </div>
                <div className="hidden text-right md:block">
                  <p className="display text-5xl text-signal">{c.metrics[0].value}</p>
                  <p className="mono max-w-[12rem] text-muted">{c.metrics[0].label}</p>
                </div>
              </div>
            </TLink>
          ))}
        </div>
      </div>

      <div className="wrap mt-8 hidden md:block" aria-hidden="true">
        <div className="h-px w-full bg-line"><div ref={bar} className="h-px origin-left bg-signal" style={{ transform: "scaleX(0)" }} /></div>
      </div>
    </section>
    </div>
  );
}
