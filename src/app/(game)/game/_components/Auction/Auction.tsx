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
import InspectField from '../InspectField';
import { useAppSelector } from '@/hooks/store';
import { Progress } from '@heroui/progress';
import ProgressBar from './ProgressBar';
import Message from '../Chat/message';

const Auction: FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const fields = useAppSelector(state => state.fields.fields);
  const players = useAppSelector(state => state.game.game.players);

  return (
    <>
      <Button onClick={onOpen}>Open</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        hideCloseButton
        backdrop="blur"
        size="5xl"
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
              <ModalBody className="mt-6 grid w-full grid-cols-[18%_54%_28%] flex-row justify-between overflow-hidden">
                <div className="w-fit">
                  <Players />
                </div>
                <div className="z-50 flex w-full flex-col items-center gap-4">
                  <ProgressBar />
                  <div className="scrollbar h-[50%] w-full overflow-y-auto">
                    <div className="flex flex-col gap-4 px-4">
                      {players.map(({ user, color }) => (
                        <Message
                          name={user?.nickname}
                          color={color}
                          text="готовий придбати поле за 3500 mm"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="z-50 flex min-w-fit flex-col items-center gap-4">
                  <span className="w-[80%] rounded-lg border-2 border-white bg-primaryGame p-2 px-2 text-center font-custom">
                    3 500 mm
                  </span>
                  <InspectField
                    field={fields[1] as any}
                    isAuction={true}
                    classNames=" w-[80%] h-fit"
                  />
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
