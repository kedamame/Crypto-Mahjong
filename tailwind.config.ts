import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#ede9df',
        ink: '#141410',
        blue: '#3558c8',
        mid: '#888880',
        tile: '#f5f0e8',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
        mono: ['Courier New', 'Courier', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
