/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        crimson: '#8B0A1A',
        crimsonDeep: '#5C0510',
        gold: '#E8C76A',
        goldSoft: '#D4A84B',
        ivory: '#F5E9C9',
        blush: '#E89BB0',
      },
      fontFamily: {
        zh: ['"Noto Serif SC"', 'serif'],
        serif: ['"EB Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: {
        photo: '0 8px 24px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(232, 199, 106, 0.25)',
      },
    },
  },
  plugins: [],
};
