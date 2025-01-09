import { useEffect, useRef, useState } from 'react';

interface PlayerChipProps {
  posOfPlayer: string;
  translate: string;
  colorOfPlayer: string;
  colorOfPlayerDarker: string;
  beforeToPositions: string[];
}

const PlayerChip = ({
  posOfPlayer,
  translate,
  colorOfPlayer,
  colorOfPlayerDarker,
  beforeToPositions,
}: PlayerChipProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [posToGo, setPosToGo] = useState<string>(
    beforeToPositions.length ? beforeToPositions[0] : posOfPlayer,
  );

  const handleSequentialUpdates = async () => {
    if (beforeToPositions.length) {
      for (const beforeToPos of beforeToPositions) {
        setPosToGo(beforeToPos);
        await waitForTransition(elementRef.current);
      }
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
      className={`${colorOfPlayerDarker} absolute shadow-combined ${posToGo} flex h-[3.3%] w-[3.3%] items-center justify-center rounded-full transition-all duration-1000`}
    >
      <div
        className={`${colorOfPlayer} z-20 h-[78%] w-[78%] rounded-full border border-[#FBFBFA]`}
      ></div>
    </div>
  );
};

export default PlayerChip;
