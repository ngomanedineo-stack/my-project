"use client";
import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useTransition } from "./Transitions";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string; label?: string };

/** Internal link that plays the page transition. External/hash-only/modified clicks fall through to the browser. */
export default function TLink({ href, label, onClick, children, ...rest }: Props) {
  const { go } = useTransition();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (!href.startsWith("/")) return;
    e.preventDefault();
    go(href, label);
  };
  return (
    <Link href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
