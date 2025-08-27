import type { Config } from "tailwindcss"

export default {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem", // 20px
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1400px",
      },
    },
    extend: {
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
      letterSpacing: {
        tightest: "-0.02em",
        tighter: "-0.01em",
        wider: "0.02em",
      },
      lineHeight: {
        snug: "1.25",
        comfy: "1.35",
        loose: "1.5",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
      },
      colors: {
        card: "#ffffff",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
} satisfies Config
