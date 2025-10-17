'use client';

import { Player } from '@/types/player';
import PlayerCard from '../playerCard/PlayerCard';
import { useGameStateSync } from '@/hooks/useGameStateSync';
import { useTurnTimer } from '@/hooks/useTurnTimer';
import { useAutoPassTurn } from '@/hooks/useAutoPassTurn';

const PlayersList = () => {
  const { game, fields } = useGameStateSync();
  const { turnTime, calculateTimeToEndAndSetStates } = useTurnTimer();

  useAutoPassTurn(game, fields, () => {
    if (game) {
      calculateTimeToEndAndSetStates({ game });
    }
  });

  return (
    <div className="relative my-auto flex h-[88%] flex-col gap-[2.7%] overflow-visible text-xs md:text-sm lg:text-lg">
      {game?.players?.map((player: Player, index) => (
        <PlayerCard
          player={player}
          key={player.id}
          turnOfUserId={game.turnOfUserId}
          turnTime={turnTime}
          index={index}
        />
      ))}
    </div>
  );
};

export default PlayersList;