/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Deep Charcoal Palette (Replacing cold tech navy with rich corporate architectural charcoal)
        charcoal: {
          950: '#0F1012',
          900: '#181A1E',
          850: '#23262B',
          800: '#2E3238',
          700: '#3D424B',
          600: '#525864',
          500: '#6C7382',
        },
        // Backward-compatible alias for navy mapping to Deep Charcoal
        navy: {
          950: '#0F1012',
          900: '#181A1E',
          850: '#23262B',
          800: '#2E3238',
          700: '#3D424B',
          600: '#525864',
        },
        // Champagne Gold Palette (Refined editorial metallic accent)
        gold: {
          50: '#FBF9F4',
          100: '#F5F0E4',
          200: '#ECE1CA',
          300: '#DFC789',
          400: '#C5A880',
          500: '#B89758',
          600: '#9B7E56',
          700: '#7D6442',
          800: '#614D32',
          900: '#463723',
        },
        champagne: {
          50: '#FBF9F4',
          100: '#F5F0E4',
          200: '#ECE1CA',
          300: '#DFC789',
          400: '#C5A880',
          500: '#B89758',
          600: '#9B7E56',
        },
        // Ivory White Surfaces (Warm, fine-art editorial architectural white)
        ivory: {
          50: '#FDFBF7',
          100: '#FAF9F5',
          200: '#F4F1EA',
          300: '#EBE6DA',
          400: '#DFD8C5',
        },
        surface: {
          light: '#FAF9F5',
          card: '#FFFFFF',
          dark: '#181A1E',
          darkcard: '#23262B',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', '"Cinzel"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 4px 20px -2px rgba(197, 168, 128, 0.25)',
        'card-elevated': '0 10px 30px -5px rgba(24, 26, 30, 0.08), 0 4px 6px -2px rgba(24, 26, 30, 0.03)',
      }
    },
  },
  plugins: [],
};
