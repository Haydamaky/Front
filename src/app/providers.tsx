'use client';

import { Provider } from 'react-redux';
import store from '@/store';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
type Props = {
  children: React.ReactNode;
};

export function Providers({ children }: Props) {
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" themes={['light']}>
        <Provider store={store}>{children}</Provider>;
      </NextThemesProvider>
    </NextUIProvider>
  );
}
