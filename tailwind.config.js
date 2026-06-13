/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#14b8a6', // teal-500 (verde turquesa)
          hover: '#0d9488', // teal-600 (verde turquesa oscuro)
        },
        ink: {
          dark: '#252525',
          gray: '#545454',
          medium: '#7D7D7D',
          light: '#CFCFCF',
        },
        primary: {
          DEFAULT: '#252525',
          dark: '#1a1a1a',
          light: '#545454',
        },
        secondary: {
          DEFAULT: '#7D7D7D',
          light: '#CFCFCF',
        },
      },
      animation: {
        'blob': 'blob 7s infinite',
        'bounce': 'bounce 2s infinite',
        'fade-in': 'fade-in 0.6s ease-out',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};