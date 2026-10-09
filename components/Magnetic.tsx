"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap, MQ } from "@/lib/gsap";

/** Wraps a button/link so it is gently pulled toward the pointer and springs back on leave. */
export default function Magnetic({ children, strength = 0.35, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = el.current;
    if (!node || !window.matchMedia(MQ.motion).matches || !window.matchMedia(MQ.fine).matches) return;
    const x = gsap.quickTo(node, "x", { duration: 0.5, ease: "power3" });
    const y = gsap.quickTo(node, "y", { duration: 0.5, ease: "power3" });
    const move = (e: PointerEvent) => {
      const r = node.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * strength);
      y((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      gsap.to(node, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.35)", overwrite: true });
    };
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", leave);
    return () => {
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <span ref={el} className={`inline-block p-3 -m-3 ${className}`}>
      {children}
    </span>
  );
}
