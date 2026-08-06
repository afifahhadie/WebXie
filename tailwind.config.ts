import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#050914",
          900: "#0a1128",
          850: "#0d1730",
          700: "#16213f",
          600: "#233258",
        },
        blue: {
          500: "#2f6fef",
          400: "#4c8dff",
          300: "#8db8ff",
        },
        ivory: {
          DEFAULT: "#f4f6fb",
          dim: "#a9b3cc",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
