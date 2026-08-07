/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        inkBlack: '#111111',
        inkDark: '#222222',
        amberAccent: '#F2A33C',
        amberAccentDark: '#D98A22',
        offWhite: '#F8F9FA',
        charcoal: '#343A40',
        gray200: '#E9ECEF',
        gray500: '#6C757D',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        amberGlow: '0 4px 15px rgba(242, 163, 60, 0.3)',
        cardLight: '0 5px 15px rgba(0,0,0,0.05)',
        cardHover: '0 10px 25px rgba(0,0,0,0.1)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
