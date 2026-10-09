"use client";
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { hold, lenisRef, norm, prefersReduced } from "@/lib/motion";
import { nav } from "@/content/site";
import { projects } from "@/content/projects";

type Go = (href: string, label?: string) => void;
const Ctx = createContext<Go>(() => {});
export const useGo = () => useContext(Ctx);

const labelFor = (href: string) => {
  const p = norm(new URL(href, "http://x").pathname);
  if (p === "/") return "Home";
  const n = nav.find((n) => norm(n.href) === p);
  if (n) return n.label;
  const pr = projects.find((pr) => p === `/work/${pr.slug}`);
  return pr ? pr.client : "Deneo";
};

const play = (tl: gsap.core.Timeline) => new Promise<void>((res) => tl.eventCallback("onComplete", res));

/**
 * Page transitions. Click → accent curtain wipes up → route changes underneath →
 * curtain wipes away revealing the new page. Reduced motion: instant navigation.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const arrive = useRef<(() => void) | null>(null);
  const busy = useRef(false);

  useEffect(() => {
    arrive.current?.();
    arrive.current = null;
  }, [pathname]);

  const go = useCallback<Go>(
    async (href, lbl) => {
      if (busy.current) return;
      const url = new URL(href, window.location.href);
      if (norm(url.pathname) === norm(window.location.pathname)) {
        if (url.hash) lenisRef.current?.scrollTo(url.hash);
        else lenisRef.current ? lenisRef.current.scrollTo(0) : window.scrollTo({ top: 0 });
        return;
      }
      if (prefersReduced() || !curtain.current || !label.current) {
        router.push(href);
        return;
      }
      busy.current = true;
      const release = hold();
      label.current.textContent = lbl ?? labelFor(href);
      gsap.set(curtain.current, { display: "flex", clipPath: "inset(100% 0% 0% 0%)" });
      await play(
        gsap
          .timeline()
          .to(curtain.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "expo.inOut" })
          .fromTo(label.current, { yPercent: 100 }, { yPercent: 0, duration: 0.6, ease: "expo.out" }, "-=0.35"),
      );
      const arrived = new Promise<void>((res) => {
        arrive.current = res;
        setTimeout(res, 3000); // never get stuck behind the curtain
      });
      router.push(href);
      await arrived;
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
      release(); // new page's reveal animations may start now
      await play(
        gsap.timeline({ delay: 0.15 }).to(curtain.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.8, ease: "expo.inOut" }),
      );
      gsap.set(curtain.current, { display: "none" });
      busy.current = false;
    },
    [router],
  );

  return (
    <Ctx.Provider value={go}>
      {children}
      <div ref={curtain} className="curtain" aria-hidden="true">
        <div className="overflow-hidden pb-[0.12em]">
          <span ref={label} />
        </div>
      </div>
    </Ctx.Provider>
  );
}

/** Drop-in replacement for next/link that runs the page transition. */
export function TLink({
  href,
  label,
  children,
  onClick,
  ...rest
}: { href: string; label?: string; children: ReactNode } & Omit<React.ComponentProps<"a">, "href">) {
  const go = useGo();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        go(href, label);
      }}
    >
      {children}
    </Link>
  );
}
