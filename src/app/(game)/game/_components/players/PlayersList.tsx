'use client';

import { api } from '@/api/build/api';
import { useAppSelector } from '@/hooks/store';
import { Player } from '@/types/player';
import { useEffect, useRef } from 'react';
import PlayerCard from '../playerCard/PlayerCard';
import { useGameStateSync } from '@/hooks/useGameStateSync';
import { useTurnTimer } from '@/hooks/useTurnTimer';

const PlayersList = () => {
  const { game, fields, user } = useGameStateSync();
  const { turnTime, calculateTimeToEndAndSetStates } = useTurnTimer();

  const { data: chipTransition } = useAppSelector(
    state => state.chipTransition,
  );
  const rolledDice = useRef(false);

  useEffect(() => {
    if (rolledDice.current && !chipTransition) {
      calculateTimeToEndAndSetStates({ game });
      const currentPlayer = game.players.find(
        player => player.userId === game.turnOfUserId,
      );
      const currentField = fields.find(
        fields => fields.index === currentPlayer?.currentFieldIndex,
      );
      if (currentField?.ownedBy === user.data?.id) {
        api.passTurn();
      }

      rolledDice.current = false;
    }
  }, [game, chipTransition]);

  useEffect(() => {
    const setRolledDiceapi = () => {
      rolledDice.current = true;
    };
    api.on.rolledDice(setRolledDiceapi);

    return () => {
      api.off.rolledDice(setRolledDiceapi);
    };
  }, [user.data]);

  return (
    <div className="relative my-auto flex h-[88%] flex-col gap-[2.7%] overflow-visible text-xs md:text-sm lg:text-lg">
      {game?.players &&
        game.players?.map((player: Player, index) => {
          return (
            <PlayerCard
              player={player}
              key={player.id}
              turnOfUserId={game.turnOfUserId}
              turnTime={turnTime}
              index={index}
            ></PlayerCard>
          );
        })}
    </div>
  );
};

export default PlayersList;