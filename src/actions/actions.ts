'use server';
import { cookies } from 'next/headers';

export const setGameIdCookie = async (gameId: string) => {
  const cookiesStore = cookies();
  cookiesStore.set('gameId', gameId, {
    maxAge: 7 * 24 * 60 * 60,
    sameSite: 'none',
    httpOnly: false,
    path: '/',
    secure: true,
  });
};
