import { Player } from '@/types/player';
import { gradientColorVariants } from '../../_utils';
import { Avatar } from '@nextui-org/react';
import { useState } from 'react';
import { useAppSelector } from '@/hooks/store';
import Image from 'next/image';

interface PlayerCardProps {
  player: Player;
  turnOfUserId: string;
  turnTime: number;
  index: number;
}
const fromTopArr = ['top-[0]', 'top-[25.33%]', 'top-[50.66%]', 'top-[76%]'];
const PlayerCard = ({
  player,
  turnOfUserId,
  turnTime,
  index,
}: PlayerCardProps) => {
  const { data: user } = useAppSelector(state => state.user);
  const borderColor = gradientColorVariants[player.color];
  const playerBg = player.userId !== turnOfUserId ? 'bg-playerGradient' : '';
  const [isClicked, setIsClicked] = useState(false);
  const handleMouseClick = () => setIsClicked(prevState => !prevState);
  const [isPlayerButtonHovered, setIsPlayerButtonHovered] = useState(false);
  const handleMouseEnterPlayerButton = () => setIsPlayerButtonHovered(true);
  const handleMouseLeavePlayerButton = () => setIsPlayerButtonHovered(false);
  const [isPlayerButtonSecondHovered, setIsPlayerButtonSecondHovered] =
    useState(false);
  const handleMouseEnterPlayerButtonSecond = () =>
    setIsPlayerButtonSecondHovered(true);
  const handleMouseLeavePlayerButtonSecond = () =>
    setIsPlayerButtonSecondHovered(false);
  const [isPlayerButtonThirdHovered, setIsPlayerButtonThirdHovered] =
    useState(false);
  const handleMouseEnterPlayerButtonThird = () =>
    setIsPlayerButtonThirdHovered(true);
  const handleMouseLeavePlayerButtonThird = () =>
    setIsPlayerButtonThirdHovered(false);
  const fromTop = fromTopArr[index];
  const mainPlayer = player.userId === user?.id;
  const opacity = isClicked && mainPlayer ? 'opacity-100' : 'opacity-0';
  const backGroundHovered = isPlayerButtonHovered
    ? 'bg-[linear-gradient(268.72deg,#F6BE19_20.14%,#FBFBFA_125.62%)] bg-clip-text text-transparent'
    : 'text-white';
  const backGroundHoveredSecond = isPlayerButtonSecondHovered
    ? 'bg-[linear-gradient(268.72deg,#F6BE19_20.14%,#FBFBFA_125.62%)] bg-clip-text text-transparent'
    : 'text-white';
  const backGroundHoveredThird = isPlayerButtonThirdHovered
    ? 'bg-[linear-gradient(268.72deg,#F6BE19_20.14%,#FBFBFA_125.62%)] bg-clip-text text-transparent'
    : 'text-white';
  const opacityOtherPlayer =
    isClicked && !mainPlayer ? 'opacity-100' : 'opacity-0';
  const mainPlayerButtons = mainPlayer ? (
    <div
      className={`mt-auto w-full bg-transparent text-center text-[#FF8C8C] transition-all duration-300 ease-in-out hover:bg-[#002147] ${opacity}`}
    >
      <div className="mx-auto flex w-[60%] cursor-pointer items-center gap-1">
        <button className="relative flex h-6 w-6 items-center justify-center">
          <span className="absolute h-0.5 w-[70%] rotate-45 bg-[#FF8C8C]"></span>
          <span className="absolute h-0.5 w-[70%] -rotate-45 bg-[#FF8C8C]"></span>
        </button>
        <p className="text-sm">Здатись</p>
      </div>
    </div>
  ) : (
    <div
      className={`mt-auto w-full bg-transparent text-center text-[#FBFBFA] transition-all duration-300 ease-out ${opacityOtherPlayer}`}
    >
      <button
        className="mx-auto flex w-full cursor-pointer items-center gap-1 py-[2px] pl-[25%] hover:bg-[#002147]"
        onMouseEnter={handleMouseEnterPlayerButton}
        onMouseLeave={handleMouseLeavePlayerButton}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 0.987844C11.8727 0.987844 15.0122 4.1273 15.0122 8.00003C15.0122 11.8728 11.8727 15.0122 8 15.0122C4.12728 15.0122 0.987813 11.8727 0.987813 7.99997C0.992188 4.12903 4.12903 0.992156 7.99959 0.987813H8V0.987844ZM8 14.3165C11.4885 14.3165 14.3165 11.4885 14.3165 8.00002C14.3165 4.5115 11.4885 1.6835 8 1.6835C4.51148 1.6835 1.68348 4.5115 1.68348 8.00002C1.68744 11.4869 4.51308 14.3126 7.99963 14.3165H8ZM8.34781 3.33219H7.65219V0H8.34781V3.33219ZM8.34781 16H7.65219V12.6679H8.34781V16ZM16 8.34786H12.6678V7.6522H16V8.34786ZM3.33219 8.34786H0V7.6522H3.33219V8.34786ZM8 4.98784C9.29475 4.98784 10.3443 6.03744 10.3443 7.33219C10.3443 8.62694 9.29475 9.67653 8 9.67653C6.70525 9.67653 5.65566 8.62694 5.65566 7.33219C5.65722 6.03808 6.70589 4.98942 7.99984 4.98784H8ZM8 8.98089C8.91055 8.98089 9.6487 8.24273 9.6487 7.33217C9.6487 6.42161 8.91058 5.68348 8 5.68348C7.08945 5.68348 6.3513 6.42161 6.3513 7.33219C6.35248 8.24227 7.08992 8.97969 7.99989 8.98089H7.99998H8ZM11.68 13.3635H10.9843V12.6678L10.9844 12.655C10.9844 11.0067 9.64822 9.67058 8 9.67058C6.3563 9.67058 5.02297 10.9994 5.01566 12.6414V13.3377H4.32V12.6421C4.32812 10.6158 5.97259 8.97633 8 8.97633C10.0324 8.97633 11.68 10.624 11.68 12.6564C11.68 12.6614 11.68 12.6664 11.68 12.6714V12.6706V13.3635Z"
            fill={
              isPlayerButtonHovered
                ? 'url(#paint0_linear_838_71)'
                : 'currentColor'
            }
            className="trasnsition-all duration-300 ease-in-out"
          />
          <defs>
            <linearGradient
              id="paint0_linear_838_71"
              x1="28.3457"
              y1="1.41177"
              x2="-4.49952"
              y2="2.14511"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.475" stop-color="#F6BE19" />
              <stop offset="1" stop-color="#FBFBFA" />
            </linearGradient>
          </defs>
        </svg>
        <p
          className={`${backGroundHovered} transition-all duration-300 ease-out`}
        >
          Профіль
        </p>
      </button>
      <button
        className="mx-auto flex w-full cursor-pointer items-center gap-1 py-[2px] pl-[26%] hover:bg-[#002147]"
        onMouseEnter={handleMouseEnterPlayerButtonSecond}
        onMouseLeave={handleMouseLeavePlayerButtonSecond}
      >
        <svg
          className="mr-[-1%]"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 1.38909H3.80662V1.75273C3.81215 2.31812 4.2278 2.77453 4.74094 2.7782H7.26928C7.51972 2.77779 7.74563 2.66242 7.90594 2.47747L7.90627 2.47711L7.91815 2.46401C8.08668 2.28683 8.19145 2.03745 8.19145 1.76112V1.75534V1.75565V1.392H12V16H2.84547e-05L0 1.38909ZM3.18416 2.11636H0.660072V15.2727H11.3399V2.11636H8.81715C8.74747 2.45928 8.59188 2.7542 8.37678 2.98123L8.37624 2.98181C8.09554 3.30267 7.70236 3.50228 7.26686 3.50325H4.73924C3.98045 3.4969 3.34744 2.91125 3.18619 2.12819L3.18413 2.11634L3.18416 2.11636ZM4.7373 0H7.2607C8.13573 0.00773437 8.84331 0.786609 8.85147 1.74969V1.7544C8.85147 2.23654 8.66934 2.67183 8.37674 2.98128L8.3762 2.98181C8.09542 3.3024 7.70222 3.50173 7.26677 3.50253H4.73924C3.86515 3.49481 3.15811 2.71758 3.14849 1.7559V1.74545C3.1595 0.78639 3.8622 0.0121406 4.73158 1.56164e-05H4.73263L4.7373 0ZM7.26862 2.77818C7.51905 2.77779 7.74496 2.66244 7.90528 2.47747L7.9056 2.47711L7.91748 2.46401C8.086 2.28683 8.19075 2.03745 8.19075 1.76112V1.75534V1.75565C8.18668 1.19003 7.77199 0.732577 7.2592 0.72728H4.74127C4.23032 0.73728 3.81842 1.19059 3.80861 1.75244V1.75344C3.81451 2.31775 4.22888 2.77328 4.74084 2.77815H7.26933L7.26862 2.77818ZM9.78217 6.97454H2.21785V6.24729H9.78217V6.97454ZM9.78217 9.75272H2.21785V9.02546H9.78217V9.75272ZM6.62705 12.5309H2.21782V11.8036H6.62705V12.5309Z"
            fill={
              isPlayerButtonSecondHovered
                ? 'url(#paint0_linear_838_71)'
                : 'currentColor'
            }
            className="trasnsition-all duration-300 ease-in-out"
          />
          <defs>
            <linearGradient
              id="paint0_linear_838_71"
              x1="28.3457"
              y1="1.41177"
              x2="-4.49952"
              y2="2.14511"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.475" stop-color="#F6BE19" />
              <stop offset="1" stop-color="#FBFBFA" />
            </linearGradient>
          </defs>
        </svg>
        <p
          className={`${backGroundHoveredSecond} transition-all duration-300 ease-out`}
        >
          Обмін
        </p>
      </button>
      <button
        className="mx-auto flex w-full cursor-pointer items-center gap-1 py-[2px] pl-[25%] hover:bg-[#002147]"
        onMouseEnter={handleMouseEnterPlayerButtonThird}
        onMouseLeave={handleMouseLeavePlayerButtonThird}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 0.987844C11.8727 0.987844 15.0122 4.1273 15.0122 8.00003C15.0122 11.8728 11.8727 15.0122 8 15.0122C4.12728 15.0122 0.987813 11.8727 0.987813 7.99997C0.992188 4.12903 4.12903 0.992156 7.99959 0.987813H8V0.987844ZM8 14.3165C11.4885 14.3165 14.3165 11.4885 14.3165 8.00002C14.3165 4.5115 11.4885 1.6835 8 1.6835C4.51148 1.6835 1.68348 4.5115 1.68348 8.00002C1.68744 11.4869 4.51308 14.3126 7.99963 14.3165H8ZM8.34781 3.33219H7.65219V0H8.34781V3.33219ZM8.34781 16H7.65219V12.6679H8.34781V16ZM16 8.34786H12.6678V7.6522H16V8.34786ZM3.33219 8.34786H0V7.6522H3.33219V8.34786ZM8 4.98784C9.29475 4.98784 10.3443 6.03744 10.3443 7.33219C10.3443 8.62694 9.29475 9.67653 8 9.67653C6.70525 9.67653 5.65566 8.62694 5.65566 7.33219C5.65722 6.03808 6.70589 4.98942 7.99984 4.98784H8ZM8 8.98089C8.91055 8.98089 9.6487 8.24273 9.6487 7.33217C9.6487 6.42161 8.91058 5.68348 8 5.68348C7.08945 5.68348 6.3513 6.42161 6.3513 7.33219C6.35248 8.24227 7.08992 8.97969 7.99989 8.98089H7.99998H8ZM11.68 13.3635H10.9843V12.6678L10.9844 12.655C10.9844 11.0067 9.64822 9.67058 8 9.67058C6.3563 9.67058 5.02297 10.9994 5.01566 12.6414V13.3377H4.32V12.6421C4.32812 10.6158 5.97259 8.97633 8 8.97633C10.0324 8.97633 11.68 10.624 11.68 12.6564C11.68 12.6614 11.68 12.6664 11.68 12.6714V12.6706V13.3635Z"
            fill={
              isPlayerButtonThirdHovered
                ? 'url(#paint0_linear_838_71)'
                : 'currentColor'
            }
            className="trasnsition-all duration-300 ease-in-out"
          />
          <defs>
            <linearGradient
              id="paint0_linear_838_71"
              x1="28.3457"
              y1="1.41177"
              x2="-4.49952"
              y2="2.14511"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.475" stop-color="#F6BE19" />
              <stop offset="1" stop-color="#FBFBFA" />
            </linearGradient>
          </defs>
        </svg>
        <p
          className={`${backGroundHoveredThird} transition-all duration-300 ease-out`}
        >
          Репорт
        </p>
      </button>
    </div>
  );

  const playerHTML = (
    <div
      key={player.id}
      className={`${playerBg} trasnsition-all flex h-full w-full flex-col items-center overflow-clip rounded-[6%] pt-8 duration-300 ease-in-out`}
    >
      {player.userId === turnOfUserId && (
        <div className="absolute right-[5%] top-[-2%] rounded-[0.150rem] bg-[#F0F7FF] px-1 py-[2px] text-primaryGame md:px-2 md:py-1 lg:px-3 lg:py-2">
          {turnTime}
        </div>
      )}
      <div className="h-[5rem] w-[5rem]">
        <Avatar
          className="h-full w-full"
          src="https://i.pravatar.cc/150?u=a04258114e29026302d"
        />
      </div>

      <p className="text-2xl">{player.user.nickname}</p>
      <p className="text-sm">{player.money}$</p>

      {mainPlayerButtons}
    </div>
  );
  // change to !mainPlayer
  let height = isClicked && mainPlayer ? '25%' : '';

  if (isClicked && !mainPlayer) height = '31%';
  return (
    <div
      onClick={handleMouseClick}
      style={{
        background: borderColor,
        zIndex: isClicked ? '1000' : '',
        height,
      }}
      className={` ${fromTop} trasnsition-all absolute flex h-[24%] w-full cursor-pointer flex-col items-center justify-center rounded-[6%] duration-300 ease-in-out`}
    >
      {player.userId === turnOfUserId ? (
        <div className="h-[98%] w-[97%] rounded-[6%] bg-transparent">
          {playerHTML}
        </div>
      ) : (
        <div className="h-[98%] w-[97%] rounded-[6%] bg-primaryGame">
          {playerHTML}
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
