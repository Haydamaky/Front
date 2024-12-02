import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens:{
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      fontFamily: {
        custom: ['var(--font-titleFont)', 'sans-serif'],
        second: ['var(--font-genFont)', 'sans-serif'],
      },
      fontSize: {
        standardMob: '10px',
        standard: '13px',
        lg: '16px',
      },
      colors: {
        primary: 'rgb(115, 113, 252)',
        secondary: 'rgb(165, 148, 249)',
        tertiary: 'rgb(205, 193, 255)',
        base: 'rgb(245, 239, 255)',
        helper: 'rgb(229, 217, 242)',
        black: 'rgb(0,0,0)',
      },
    },
  },
  plugins: [],
};
export default config;
