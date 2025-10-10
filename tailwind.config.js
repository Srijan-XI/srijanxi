/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        'primary-dark': '#1f2937', // Dark Charcoal
        'accent-blue': '#06b6d4', // Professional Teal/Cyan
        'text-light': '#f3f4f6', // Off-white
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  content: ["./**/*.html", "./**/*.js"],
};
