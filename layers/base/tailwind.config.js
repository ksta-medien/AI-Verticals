/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './utils/**/*.{js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  safelist: [
    {
      pattern: /row-start-(1|2|3|4|5|6)/,
      variants: ['lg'],
    },
    {
      pattern: /row-end-(1|2|3|4|5|6)/,
      variants: ['lg'],
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7B0323',
        secondary: '#780cab',
        anthrazit: '#161212',
        brownblack: '#150c0c',
        creme: '#F4EFE7',
        grey_mid: '#262626',
        grey_light: '#3C3C3C',
        grey_dark: '#1D1D1D',
      },
      fontFamily: {
        sans: ['Titillium Web', 'Helvetica'],
        serif: ['Crimson Text', 'Helvetica'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
