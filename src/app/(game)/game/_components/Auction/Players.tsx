import { useAppSelector } from '@/hooks/store';
import { FC } from 'react';
import AuctionPlayerCard from './AuctionPlayerCard';

interface PlayersProps {
  refusedIds: string[];
}

const Players = ({ refusedIds }: PlayersProps) => {
  const players = useAppSelector(state => state.game.game.players);
  const updatedPlayers = players.map(player =>
    refusedIds.includes(player.userId)
      ? { ...player, refusedFromAuction: true }
      : player,
  );
  console.log({ updatedPlayers, refusedIds });
  return (
    <div className="grid h-full grid-rows-[auto] gap-3 overflow-hidden pb-10">
      {updatedPlayers.map(player => (
        <AuctionPlayerCard player={player} />
      ))}
    </div>
  );
};

export default Players;
