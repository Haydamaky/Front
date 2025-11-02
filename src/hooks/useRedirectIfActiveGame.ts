'use client';

import { api } from '@/api/build/api';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setErrorGame, setGame, setLoadingGame } from '@/store/slices/game';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DataWithGame } from '@/types';
import { setFields } from '@/store/slices/fields';
import Cookies from 'js-cookie';
import { useUser } from './useUser';

function useRedirectIfActiveGame() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { data } = useUser();

  useEffect(() => {
    const gameId = Cookies.get('gameId');
    const dispatchSetGame = (data: DataWithGame) => {
      if (data.game) {
        dispatch(setGame(data.game));
      }
    };

    const dispatchSetFields = (data: DataWithGame) => {
      if (data.fields) {
        dispatch(setFields(data.fields));
      }
    };
    const getAllGameData = async () => {
      try {
        if (gameId && data) {
          dispatch(setLoadingGame(true));
          const data = await api.getAllGameData();
          if (data.game.status === 'ACTIVE' && pathname !== '/game') {
            router.push('/game');
          }
          dispatch(setLoadingGame(false));
        } else if (data && pathname === '/game') {
          router.push('/rooms');
        }
      } catch (err) {
        dispatch(setErrorGame('Couldnt get game'));
        dispatch(setLoadingGame(false));
      }
    };
    getAllGameData();
    api.on.gameData(dispatchSetGame, dispatchSetFields);
    api.on.rejoin(() => {
      getAllGameData();
    });
    return () => {
      api.off.rejoin(getAllGameData);
    };
  }, [data]);
}

export default useRedirectIfActiveGame;
