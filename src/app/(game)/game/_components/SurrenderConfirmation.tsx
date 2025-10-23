import { Button } from '@/components/ui/button';
import { Modal, ModalBody, ModalContent, ModalFooter } from '@heroui/modal';

function SurrenderConfirmation({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        size="lg"
        onOpenChange={onOpenChange}
        hideCloseButton
        classNames={{ base: 'h-[15vh]' }}
        scrollBehavior={'inside'}
        backdrop="blur"
      >
        <ModalContent>
          {onClose => (
            <div className="flex h-full flex-col justify-between rounded-xl bg-gameCenterModal px-8 py-6 text-xs text-white shadow-gameCenterModaShadowCombined">
              <ModalBody className="h-full justify-center p-0">
                <div className="mb-6 flex w-full items-center justify-center font-ermilov">
                  <h1 className="text-nowrap text-xl">
                    Are you sure that you want to surrender?
                  </h1>
                </div>
              </ModalBody>
              <ModalFooter className="flex gap-8 p-0">
                <Button
                  variant={'blueGame'}
                  onClick={onClose}
                  className="h-[34px] font-custom text-[9px] text-white md:text-sm lg:text-lg"
                >
                  Cancel
                </Button>
                <div
                  onClick={onClose}
                  className="w-full rounded-md bg-redGradient p-[1px]"
                >
                  <Button
                    variant="forGradient"
                    className="h-8 rounded-md font-custom"
                  >
                    <p className="bg-[linear-gradient(180deg,#FB3B47_27.27%,#DA0C1C_240.91%)] bg-clip-text text-[9px] text-transparent lg:text-lg">
                      Surrender
                    </p>
                  </Button>
                </div>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default SurrenderConfirmation;
