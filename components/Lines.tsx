import type { ElementType, ReactNode } from "react";

/**
 * Headline split into explicit lines so the mask reveal is SSR-safe and layout-stable.
 * Pass `em` to render a word in italic ember. Animated by PageEffects via [data-lines].
 */
export default function Lines({
  lines, em, as: Tag = "h2", className = "", hero = false,
}: { lines: string[]; em?: string; as?: ElementType; className?: string; hero?: boolean }) {
  const render = (line: string): ReactNode => {
    if (!em || !line.includes(em)) return line;
    const [a, b] = line.split(em);
    return (<>{a}<em>{em}</em>{b}</>);
  };
  return (
    <Tag className={`display ${className}`} data-lines data-hero={hero ? "" : undefined}>
      {lines.map((l) => (
        <span key={l} className="mask split-line"><span>{render(l)}</span></span>
      ))}
    </Tag>
  );
}
