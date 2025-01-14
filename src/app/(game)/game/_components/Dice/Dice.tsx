import { useEffect, useRef, useState } from 'react';
import styles from './Dice.module.css';
import { defaultTransform, spinTransform } from './transforms';
import { useAppDispatch } from '@/hooks/store';
import { socket } from '@/socket';
import { Game } from '@/types';
import { setGame } from '@/store/slices/game';

interface DiceProps {
  diceNumber: number;
  rollindId: string;
}

const Dice = ({ diceNumber, rollindId }: DiceProps) => {
  const diceRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const indexOfTransform = diceNumber - 1;
  const spinningTransform = spinTransform[indexOfTransform];
  const finalTransform = defaultTransform[indexOfTransform];
  const animationStyles = `
    @keyframes rolling-${rollindId} {
      100% {
        transform: ${spinningTransform};
      }
    }
  `;
  const [localGameAfterDiceRoll, setLocalGameAfterDiceRoll] =
    useState<null | Game>(null);
  useEffect(() => {
    const handleRollDiced = (data: any) => {
      setLocalGameAfterDiceRoll(data.game);
    };

    socket.on('rolledDice', handleRollDiced);
    return () => {
      socket.off('rolledDice', handleRollDiced);
    };
  }, []);
  const handleAnimationEnd = () => {
    if (diceRef.current) {
      diceRef.current.style.animation = '';
      diceRef.current.style.transform = finalTransform;
      if (localGameAfterDiceRoll) dispatch(setGame(localGameAfterDiceRoll));
    }
  };
  return (
    <div className="flex flex-col items-center">
      <style>{animationStyles}</style>
      <div
        className={styles.dice}
        style={{ animation: `rolling-${rollindId} 4000ms ease-out` }}
        ref={diceRef}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className={`${styles.face} ${styles.front}`}></div>
        <div className={`${styles.face} ${styles.back}`}></div>
        <div className={`${styles.face} ${styles.top}`}></div>
        <div className={`${styles.face} ${styles.bottom}`}></div>
        <div className={`${styles.face} ${styles.right}`}></div>
        <div className={`${styles.face} ${styles.left}`}></div>
      </div>
    </div>
  );
};

export default Dice;
