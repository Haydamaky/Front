import { useAppSelector } from '@/hooks/store';
import { FC } from 'react';
import InnerPlayerCard from '../playerCard/InnerPlayerCard';
import AuctionPlayerCard from './AuctionPlayerCard';

const Players: FC = () => {
  const players = useAppSelector(state => state.game.game.players);

  return (
    <div className="grid h-full w-full grid-rows-[20%_20%_20%_20%] gap-4">
      {players.map(player => (
        <AuctionPlayerCard player={player} />
      ))}
    </div>
  );
};

export default Players;
