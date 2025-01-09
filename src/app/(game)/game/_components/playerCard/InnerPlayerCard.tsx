import { Player } from '@/types/player';
import { Avatar } from '@nextui-org/react';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface InnerPlayerCard {
  player: Player;
  playerBg: string;
  turnOfUserId: string;
  turnTime: number;
  buttons: React.ReactNode;
}

const InnerPlayerCard = ({
  player,
  playerBg,
  turnOfUserId,
  turnTime,
  buttons,
}: InnerPlayerCard) => {
  return (
    <div
      key={player.id}
      className={`${playerBg} trasnsition-all flex h-full w-full flex-col items-center overflow-clip rounded-[6%] pt-8 duration-300 ease-in-out`}
    >
      {player.userId === turnOfUserId && (
        <div
          className={`font- absolute right-[5%] top-[-2%] rounded-[0.150rem] bg-[#F0F7FF] px-1 py-[2px] text-primaryGame md:px-2 md:py-1 lg:px-3 lg:py-2 ${inter.className} font-normal`}
        >
          {turnTime}
        </div>
      )}
      <div className="h-[5rem] w-[5rem]">
        <Avatar
          className="h-full w-full"
          src="https://i.pravatar.cc/150?u=a04258114e29026302d"
        />
      </div>

      <p className="text-xl">{player.user.nickname}</p>
      <p className="text-sm">{player.money}$</p>

      {buttons}
    </div>
  );
};

export default InnerPlayerCard;
