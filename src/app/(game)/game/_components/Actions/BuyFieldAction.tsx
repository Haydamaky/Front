import { Button } from '@/components/ui/button';
import useScreenSize from '@/hooks/screenSize';
import HintBulb from '../HintBulb';

interface BuyFieldActionProps {
  fieldPrice: number;
  onBuyField: () => void;
  onPutUpForAuction: () => void;
}

const BuyFieldAction = ({
  fieldPrice,
  onBuyField,
  onPutUpForAuction,
}: BuyFieldActionProps) => {
  const screenSize = useScreenSize();

  return (
    <>
      <div className="mb-3 flex w-full items-center gap-2 font-fixelDisplay">
        <div className="flex h-6 items-center justify-center gap-1 rounded-md bg-gradient-to-r from-[#FBD07C] to-[#F7F779] px-1 text-[#19376D]">
          <div className="h-5 w-5">
            <HintBulb />
          </div>
        </div>
        <p className="text-[10px]">
          If you cancel the purchase, the field will be put up for auction.
        </p>
      </div>
      <div className="flex w-full gap-1 lg:gap-4">
        <Button
          variant={'blueGame'}
          size={screenSize.width > 1200 ? 'default' : 'xs'}
          className="font-custom text-[9px] text-white md:text-sm lg:text-lg"
          onClick={onBuyField}
        >
          Buy for {fieldPrice}
        </Button>
        <div
          className={`flex h-[38px] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-buttonBlueGradient px-[1px]`}
        >
          <Button
            variant={'gameDarkBlue'}
            onClick={onPutUpForAuction}
            size={screenSize.width > 1200 ? 'default' : 'xs'}
            className="font-custom"
          >
            <p className="bg-[linear-gradient(184.39deg,#5AB2F7_4.38%,#12CFF3_97.25%)] bg-clip-text text-4xl text-[9px] font-bold text-transparent md:text-sm lg:text-lg">
              Put up for auction
            </p>
          </Button>
        </div>
      </div>
    </>
  );
};

export default BuyFieldAction;
