/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff4400',
          dark: '#cc3300',
          light: '#ff6633',
        },
        secondary: {
          DEFAULT: '#333333',
          dark: '#222222',
          light: '#555555',
        },
      },
    },
  },
  plugins: [],
}
