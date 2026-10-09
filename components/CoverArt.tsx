/** Generative cover art (concentric orbits + particles) so the work grid has identity without stock imagery. */
export default function CoverArt({ seed = 1, accent = "#FF5A1F", label }: { seed?: number; accent?: string; label?: string }) {
  const rnd = (n: number) => { const x = Math.sin(seed * 999 + n * 78.233) * 43758.5453; return x - Math.floor(x); };
  const cx = 360 + rnd(1) * 480, cy = 260 + rnd(2) * 280;
  const rings = Array.from({ length: 9 }, (_, i) => 50 + i * 62);
  const dots = Array.from({ length: 90 }, (_, i) => {
    const a = rnd(i * 3) * Math.PI * 2, r = 40 + rnd(i * 3 + 1) * 520;
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r * 0.78, s: 1.5 + rnd(i * 3 + 2) * 3.5, hot: r < 300 };
  });
  return (
    <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label={label ?? "Abstract orbit artwork"}>
      <rect width="1200" height="800" fill="var(--bg-2)" />
      {rings.map((r, i) => (
        <ellipse key={r} cx={cx} cy={cy} rx={r} ry={r * 0.78} fill="none" stroke={i < 4 ? accent : "var(--line)"} strokeOpacity={i < 4 ? 0.7 - i * 0.12 : 1} strokeWidth="1.2" />
      ))}
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.s} fill={d.hot ? accent : "var(--muted)"} opacity={d.hot ? 1 : 0.5} />
      ))}
      <circle cx={cx} cy={cy} r="9" fill={accent} />
    </svg>
  );
}
