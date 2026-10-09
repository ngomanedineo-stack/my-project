import { proof } from "@/content/site";
import { Rich } from "@/lib/rich";

export default function Proof() {
  return (
    <section aria-labelledby="proof-h" className="rule py-24 md:py-36">
      <div className="wrap">
        <div className="flex items-end justify-between gap-8 mb-14 md:mb-20">
          <h2 id="proof-h" className="display h-lg max-w-[14ch]" data-split>Proof, not promises.</h2>
          <p className="hidden md:block mono text-mute" data-reveal>Selected results</p>
        </div>
        <dl className="grid gap-px bg-line md:grid-cols-2 lg:grid-cols-4 border border-line">
          {proof.map((p, i) => (
            <div key={i} className="bg-bg p-7 md:p-9 flex flex-col justify-between min-h-64" data-reveal>
              <dt className="mono text-mute order-2 mt-8">{p.note}</dt>
              <dd className="order-1">
                <p className="display text-accent" style={{ fontSize: "clamp(3.5rem,7vw,6.5rem)" }}>
                  {p.placeholder ? <Rich>{p.placeholder}</Rich> : <span data-count={p.value} data-suffix={p.suffix}>{p.value}{p.suffix}</span>}
                </p>
                <p className="mt-4 text-ink/80 max-w-[28ch]"><Rich>{p.label}</Rich></p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
