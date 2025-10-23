'use client';

import { api } from '@/api/build/api';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setErrorGame, setLoadingGame } from '@/store/slices/game';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function useRedirectIfActiveGame() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const user = useAppSelector(state => state.user);
  useEffect(() => {
    const getAllGameData = async () => {
      try {
        if (user.data) {
          dispatch(setLoadingGame(true));
          const data = await api.getAllGameData();
          if (data.game.status === 'ACTIVE' && pathname !== '/game') {
            // router.push('/game');
            // Logic for recconecting to active game
          }
          dispatch(setLoadingGame(false));
        }
      } catch (err) {
        dispatch(setErrorGame('Couldnt get game'));
        dispatch(setLoadingGame(false));
      }
    };
    getAllGameData();
    api.on.rejoin(() => {
      getAllGameData();
    });
    return () => {
      api.off.rejoin(getAllGameData);
    };
  }, [user.data]);
}

export default useRedirectIfActiveGame;
