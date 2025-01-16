import { useEffect, useRef, useState } from 'react';
import styles from './Dice.module.css';
import { defaultTransform, spinTransform } from './transforms';
import { useAppDispatch } from '@/hooks/store';
import { socket } from '@/socket';
import { Game } from '@/types';
import { setGame } from '@/store/slices/game';
import { Field } from '@/types/field';
import { setFields } from '@/store/slices/fields';

const Dice = () => {
  const dispatch = useAppDispatch();

  const [localGameAfterDiceRoll, setLocalGameAfterDiceRoll] =
    useState<null | Game>(null);
  const [localFields, setLocalFields] = useState<Field[]>([]);
  useEffect(() => {
    const handleRollDiced = (data: any) => {
      setLocalGameAfterDiceRoll(data.game);
      setLocalFields(data.fields);
    };
    const handlePassTurnToNext = (data: any) => {
      setLocalGameAfterDiceRoll(null);
    };
    socket.on('passTurnToNext', handlePassTurnToNext);
    socket.on('rolledDice', handleRollDiced);
    return () => {
      socket.off('rolledDice', handleRollDiced);
      socket.off('passTurnToNext', handlePassTurnToNext);
    };
  }, []);
  let dicesArrStr: string[];
  if (localGameAfterDiceRoll?.dices) {
    dicesArrStr = localGameAfterDiceRoll.dices.split(':');
  } else {
    dicesArrStr = [];
  }
  const diceNumbArr = dicesArrStr.map(Number);
  const diceRef = useRef<HTMLDivElement>(null);
  const indexOfTransform = diceNumbArr[1] - 1;
  const spinningTransform = spinTransform[indexOfTransform];
  const finalTransform = defaultTransform[indexOfTransform];
  const id = Math.random();
  const animationStyles = `
    @keyframes rolling-${'1'} {
      100% {
        transform: ${spinningTransform};
      }
    }
  `;
  const handleAnimationEnd = () => {
    if (diceRef.current) {
      diceRef.current.style.animation = '';
      diceRef.current.style.transform = finalTransform;
      if (localGameAfterDiceRoll) {
        dispatch(setGame(localGameAfterDiceRoll));
        dispatch(setFields(localFields));
      }
    }
  };
  if (!localGameAfterDiceRoll) return;
  console.log({ localGameAfterDiceRoll, id });
  return (
    <div className="flex flex-col items-center">
      <style>{animationStyles}</style>
      <div
        className={styles.dice}
        style={{ animation: `rolling-${'1'} 4000ms ease-out` }}
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
