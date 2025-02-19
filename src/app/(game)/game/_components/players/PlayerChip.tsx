import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setChipTransition } from '@/store/slices/chipTransition';
import { useEffect, useRef, useState } from 'react';

interface PlayerChipProps {
  posOfPlayer: string;
  translate: string;
  colorOfPlayer: string;
  colorOfPlayerDarker: string;
  beforeToPositions: string[];
  dices: string;
}

const PlayerChip = ({
  posOfPlayer,
  translate,
  colorOfPlayer,
  colorOfPlayerDarker,
  beforeToPositions,
  dices,
}: PlayerChipProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [posToGo, setPosToGo] = useState<string>(
    beforeToPositions.length ? beforeToPositions[0] : posOfPlayer,
  );
  const dispatch = useAppDispatch();
  const handleSequentialUpdates = async () => {
    if (beforeToPositions.length) {
      dispatch(setChipTransition(true));
      for (const beforeToPos of beforeToPositions) {
        setPosToGo(beforeToPos);
        await waitForTransition(elementRef.current);
      }
      setPosToGo(posOfPlayer);
      await waitForTransition(elementRef.current);
      setTimeout(
        () => dispatch(setChipTransition(false)),
        beforeToPositions.length * 1000,
      );
    } else {
      dispatch(setChipTransition(true));
      setPosToGo(posOfPlayer);
      await waitForTransition(elementRef.current);
      dispatch(setChipTransition(false));
    }
  };
  useEffect(() => {
    if (dices !== '0:0') {
      handleSequentialUpdates();
    }
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
      style={{ transform: `${translate}`, transitionDuration: '1000ms' }}
      className={`${colorOfPlayerDarker} pointer-events-none absolute shadow-combined ${posToGo} flex h-[3.3%] w-[3.3%] items-center justify-center rounded-full transition-all`}
    >
      <div
        className={`${colorOfPlayer} z-20 h-[78%] w-[78%] rounded-full border border-[#FBFBFA]`}
      ></div>
    </div>
  );
};

export default PlayerChip;
