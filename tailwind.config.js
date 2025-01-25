/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-purple': '#1a142a', // Nome personalizado (ex.: "custom-dark")
        'purple-default': '#7548DB', // Nome personalizado (ex.: "custom-dark")
      },
    },
  },
  plugins: [],
}
