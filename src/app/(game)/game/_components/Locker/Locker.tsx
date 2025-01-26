import styles from './Locker.module.css';

interface LockerProps {
  toOpen: boolean;
  handleOpen: (toOpen: boolean) => void;
}

const Locker = ({ toOpen, handleOpen }: LockerProps) => {
  const animationStyles = `
    @keyframes close {
  0%,
  10% {
    transform: translate(0%, 0%);
  }
  80%,
  100% {
    transform: translate(0%, 60%);
  }
}

@keyframes open {
  0%,
  10% {
    transform: translate(0%, 60%);
  }
  70%,
  100% {
    transform: translate(0%, 0%);
  }
}

@keyframes wiggle {
  0% {
    transform: rotate(0);
  }
  40% {
    transform: rotate(0);
  }
  50%,
  70% {
    transform: rotate(10deg);
  }
  60%,
  80% {
    transform: rotate(-10deg);
  }
  90%,
  100% {
    transform: rotate(0);
  }
}
  `;
  return (
    <div className="absolute left-[44%] top-[50%] h-[50%] w-[55%] translate-x-[-50%] translate-y-[-50%]">
      <style>{animationStyles}</style>
      <div
        className={styles.lock}
        style={{
          animation: toOpen ? 'wiggle 1.7s forwards' : '',
        }}
      >
        <div
          className={styles.arc}
          style={{
            animation: toOpen ? 'close 1.7s forwards' : 'open 0.7s forwards',
          }}
          onAnimationEnd={() => {
            if (!toOpen) {
              handleOpen(false);
            }
          }}
        ></div>
        <div
          className={styles.lockerLine}
          style={{
            animation: toOpen ? 'close 1.7s forwards' : 'open 0.7s forwards',
          }}
        ></div>
        <div className={styles.keyhole}></div>
      </div>
    </div>
  );
};

export default Locker;
