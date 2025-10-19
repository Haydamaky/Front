import { Button } from '@/components/ui/button';
import useScreenSize from '@/hooks/screenSize';

interface VDNHActionProps {
  amountToPay: number;
  onPay: () => void;
}

const VDNHAction = ({ amountToPay, onPay }: VDNHActionProps) => {
  const screenSize = useScreenSize();

  return (
    <>
      <div className="mb-3 flex w-full items-center gap-2 font-fixelDisplay">
        <p className="text-[10px]">
          You've come to the festival at VDNH! Fairs, attractions
          and delicious food - unforgettable impressions guaranteed!
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

export default VDNHAction;
