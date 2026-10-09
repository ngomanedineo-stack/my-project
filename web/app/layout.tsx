import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { TransitionProvider } from "@/components/Transition";
import Cursor from "@/components/Cursor";
import Intro from "@/components/Intro";
import MotionRoot from "@/components/MotionRoot";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: { title: site.title, description: site.description, type: "website" },
};
export const viewport: Viewport = { themeColor: "#0b0b0c" };

// Runs before paint: enables motion-only hidden states, skips the intro on repeat visits,
// and removes everything if the animation layer fails to boot (content must never stay hidden).
const boot = `(function(){var d=document.documentElement;
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion');
try{if(sessionStorage.getItem('intro'))d.classList.add('no-intro')}catch(e){}
setTimeout(function(){if(!window.__motionReady)d.classList.remove('motion')},6000)}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <TransitionProvider>
          <Intro />
          <SmoothScroll />
          <Cursor />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MotionRoot />
        </TransitionProvider>
      </body>
    </html>
  );
}
