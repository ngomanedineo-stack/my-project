"use client";
import { useEffect, useRef } from "react";
import { gsap, MQ } from "@/lib/gsap";

/**
 * Custom cursor: a dot that follows the pointer and a ring that lags behind it.
 * Over `[data-cursor="Label"]` the ring grows into a labelled bubble; over links/buttons it grows slightly.
 * Only mounts for fine pointers with motion allowed; keyboard focus is unaffected.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (!window.matchMedia(MQ.motion).matches || !window.matchMedia(MQ.fine).matches) return;
    root.classList.add("fine-pointer");

    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.2, overwrite: "auto" });
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      const tagged = t?.closest<HTMLElement>("[data-cursor]");
      const clickable = t?.closest("a, button, summary, [role=button]");
      if (tagged) {
        if (label.current) label.current.textContent = tagged.dataset.cursor ?? "";
        gsap.to(ring.current, { width: 92, height: 92, backgroundColor: "var(--signal)", borderColor: "var(--signal)", duration: 0.4, ease: "power3.out" });
        gsap.to(label.current, { autoAlpha: 1, duration: 0.2 });
        gsap.to(dot.current, { scale: 0, duration: 0.2 });
      } else {
        gsap.to(ring.current, {
          width: clickable ? 56 : 34, height: clickable ? 56 : 34,
          backgroundColor: "rgba(0,0,0,0)", borderColor: "var(--fg)",
          duration: 0.35, ease: "power3.out",
        });
        gsap.to(label.current, { autoAlpha: 0, duration: 0.15 });
        gsap.to(dot.current, { scale: 1, duration: 0.2 });
      }
    };
    const leave = () => gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.2 });

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      root.classList.remove("fine-pointer");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true">
      <div ref={dot} className="fixed left-0 top-0 h-2 w-2 rounded-full bg-signal" />
      <div ref={ring} className="fixed left-0 top-0 flex h-[34px] w-[34px] items-center justify-center rounded-full border border-fg">
        <span ref={label} className="mono text-onsignal" style={{ visibility: "hidden" }} />
      </div>
    </div>
  );
}
