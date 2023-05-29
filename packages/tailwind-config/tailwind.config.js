/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-orange-100": "#ffe6cc",
        "light-orange-200": "#FFCC99",
        "light-orange-300": "#f5cb5c",
        "light-orange-400": "#f9d689",
        "light-black-800": "#513d46",
        "light-black-900": "#3e2d32",
        "dark-cyan-900": "#072321",
        "dark-cyan-800": "#0d403c",
        "dark-cyan-700": "#156a65",
        "dark-cyan-600": "#1d958d",
        "dark-white-200": "#cfdbd5",
        "dark-white-100": "#e8eddf",
      },
      fontSize: {
        "32px": ["2rem", "2.25rem"],
      }
    },
  },
  plugins: [],
}