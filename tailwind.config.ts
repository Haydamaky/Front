import { positionCoors } from './src/app/(game)/game/_utils';
import { createColorVariants } from './src/app/(game)/game/_utils/createColorVariants';
import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';
const colorVariants = createColorVariants('bg', '500');
const colorVariantsDarker = createColorVariants('bg', '700');
const colorVariantsBorder = createColorVariants('border', '500');
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    ...Object.values(colorVariants),
    ...Object.values(colorVariantsDarker),
    ...Object.values(colorVariantsBorder),
    ...positionCoors,
  ],
  theme: {
    extend: {
      height: {
        '7.5': '1.875rem',
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      fontFamily: {
        custom: ['var(--font-titleFont)'],
        second: ['var(--font-genFont)'],
      },
      fontSize: {
        smallMob: '8px',
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
        playerCard: 'rgba(245, 239, 255, 0.2)',
        gameWhite: 'rgba(251, 251, 250, 1)',
      },
      boxShadow: {
        combined: '0px 4px 4px 0px #00000040 inset, 0px 2px 1px 0px #0000004D',
      },
    },
  },
  darkMode: ['class', 'class'],
  plugins: [nextui(), require('tailwindcss-animate')],
};
export default config;
