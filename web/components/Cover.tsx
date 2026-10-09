import type { Project } from "@/content/projects";

/**
 * Generative cover art (pure SVG, zero image weight). Swap for real screens any time:
 * render <Image> instead of <Cover> in WorkStrip / work pages.
 */
export default function Cover({ art, accent, className = "" }: { art: Project["art"]; accent: string; className?: string }) {
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className={className} role="presentation" aria-hidden="true">
      <rect width="800" height="600" fill="#111113" />
      {art === "rings" && (
        <g fill="none" stroke={accent}>
          {Array.from({ length: 12 }, (_, i) => (
            <circle key={i} cx={470} cy={300} r={36 + i * 30} strokeWidth={i % 4 === 0 ? 2.5 : 1} opacity={1 - i * 0.07} strokeDasharray={i % 3 === 0 ? "2 10" : undefined} />
          ))}
          <circle cx={470} cy={300} r={10} fill={accent} stroke="none" />
          <circle cx={668} cy={196} r={7} fill={accent} stroke="none" />
          <circle cx={226} cy={364} r={5} fill="#96938b" stroke="none" />
        </g>
      )}
      {art === "grid" && (
        <g>
          {Array.from({ length: 12 }, (_, r) =>
            Array.from({ length: 16 }, (_, c) => {
              const on = (r * 7 + c * 3) % 5 === 0 || (r > 4 && r < 8 && c > 5 && c < 11);
              return <circle key={`${r}-${c}`} cx={60 + c * 46} cy={50 + r * 46} r={on ? 7 : 2.5} fill={on ? accent : "#96938b"} opacity={on ? 1 : 0.45} />;
            }),
          )}
        </g>
      )}
      {art === "bars" && (
        <g fill={accent}>
          {Array.from({ length: 14 }, (_, i) => {
            const h = 80 + ((i * 97) % 380);
            return <rect key={i} x={70 + i * 50} y={560 - h} width={26} height={h} opacity={0.35 + (i % 5) * 0.16} rx={2} />;
          })}
          <rect x={70} y={560} width={680} height={2} fill="#f2efe8" opacity={0.3} />
        </g>
      )}
    </svg>
  );
}
