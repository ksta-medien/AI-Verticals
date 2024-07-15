/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    'components/**/*.{js,vue,ts}',
    'utils/**/*.{js,ts}',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'plugins/**/*.{js,ts}',
    'nuxt.config.{js,ts}',
    'app.vue',
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
        primary: '#6A40A0',
        secondary: '#7C9EB2',
        anthrazit: '#332C23',
        highlight: '#FAA275',
        highlight_dark: '#FF8C61',
      },
      fontFamily: {
        sans: ['Titillium Web', 'Helvetica'],
        serif: ['Crimson Text', 'Helvetica'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
