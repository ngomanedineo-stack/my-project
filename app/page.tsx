import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Pillars from "@/components/Pillars";
import WorkScroller from "@/components/WorkScroller";
import AboutTeaser from "@/components/AboutTeaser";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Pillars />
      <WorkScroller />
      <AboutTeaser />
      <CTA />
    </>
  );
}
