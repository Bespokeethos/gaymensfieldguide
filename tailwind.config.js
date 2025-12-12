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
        banana: {
          100: '#FEF9C3', // Lightest
          200: '#FEF08A',
          300: '#FDE047',
          DEFAULT: '#FACC15', // Core Nano Banana
          500: '#EAB308', // Darker/Safety
          600: '#CA8A04',
        },
        industrial: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB', // Structural Grey
          DEFAULT: '#4B5563', // Text Base
          800: '#1F2937', // Dark Mode Surface
          900: '#111827', // Dark Mode Background
          950: '#030712', // Near Black
        },
        paper: {
           DEFAULT: '#F5F5F4', // Warm Stone/Paper
           dark: '#1c1917', // Dark Stone
        }
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'monospace'], // Ensure we can use CSS var later
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'stripe-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      },

    },
  },
  plugins: [],
}
