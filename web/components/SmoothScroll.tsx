"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { lenisRef, prefersReduced } from "@/lib/motion";

/** Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays perfectly in sync. */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReduced()) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);
  return null;
}
