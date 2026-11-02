/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./article.html",
    "./404.html",
    "./assets/js/**/*.js",
    "./data/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        heading: '#0F172A',
        body: '#475569',
        muted: '#64748B',
        violet: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        border: {
          DEFAULT: '#E2E8F0',
          hover: '#C4B5FD',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
        'card': '0 4px 6px -1px rgba(15, 23, 42, 0.04), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 10px 15px -3px rgba(124, 58, 237, 0.08), 0 4px 6px -4px rgba(124, 58, 237, 0.04)',
      }
    },
  },
  plugins: [],
}
