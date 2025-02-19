import bgTradeImage from '@/../public/images/bgTrade.svg';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/hooks/store';
import { socket } from '@/socket';
import { PlayerColor } from '@/types/player';
import { TradeData } from '@/types/trade';
import Image from 'next/image';
import { gradientColorVariants } from '../../_utils';

interface TradeAcceptenceProps {
  trade: TradeData;
  setTradeAcceptance: React.Dispatch<React.SetStateAction<null | TradeData>>;
}

const TradeAcceptence = ({
  trade,
  setTradeAcceptance,
}: TradeAcceptenceProps) => {
  const fields = useAppSelector(state => state.fields.fields);
  const game = useAppSelector(state => state.game.game);
  const handleSignTrade = () => {
    socket.emit('acceptTrade');
    setTradeAcceptance(null);
  };
  const handleRefuseFromTrade = () => {
    socket.emit('refuseFromTrade');
    setTradeAcceptance(null);
  };
  const fromPlayer = game.players.find(
    player => player.userId === trade.fromUserId,
  );
  const toPlayer = game.players.find(
    player => player.userId === trade?.toUserId,
  );
  const colorOfFromPlayer =
    gradientColorVariants[
      fromPlayer?.color as Exclude<PlayerColor, 'pink' | 'red'>
    ];
  const colorToPlayer =
    gradientColorVariants[
      toPlayer?.color as Exclude<PlayerColor, 'pink' | 'red'>
    ];
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
        <h1 className="text-4xl">Agreement</h1>
      </div>
      <div className="mt-2 flex h-[65%] w-full px-6">
        <div className="flex h-full w-full">
          <div className="grid w-[49.7%] grid-cols-[57fr_43fr] gap-5">
            <div className="flex flex-col justify-between overflow-hidden">
              <div
                className="flex items-center justify-center rounded-sm text-center text-lg"
                style={{
                  background: colorOfFromPlayer,
                }}
              >
                <h2 className="mb-[2px] py-1">{fromPlayer?.user.nickname}</h2>
              </div>
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
              <div className="flex flex-col gap-2 text-lg">
                <h2 className="font-medium">Additional payment</h2>
                <p className="font-namu">1800mm</p>
              </div>
            </div>

            <div>
              <h2 className="mt-1 text-lg">Offers:</h2>
            </div>
          </div>
          <div className="mx-5 w-[0.6%] rounded-full bg-white"></div>
          <div className="grid w-[49.7%] grid-cols-[57fr_43fr] gap-5">
            <div className="flex flex-col justify-between overflow-hidden">
              <div
                className="flex items-center justify-center rounded-sm text-center text-lg"
                style={{
                  background: colorToPlayer,
                }}
              >
                <h2 className="mb-[2px] py-1">{toPlayer?.user.nickname}</h2>
              </div>
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
              <div className="flex flex-col gap-2 text-lg">
                <h2 className="font-medium">Additional payment</h2>
                <p className="font-namu">1800mm</p>
              </div>
            </div>
            <div>
              <h2 className="mt-1 text-lg">Gives:</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[16%] w-full">
        <div className="flex w-full flex-col items-center">
          <h2 className="mt-3 text-lg">Total trade amount</h2>
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
                  .reduce((acc, num) => acc + num, 0) +
                  Number(trade.offeredMoney)}
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
                  .reduce((acc, num) => acc + num, 0) +
                  Number(trade.wantedMoney)}
              mm
            </span>
          </div>
        </div>
      </div>

      <div className="mx-8 flex justify-between">
        <div className="w-[33%] rounded-[3px] bg-greedGradient p-[1px] font-custom">
          <div className="h-full w-full rounded-[3px] bg-[#002147]">
            <Button
              onClick={handleSignTrade}
              variant="forGradientWithGreenText"
              size="inspectField"
              className="pb-[1px] text-lg"
            >
              Sign
            </Button>
          </div>
        </div>
        <div className="w-[33%] rounded-[3px] bg-redGradient p-[1px] font-custom">
          <div className="h-full w-full rounded-[3px] bg-[#002147]">
            <Button
              onClick={handleRefuseFromTrade}
              variant="forGradientWithRedText"
              size="inspectField"
              className="pb-[1px] text-lg"
            >
              Refuse
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeAcceptence;
