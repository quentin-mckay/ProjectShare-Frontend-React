/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      // LIGHT MODE
      colors: {
        // 'primary-bg': colors.red[500],
        
        // 'bgcolor': {
        //   DEFAULT: 'rgb(36 36 36)',
        //   // DEFAULT: '#0a192f', // slate blue
        //   dark: '#333'
        // },
        'primary-bg': '#ddd', // light gray
        'secondary-bg': '#eee', // slightly darker gray
        'primary-text': 'black',
        'secondary-text': colors.gray[700],
        // 'secondary-text': 'red',
        'primary-accent': 'darkslateblue', // normal css color
        'primary-accent-hover': '#5246a0', // slightly lighter
        // 'primary-accent': '#6469ff',
        // 'primary-accent': 'rgb(79, 70, 229)', 
        'generate-button': 'darkslateblue',
        'generate-button-hover': '#5246a0',

        'light-text': 'white'
        
      }
    },
  },
  plugins: [],
}