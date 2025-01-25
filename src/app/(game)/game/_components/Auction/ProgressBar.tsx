import { Progress, useProgress } from '@heroui/progress';
import { FC, useEffect, useState } from 'react';
import styles from './styles.module.css';

const ProgressBar: FC = () => {
  const [value, setValue] = useState(15);

  useEffect(() => {
    const id = setInterval(() => {
      setValue(current => {
        if (current <= 1) {
          return 15;
        }
        return current - 1;
      });
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <span className="inline-flex w-fit rounded-lg border-2 border-white bg-primaryGame p-2 px-2 text-center font-ermilov text-4xl">
        {value.toFixed(0)}
      </span>
      <Progress
        aria-label="Loading..."
        className={styles.bar}
        maxValue={15}
        minValue={0}
        defaultValue={15}
        value={value}
      />
    </div>
  );
};

export default ProgressBar;
