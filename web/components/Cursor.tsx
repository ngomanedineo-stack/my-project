"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { finePointer, prefersReduced } from "@/lib/motion";

/** Custom cursor: dot → grows over links, shows a label where `data-cursor="View"` is set. */
export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!finePointer() || prefersReduced() || !root.current) return;
    const el = root.current;
    document.documentElement.classList.add("has-cursor");
    const xTo = gsap.quickTo(el, "x", { duration: 0.28, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.28, ease: "power3" });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { opacity: 1, duration: 0.3 });
        shown = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      if (t.closest("input,textarea")) el.dataset.state = "text";
      else if (labelled?.dataset.cursor) {
        el.dataset.state = "label";
        if (text.current) text.current.textContent = labelled.dataset.cursor;
      } else if (t.closest("a,button,[role=button]")) el.dataset.state = "hover";
      else el.dataset.state = "";
    };
    const down = () => (el.dataset.prev = el.dataset.state ?? "");
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.2 });
    const enter = () => shown && gsap.to(el, { opacity: 1, duration: 0.2 });

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down);
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
    };
  }, []);

  return (
    <div ref={root} className="cursor" aria-hidden="true">
      <div className="cursor-ring">
        <span ref={text} />
      </div>
    </div>
  );
}
