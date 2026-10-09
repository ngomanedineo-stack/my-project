"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { hold, prefersReduced } from "@/lib/motion";
import { site } from "@/content/site";

/** First-visit-per-session loader: name + counter, then the cover lifts to reveal the hero. */
export default function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const release = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    if (prefersReduced() || document.documentElement.classList.contains("no-intro")) return;
    release.current = hold();
  }, []);

  useEffect(() => {
    const done = release.current;
    if (!done || !root.current) return;
    const o = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        try { sessionStorage.setItem("intro", "1"); } catch {}
        gsap.set(root.current, { display: "none" });
      },
    });
    tl.to(o, { v: 100, duration: 1.3, ease: "power2.inOut", onUpdate: () => num.current && (num.current.textContent = String(Math.round(o.v)).padStart(2, "0")) })
      .add(() => done(), "+=0.05") // let hero reveal begin as the cover lifts
      .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "expo.inOut" }, "<");
    return () => {
      tl.kill();
      done();
    };
  }, []);

  return (
    <div ref={root} className="intro" aria-hidden="true">
      <span className="mono text-mute">{site.name}</span>
      <span ref={num} className="display text-accent" style={{ fontSize: "clamp(4rem,14vw,12rem)" }}>
        00
      </span>
    </div>
  );
}
