import { Fragment, type ReactNode } from "react";

/** Renders [[placeholder]] markers as highlighted marks so unfinished copy is obvious. */
export function Rich({ children }: { children: string }): ReactNode {
  const parts = children.split(/(\[\[[^\]]+\]\])/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("[[") ? (
          <mark key={i} className="ph" title="Placeholder: replace with your real detail">
            {p.slice(2, -2)}
          </mark>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

export const stripPh = (s: string) => s.replace(/\[\[|\]\]/g, "");
