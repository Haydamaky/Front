import { useRef } from 'react';
import styles from './Dice.module.css';
import { defaultTransform, spinTransform } from './transforms';

interface DiceProps {
  diceNum: number;
  afterAnimation?: null | (() => void);
  id: number;
}

const Dice = ({ afterAnimation, diceNum, id }: DiceProps) => {
  const diceRef = useRef<HTMLDivElement>(null);
  const indexOfTransform = diceNum - 1;
  const spinningTransform = spinTransform[indexOfTransform];
  const finalTransform = defaultTransform[indexOfTransform];
  const animationStyles = `
    @keyframes rolling-${id} {
      100% {
        transform: ${spinningTransform};
      }
    }
  `;
  const handleAnimationEnd = () => {
    if (diceRef.current) {
      diceRef.current.style.animation = '';
      diceRef.current.style.transform = finalTransform;
      if (afterAnimation) afterAnimation();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <style>{animationStyles}</style>
      <div
        className={styles.dice}
        style={{ animation: `rolling-${id} 800ms ease-out` }}
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
