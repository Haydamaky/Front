import { Progress } from '@heroui/progress';
import { FC, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { AuctionType } from '@/types/auction';

interface ProgressBarProps {
  auction: AuctionType | null;
}

const ProgressBar: FC<ProgressBarProps> = ({ auction }) => {
  const now = Date.now();
  const timeToEnd = Math.ceil((+(auction?.turnEnds ?? now) - now) / 1000);
  const [value, setValue] = useState(timeToEnd);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const animationId = useRef<number | null>(null);
  useEffect(() => {
    setStartTime(Date.now());
    if (animationId.current) cancelAnimationFrame(animationId.current);

    const updateProgress = () => {
      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) / 1000;
      const newValue = Math.max(timeToEnd - elapsed, 0);
      setValue(newValue);

      if (newValue > 0) {
        animationId.current = requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();

    return () => {
      if (animationId.current) cancelAnimationFrame(animationId.current);
    };
  }, [timeToEnd]);

  return (
    <div className="flex w-[95%] flex-col items-center gap-2">
      <span className="mb-4 flex w-14 items-center justify-center rounded-lg border-2 border-white bg-primaryGame p-2 px-2 font-ermilov text-4xl">
        {Math.ceil(value)}
      </span>
      <Progress
        aria-label="Loading..."
        className={styles.bar}
        maxValue={auction?.bidTimeSec || 30}
        minValue={0}
        value={value}
      />
    </div>
  );
};

export default ProgressBar;
