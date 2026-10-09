"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { prefersReduced, whenReady } from "@/lib/motion";

/**
 * Declarative scroll animations, re-run on every route change. Add attributes to any element:
 *
 *   data-split              headline lines slide up out of a mask when scrolled into view
 *   data-reveal             fade + rise (siblings entering together are staggered)
 *   data-words              words light up from dim → bright as you scroll (scrubbed)
 *   data-parallax="0.2"     moves at a different speed to the page (layered depth)
 *   data-count="15"         number counts up (suffix/prefix via data-suffix / data-prefix)
 *   data-line               a rule that draws from left to right
 *
 * Everything is skipped under prefers-reduced-motion; content is simply visible.
 */
export default function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReduced()) return;
    let dead = false;
    const ctx = gsap.context(() => {});

    (async () => {
      await document.fonts.ready;
      await whenReady();
      if (dead) return;
      ctx.add(() => {
        // Headline masks
        gsap.utils.toArray<HTMLElement>("[data-split]:not([data-split='hero'])").forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) => {
              gsap.set(el, { visibility: "visible" });
              return gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.1,
                stagger: 0.09,
                ease: "expo.out",
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              });
            },
          });
        });

        // Fade + rise, batched so groups stagger
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%",
          once: true,
          onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, stagger: 0.09, ease: "expo.out" }),
        });

        // Scrubbed word highlight
        gsap.utils.toArray<HTMLElement>("[data-words]").forEach((el) => {
          const split = SplitText.create(el, { type: "words" });
          gsap.fromTo(
            split.words,
            { opacity: 0.14 },
            { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true } },
          );
        });

        // Parallax
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const v = parseFloat(el.dataset.parallax || "0.2");
          gsap.fromTo(el, { yPercent: -v * 50 }, { yPercent: v * 50, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
        });

        // Count-ups
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const to = parseFloat(el.dataset.count || "0");
          const pre = el.dataset.prefix ?? "";
          const suf = el.dataset.suffix ?? "";
          const o = { v: 0 };
          el.textContent = `${pre}0${suf}`;
          gsap.to(o, {
            v: to,
            duration: 1.8,
            ease: "power3.out",
            onUpdate: () => (el.textContent = `${pre}${Math.round(o.v)}${suf}`),
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        // Drawn rules
        gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) => {
          gsap.fromTo(el, { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
        });
      });
      ScrollTrigger.refresh();
      (window as unknown as { __motionReady?: boolean }).__motionReady = true;
    })();

    return () => {
      dead = true;
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
