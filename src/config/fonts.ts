import localFont from 'next/font/local';

export const titleFont = localFont({
  src: '../../public/fonts/queen_of_melbourne.ttf',
  variable: '--font-titleFont',
  weight: '100 900',
});
export const genFont = localFont({
  src: '../../public/fonts/FixelDisplay-Regular.ttf',
  variable: '--font-genFont',
  weight: '100 900',
});
export const ermilovFont = localFont({
  src: '../../public/fonts/Ermilov-bold.otf',
  variable: '--font-ermilovFont',
  weight: '100 400 700 900',
});

export const namuFont = localFont({
  src: '../../public/fonts/NAMU-1910.ttf',
  variable: '--font-namuFont',
  weight: '100 300 500 700',
});
