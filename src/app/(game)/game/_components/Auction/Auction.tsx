'use client';

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
import { api } from '@/api/build/api';

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
  const bidAmount = auction?.bidders.findLast(bidder => {
    return bidder.accepted && bidder.bid;
  });
  const raiseBid = (raiseBy: number) => {
    api.raisePrice({ raiseBy, bidAmount: bidAmount?.bid });
  };
  const [customBid, setCustomBid] = useState('');
  const handleCustomBidChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setCustomBid(value);
    }
  };

  const submitCustomBid = () => {
    const bidAmount = Number(customBid);
    if (bidAmount > 0) {
      api.raisePrice({ raiseBy: bidAmount });
      setCustomBid('');
    }
  };

  const onRefuseAuction = () => {
    api.refuseAuction();
  };
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
        <ModalContent className="relative flex h-[90vh] w-[100vh] max-w-none flex-col rounded-xl bg-bgAuction p-2 font-ermilov text-white">
          {_ => (
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
                  Auction
                </h1>
              </ModalHeader>
              <ModalBody className="h-full gap-0 overflow-hidden">
                <div className="mt-6 grid h-full min-h-0 w-full min-w-0 grid-cols-[14%_58%_30%] gap-0 px-0 py-0">
                  <Players refusedIds={auction?.usersRefused || []} />
                  <div className="z-50 mx-10 flex h-[61vh] flex-col items-center gap-4">
                    <ProgressBar auction={auction} />
                    <div className="scrollbar flex h-[45%] w-[80%] justify-center overflow-y-auto pt-4">
                      <div className="flex flex-col gap-4">
                        {auction?.bidders
                          .map(bidder => {
                            if (!bidder.userId) {
                              const playerThatPutOnAuction = players.find(
                                player =>
                                  player.userId === auction.usersRefused[0],
                              );
                              return (
                                <Message
                                  key={`${bidder.userId}:${bidder.bid}`}
                                  name={
                                    playerThatPutOnAuction?.user.nickname || ''
                                  }
                                  color={
                                    gradientColorVariants[
                                      playerThatPutOnAuction?.color || 'blue'
                                    ]
                                  }
                                  text="Puts the field up for auction"
                                />
                              );
                            }
                            if (
                              bidder.userId &&
                              bidder.accepted &&
                              bidder.bid >= 100
                            ) {
                              const playerThatMadeBid = players.find(
                                player => player.userId === bidder.userId,
                              );
                              return (
                                <Message
                                  key={`${bidder.userId}:${bidder.bid}`}
                                  name={playerThatMadeBid?.user.nickname || ''}
                                  color={
                                    gradientColorVariants[
                                      playerThatMadeBid?.color || 'blue'
                                    ]
                                  }
                                  text={`is ready to buy the field for ${bidder.bid}`}
                                />
                              );
                            }
                            if (
                              bidder.userId &&
                              bidder.accepted &&
                              bidder.bid === 0
                            ) {
                              const playerThatMadeBid = players.find(
                                player => player.userId === bidder.userId,
                              );
                              return (
                                <Message
                                  key={`${bidder.userId}:${bidder.bid}`}
                                  name={playerThatMadeBid?.user.nickname || ''}
                                  color={
                                    gradientColorVariants[
                                      playerThatMadeBid?.color || 'blue'
                                    ]
                                  }
                                  text="refuses to participate in the auction"
                                />
                              );
                            }
                          })
                          .reverse()}
                      </div>
                    </div>
                    <div className="mt-auto h-[20%] w-full">
                      <h3>Select an amount to raise the bid</h3>
                      <div className="mt-3 flex w-full justify-between gap-4">
                        <Button
                          variant={'blueGame'}
                          size={'default'}
                          onClick={() => {
                            raiseBid(100);
                          }}
                          className="font-namu text-[9px] text-white md:text-sm lg:text-lg"
                        >
                          100 mm
                        </Button>
                        <Button
                          variant={'blueGame'}
                          size={'default'}
                          onClick={() => {
                            raiseBid(200);
                          }}
                          className="font-namu text-[9px] text-white md:text-sm lg:text-lg"
                        >
                          200 mm
                        </Button>
                        <Button
                          variant={'blueGame'}
                          size={'default'}
                          onClick={() => {
                            raiseBid(500);
                          }}
                          className="font-namu text-[9px] text-white md:text-sm lg:text-lg"
                        >
                          500 mm
                        </Button>
                        <Button
                          variant={'blueGame'}
                          size={'default'}
                          onClick={() => {
                            raiseBid(1000);
                          }}
                          className="font-namu text-[9px] text-white md:text-sm lg:text-lg"
                        >
                          1000 mm
                        </Button>
                      </div>
                      <div className="mt-4 flex w-full items-center gap-2">
                        <div className="h-8 w-[25%] rounded-[3px] bg-darkBlueGradient p-[1px]">
                          <input
                            placeholder="Your Amount"
                            onChange={handleCustomBidChange}
                            value={customBid}
                            type="text"
                            className="placeholder: placeholder: placeholder: h-[30px] w-full rounded-[3px] border-none bg-[#173b7c] placeholder:pl-2 placeholder:font-fixelDisplay placeholder:text-sm placeholder:font-bold placeholder:text-white"
                          />
                        </div>
                        <div className="w-8">
                          <Button
                            variant={'blueGame'}
                            size={'widthFull'}
                            onClick={submitCustomBid}
                            disabled={!customBid || Number(customBid) <= 0}
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
                      Final Lot Price
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
                        onClick={onRefuseAuction}
                        size="inspectField"
                        className="py-3 font-custom text-sm uppercase"
                      >
                        Refuse
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
