import { Button } from '@/components/ui/button';
import { socket } from '@/socket';

interface GiveUpButtonProps {
  opacity: string;
  lost: boolean;
}

const GiveUpButton = ({ opacity, lost }: GiveUpButtonProps) => {
  const handleClick = () => {
    socket.emit('surrender');
  };
  return (
    <>
      {!lost && (
        <Button
          className={`${opacity}`}
          variant={'close'}
          size={'widthFull'}
          onClick={handleClick}
        >
          <div className="mx-auto flex w-[60%] cursor-pointer items-center gap-1">
            <div className="relative flex h-6 w-6 items-center justify-center">
              <span className="absolute h-0.5 w-[70%] rotate-45 bg-[#FF8C8C]"></span>
              <span className="absolute h-0.5 w-[70%] -rotate-45 bg-[#FF8C8C]"></span>
            </div>
            <p className="text-sm">Здатись</p>
          </div>
        </Button>
      )}
    </>
  );
};

export default GiveUpButton;
