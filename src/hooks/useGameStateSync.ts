import { useEffect } from 'react';
import { api } from '@/api/build/api';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setFields } from '@/store/slices/fields';
import { setGame } from '@/store/slices/game';
import { DataWithGame } from '@/types';

export const useGameStateSync = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const game = useAppSelector(state => state.game.game);
  const fields = useAppSelector(state => state.fields.fields);

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

  const getAllGameData = () => {
    if (user.data) {
      api.getAllGameData();
    }
  };

  useEffect(() => {
    getAllGameData();

    api.on.rejoin(() => {
      console.log('Rejoin');
      if (!game || !fields) {
        getAllGameData();
      }
    });

    api.on.gameData(dispatchSetGame, dispatchSetFields);
    api.on.tradeOffered(dispatchSetGame);
    api.on.passTurnToNext(dispatchSetGame, dispatchSetFields);
    api.onMany(
      ['payedForField', 'updateGameData'],
      dispatchSetGame,
      dispatchSetFields,
    );

    return () => {
      api.off.rejoin(getAllGameData);
      api.off.tradeOffered(dispatchSetGame);
      api.off.passTurnToNext(dispatchSetGame, dispatchSetFields);
      api.offMany(
        ['payedForField', 'updateGameData'],
        dispatchSetGame,
        dispatchSetFields,
      );
    };
  }, [user.data]);

  return {
    game,
    fields,
    user,
  };
};