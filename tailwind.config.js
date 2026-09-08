/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      colors: {
        vamble: {
          primary: "#243821",
          "primary-dark": "#182716",
          "primary-light": "#334e2f",
          "primary-subtle": "#EDF3EB",
          secondary: "#9B7846",
          "secondary-dark": "#7D5F34",
          "secondary-light": "#B9945F",
          "secondary-subtle": "#F7F2EB",
          tertiary: "#4A3E31",
          neutral: "#1A1816",
          cream: "#FAF8F5",
          "cream-dark": "#F2EDE4",
          "cream-card": "#FFFFFF",
          border: "rgba(155, 120, 70, 0.22)",
        },
      },
    },
  },
  plugins: [],
};
