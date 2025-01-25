import { useAppSelector } from '@/hooks/store';
import { FC } from 'react';
import InnerPlayerCard from '../playerCard/InnerPlayerCard';
import AuctionPlayerCard from './AuctionPlayerCard';

const Players: FC = () => {
  const players = useAppSelector(state => state.game.game.players);

  return (
    <div className="grid h-[95%] w-full grid-rows-[auto] gap-3">
      {players.map((player, index) => (
        <AuctionPlayerCard player={player} index={index} />
      ))}
    </div>
  );
};

export default Players;
