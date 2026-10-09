"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { finePointer, prefersReduced } from "@/lib/motion";

/** Wrap a button/link: it leans toward the cursor within a padded hit zone and springs back. */
export default function Magnetic({ children, strength = 0.35, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const zone = useRef<HTMLSpanElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!finePointer() || prefersReduced() || !zone.current || !inner.current) return;
    const z = zone.current;
    const xTo = gsap.quickTo(inner.current, "x", { duration: 0.9, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(inner.current, "y", { duration: 0.9, ease: "elastic.out(1, 0.4)" });
    const move = (e: PointerEvent) => {
      const r = z.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    z.addEventListener("pointermove", move);
    z.addEventListener("pointerleave", leave);
    return () => {
      z.removeEventListener("pointermove", move);
      z.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <span ref={zone} className={`inline-block p-5 -m-5 ${className}`}>
      <span ref={inner} className="inline-block">
        {children}
      </span>
    </span>
  );
}
