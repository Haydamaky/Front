import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setChipTransition } from '@/store/slices/chipTransition';
import { useEffect, useRef } from 'react';
import PlayersChips from './PlayersChips';
import { api } from '@/api/build/api';

const PlayerChipsContainer = () => {
  const game = useAppSelector(state => state.game.game);
  const prevGameAfterRolledDices = useRef(null);
  const shouldUpdate = useRef(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleRolledDice = (data: any) => {
      prevGameAfterRolledDices.current = data.game;
      shouldUpdate.current = true;
      dispatch(setChipTransition(true));
    };
    const handleGetGameData = (data: any) => {
      prevGameAfterRolledDices.current = data.game;
      shouldUpdate.current = true;
    };
    api.on.gameData(handleGetGameData);
    api.on.rolledDice(handleRolledDice);
    return () => {
      api.off.rolledDice(handleRolledDice);
      api.off.gameData(handleGetGameData);
    };
  }, []);
  if (shouldUpdate.current) {
    shouldUpdate.current = false;
    return <PlayersChips game={game} />;
  }
  return <PlayersChips game={prevGameAfterRolledDices.current} />;
};

export default PlayerChipsContainer;
