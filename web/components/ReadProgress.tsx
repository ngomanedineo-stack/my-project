"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReduced } from "@/lib/motion";

/** Thin accent bar showing how far through a case study you are. */
export default function ReadProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReduced() || !bar.current) return;
    const set = gsap.quickSetter(bar.current, "scaleX");
    const on = () => set(window.scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight));
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <div ref={bar} className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-accent scale-x-0" aria-hidden="true" />;
}
