/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-cyan-900": "#072321",
        "dark-cyan-800": "#0d403c",
        "dark-cyan-700": "#156a65",
        "dark-cyan-600": "#1d958d",
      },
      screens: {
        "xs": "512px"
      }
    },
  },
  plugins: [],
}