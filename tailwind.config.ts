import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nyokolodi: {
          dark: "#083E1A",
          forest: "#0E4D25",
          primary: "#146C36",
          green: "#199A3F",
          light: "#26C252",
          accent: "#22C55E",
          mint: "#EAF9EE",
          surface: "#F4FBF6",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)",
        floating: "0 20px 40px -15px rgba(14, 77, 37, 0.15)",
        glow: "0 0 25px rgba(34, 197, 94, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
