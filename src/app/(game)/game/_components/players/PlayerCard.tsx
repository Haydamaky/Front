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
  const highLigthedShadow =
    player.userId === turnOfUserId
      ? 'shadow-[0px_0px_4px_3px_rgba(255,247,0,1)]'
      : '';
  console.log({ borderColor, color: player.color });
  const playerId = player.id;
  return (
    <>
      <style>
        {`
          .my-div-${player.id} {
             position: relative;
          }
          .my-div-${player.id}::before {
            content: "";
  position: absolute;
  inset: 0;
  border-radius: 5%; 
  padding: 2px; 
  background: ${borderColor}; 
  mask: 
    linear-gradient(#000 0 0) content-box, 
    linear-gradient(#000 0 0);
  mask-composite: exclude; 
          }
        `}
      </style>
      <div
        key={player.id}
        className={`my-div-${playerId} bg-playerGradient ${highLigthedShadow} flex h-[23%] flex-col items-center justify-center rounded-[5%]`}
      >
        {player.userId === turnOfUserId && (
          <div className="absolute right-[5%] top-[-2%] rounded-[0.150rem] bg-base px-1 py-[2px] text-primary md:px-2 md:py-1 lg:px-3 lg:py-2">
            {turnTime}
          </div>
        )}
        <Avatar
          size="md"
          src="https://i.pravatar.cc/150?u=a04258114e29026302d"
        />
        <p>{player.user.nickname}</p>
        <p>{player.money}$</p>
      </div>
    </>
  );
};

export default PlayerCard;
