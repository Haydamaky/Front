import { FC } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/modal';
import { Button } from '@nextui-org/react';
import bgImage from '@/../public/images/AuctionBG.svg';
import Image from 'next/image';
import Players from './Players';

const Auction: FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  console.log(isOpen);

  return (
    <>
      <Button onClick={onOpen}>Open</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        hideCloseButton
        backdrop="blur"
        className="h-1/2 w-1/2"
        size="5xl"
        shouldBlockScroll={true}
      >
        <ModalContent className="bg-bgDark relative flex h-[81%] flex-col p-2">
          {onClose => (
            <>
              <Image
                fill={true}
                src={bgImage}
                priority={true}
                alt=""
                style={{
                  objectFit: 'cover',
                }}
              />
              <ModalHeader className="z-50 flex flex-row justify-center gap-1">
                <h1 className="uppercase text-white md:text-2xl lg:text-4xl xl:text-5xl">
                  {' '}
                  Аукціон
                </h1>
              </ModalHeader>
              <ModalBody className="z-50 mt-6 flex flex-row">
                <div className="w-[15%]">
                  <Players />
                </div>
              </ModalBody>
              <ModalFooter className="z-50">
                <Button
                  onClick={onClose}
                  className="rounded-lg border-2 border-red-600 bg-transparent px-10 font-custom uppercase text-white"
                >
                  Відмовитись
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Auction;
