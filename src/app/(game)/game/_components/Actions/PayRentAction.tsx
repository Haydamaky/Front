import { Button } from '@/components/ui/button';
import useScreenSize from '@/hooks/screenSize';

interface PayRentActionProps {
  rentAmount: number;
  onPayRent: () => void;
}

const PayRentAction = ({ rentAmount, onPayRent }: PayRentActionProps) => {
  const screenSize = useScreenSize();

  return (
    <>
      <div className="mb-3 flex w-full items-center gap-2 font-fixelDisplay">
        <p className="text-[10px]">
          When you enter someone else's field, you are obliged to
          pay the owner a rent according to the value of this field.
        </p>
      </div>
      <Button
        variant={'blueGame'}
        size={screenSize.width > 1200 ? 'default' : 'xs'}
        className="font-custom text-[9px] text-white md:text-sm lg:text-lg"
        onClick={onPayRent}
      >
        Pay for rent {rentAmount}
      </Button>
    </>
  );
};

export default PayRentAction;
