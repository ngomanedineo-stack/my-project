"use client";
import { useEffect, useState } from "react";

/** Dark/light toggle. The initial theme is applied by an inline script in layout to avoid a flash. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as "dark" | "light") || "dark");
  }, []);
  const flip = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
    setTheme(next);
    window.dispatchEvent(new Event("themechange"));
  };
  return (
    <button onClick={flip} className="mono rounded-full border border-line px-3 py-2 hover:border-fg" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
