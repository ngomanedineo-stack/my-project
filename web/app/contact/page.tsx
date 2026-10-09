import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Button from "@/components/Button";
import { site } from "@/content/site";
import { stripPh } from "@/lib/rich";

export const metadata: Metadata = { title: "Contact", description: "Book a chat about a Senior Product Designer or Product Lead role." };

export default function Contact() {
  const book = site.booking || `mailto:${site.email}?subject=Let%27s%20chat`;
  return (
    <>
      <PageHead eyebrow="Contact" title="Let’s talk about your team.">
        I’m open to {site.status.replace("Open to ", "")}. Tell me what you’re building and what you need to move: I’ll reply within a day.
      </PageHead>
      <section className="wrap pb-32 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-7">
          <a href={`mailto:${site.email}`} className="link-u display text-[clamp(1.8rem,5vw,4.5rem)] break-all" data-cursor="Email" data-reveal>{site.email}</a>
          <div className="mt-12 flex flex-wrap gap-4" data-reveal>
            <Button href={book} variant="primary" external={!!site.booking}>Book a chat</Button>
            <Button href={site.cv} download>View CV</Button>
            <Button href={stripPh(site.linkedin)} external>LinkedIn</Button>
          </div>
        </div>
        <dl className="md:col-span-4 md:col-start-9 space-y-8" data-reveal>
          <div><dt className="mono text-mute">Based in</dt><dd className="mt-1 text-xl">{site.location}</dd></div>
          <div><dt className="mono text-mute">Looking for</dt><dd className="mt-1 text-xl">Senior Product Designer · Product Lead · Design Manager · Product Owner</dd></div>
          <div><dt className="mono text-mute">Best for</dt><dd className="mt-1 text-xl">Fintech, mobile-first and emerging-market products</dd></div>
        </dl>
      </section>
    </>
  );
}
