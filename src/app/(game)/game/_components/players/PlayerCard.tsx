import { Player } from '@/types/player';
import { gradientColorVariants } from '../../_utils';
import { Avatar } from '@nextui-org/react';
import { useState } from 'react';
import { useAppSelector } from '@/hooks/store';
import Image from 'next/image';
import ProfileIcon from '../playerButtonsIcons/ProfileIcon';
import DocumentIcon from '../playerButtonsIcons/DocumentIcon';
import BellIcon from '../playerButtonsIcons/BellIcon';

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
        className="flex w-full cursor-pointer items-center gap-1 py-[2px] pl-[25%] hover:bg-[#002147]"
        onMouseEnter={handleMouseEnterPlayerButton}
        onMouseLeave={handleMouseLeavePlayerButton}
      >
        <ProfileIcon isHovered={isPlayerButtonHovered}></ProfileIcon>
        <p
          className={`${backGroundHovered} transition-all duration-300 ease-out`}
        >
          Профіль
        </p>
      </button>
      <button
        className="flex w-full cursor-pointer items-center gap-1 py-[2px] pl-[26%] hover:bg-[#002147]"
        onMouseEnter={handleMouseEnterPlayerButtonSecond}
        onMouseLeave={handleMouseLeavePlayerButtonSecond}
      >
        <DocumentIcon isHovered={isPlayerButtonSecondHovered}></DocumentIcon>
        <p
          className={`${backGroundHoveredSecond} transition-all duration-300 ease-out`}
        >
          Обмін
        </p>
      </button>
      <button
        className="flex w-full cursor-pointer items-center gap-1 py-[2px] pl-[25%] hover:bg-[#002147]"
        onMouseEnter={handleMouseEnterPlayerButtonThird}
        onMouseLeave={handleMouseLeavePlayerButtonThird}
      >
        <BellIcon isHovered={isPlayerButtonThirdHovered}></BellIcon>
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
      className={` ${fromTop} trasnsition-all absolute flex h-[24%] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[6%] duration-300 ease-in-out`}
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
