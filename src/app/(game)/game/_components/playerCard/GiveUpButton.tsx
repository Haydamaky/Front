import { Button } from '@/components/ui/button';
import { useDisclosure } from '@heroui/modal';
import SurrenderConfirmation from '../SurrenderConfirmation';
import { setSurrenderModalOpen } from '@/store/slices/modalOpen';
import { useAppDispatch } from '@/hooks/store';

interface GiveUpButtonProps {
  opacity: string;
  lost: boolean;
  isPlayerClicked: boolean;
}

const GiveUpButton = ({
  opacity,
  lost,
  isPlayerClicked,
}: GiveUpButtonProps) => {
  const { isOpen, onOpenChange: onOpenChangeNative } = useDisclosure();
  const dispatch = useAppDispatch();
  const onOpen = () => {
    dispatch(setSurrenderModalOpen(true));
  };
  const onClose = () => {
    setTimeout(() => {
      dispatch(setSurrenderModalOpen(false));
    }, 0);
  };
  const onOpenChange = () => {
    if (!isPlayerClicked && !isOpen) return;
    onOpenChangeNative();
    if (!isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };
  return (
    <>
      {!lost && (
        <>
          <Button
            className={`${opacity}`}
            variant={'close'}
            size={'widthFull'}
            onClick={onOpenChange}
          >
            <div className="mx-auto flex w-[60%] cursor-pointer items-center gap-1">
              <div className="relative flex h-6 w-6 items-center justify-center">
                <span className="absolute h-0.5 w-[70%] rotate-45 bg-[#FF8C8C]"></span>
                <span className="absolute h-0.5 w-[70%] -rotate-45 bg-[#FF8C8C]"></span>
              </div>
              <p className="text-sm">Surrender</p>
            </div>
          </Button>
          <SurrenderConfirmation isOpen={isOpen} onOpenChange={onOpenChange} />
        </>
      )}
    </>
  );
};

export default GiveUpButton;
