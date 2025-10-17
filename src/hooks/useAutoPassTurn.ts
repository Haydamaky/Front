import { useEffect, useRef } from 'react';
import { api } from '@/api/build/api';
import { useAppSelector } from '@/hooks/store';
import { Game } from '@/types';

export const useAutoPassTurn = (
  game: Game | null,
  fields: any[],
  calculateTimeCallback: () => void,
) => {
  const user = useAppSelector(state => state.user);
  const { data: chipTransition } = useAppSelector(
    state => state.chipTransition,
  );
  const rolledDice = useRef(false);

  useEffect(() => {
    const setRolledDiceTrue = () => {
      rolledDice.current = true;
    };

    api.on.rolledDice(setRolledDiceTrue);

    return () => {
      api.off.rolledDice(setRolledDiceTrue);
    };
  }, []);

  useEffect(() => {
    if (!game || !rolledDice.current || chipTransition) return;

    calculateTimeCallback();

    const currentPlayer = game.players.find(
      player => player.userId === game.turnOfUserId,
    );

    const currentField = fields.find(
      field => field.index === currentPlayer?.currentFieldIndex,
    );

    if (currentField?.ownedBy === user.data?.id) {
      api.passTurn();
    }

    rolledDice.current = false;
  }, [game, chipTransition, fields, user.data?.id, calculateTimeCallback]);

  return { rolledDice };
};