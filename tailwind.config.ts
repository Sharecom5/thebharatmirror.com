import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1a365d', // Deep Navy
        'brand-red': '#c53030',  // Crimson
        'brand-gold': '#b7791f', // Muted Gold accent
        'brand-black': '#1a202c', // Slate Black
        'brand-gray': '#f7fafc',  // Cool Gray
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-lato)', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 4px rgba(0,0,0,0.05)',
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
