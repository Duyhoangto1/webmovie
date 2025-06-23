/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tmdb: {
          red: '#E50914',
          'red-dark': '#B20710',
          dark: '#000000',
          'dark-gray': '#1a1a1a',
          'medium-gray': '#333333',
          'light-gray': '#666666',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}