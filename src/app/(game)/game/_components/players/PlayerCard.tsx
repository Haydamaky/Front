import { Player } from '@/types/player';
import { gradientColorVariants } from '../../_utils';
import { Avatar } from '@nextui-org/react';

interface PlayerCardProps {
  player: Player;
  turnOfUserId: string;
  turnTime: number;
}

const PlayerCard = ({ player, turnOfUserId, turnTime }: PlayerCardProps) => {
  const borderColor = gradientColorVariants[player.color];
  const playerBg = player.userId !== turnOfUserId ? 'bg-playerGradient' : '';
  const playerHTML = (
    <div
      key={player.id}
      className={`${playerBg} relative flex h-full w-full flex-col items-center justify-center rounded-[6%]`}
    >
      {player.userId === turnOfUserId && (
        <div className="text-primaryGame absolute right-[5%] top-[-2%] rounded-[0.150rem] bg-[#F0F7FF] px-1 py-[2px] md:px-2 md:py-1 lg:px-3 lg:py-2">
          {turnTime}
        </div>
      )}
      <Avatar
        className="h-[5rem] w-[5rem]"
        src="https://i.pravatar.cc/150?u=a04258114e29026302d"
      />
      <p className="text-2xl">{player.user.nickname}</p>
      <p className="text-sm">{player.money}$</p>
    </div>
  );
  return (
    <div
      style={{ background: borderColor }}
      className={`flex h-[23%] flex-col items-center justify-center overflow-hidden rounded-[6%]`}
    >
      {player.userId === turnOfUserId ? (
        playerHTML
      ) : (
        <div className="bg-primaryGame h-[98%] w-[97%] rounded-[6%]">
          {playerHTML}
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
