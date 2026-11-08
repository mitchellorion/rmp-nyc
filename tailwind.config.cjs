/** @type {import('tailwindcss').Config} */
// Colours are CSS variables (defaults in src/index.css). Borough colours colour the map and the chips.
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        ink: "var(--ink)",
        accent: "var(--accent)",
        "on-accent": "var(--on-accent)",
        pop: "var(--pop)",
        "on-pop": "var(--on-pop)",
        water: "var(--water)",
        manhattan: "var(--manhattan)",
        brooklyn: "var(--brooklyn)",
        queens: "var(--queens)",
        bronx: "var(--bronx)",
        staten: "var(--staten)",
      },
      fontFamily: {
        display: ["Gabarito", "system-ui", "sans-serif"],
        body: ["Atkinson Hyperlegible", "system-ui", "sans-serif"],
      },
      boxShadow: {
        block: "5px 5px 0 0 var(--ink)",
        "block-sm": "3px 3px 0 0 var(--ink)",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-7px) scale(1.06)" },
        },
        wobble: {
          "0%, 100%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        ring: {
          "0%": { transform: "scale(0.6)", opacity: "0.9" },
          "100%": { transform: "scale(2.6)", opacity: "0" },
        },
        drift: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "64px 32px" },
        },
        pop: {
          "0%": { opacity: "0", transform: "scale(0.85)" },
          "70%": { opacity: "1", transform: "scale(1.04)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        rise: "rise 0.4s ease-out both",
        bob: "bob 0.9s ease-in-out infinite",
        wobble: "wobble 3.2s ease-in-out infinite",
        ring: "ring 1.8s ease-out infinite",
        drift: "drift 14s linear infinite",
        pop: "pop 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) both",
      },
    },
  },
  plugins: [],
};
