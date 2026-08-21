/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '2rem',
      },
      screens: {
        lg: '1248px',
        xl: '1248px',
        '2xl': '1248px',
      },
    },
    extend: {
      maxWidth: {
        page: '1248px',
      },
      colors: {
        accent: {
          DEFAULT: '#3346c1', // azul periwinkle, contraste AA
          hover: '#2b3ba1',
          light: '#edeff7',
        },
        brand: {
          DEFAULT: '#b1d004', // lima 40
          light: '#e1f56e', // lima 30 — fondos de marca
          lighter: '#edfca2',
          dark: '#839906',
        },
        ink: {
          dark: '#141414',
          gray: '#4d4d4c',
          medium: '#6f6f6d',
          light: '#cbccc7',
        },
        primary: {
          DEFAULT: '#141414',
          dark: '#141414',
          light: '#4d4d4c',
        },
        secondary: {
          DEFAULT: '#6f6f6d',
          light: '#cbccc7',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f4f5f2',
          base: '#fafbf9',
          page: '#e5e6e1',
        },
        link: {
          DEFAULT: '#145bc7',
          hover: '#093a8f',
        },
      },
      animation: {
        blob: 'blob 7s infinite',
        bounce: 'bounce 2s infinite',
        'fade-in': 'fade-in 0.6s ease-out',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'float-slower': 'float-slow 11s ease-in-out infinite',
        drift: 'drift 14s ease-in-out infinite',
        'price-pulse': 'price-pulse 1s ease-in-out infinite',
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
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(var(--tilt, 0deg))' },
          '50%': { transform: 'translateY(-16px) rotate(var(--tilt, 0deg))' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(16px, -12px)' },
        },
        'price-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.06)' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'page-x': 'var(--page-px)',
        'page-y': 'var(--page-py)',
        'page-gap': 'var(--page-gap)',
        'page-compact': 'var(--page-py-compact)',
        'title-gap': 'var(--title-gap)',
        'heading-gap': 'var(--heading-gap)',
        'text-gap': 'var(--text-gap)',
        'content-pad': 'var(--content-pad)',
        'content-gap': 'var(--content-gap)',
        'item-gap': 'var(--item-gap)',
      },
    },
  },
  plugins: [],
};
