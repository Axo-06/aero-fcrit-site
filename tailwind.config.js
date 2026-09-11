/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#f1ecdd",
        inkdim: "#afc0b6",
        hangar: "#122420",
        hangardeep: "#0c1a17",
        linecyan: "#7fc8be",
        brass: "#ce9e52",
        signal: "#e2572b",
        panel: "#1a342c",
      },
      fontFamily: {
        body: ['"IBM Plex Sans"', "sans-serif"],
        display: ['"Big Shoulders Display"', "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
