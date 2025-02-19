import { Game } from '@/types';
import { FC } from 'react';
import PlayerCard from './PlayerCard';

const GameRow: FC<{ game: Game }> = ({ game }) => {
  return (
    <li className="flex w-full list-none flex-col gap-5 rounded-md border-4 bg-primary p-5">
      <div className="self-center">
        <h3 className="font-custom text-2xl text-white underline underline-offset-8">
          Default game
        </h3>
      </div>
      <ul className="grid grid-cols-[25fr_25fr_25fr_25fr] grid-rows-[9rem] gap-4">
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
