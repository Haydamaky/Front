import { Player } from '@/types/player';
import { Avatar } from '@nextui-org/react';
import Image from 'next/image';
import { FC } from 'react';

const AuctionPlayerCard: FC<{ player: Player }> = ({ player }) => {
  return (
    <div className="flex h-full w-full flex-col items-center rounded-lg bg-pink-400 p-6">
      <Avatar
        src="https://i.pravatar.cc/150?u=a04258114e29026302d"
        ImgComponent={props => <Image {...props} fill={true} />}
        size="lg"
      />
      <div>
        <p>{player.user.nickname}</p>
        <p>{player.money}$</p>
      </div>
    </div>
  );
};

export default AuctionPlayerCard;
