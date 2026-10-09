"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { hero, site } from "@/content/site";
import { gsap, MQ } from "@/lib/gsap";
import Lines from "./Lines";
import Magnetic from "./Magnetic";

const HeroField = dynamic(() => import("./HeroField"), { ssr: false });

/** Static stand-in: shown for SSR, reduced motion, no-WebGL, and until the canvas draws its first frame. */
function Fallback({ faded }: { faded: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full transition-opacity duration-1000" style={{ opacity: faded ? 0 : 1 }}>
      {[80, 150, 230, 320, 420, 530].map((r, i) => (
        <ellipse key={r} cx="760" cy="360" rx={r} ry={r * 0.78} fill="none" stroke={i < 3 ? "var(--signal)" : "var(--line)"} strokeOpacity={i < 3 ? 0.8 - i * 0.2 : 1} />
      ))}
      <circle cx="760" cy="360" r="8" fill="var(--signal)" />
    </svg>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [mountField, setMountField] = useState(false);
  const [ready, setReady] = useState(false);

  // Load the heavy WebGL chunk only after first paint, and only when motion is allowed
  useEffect(() => {
    if (!window.matchMedia(MQ.motion).matches) return;
    const idle = window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    let cancel: () => void;
    if (idle.requestIdleCallback) {
      const id = idle.requestIdleCallback(() => setMountField(true), { timeout: 1500 });
      cancel = () => idle.cancelIdleCallback?.(id);
    } else {
      const id = window.setTimeout(() => setMountField(true), 300);
      cancel = () => clearTimeout(id);
    }
    return cancel;
  }, []);

  // Scroll-away: headline lifts and the field recedes (desktop + motion)
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(`${MQ.motion} and ${MQ.desktop}`, () => {
      gsap.to(content.current, {
        yPercent: -14, autoAlpha: 0.15, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10 pt-32" aria-labelledby="hero-title">
      <div className="absolute inset-0" aria-hidden="true">
        <Fallback faded={ready} />
        {mountField && <HeroField onReady={() => setReady(true)} />}
      </div>

      <div ref={content} className="wrap relative w-full">
        <p className="mono mb-6 text-muted" data-reveal>{hero.eyebrow}</p>
        <Lines as="h1" hero lines={hero.headline} em={hero.emphasis} className="text-[clamp(3.4rem,12.5vw,12rem)]" />
        <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,34rem)_1fr] md:items-end">
          <p className="text-lg leading-snug text-muted md:text-xl" data-reveal>{hero.sub}</p>
          <div className="flex flex-wrap gap-3 md:justify-end" data-reveal>
            <Magnetic><a className="btn btn-primary" href={site.book} target="_blank" rel="noopener noreferrer">Book a chat</a></Magnetic>
            <Magnetic><a className="btn" href={site.cv}>View CV</a></Magnetic>
            <Magnetic><a className="btn" href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></Magnetic>
          </div>
        </div>
        <div className="mono mt-12 flex items-center justify-between border-t border-line pt-4 text-muted" data-reveal>
          <span><span className="mr-2 inline-block h-2 w-2 rounded-full bg-signal align-middle" aria-hidden="true" />{hero.now}</span>
          <span className="hidden md:inline">{mountField ? hero.hint : "Scroll"} ↓</span>
        </div>
      </div>
    </section>
  );
}
