/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // colors: {
      //   'primary-bg': '#0f172a',
      //   'secondary-bg': '#1e293b',
      //   'primary-text': '#ffffff',
      //   'secondary-text': '#94a3b8',
      //   'primary-accent': '#6366f1'
      // },
      // colors: {
      //   'primary-bg': '#1d1d1f',
      //   'secondary-bg': '#3e3d40',
      //   'primary-text': '#ffffff',
      //   'secondary-text': '#94a3b8',
      //   'primary-accent': '#6864fc'
      // },
      // colors: {
      //   'primary-bg': '#2b2a3c',
      //   'secondary-bg': '#2e2d40',
      //   'primary-text': '#ffffff',
      //   'secondary-text': '#94a3b8',
      //   'primary-accent': '#f09567'
      // },

      // LIGHT MODE
      colors: {
        'primary-bg': '#ccc',
        'secondary-bg': '#ddd',
        'primary-text': 'black',
        'secondary-text': '#333',
        'primary-accent': 'slateblue',
        'light-text': 'white'
      }
    },
  },
  plugins: [],
}