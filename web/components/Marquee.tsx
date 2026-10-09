import { marquee } from "@/content/site";

export default function Marquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {marquee.map((m) => (
        <li key={m} className="display text-3xl md:text-5xl px-6 md:px-10 flex items-center gap-12 md:gap-20 whitespace-nowrap">
          {m}
          <span className="text-accent" aria-hidden="true">✦</span>
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Focus areas" className="rule border-b border-line py-7 overflow-hidden">
      <div className="marquee">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
