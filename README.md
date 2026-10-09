# Deneo Ngomane: portfolio

Hiring-focused portfolio. **Next.js (App Router) + Tailwind v4 + GSAP/ScrollTrigger + Lenis + Three.js.**

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where to edit

| What | File |
|---|---|
| Headline, pillars, experience, links, CV path | `content/site.ts` |
| Case studies (add one by appending to the array) | `content/work.ts` |
| Colours, fonts, buttons | `app/globals.css` (tokens at the top) |
| Hero WebGL piece ("Retention Field") | `components/HeroField.tsx` |

Anything in **[square brackets]** is a placeholder to replace: LinkedIn URL, booking link, metrics, team sizes, availability date.
Search the repo for `[` in `content/` to find them all.

## How motion works

- `PageEffects` is attribute-driven: add `data-reveal`, `data-count="15"` or `data-parallax="0.2"` to any element.
- Headlines use `<Lines>` (mask reveal per line). Pinned/horizontal sections: `Pillars`, `WorkScroller`, `HScrollSteps`.
- Page transitions: use `<TLink>` instead of `next/link`.
- Every effect runs inside `gsap.matchMedia`: reduced motion disables all of it (content stays visible), and touch/narrow screens get native swipe carousels instead of pinned scroll.
- The WebGL chunk loads after first paint, pauses off-screen, and falls back to a static SVG for reduced motion or no WebGL.
- Pinned sections are wrapped in a React-owned `<div>` so GSAP's pin-spacer never breaks route unmounts. Keep that pattern for new pinned sections.
