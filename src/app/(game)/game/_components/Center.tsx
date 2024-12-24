import MutualChat from '@/app/(home)/rooms/_components/MutualChat';
import { Button } from '@/components/ui/button';
import { genFont, titleFont } from '@/config/fonts';
import useScreenSize from '@/hooks/screenSize';

const Center = () => {
  const screenSize = useScreenSize();
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="mx-6 mt-6 flex h-1/4 flex-col items-center justify-between rounded-md bg-[#FBFBFA] py-2 text-xs text-primary lg:py-3">
        <div className="text-small md:text-standard lg:text-lg xl:text-2xl">
          Ваш хід
        </div>
        <Button
          size={screenSize.width > 1200 ? 'default' : 'xs'}
          className="font-custom text-[9px] text-white md:text-sm lg:text-lg"
        >
          Кинути кубики
        </Button>
      </div>

      <div>Chat</div>
    </div>
  );
};

export default Center;
