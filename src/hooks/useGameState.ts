import { useCallback, useEffect } from 'react';
import { api } from '@/api/build/api';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setErrorGame, setGame, setLoadingGame } from '@/store/slices/game';
import { DataWithGame } from '@/types';

export const useGameState = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const { game, loading } = useAppSelector(state => state.game);

  const handleGameUpdate = useCallback((data: DataWithGame) => {
    if (data.game) {
      dispatch(setGame(data.game));
    }
  }, [dispatch]);

  const fetchGameData = useCallback(async () => {
    if (!user?.data?.id) return;
    try {
      dispatch(setLoadingGame(true));
      await api.getAllGameData();
    } catch {
      dispatch(setErrorGame('Could not get game'));
    } finally {
      dispatch(setLoadingGame(false));
    }
  }, [user?.data?.id, dispatch]);

  const handleRejoin = useCallback(() => {
    console.log('Rejoin');
    fetchGameData();
  }, [fetchGameData]);

  useEffect(() => {
    fetchGameData();

    api.on.tradeOffered(handleGameUpdate);
    api.on.rejoin(handleRejoin);
    api.on.gameData(handleGameUpdate);
    api.on.passTurnToNext(handleGameUpdate);
    api.onMany(['updateGameData', 'payedForField'], handleGameUpdate);

    return () => {
      api.off.tradeOffered(handleGameUpdate);
      api.off.rejoin(handleRejoin);
      api.off.gameData(handleGameUpdate);
      api.off.passTurnToNext(handleGameUpdate);
      api.offMany(['updateGameData', 'payedForField'], handleGameUpdate);
    };
  }, [fetchGameData, handleGameUpdate, handleRejoin]);

  return { game, loading, user };
};