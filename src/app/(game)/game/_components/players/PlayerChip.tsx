import { Player } from '@/types/player';
import { use, useEffect, useRef, useState } from 'react';

interface PlayerChipProps {
  posOfPlayer: string;
  translate: string;
  colorOfPlayer: string;
  colorOfPlayerDarker: string;
  beforeToPos: string | boolean;
}

const PlayerChip = ({
  posOfPlayer,
  translate,
  colorOfPlayer,
  colorOfPlayerDarker,
  beforeToPos,
}: PlayerChipProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [posToGo, setPosToGo] = useState<string>(
    typeof beforeToPos === 'string' ? beforeToPos : posOfPlayer,
  );
  const handleSequentialUpdates = async () => {
    if (beforeToPos) {
      setPosToGo(beforeToPos as string);
      await waitForTransition(elementRef.current);
      setPosToGo(posOfPlayer);
    } else {
      setPosToGo(posOfPlayer);
    }
  };
  useEffect(() => {
    handleSequentialUpdates();
  }, [posOfPlayer]);
  const waitForTransition = (element: HTMLElement | null): Promise<void> => {
    return new Promise(resolve => {
      if (element) {
        const handleTransitionEnd = () => {
          element.removeEventListener('transitionend', handleTransitionEnd);
          resolve();
        };
        element.addEventListener('transitionend', handleTransitionEnd);
      } else {
        resolve();
      }
    });
  };
  return (
    <div
      ref={elementRef}
      style={{ transform: `${translate}` }}
      className={`${colorOfPlayerDarker} absolute shadow-combined ${posToGo} flex h-3 w-3 items-center justify-center rounded-full transition-all duration-1000 lg:h-6 lg:w-6`}
    >
      <div
        className={`${colorOfPlayer} z-20 h-2 w-2 rounded-full border border-[#FBFBFA] lg:h-[1.15rem] lg:w-[1.15rem]`}
      ></div>
    </div>
  );
};

export default PlayerChip;