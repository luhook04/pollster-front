/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
      },
    },
  },
  plugins: [],
};
