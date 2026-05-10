/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FAF8F5',
        ink: '#1a1a1a',
        accent: '#9B2335',
        muted: '#666666',
      },
      fontFamily: {
        zh: ['"Noto Serif SC"', 'serif'],
        serif: ['"EB Garamond"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
