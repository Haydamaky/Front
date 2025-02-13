import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ProfileIcon from '../playerButtonsIcons/ProfileIcon';
import DocumentIcon from '../playerButtonsIcons/DocumentIcon';
import BellIcon from '../playerButtonsIcons/BellIcon';
import { useAppDispatch } from '@/hooks/store';
import { setTrade } from '@/store/slices/trade';
import { Player } from '@/types/player';

interface OtherPlayerButtonsProps {
  opacity: string;
  lost: boolean;
  player: Player;
}
const getGradientClass = (isHovered: boolean) =>
  isHovered
    ? 'bg-[linear-gradient(268.72deg,#F6BE19_20.14%,#FBFBFA_125.62%)] bg-clip-text text-transparent'
    : 'text-white';

export const OtherPlayerButtons = ({
  opacity,
  lost,
  player,
}: OtherPlayerButtonsProps) => {
  const [hoveredStates, setHoveredStates] = useState({
    profile: false,
    exchange: false,
    report: false,
  });

  const dispatch = useAppDispatch();

  const handleMouseEnter = (button: keyof typeof hoveredStates) => {
    setHoveredStates(prev => ({ ...prev, [button]: true }));
  };

  const handleMouseLeave = (button: keyof typeof hoveredStates) => {
    setHoveredStates(prev => ({ ...prev, [button]: false }));
  };

  const handleTrade = () => {
    dispatch(
      setTrade({
        offerFieldsIndexes: [],
        wantedFieldsIndexes: [],
        toUserId: player.userId,
      }),
    );
  };

  return (
    <div
      className={`mt-auto w-full bg-transparent text-center font-fixelDisplay text-[#FBFBFA] transition-all duration-300 ease-out ${opacity}`}
    >
      <Button
        variant="playerOption"
        className="pl-[25%]"
        onMouseEnter={() => handleMouseEnter('profile')}
        onMouseLeave={() => handleMouseLeave('profile')}
        size="widthFull"
      >
        <ProfileIcon isHovered={hoveredStates.profile} />
        <p
          className={`${getGradientClass(hoveredStates.profile)} text-[14px] transition-all duration-300 ease-out`}
        >
          Профіль
        </p>
      </Button>

      {!lost && (
        <Button
          variant="playerOption"
          className="pl-[26%]"
          onMouseEnter={() => handleMouseEnter('exchange')}
          onMouseLeave={() => handleMouseLeave('exchange')}
          onClick={handleTrade}
          size="widthFull"
        >
          <DocumentIcon isHovered={hoveredStates.exchange} />
          <p
            className={`${getGradientClass(hoveredStates.exchange)} text-[14px] transition-all duration-300 ease-out`}
          >
            Обмін
          </p>
        </Button>
      )}

      <Button
        variant="playerOption"
        className="pl-[25%]"
        onMouseEnter={() => handleMouseEnter('report')}
        onMouseLeave={() => handleMouseLeave('report')}
        size="widthFull"
      >
        <BellIcon isHovered={hoveredStates.report} />
        <p
          className={`${getGradientClass(hoveredStates.report)} text-[14px] transition-all duration-300 ease-out`}
        >
          Репорт
        </p>
      </Button>
    </div>
  );
};
