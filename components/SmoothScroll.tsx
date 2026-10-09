"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, MQ } from "@/lib/gsap";

declare global {
  interface Window { __lenis?: Lenis }
}

/** Lenis smooth scroll driven by the GSAP ticker so ScrollTrigger stays in sync. Off for reduced motion. */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.matchMedia(MQ.motion).matches) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9, anchors: true });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
