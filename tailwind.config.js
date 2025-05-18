/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A3FF',
          400: '#3385FF',
          500: '#147AFC', // Global Health Blue
          600: '#0F5FCA',
          700: '#0A4797',
          800: '#062F64',
          900: '#031832',
        },
        secondary: {
          50: '#E6F9EF',
          100: '#CDF3DF',
          200: '#9BE8BF',
          300: '#69DC9F',
          400: '#38D17F',
          500: '#34C759', // Wellness Green
          600: '#29A048',
          700: '#1E7836',
          800: '#145024',
          900: '#0A2812',
        },
        tertiary: {
          50: '#FFF9E6',
          100: '#FFF3CC',
          200: '#FFE799',
          300: '#FFDB66',
          400: '#FFCF33',
          500: '#FF9500', // Alert Orange
          600: '#CC7700',
          700: '#995900',
          800: '#663C00',
          900: '#331E00',
        },
        gray: {
          50: '#F5F7FA',
          100: '#EDF2F7',
          200: '#E2E8F0',
          300: '#CBD5E0',
          400: '#A0AEC0',
          500: '#718096',
          600: '#4A5568',
          700: '#2D3748',
          800: '#1A202C',
          900: '#0D1117',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};