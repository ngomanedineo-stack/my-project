"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReduced, whenReady } from "@/lib/motion";
import Button from "./Button";
import { hero, site } from "@/content/site";

// Three.js is ~150kB: load it only after first paint / when idle, never in the critical path.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const scroll = useRef(0);
  const [canvas, setCanvas] = useState(false);
  const book = site.booking || `mailto:${site.email}?subject=Let%27s%20chat`;

  useEffect(() => {
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    const t = idle ? idle(() => setCanvas(true)) : window.setTimeout(() => setCanvas(true), 200);
    return () => (idle ? (window as unknown as { cancelIdleCallback: (n: number) => void }).cancelIdleCallback(t) : clearTimeout(t));
  }, []);

  useEffect(() => {
    if (prefersReduced() || !root.current) return;
    let dead = false;
    const ctx = gsap.context(() => {}, root);
    (async () => {
      await document.fonts.ready;
      await whenReady();
      if (dead) return;
      ctx.add(() => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .to("[data-rise]", { yPercent: 0, y: 0, duration: 1.3, stagger: 0.12 })
          .fromTo("[data-hero-fade]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, "-=0.8");

        // Scroll: copy drifts up faster than the field behind (layered depth), field dissolves
        gsap.to("[data-hero-copy]", { yPercent: -18, opacity: 0.0, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom 20%", scrub: true } });
        ScrollTrigger.create({ trigger: root.current, start: "top top", end: "bottom top", onUpdate: (s) => (scroll.current = s.progress) });
        gsap.to("[data-hero-canvas]", { opacity: 0.15, ease: "none", scrollTrigger: { trigger: root.current, start: "30% top", end: "bottom top", scrub: true } });
      });
    })();
    return () => {
      dead = true;
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} aria-labelledby="hero-h" className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden pt-28 pb-10 md:pb-14">
      <div data-hero-canvas className="absolute inset-0">
        {canvas && <HeroCanvas scrollRef={scroll} />}
      </div>
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_top,rgba(11,11,12,0.92)_15%,rgba(11,11,12,0.55)_50%,transparent_80%)] md:bg-[radial-gradient(ellipse_at_25%_80%,rgba(11,11,12,0.88),transparent_62%)]" aria-hidden="true" />

      <div data-hero-copy className="wrap relative w-full">
        <p className="mono text-mute mb-6 md:mb-8" data-hero-fade>{hero.eyebrow}</p>
        <h1 id="hero-h" className="display h-xl">
          {hero.lines.map((l, i) => (
            <span key={i} className="mask">
              <span data-rise className="block">
                {i === hero.lines.length - 1 ? <>{l.replace(/\.$/, "")}<span className="text-accent">.</span></> : l}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 md:mt-12 grid gap-8 md:grid-cols-12 items-end">
          <p className="md:col-span-5 text-lg md:text-xl text-ink/80 max-w-[34ch]" data-hero-fade>{hero.sub}</p>
          <div className="md:col-span-4 flex flex-wrap gap-3" data-hero-fade>
            <Button href={book} variant="primary" external={!!site.booking}>Book a chat</Button>
            <Button href={site.cv} download>View CV</Button>
          </div>
          <div className="md:col-span-3 md:justify-self-end text-sm text-mute space-y-2" data-hero-fade>
            <p className="flex items-center gap-2"><span className="inline-block size-2 rounded-full bg-accent" aria-hidden="true" /> Retained users</p>
            <p className="flex items-start gap-2"><span className="mt-1.5 inline-block size-2 shrink-0 rounded-full bg-mute" aria-hidden="true" /> <span>Churning, until you re-engage them<span className="hidden md:inline"> (move your cursor)</span></span></p>
          </div>
        </div>
      </div>
    </section>
  );
}
