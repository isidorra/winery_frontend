/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
          "jost": ["Jost", "sans-serif"],
          "dorsa" : ["Dorsa", "sans-serif"],
      },
      colors: {
        "primary" : "#393934",
        "secondary" : "#fff9d4",
        "accent" : "#72383d",
        "darker-accent" : "#301618",
        "white-smoke" : "#f3f3f3"
      },
      backgroundImage: {
        "hero-pattern": "url('../assets/image/auth.jpg')",
      }
    },
  },
  plugins: [],
}
