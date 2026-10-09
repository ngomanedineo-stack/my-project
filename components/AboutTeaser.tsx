import Image from "next/image";
import TLink from "./TLink";

/** Short human moment with the portrait as an ink/ember duotone. */
export default function AboutTeaser() {
  return (
    <section className="wrap grid items-center gap-12 py-28 md:grid-cols-[minmax(0,26rem)_1fr] md:gap-24 md:py-40" aria-labelledby="about-title">
      <div className="relative overflow-hidden rounded-sm bg-signal">
        <div data-parallax="0.12" className="relative aspect-[4/5] scale-110">
          <Image src="/img/portrait.jpg" alt="Portrait of Deneo Ngomane holding a camera" fill sizes="(min-width:768px) 26rem, 90vw" className="object-cover object-top mix-blend-multiply grayscale contrast-125" />
        </div>
      </div>
      <div>
        <p className="mono text-muted" data-reveal>About</p>
        <h2 id="about-title" className="display mt-4 text-5xl md:text-7xl" data-reveal>From White River to running design on mobile money.</h2>
        <p className="mt-8 max-w-2xl text-xl leading-snug text-muted" data-reveal>
          I started in graphic design, photography and front-end in 2011, then found UX. That mix is why I can take an idea from strategy to a shipped screen without a handoff gap. Today I work on MTN MoMo, and I care about one number above the rest: do people come back?
        </p>
        <div className="mt-8" data-reveal>
          <TLink href="/about" label="About" className="btn">More about how I work →</TLink>
        </div>
      </div>
    </section>
  );
}
