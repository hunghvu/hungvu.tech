/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "nebula": "#e8eddf",
        "green-white": "cfdbd5",
        "mango": "#f5cb5c",
        "dune": "#513d46",
        "dune-emphasized": "#3e2d32",
      },
      fontSize: {
        "32px": ["2rem", "2.25rem"],
      }
    },
  },
  plugins: [],
}