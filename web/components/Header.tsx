"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { TLink } from "./Transition";
import Button from "./Button";
import { nav, site } from "@/content/site";
import { norm } from "@/lib/motion";

export default function Header() {
  const pathname = norm(usePathname());
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);
  const book = site.booking || `mailto:${site.email}?subject=Let%27s%20chat`;

  useEffect(() => setOpen(false), [pathname]);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last.current && y > 200);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = open ? "hidden" : "";
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[var(--ease-out-expo)]"
      style={{ transform: hidden && !open ? "translateY(-110%)" : "none" }}
    >
      <div className="wrap flex items-center justify-between py-5">
        <TLink href="/" className="relative z-[60] font-bold tracking-tight text-lg" aria-label={`${site.name}, home`} label="Home">
          Deneo<span className="text-accent">.</span>
        </TLink>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-9">
          {nav.map((n) => (
            <TLink key={n.href} href={n.href} aria-current={pathname === norm(n.href) || (n.href !== "/" && pathname.startsWith(norm(n.href))) ? "page" : undefined} className="link-u text-[0.95rem] aria-[current=page]:text-accent">
              {n.label}
            </TLink>
          ))}
          <Button href={book} variant="primary" external={!!site.booking}>
            Book a chat
          </Button>
        </nav>

        <button
          className="md:hidden relative z-[60] mono border border-line rounded-full px-4 py-2.5"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div
        id="mobile-menu"
        inert={!open}
        className={`md:hidden fixed inset-0 z-[55] bg-bg flex flex-col justify-center gap-2 px-6 transition-[clip-path] duration-700 ease-[var(--ease-out-expo)] ${open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]"}`}
      >
        {[{ href: "/", label: "Home" }, ...nav].map((n, i) => (
          <TLink key={n.href} href={n.href} className="display text-5xl py-1" style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }}>
            {n.label}
          </TLink>
        ))}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={book} variant="primary" magnetic={false} external={!!site.booking}>Book a chat</Button>
          <Button href={site.cv} download magnetic={false}>View CV</Button>
        </div>
      </div>
    </header>
  );
}
