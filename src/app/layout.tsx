import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Header, Footer } from "@/components/Shell";
import { DemoBanner } from "@/components/Trust";

export const metadata: Metadata = { title: "Mzansi Votes — Know Your Area. Know Your Leaders. Know Your Vote.", description: "Nonpartisan South African elections and civic accountability platform." };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><body className="font-sans antialiased">
      <a href="#main" className="skip">Skip to content</a>
      <DemoBanner /><Header />
      <main id="main" className="mx-auto max-w-5xl px-4 py-6">{children}</main>
      <Footer />
    </body></html>
  );
}
