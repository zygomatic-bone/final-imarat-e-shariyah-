import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./providers/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F3D28B",
          dark: "#B8960C",
          champagne: "#F7E7CE",
        },
        luxury: {
          black: "#0A0A0A",
          dark: "#111111",
          gray: "#1A1A1A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        urdu: ["Noto Nastaliq Urdu", "serif"],
      },
      animation: {
        "aurora-shift": "aurora-shift 20s ease infinite",
        "glass-shimmer": "glass-shimmer 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        fade: "fade 0.5s ease-out",
        reveal: "reveal 0.6s ease-out",
        lift: "lift 0.3s ease-out",
        glow: "glow 2s ease-in-out infinite",
      },
      keyframes: {
        "aurora-shift": {
          "0%, 100%": { transform: "translateY(0) scale(1)", opacity: "0.5" },
          "50%": { transform: "translateY(-20px) scale(1.05)", opacity: "0.8" },
        },
        "glass-shimmer": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fade: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        reveal: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        lift: {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-4px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(212, 175, 55, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
