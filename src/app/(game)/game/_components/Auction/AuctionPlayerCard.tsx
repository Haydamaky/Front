import { Player } from '@/types/player';
import { Avatar } from '@nextui-org/react';
import Image from 'next/image';
import { gradientColorVariants } from '../../_utils';

interface AuctionPlayerCardProps {
  player: Player;
}

const AuctionPlayerCard = ({ player }: AuctionPlayerCardProps) => {
  const color = gradientColorVariants[player.color];
  return (
    <div
      className={`relative flex h-full flex-col items-center justify-center rounded-lg`}
      style={{
        background: !player.refusedFromAuction ? color : 'transparent',
      }}
    >
      {player.refusedFromAuction && (
        <div
          className="absolute inset-0 rounded-lg p-[0.15rem]"
          style={{
            background: `linear-gradient(to bottom, #EBF4F5, #B5C6E0)`,
            WebkitMask:
              'linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)',
            WebkitMaskComposite: 'destination-out',
            maskComposite: 'exclude',
          }}
        ></div>
      )}
      {!player.refusedFromAuction ? (
        <Avatar
          src={'https://i.pravatar.cc/150?u=a04258114e29026302d'}
          ImgComponent={props => <Image {...props} fill={true} />}
          size="lg"
        />
      ) : (
        <div className="relative h-14 w-14 cursor-pointer" aria-label="Close">
          <div className="absolute left-0 top-1/2 h-1 w-14 -translate-y-1/2 rotate-45 rounded-md bg-white" />
          <div className="absolute left-0 top-1/2 h-1 w-14 -translate-y-1/2 -rotate-45 rounded-md bg-white" />
        </div>
      )}
      <div className="flex flex-col items-center">
        <p className="text-xl capitalize">{player.user.nickname}</p>
        {!player.refusedFromAuction ? (
          <p className="text-custom text-nowrap text-sm">{player.money}mm</p>
        ) : (
          <p className="font-custom text-[10px] uppercase">Refused</p>
        )}
      </div>
    </div>
  );
};

export default AuctionPlayerCard;
