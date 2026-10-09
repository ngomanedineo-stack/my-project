"use client";
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, MQ } from "@/lib/gsap";

type Ctx = { go: (href: string, label?: string) => void };
const TransitionCtx = createContext<Ctx>({ go: () => {} });
export const useTransition = () => useContext(TransitionCtx);

/**
 * Page transition: an ember curtain wipes up over the page, the route changes underneath,
 * then the curtain lifts away. Reduced motion skips the wipe and navigates directly.
 */
export default function Transitions({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const busy = useRef(false);
  const first = useRef(true);

  useEffect(() => {
    gsap.set(curtain.current, { yPercent: 100 });
  }, []);

  // Route committed → lift the curtain
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!busy.current) return;
    gsap.to(curtain.current, {
      yPercent: -100,
      duration: 0.9,
      delay: 0.15,
      ease: "expo.inOut",
      onComplete: () => {
        gsap.set(curtain.current, { yPercent: 100 });
        busy.current = false;
      },
    });
    gsap.fromTo(label.current, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3, delay: 0.1 });
  }, [pathname]);

  const go = useCallback(
    (href: string, text?: string) => {
      const target = href.split("#")[0] || pathname;
      if (busy.current) return;
      if (target === pathname) {
        window.__lenis?.scrollTo(href.includes("#") ? href.slice(href.indexOf("#")) : 0);
        return;
      }
      if (!window.matchMedia(MQ.motion).matches) {
        router.push(href);
        return;
      }
      busy.current = true;
      document.documentElement.dataset.navigated = "1";
      if (label.current) label.current.textContent = text ?? "";
      gsap.set(label.current, { autoAlpha: 0 });
      gsap.to(curtain.current, {
        yPercent: 0,
        duration: 0.75,
        ease: "expo.inOut",
        onComplete: () => router.push(href),
      });
      gsap.to(label.current, { autoAlpha: 1, duration: 0.4, delay: 0.3 });
      // Failsafe: never leave the user stuck behind the curtain
      window.setTimeout(() => {
        if (busy.current && window.location.pathname !== target) {
          gsap.to(curtain.current, { yPercent: 100, duration: 0.4 });
          busy.current = false;
        }
      }, 6000);
    },
    [pathname, router],
  );

  return (
    <TransitionCtx.Provider value={{ go }}>
      {children}
      <div ref={curtain} className="curtain flex items-end p-8" aria-hidden="true">
        <span ref={label} className="display text-[clamp(3rem,10vw,9rem)] text-onsignal" style={{ visibility: "hidden" }} />
      </div>
    </TransitionCtx.Provider>
  );
}
