# Deneo Ngomane — portfolio (hire-me edition)

Next.js 15 (static export) · Tailwind v4 · GSAP + ScrollTrigger + SplitText · Lenis · Three.js (hero only, lazy)

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # static site → ./out  (host anywhere)
npm run placeholders   # list every [[placeholder]] still to fill in
```

## Edit the content (no code needed)
| File | What's in it |
|---|---|
| `content/site.ts` | Name, links, **booking URL**, hero copy, pillars, proof numbers, experience, education, about, toolkit |
| `content/projects.ts` | Case studies (copy a block to add one; it gets its own page automatically) |

Anything in `[[double brackets]]` is a **placeholder**: it shows highlighted on the site until you replace it.
Set `site.booking` to your Cal.com/Calendly link; until then "Book a chat" opens an email.
Replace `public/Deneo_CV_25.pdf` to update the CV. Swap generative covers for real screens by rendering
`<Image>` instead of `<Cover>` in `WorkStrip.tsx` and `app/work/`.

## Motion system (what triggers what)
| Piece | File | Trigger → behaviour |
|---|---|---|
| Smooth scroll | `SmoothScroll.tsx` | Lenis, driven by GSAP ticker so ScrollTrigger stays in sync |
| Hero field (WebGL) | `HeroCanvas.tsx` | Particles = users. Grey ones churn away; your cursor re-engages them (they return and turn lime). Idle → autonomous wander (also drives touch devices). Pauses off-screen / tab hidden |
| Headline reveals | `MotionRoot.tsx` `data-split` | Scroll into view → lines rise out of masks |
| Fade/rise, count-ups, parallax, drawn rules | `MotionRoot.tsx` `data-reveal` `data-count` `data-parallax` `data-line` | Add the attribute to any element |
| Statement | `data-words` | Scroll-scrubbed word-by-word brightening |
| Pillars | `Pillars.tsx` | Desktop: stage pins, numeral + copy swap per scroll step. Mobile: stacked |
| Selected work | `WorkStrip.tsx` | Desktop: pinned horizontal scroll + image parallax. Mobile: native swipe row |
| Cursor / magnetic buttons | `Cursor.tsx`, `Magnetic.tsx` | Fine pointers only. `data-cursor="View"` adds a label |
| Page transitions | `Transition.tsx` | Accent curtain wipes up, route changes, wipes away. Use `TLink` / `Button` for internal links |
| Intro | `Intro.tsx` | First visit per session only |

**Reduced motion:** with `prefers-reduced-motion`, Lenis, cursor, intro, transitions, pinning and scroll animations are all
off; content is simply visible and the hero shows one static frame. Hidden "pre-animation" states only exist when
`html.motion` is set (see `app/layout.tsx`), and that class self-removes if the animation layer fails to boot.

**Gotcha:** never pin (`pin: true`) a node that React owns at the top level of a page. GSAP wraps it in a spacer and React
then fails to unmount it. Pin an inner wrapper (see `WorkStrip.tsx`).

## Checked
axe-core (WCAG 2.0/2.1 A+AA + best-practice): 0 violations on every page type. Initial JS ≈ 164 kB gz; Three.js
(~84 kB gz) loads lazily after first paint. Tested desktop, mobile (390px) and reduced-motion in Chromium.
