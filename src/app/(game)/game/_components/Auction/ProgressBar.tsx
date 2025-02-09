import { Progress } from '@heroui/progress';
import { FC, useEffect, useState } from 'react';
import styles from './styles.module.css';

interface ProgressBarProps {
  initialValue: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    let start: number | null = null;
    let animationFrameId: number;

    const updateProgress = (timestamp: number) => {
      if (!start) start = timestamp;

      const elapsed = (timestamp - start) / 1000; // Convert ms to seconds
      const newValue = Math.max(initialValue - elapsed, 0); // Prevent negative values

      setValue(newValue);

      if (newValue > 0) {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrameId);
  }, [initialValue]);

  return (
    <div className="flex w-[95%] flex-col items-center gap-2">
      <span className="mb-4 flex w-14 items-center justify-center rounded-lg border-2 border-white bg-primaryGame p-2 px-2 font-ermilov text-4xl">
        {Math.ceil(value)}
      </span>
      <Progress
        aria-label="Loading..."
        className={styles.bar}
        maxValue={60}
        minValue={0}
        value={value}
      />
    </div>
  );
};

export default ProgressBar;
