import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['var(--font-titleFont)', 'sans-serif'],
        second: ['var(--font-genFont)', 'sans-serif'],
      },
      colors: {
        primary: 'rgb(115, 113, 252)',
        secondary: 'rgb(165, 148, 249)',
        tertiary: 'rgb(205, 193, 255)',
        base: 'rgb(245, 239, 255)',
        helper: 'rgb(229, 217, 242)'
      },
    },
  },
  plugins: [],
};
export default config;
