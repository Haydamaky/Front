import { useEffect } from 'react';
import Locker from '../Locker/Locker';

interface PledgeCounterProps {
  count: number | null;
  toOpen: boolean;
  line: string;
  handleOpen: (toOpen: boolean) => void;
}
const PledgeCounter = ({
  toOpen,
  count,
  line,
  handleOpen,
}: PledgeCounterProps) => {
  const positions: Record<string, string> = {
    'vertical-left':
      'top-[50%] right-[-13%] h-[35%] w-[29.8%] translate-y-[-50%] -rotate-90',
    'vertical-right':
      'top-[50%] left-[-13%] h-[35%] w-[29.8%] translate-y-[-50%] rotate-90',
    'horizontal-top':
      'left-[50%] bottom-[-10%] h-[18%] w-[60%] translate-x-[-50%]',
    'horizontal-bottom':
      'left-[50%] top-[-10%] h-[18%] w-[60%] translate-x-[-50%]',
  };
  useEffect(() => {
    handleOpen(true);
  }, []);
  const position = positions[line];
  return (
    <div className={`absolute z-10 ${position}`}>
      <div className="relative h-full w-[62%] rounded-[100%] bg-[#C1121F]">
        <Locker toOpen={toOpen} handleOpen={handleOpen}></Locker>
        <div className="absolute left-[80%] top-[50%] flex h-[60%] w-[75%] translate-y-[-50%] items-center justify-center rounded-[20%] bg-[#C1121F] font-namu text-xs text-white">
          <p className="mb-[12%]">{count || ''}</p>
        </div>
      </div>
    </div>
  );
};

export default PledgeCounter;
