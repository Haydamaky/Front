import { Player } from '@/types/player';
import { Avatar } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

interface Props {
  playerWon: Player;
}

const WinnerDisplay: FC<Props> = ({ playerWon }) => {
  return (
    <div className="fixed left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center bg-[#060606F2]">
      <h1 className="bg-[linear-gradient(268.72deg,#F6BE19_20.14%,#FBFBFA_125.62%)] bg-clip-text text-7xl font-bold text-transparent">
        Winner
      </h1>

      <div className="pb-[9%]">
        <div className="relative mt-[60%] h-[9rem] w-[9rem]">
          <Image
            className="pointer-events-none absolute right-[-15%] top-[-38%] z-10 select-none"
            src="/images/Crown.svg"
            alt="back-button"
            width={100}
            height={100}
          />
          <Avatar
            className="pointer-events-none h-full w-full select-none"
            src="https://i.pravatar.cc/150?u=a04258114e29026302d"
          />
        </div>
        <p className="mt-[15%] text-center text-4xl text-white">
          {playerWon?.user.nickname}
        </p>
      </div>

      <Link href="/rooms" className="block">
        <div className="absolute bottom-[5%] left-[5%] flex cursor-pointer">
          <Image
            className="pointer-events-none select-none"
            src="/images/BackButton.svg"
            alt="back-button"
            width={32}
            height={32}
          />
          <p className="mb-[10%] ml-[14%] font-custom text-2xl text-white">
            Exit
          </p>
        </div>
      </Link>
    </div>
  );
};

export default WinnerDisplay;
