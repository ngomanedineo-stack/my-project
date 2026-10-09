import type Lenis from "lenis";

export const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const finePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Shared handle to the Lenis instance (null when reduced motion is on). */
export const lenisRef: { current: Lenis | null } = { current: null };

/**
 * Tiny "gate": the intro loader and page-transition curtain hold it while they cover the
 * screen, so reveal animations wait until the page is actually visible.
 */
let holds = 0;
const waiters = new Set<() => void>();
export function hold() {
  holds++;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    holds--;
    if (holds === 0) {
      waiters.forEach((w) => w());
      waiters.clear();
    }
  };
}
export const whenReady = () =>
  holds === 0 ? Promise.resolve() : new Promise<void>((res) => waiters.add(res));

export const norm = (p: string) => (p.length > 1 ? p.replace(/\/$/, "") : p);
