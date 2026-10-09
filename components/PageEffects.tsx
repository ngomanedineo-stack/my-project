"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, MQ } from "@/lib/gsap";

/**
 * Site-wide, attribute-driven effects. Mark up elements and they animate:
 *   data-reveal            fade/slide up when scrolled into view (siblings stagger)
 *   data-lines             children `.split-line > span` rise from a mask, in sequence
 *   data-count="15"        counts up to the value (text content is the final value for no-JS)
 *   data-parallax="0.2"    drifts at a fraction of scroll speed (desktop + motion only)
 * Everything is a no-op when prefers-reduced-motion is set.
 */
export default function PageEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const mm = gsap.matchMedia();
    // Wait a frame so the new route's DOM is committed.
    const raf = requestAnimationFrame(() => {
      mm.add(MQ.motion, () => {
        const delay = document.documentElement.dataset.navigated ? 0.35 : 0.1;

        // Headline line reveals
        gsap.utils.toArray<HTMLElement>("[data-lines]").forEach((el) => {
          const spans = el.querySelectorAll<HTMLElement>(".split-line > span");
          gsap.set(spans, { yPercent: 110, autoAlpha: 1 });
          const inHero = el.hasAttribute("data-hero");
          gsap.to(spans, {
            yPercent: 0,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.1,
            delay: inHero ? delay : 0,
            scrollTrigger: inHero ? undefined : { trigger: el, start: "top 88%", once: true },
          });
        });

        // Generic reveals, staggered per batch
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        gsap.set(items, { autoAlpha: 0, y: 28 });
        ScrollTrigger.batch(items, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 }),
        });

        // Counters
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const end = parseFloat(el.dataset.count ?? "0");
          const o = { v: 0 };
          el.textContent = "0";
          gsap.to(o, {
            v: end,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => (el.textContent = String(Math.round(o.v))),
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        // Parallax, desktop only (motion is adapted on touch, not just shrunk)
        const inner = gsap.matchMedia();
        inner.add(MQ.desktop, () => {
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            const speed = parseFloat(el.dataset.parallax ?? "0.15");
            gsap.fromTo(
              el,
              { yPercent: -speed * 50 },
              {
                yPercent: speed * 50,
                ease: "none",
                scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
          });
        });
        return () => inner.revert();
      });
    });
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(refresh);
      mm.revert();
    };
  }, [pathname]);

  return null;
}
