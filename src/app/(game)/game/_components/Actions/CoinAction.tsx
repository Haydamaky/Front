import { Button } from '@/components/ui/button';
import useScreenSize from '@/hooks/screenSize';

interface CoinActionProps {
  amountToPay: number;
  onPay: () => void;
}

const CoinAction = ({ amountToPay, onPay }: CoinActionProps) => {
  const screenSize = useScreenSize();

  return (
    <>
      <div className="mb-3 flex w-full items-center gap-2 font-fixelDisplay">
        <p className="text-[10px]">
          The state has decided that you live too luxuriously! Pay
          your taxes and maintain the balance in the game.
        </p>
      </div>
      <Button
        variant={'blueGame'}
        size={screenSize.width > 1200 ? 'default' : 'xs'}
        className="font-custom text-[9px] text-white md:text-sm lg:text-lg"
        onClick={onPay}
      >
        Pay {Math.abs(amountToPay)}
      </Button>
    </>
  );
};

export default CoinAction;
