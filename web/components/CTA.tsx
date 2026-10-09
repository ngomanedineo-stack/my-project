import Button from "./Button";
import { site } from "@/content/site";
import { stripPh } from "@/lib/rich";

/** Closing call-to-action, used at the foot of every page. */
export default function CTA({ heading = "Let’s build something people keep." }: { heading?: string }) {
  const book = site.booking || `mailto:${site.email}?subject=Let%27s%20chat`;
  return (
    <section aria-labelledby="cta-h" className="relative py-28 md:py-44 overflow-hidden">
      <div className="wrap">
        <p className="mono text-mute mb-8" data-reveal>Hiring? Let’s talk.</p>
        <h2 id="cta-h" className="display h-xl max-w-[16ch]" data-split>{heading}</h2>
        <div className="mt-14 flex flex-wrap items-center gap-4" data-reveal>
          <Button href={book} variant="primary" external={!!site.booking}>Book a chat</Button>
          <Button href={site.cv} download>View CV</Button>
          <Button href={stripPh(site.linkedin)} external>LinkedIn</Button>
        </div>
        <p className="mt-10" data-reveal>
          <a href={`mailto:${site.email}`} className="link-u display text-3xl md:text-5xl" data-cursor="Email">{site.email}</a>
        </p>
      </div>
    </section>
  );
}
