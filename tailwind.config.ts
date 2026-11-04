import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 900: "#0B1F3A", 800: "#12294A", 700: "#1B3A63" },
        teal: { 600: "#0F766E", 500: "#14958A", 100: "#D7F0EC" },
        paper: "#F7F8FA", ink: "#14202E", mute: "#586577",
      },
      fontFamily: { sans: ["system-ui", "Segoe UI", "Roboto", "sans-serif"] },
    },
  },
  plugins: [],
} satisfies Config;
