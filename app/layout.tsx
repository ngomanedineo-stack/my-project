import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/content/site";
import SmoothScroll from "@/components/SmoothScroll";
import PageEffects from "@/components/PageEffects";
import Transitions from "@/components/Transitions";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Deneo Ngomane · Senior Product Designer & Product Owner", template: "%s · Deneo Ngomane" },
  description:
    "Senior product designer, strategist and developer in African fintech. I design products people come back to, and measure it in retention.",
  openGraph: { title: "Deneo Ngomane · I design products people come back to", type: "website", url: site.url },
};

export const viewport: Viewport = { themeColor: "#0e0d0c", colorScheme: "dark light" };

// Runs before paint: sets theme and flags that motion is allowed, so there is no flash and no hidden content without JS.
const boot = `(function(){try{var d=document.documentElement;var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.dataset.theme=t;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion')}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <noscript>
          <style>{`html.motion [data-reveal], html.motion .split-line > span { visibility: visible !important; }`}</style>
        </noscript>
      </head>
      <body className="grain">
        <a href="#main" className="skip">Skip to content</a>
        <Transitions>
          <SmoothScroll />
          <PageEffects />
          <Cursor />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </Transitions>
      </body>
    </html>
  );
}
