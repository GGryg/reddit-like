/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js, jsx, ts, tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#202023'
        }
      },
      spacing: {
        '128': '32rem'
      }
    },
  },
  plugins: [],
}
