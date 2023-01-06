/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js, jsx, ts, tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#202023',
          lighter: '#2c2c30',
        }
      },
      spacing: {
        '128': '32rem',
        '256': '64rem'
      }
    },
  },
  plugins: [],
}
