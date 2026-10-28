/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Paleta oficial ProParking, extraída del logo.
        ink: {
          DEFAULT: '#2C2C2A',
          50: '#F5F5F4',
          100: '#E7E7E5',
          200: '#C9C9C6',
          300: '#A3A39F',
          400: '#767673',
          500: '#52524F',
          600: '#3D3D3B',
          700: '#2C2C2A',
          800: '#1E1E1D',
          900: '#131312',
        },
        orange: {
          DEFAULT: '#D85A30',
          50: '#FDF2EE',
          100: '#FBE1D7',
          200: '#F5BDA6',
          300: '#EF9873',
          400: '#E67A4F',
          500: '#D85A30',
          600: '#B84624',
          700: '#93371D',
          800: '#6E2916',
          900: '#4A1B0F',
        },
        green: {
          DEFAULT: '#1D9E75',
          50: '#ECFBF6',
          100: '#D1F5E8',
          200: '#A3EBD1',
          300: '#6EDBB7',
          400: '#3FC297',
          500: '#1D9E75',
          600: '#187F5E',
          700: '#136249',
          800: '#0D4634',
          900: '#082B20',
        },
        cream: {
          DEFAULT: '#F1EFE8',
          50: '#FDFDFB',
          100: '#F9F8F4',
          200: '#F1EFE8',
          300: '#E6E2D6',
          400: '#D6D0BD',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(44, 44, 42, 0.04), 0 8px 24px -8px rgba(44, 44, 42, 0.12)',
        'card-hover': '0 4px 8px 0 rgba(44, 44, 42, 0.06), 0 16px 32px -12px rgba(44, 44, 42, 0.18)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
