import { Player } from '@/types/player';
import { Avatar } from '@nextui-org/react';
import Image from 'next/image';
import { FC } from 'react';
import { X } from 'lucide-react';
import { gradientColorVariants } from '../../_utils';
const AuctionPlayerCard: FC<{ player: Player; index: number }> = ({
  player,
  index,
}) => {
  const isDismissed = index === 3;

  const color = gradientColorVariants[player.color];
  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center rounded-lg p-6`}
      style={{
        background: !isDismissed ? color : 'transparent',
      }}
    >
      {isDismissed && (
        <div
          className="absolute inset-0 rounded-lg p-[0.15rem]"
          style={{
            background: `linear-gradient(to bottom, #EBF4F5, #B5C6E0)`, // Your gradient colors
            WebkitMask:
              'linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)', // Inner mask
            WebkitMaskComposite: 'destination-out',
            maskComposite: 'exclude',
          }}
        ></div>
      )}
      {!isDismissed ? (
        <Avatar
          src={'https://i.pravatar.cc/150?u=a04258114e29026302d'}
          ImgComponent={props => <Image {...props} fill={true} />}
          size="lg"
          className="h-16 w-16"
        />
      ) : (
        <X absoluteStrokeWidth={true} height={64} width={64} />
      )}
      <div className="mt-2 flex flex-col items-center gap-1">
        <p className="text-lg capitalize">{player.user.nickname}</p>
        {!isDismissed ? (
          <p className="text-custom">{player.money} mm</p>
        ) : (
          <p className="font-custom text-sm uppercase">відмовився</p>
        )}
      </div>
    </div>
  );
};

export default AuctionPlayerCard;
