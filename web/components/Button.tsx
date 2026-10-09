import type { ReactNode } from "react";
import { TLink } from "./Transition";
import Magnetic from "./Magnetic";

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type Props = { href: string; children: ReactNode; variant?: "primary" | "ghost"; external?: boolean; download?: boolean; magnetic?: boolean; label?: string };

/** Internal links get the page transition; external/mailto/download are plain anchors. */
export default function Button({ href, children, variant = "ghost", external, download, magnetic = true, label }: Props) {
  const cls = `btn ${variant === "primary" ? "btn-primary" : "btn-ghost"}`;
  const inner = (
    <>
      {children}
      <Arrow />
    </>
  );
  const node =
    external || download || href.startsWith("mailto:") || href.startsWith("http") ? (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: true } : {})}
      >
        {inner}
      </a>
    ) : (
      <TLink href={href} className={cls} label={label}>
        {inner}
      </TLink>
    );
  return magnetic ? <Magnetic>{node}</Magnetic> : node;
}
