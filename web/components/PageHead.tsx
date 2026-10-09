import type { ReactNode } from "react";

export default function PageHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <header className="wrap pt-40 md:pt-56 pb-16 md:pb-24">
      <p className="mono text-mute mb-6" data-reveal>{eyebrow}</p>
      <h1 className="display h-xl max-w-[18ch]" data-split>{title}</h1>
      {children && <div className="mt-8 max-w-[52ch] text-xl text-ink/80" data-reveal>{children}</div>}
    </header>
  );
}
