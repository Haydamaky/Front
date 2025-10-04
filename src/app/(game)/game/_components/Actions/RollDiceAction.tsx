import { Button } from '@/components/ui/button';
import useScreenSize from '@/hooks/screenSize';
import HintBulb from '../HintBulb';

interface RollDiceActionProps {
  onRollDice: () => void;
}

const RollDiceAction = ({ onRollDice }: RollDiceActionProps) => {
  const screenSize = useScreenSize();

  return (
    <>
      <div className="mb-3 flex w-full items-center gap-2 font-fixelDisplay">
        <div className="flex h-6 items-center justify-center gap-1 rounded-md bg-gradient-to-r from-[#FBD07C] to-[#F7F779] px-2 text-[#19376D]">
          <div className="h-5 w-5">
            <HintBulb />
          </div>
          <p className="text-xs">Tip</p>
        </div>
        <p className="text-[10px]">
          Remember: sometimes it's better to save money than to
          spend it on everything that happens.
        </p>
      </div>
      <Button
        variant={'blueGame'}
        size={screenSize.width > 1200 ? 'default' : 'xs'}
        className="font-custom text-[9px] text-white md:text-sm lg:text-lg"
        onClick={onRollDice}
      >
        Roll Dice
      </Button>
    </>
  );
};

export default RollDiceAction;
