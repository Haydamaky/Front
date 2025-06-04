import { Game } from '@/types';
import { FC } from 'react';
import PlayerCard from './PlayerCard';

const GameRow: FC<{ game: Game }> = ({ game }) => {
  return (
    <li className="ml-[20%] flex w-[80%] list-none flex-col gap-3 rounded-2xl border border-base bg-transparent p-4">
      <div className="self-center">
        <h3 className="text-md font-custom text-base">Default game</h3>
      </div>
      <ul className="mx-4 grid grid-cols-[25fr_25fr_25fr_25fr] grid-rows-[15vh] gap-4">
        {Array.from(
          { length: game.playersCapacity },
          (_, i) => game.players[i],
        ).map((player, i) => (
          <PlayerCard
            player={player}
            gameId={game.id}
            key={player ? player.userId : i}
          />
        ))}
      </ul>
    </li>
  );
};

export default GameRow;
