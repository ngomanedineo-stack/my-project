"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Media conditions used with gsap.matchMedia so motion adapts, not just shrinks. */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 900px)",
  fine: "(hover: hover) and (pointer: fine)",
};
