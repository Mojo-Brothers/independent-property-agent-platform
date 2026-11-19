/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060D1A',
          900: '#0A192F',
          850: '#0E213D',
          800: '#132A4D',
          700: '#1C3B68',
          600: '#2A5594',
        },
        gold: {
          50: '#FBF8F0',
          100: '#F6EFDC',
          200: '#EBDCB4',
          300: '#DFC789',
          400: '#D4AF37',
          500: '#C5A059',
          600: '#A88340',
          700: '#87652E',
          800: '#694E24',
          900: '#4C371B',
        },
        surface: {
          light: '#F8FAFC',
          card: '#FFFFFF',
          dark: '#0A192F',
          darkcard: '#0E213D',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 4px 20px -2px rgba(212, 175, 55, 0.25)',
        'card-elevated': '0 10px 30px -5px rgba(10, 25, 47, 0.08), 0 4px 6px -2px rgba(10, 25, 47, 0.03)',
      }
    },
  },
  plugins: [],
};
