/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#a85cd1',
        secondary: '#bb82db',
        dark: {
          100: '#622a81',
          200: '#683285',
        },
        light: '#d4b2e7',
      }
    },
  },
  plugins: [],
}