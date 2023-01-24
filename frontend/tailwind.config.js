/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js, jsx, ts, tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#1a1a1b',
          lighter: '#2c2c30',
        },
        search: {
          default: '#272729',
        },
        button: {
          light: '#edeff1',
          orange: '#ff4500'
        },
        cText: {
          gray: '#343435',
          middle: '#77797a',
          light: '#d7dadc',
        },
        icon: {
          purple: '#bd59ff',
        },
      },
      spacing: {
        '128': '32rem',
        '256': '64rem'
      }
    },
  },
  plugins: [],
}
