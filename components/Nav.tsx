"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { nav, site } from "@/content/site";
import TLink from "./TLink";
import Magnetic from "./Magnetic";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > last.current && !open);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Escape closes menu and returns focus; lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); menuBtn.current?.focus(); } };
    document.addEventListener("keydown", esc);
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      window.__lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${hidden ? "-translate-y-full" : ""}`}>
      <div className="wrap flex items-center justify-between py-4 backdrop-blur-md">
        <TLink href="/" label="Home" className="font-display text-2xl leading-none" aria-label="Deneo Ngomane, home">
          Deneo<span className="text-signal">.</span>
        </TLink>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <TLink key={n.href} href={n.href} label={n.label} aria-current={pathname.startsWith(n.href) ? "page" : undefined}
              className={`link-u text-sm ${pathname.startsWith(n.href) ? "text-fg" : "text-muted hover:text-fg"}`}>
              {n.label}
            </TLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden md:block"><ThemeToggle /></span>
          <Magnetic>
            <a href={site.book} className="btn btn-primary !py-3 !px-5 text-sm" target="_blank" rel="noopener noreferrer">Book a chat</a>
          </Magnetic>
          <button ref={menuBtn} className="mono rounded-full border border-line px-4 py-3 md:hidden" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 -z-10 flex flex-col justify-between bg-bg px-5 pb-8 pt-28 md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <nav aria-label="Mobile" className="flex flex-col gap-2">
            {[{ href: "/", label: "Home" }, ...nav].map((n) => (
              <TLink key={n.href} href={n.href} label={n.label} className="display text-6xl">{n.label}</TLink>
            ))}
          </nav>
          <div className="flex items-center justify-between">
            <a href={site.cv} className="btn">View CV</a>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
