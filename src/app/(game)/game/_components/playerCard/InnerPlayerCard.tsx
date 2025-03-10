import { Player } from '@/types/player';
import { Avatar } from '@nextui-org/react';

import { Inter } from 'next/font/google';
import LostIcon from './LostIcon';

const inter = Inter({ subsets: ['latin'] });

interface InnerPlayerCard {
  player: Player;
  playerBg: string;
  turnOfUserId?: string;
  turnTime?: number;
  buttons?: React.ReactNode;
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
      {player.userId === turnOfUserId && turnTime && turnTime >= 0 ? (
        <div
          className={`absolute right-[5%] top-[-0.2vh] flex h-[3.3vh] w-[21%] items-center justify-center rounded-[0.150rem] bg-[#F0F7FF] text-primaryGame ${inter.className} font-normal`}
        >
          {turnTime}
        </div>
      ) : (
        ''
      )}
      {!player.lost ? (
        <div className="h-[5rem] w-[5rem]">
          <Avatar
            className="h-full w-full"
            src="https://i.pravatar.cc/150?u=a04258114e29026302d"
          />
        </div>
      ) : (
        <div className="h-[5rem] w-[5rem]">
          <LostIcon />
        </div>
      )}

      <p className="text-xl">{player.user.nickname}</p>
      {!player.lost ? (
        <p className="mt-[2px] text-sm">{player.money}$</p>
      ) : (
        <p className="mt-[2px] text-sm">Bankrupt</p>
      )}

      {buttons}
    </div>
  );
};

export default InnerPlayerCard;
