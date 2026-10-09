const words = ["Retention", "Fintech", "Design systems", "USSD", "Accessibility", "Prototyping", "Product strategy", "Mobile money", "Information architecture"];

/** CSS-only marquee. Paused under reduced motion. Duplicated list is aria-hidden. */
export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-line py-5" aria-label="Focus areas: Retention, fintech, design systems, USSD, accessibility, product strategy">
      <div className="marquee flex w-max gap-10" aria-hidden="true">
        {[0, 1].map((k) => (
          <ul key={k} className="flex shrink-0 gap-10">
            {words.map((w) => (
              <li key={w + k} className="display flex items-center gap-10 text-4xl md:text-6xl">
                {w}<span className="text-signal">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <style>{`
        .marquee { animation: slide 38s linear infinite; }
        @keyframes slide { to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .marquee { animation: none; } }
      `}</style>
    </div>
  );
}
