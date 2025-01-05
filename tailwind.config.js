/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cursive: ['"Dancing Script"', 'cursive'], // Add your desired cursive font here
        pacifico: ['"Pacifico"', 'cursive'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}

