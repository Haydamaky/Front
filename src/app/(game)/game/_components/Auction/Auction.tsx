import bgImage from '@/../public/images/AuctionBG.svg';
import { useAppSelector } from '@/hooks/store';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/modal';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import Message from '../Chat/message';
import InfoField from '../InfoField';
import Players from './Players';
import ProgressBar from './ProgressBar';
import { Button } from '@/components/ui/button';
import { gradientColorVariants } from '../../_utils';
import { Field } from '@/types/field';
import { AuctionType } from '@/types/auction';
import { socket } from '@/socket';

interface AuctionProps {
  isOpen: boolean;
  currentField: Field;
  auction: AuctionType | null;
  defaultOpen: boolean;
}

const Auction = ({
  isOpen,
  currentField,
  auction,
  defaultOpen,
}: AuctionProps) => {
  const players = useAppSelector(state => state.game.game.players);
  console.log({ auction });
  return (
    <>
      <Modal
        isOpen={isOpen}
        defaultOpen={defaultOpen}
        isDismissable={false}
        hideCloseButton
        scrollBehavior={'inside'}
        backdrop="blur"
      >
        <ModalContent className="relative flex h-[90vh] w-[100vh] max-w-none flex-col rounded-xl bg-bgDark p-2">
          {onClose => (
            <>
              <Image
                fill={true}
                src={bgImage}
                priority={true}
                alt=""
                className="rounded-xl shadow-gameCenterModaShadowCombined"
                style={{
                  objectFit: 'cover',
                }}
              />
              <ModalHeader className="z-50 flex flex-row justify-center gap-1">
                <h1 className="uppercase text-white md:text-2xl lg:text-4xl xl:text-5xl">
                  Аукціон
                </h1>
              </ModalHeader>
              <ModalBody className="h-full gap-0 overflow-hidden">
                <div className="mt-6 grid h-full min-h-0 w-full min-w-0 grid-cols-[14%_58%_30%] gap-0 px-0 py-0">
                  <Players refusedIds={auction?.usersRefused || []} />
                  <div className="z-50 mx-10 flex h-[61vh] flex-col items-center gap-4">
                    <ProgressBar />
                    <div className="scrollbar flex h-[45%] w-[80%] justify-center overflow-y-auto pt-4">
                      <div className="flex flex-col gap-4">
                        {players.map(player => {
                          return (
                            <>
                              <Message
                                name={player.user?.nickname}
                                color={gradientColorVariants[player?.color]}
                                text="готовий придбати поле за 3500 mm"
                              />
                            </>
                          );
                        })}
                      </div>
                    </div>
                    <div className="mt-auto h-[20%] w-full">
                      <h3>Обери суму для підвищення ставки</h3>
                      <div className="mt-3 flex w-full justify-between gap-4">
                        <Button
                          variant={'blueGame'}
                          size={'default'}
                          className="font-namu text-[9px] text-white md:text-sm lg:text-lg"
                        >
                          100 mm
                        </Button>
                        <Button
                          variant={'blueGame'}
                          size={'default'}
                          className="font-namu text-[9px] text-white md:text-sm lg:text-lg"
                        >
                          200 mm
                        </Button>
                        <Button
                          variant={'blueGame'}
                          size={'default'}
                          className="font-namu text-[9px] text-white md:text-sm lg:text-lg"
                        >
                          500 mm
                        </Button>
                        <Button
                          variant={'blueGame'}
                          size={'default'}
                          className="font-namu text-[9px] text-white md:text-sm lg:text-lg"
                        >
                          1000 mm
                        </Button>
                      </div>
                      <div className="mt-4 flex w-full items-center gap-2">
                        <div className="h-8 w-[25%] rounded-[3px] bg-darkBlueGradient p-[1px]">
                          <input
                            placeholder="Ваша Сума"
                            type="text"
                            className="placeholder: placeholder: placeholder: h-[30px] w-full rounded-[3px] border-none bg-[#173b7c] placeholder:pl-2 placeholder:font-fixelDisplay placeholder:text-sm placeholder:font-bold placeholder:text-white"
                          />
                        </div>
                        <div className="w-8">
                          <Button
                            variant={'blueGame'}
                            size={'widthFull'}
                            className="h-8"
                          >
                            <Image
                              src="/images/Hammer.svg"
                              alt="hammer"
                              width={20}
                              height={20}
                            />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="z-50 mr-4 flex min-h-0 min-w-0 flex-col">
                    <h1 className="min-w-0 text-center font-ermilov text-[18px]">
                      Фінальна ціна лоту
                    </h1>
                    <span className="my-2 min-w-0 rounded-lg border-2 border-white bg-primaryGame p-2 text-center font-namu text-2xl">
                      {auction?.bidders[auction.bidders.length - 1].bid ||
                        currentField.price}{' '}
                      mm
                    </span>

                    <InfoField field={currentField} />
                    <div className="w-full translate-y-[200%] rounded-[3px] bg-redGradient p-[1px]">
                      <Button
                        variant="forGradient"
                        size="inspectField"
                        className="py-3 font-custom text-sm uppercase"
                      >
                        Відмовитись
                      </Button>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Auction;
