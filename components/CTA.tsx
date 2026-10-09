import { site } from "@/content/site";
import Magnetic from "./Magnetic";
import Lines from "./Lines";

export default function CTA() {
  return (
    <section className="wrap py-32 md:py-48" aria-labelledby="cta-title">
      <p className="mono text-muted" data-reveal>Hiring for a senior product role?</p>
      <Lines lines={["Let's build something", "people keep."]} em="keep" className="mt-6 text-[clamp(3rem,10vw,10rem)]" />
      <div id="cta-title" className="sr-only">Contact</div>
      <div className="mt-12 flex flex-wrap gap-4" data-reveal>
        <Magnetic><a className="btn btn-primary" href={site.book} target="_blank" rel="noopener noreferrer">Book a chat</a></Magnetic>
        <Magnetic><a className="btn" href={site.cv}>View CV</a></Magnetic>
        <Magnetic><a className="btn" href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></Magnetic>
        <Magnetic><a className="btn" href={`mailto:${site.email}`}>Email me</a></Magnetic>
      </div>
    </section>
  );
}
