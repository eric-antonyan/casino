/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,ts,tsx,jsx}",
      "./public/index.html"
  ],
  theme: {
    extend: {
      screens: {
        'phone': {
          min: '373px',
          max: '727px'
        },
        'desktop': {
          min: '1020px'
        }
      },
      colors: {
        'darker': '#101010',
        'primary': '#ff0141',
        'secondary': '#1dc7de'
      }
    },
  },
  plugins: [],
}

