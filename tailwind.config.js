/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        noto: ['var(--font-noto-sans-kr)', 'sans-serif'],
      },
      fontSize: {
        'mobile-sm': '0.9rem',
        'mobile-base': '1rem',
        'mobile-lg': '1.125rem',
        'mobile-xl': '1.25rem',
      },
      colors: {
        'primary': {
          DEFAULT: '#3498db',
          dark: '#2980b9',
        },
        'secondary': {
          DEFAULT: '#4caf50',
          dark: '#388e3c',
        },
        'danger': {
          DEFAULT: '#e74c3c',
          dark: '#c0392b',
        },
        'dark-bg': '#121212',
        'card-bg': '#1e1e1e',
        'light-text': '#f5f5f5',
        'muted-text': '#a0a0a0',
      },
    },
  },
  plugins: [],
}
