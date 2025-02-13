import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setTrade } from '@/store/slices/trade';
import bgTradeImage from '@/../public/images/bgTrade.svg';
import Image from 'next/image';
import { PlayerColor } from '@/types/player';
import { gradientColorVariants } from '../../_utils';
import { useState } from 'react';
import { TradeData } from '@/types/trade';
import { Button } from '@/components/ui/button';

const Trade = () => {
  const dispatch = useAppDispatch();
  const fields = useAppSelector(state => state.fields.fields);
  const game = useAppSelector(state => state.game.game);
  const { data: trade } = useAppSelector(state => state.trade);
  const { data: user } = useAppSelector(state => state.user);
  const handleTrade = () => {
    dispatch(setTrade(null));
  };
  const [firstExtraPay, setFirstExtraPay] = useState<number | string>('');
  const [secondExtraPay, setSecondExtraPay] = useState<number | string>('');
  const currentPlayer = game.players.find(player => player.userId === user?.id);
  const toPlayer = game.players.find(
    player => player.userId === trade?.toUserId,
  );
  const colorOfCurrentPlayer =
    gradientColorVariants[
      currentPlayer?.color as Exclude<PlayerColor, 'pink' | 'red'>
    ];
  const colorToPlayer =
    gradientColorVariants[
      toPlayer?.color as Exclude<PlayerColor, 'pink' | 'red'>
    ];
  const handleChangeFirstPay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFirstExtraPay(newValue === '' ? '' : Number(newValue));
  };
  const handleChangeSecondPay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSecondExtraPay(newValue === '' ? '' : Number(newValue));
  };
  return (
    <div className="absolute left-[1.5%] top-[1.5%] z-40 h-[97%] w-[97%] rounded-xl bg-primaryGame font-ermilov text-xs text-white shadow-gameCenterModaShadowCombined">
      <Image
        fill={true}
        src={bgTradeImage}
        priority={true}
        alt=""
        className="-z-10 rounded-xl opacity-50"
        style={{
          objectFit: 'cover',
        }}
      />
      <div className="flex h-[10%] w-full items-center justify-center">
        <h1 className="text-4xl">Договір</h1>
        <div
          className="absolute right-[4%] top-[2%] h-8 w-8 cursor-pointer"
          aria-label="Close"
          onClick={handleTrade}
        >
          <div className="absolute left-0 top-1/2 h-[2px] w-8 -translate-y-1/2 rotate-45 rounded-md bg-red-500" />
          <div className="absolute left-0 top-1/2 h-[2px] w-8 -translate-y-1/2 -rotate-45 rounded-md bg-red-500" />
        </div>
      </div>
      <div className="mt-2 flex h-[65%] w-full px-6">
        <div className="flex h-full w-full">
          <div className="grid w-[49.7%] grid-cols-[57fr_43fr] gap-5">
            <div className="flex flex-col justify-between overflow-y-auto">
              <div
                className="flex items-center justify-center rounded-sm text-center text-lg"
                style={{
                  background: colorOfCurrentPlayer,
                }}
              >
                <h2 className="mb-[2px] py-1">{user?.nickname}</h2>
              </div>
              {/* try to play around with gap */}
              <div className="flex h-[68%] flex-col gap-1 overflow-y-auto scrollbar-hide">
                {trade?.offerFieldsIndexes.map(offeredFieldIndex => {
                  const offeredField = fields.find(
                    field => field.index === offeredFieldIndex,
                  );
                  const isHorizontal =
                    offeredField?.line.includes('horizontal');
                  const rotate = isHorizontal ? 'rotate-90' : '';
                  return (
                    <div className="relative min-h-[6.5vh] bg-white">
                      <div
                        className={`absolute left-[50%] top-[50%] h-[10vh] w-[10vh] translate-x-[-50%] translate-y-[-50%] ${rotate}`}
                      >
                        <Image
                          src={offeredField?.imageUrl || ''}
                          className=""
                          alt="field-Image"
                          fill
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="firstExtraPay" className="text-lg font-medium">
                  Доплата
                </label>
                <input
                  id="firstExtraPay"
                  type="number"
                  value={firstExtraPay}
                  onKeyDown={e => {
                    if (
                      e.key === 'e' ||
                      e.key === 'E' ||
                      e.key === '+' ||
                      e.key === '-' ||
                      e.key === '.'
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onChange={handleChangeFirstPay}
                  style={{ color: '' }}
                  className="w-[80%] rounded-sm border-1 border-white bg-transparent px-1 py-[2px] text-xs placeholder-white placeholder-opacity-50"
                  placeholder="Введіть суму"
                />
              </div>
            </div>

            <div>
              <h2 className="mt-1 text-lg">Пропонує:</h2>
            </div>
          </div>
          <div className="mx-5 w-[0.6%] rounded-full bg-white"></div>
          <div className="grid w-[49.7%] grid-cols-[57fr_43fr] gap-5">
            <div className="flex flex-col justify-between overflow-y-auto">
              <div
                className="flex items-center justify-center rounded-sm text-center text-lg"
                style={{
                  background: colorToPlayer,
                }}
              >
                <h2 className="mb-[2px] py-1">{toPlayer?.user.nickname}</h2>
              </div>
              {/* try to play around with gap */}
              <div className="flex h-[68%] flex-col gap-1 overflow-y-auto scrollbar-hide">
                {trade?.wantedFieldsIndexes.map(offeredFieldIndex => {
                  const offeredField = fields.find(
                    field => field.index === offeredFieldIndex,
                  );
                  const isHorizontal =
                    offeredField?.line.includes('horizontal');
                  const rotate = isHorizontal ? 'rotate-90' : '';
                  return (
                    <div className="relative min-h-[6.5vh] bg-white">
                      <div
                        className={`absolute left-[50%] top-[50%] h-[10vh] w-[10vh] translate-x-[-50%] translate-y-[-50%] ${rotate}`}
                      >
                        <Image
                          src={offeredField?.imageUrl || ''}
                          className=""
                          alt="field-Image"
                          fill
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="secondExtraPay" className="text-lg font-medium">
                  Доплата
                </label>
                <input
                  id="secondExtraPay"
                  type="number"
                  value={secondExtraPay}
                  onKeyDown={e => {
                    if (
                      e.key === 'e' ||
                      e.key === 'E' ||
                      e.key === '+' ||
                      e.key === '-' ||
                      e.key === '.'
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onChange={handleChangeSecondPay}
                  className="w-[80%] rounded-sm border-1 border-white bg-transparent px-1 py-[2px] text-xs placeholder-white placeholder-opacity-50"
                  placeholder="Введіть суму"
                />
              </div>
            </div>
            <div>
              <h2 className="mt-1 text-lg">Віддає:</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[16%] w-full">
        <div className="flex w-full flex-col items-center">
          <h2 className="mt-3 text-lg">Загальна сума обміну</h2>
          <div className="mt-2 flex w-[60%] justify-between">
            <span className="w-[30%] font-namu text-xl">
              {trade &&
                trade.offerFieldsIndexes
                  .map(currentIndex => {
                    const currentField = fields.find(field => {
                      return field.index === currentIndex;
                    });
                    return currentField?.price || 0;
                  })
                  .reduce((acc, num) => acc + num, 0) + Number(firstExtraPay)}
              mm
            </span>
            <div className="relative mt-2 flex h-3 w-10 items-center justify-center bg-transparent">
              <div className="absolute left-0 top-0 h-[3px] w-full rounded-full bg-white" />
              <div className="absolute bottom-0 left-[3%] h-[3px] w-3 origin-left rotate-45 rounded-full bg-white" />
              <div className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-white" />
              <div className="absolute right-[-24%] top-[-3%] h-[3px] w-3 origin-left -rotate-[135deg] rounded-full bg-white" />
            </div>
            <span className="w-[30%] font-namu text-xl">
              {trade &&
                trade.wantedFieldsIndexes
                  .map(currentIndex => {
                    const currentField = fields.find(field => {
                      return field.index === currentIndex;
                    });
                    return currentField?.price || 0;
                  })
                  .reduce((acc, num) => acc + num, 0) + Number(secondExtraPay)}
              mm
            </span>
          </div>
        </div>
      </div>

      <div className="ml-auto mr-8 w-[30%] rounded-[3px] bg-greedGradient p-[1px] font-custom">
        <div className="h-full w-full rounded-[3px] bg-[#002147]">
          <Button
            variant="forGradientWithText"
            size="inspectField"
            className="pb-[1px] text-lg"
          >
            Відправити
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Trade;
