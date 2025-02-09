import { useAppSelector } from '@/hooks/store';
import { FC } from 'react';
import AuctionPlayerCard from './AuctionPlayerCard';

const Players: FC = () => {
  const players = useAppSelector(state => state.game.game.players);

  return (
    <div className="grid h-full grid-rows-[auto] gap-3 overflow-hidden pb-10">
      {players.map((player, index) => (
        <AuctionPlayerCard player={player} index={index} />
      ))}
    </div>
  );
};

export default Players;
