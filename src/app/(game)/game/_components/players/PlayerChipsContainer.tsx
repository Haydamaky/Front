import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { socket } from '@/socket';
import { setChipTransition } from '@/store/slices/chipTransition';
import { useEffect, useRef } from 'react';
import PlayersChips from './PlayersChips';

const PlayerChipsContainer = () => {
  const game = useAppSelector(state => state.game.game);
  const prevGameAfterRolledDices = useRef(null);
  const shouldUpdate = useRef(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleRollDiced = (data: any) => {
      prevGameAfterRolledDices.current = data.game;
      shouldUpdate.current = true;
      dispatch(setChipTransition(true));
    };
    const handleGetGameData = (data: any) => {
      prevGameAfterRolledDices.current = data.game;
      shouldUpdate.current = true;
    };
    socket.on('gameData', handleGetGameData);
    socket.on('rolledDice', handleRollDiced);
    return () => {
      socket.off('rolledDice', handleRollDiced);
      socket.off('gameData', handleGetGameData);
    };
  }, []);
  if (shouldUpdate.current) {
    shouldUpdate.current = false;
    return <PlayersChips game={game} />;
  }
  return <PlayersChips game={prevGameAfterRolledDices.current} />;
};

export default PlayerChipsContainer;
