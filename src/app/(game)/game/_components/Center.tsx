import { Button } from '@/components/ui/button';
import useScreenSize from '@/hooks/screenSize';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { socket } from '@/socket';
import { setFields } from '@/store/slices/fields';
import { setGame } from '@/store/slices/game';
import { DataWithGame } from '@/types';
import { useEffect, useRef, useState } from 'react';
import HintBulb from './HintBulb';
import DicesContainer from './Dice/DicesContainer';

type Action = 'rollDice' | 'auction' | 'buy' | '';

const Center = () => {
  const screenSize = useScreenSize();
  const [action, setAction] = useState<Action>('');
  const dispatch = useAppDispatch();
  const fields = useAppSelector(state => state.fields.fields);
  const game = useAppSelector(state => state.game.game);
  const { data: user } = useAppSelector(state => state.user);
  const { data: chipTransition } = useAppSelector(
    state => state.chipTransition,
  );
  const [player] = game.players.filter(player => player.userId === user?.id);
  const [currentField] = fields.filter(
    field => field.index === player?.currentFieldIndex,
  );
  const rolledDice = useRef(false);
  useEffect(() => {
    if (rolledDice.current) {
      setAction('buy');
      rolledDice.current = false;
    }
  }, [game]);
  useEffect(() => {
    const handleRolledDice = (data: any) => {
      rolledDice.current = true;
      setAction('');
    };
    const handleHasPutUpForAuction = (data: any) => {
      setAction('auction');
    };
    const handlePassTurnToNext = (data: DataWithGame) => {
      if (data.game.turnOfUserId === user?.id) {
        setAction('rollDice');
      } else {
        setAction('');
      }
    };
    const handleBoughtField = (data: any) => {
      dispatch(setFields(data.fields));
      dispatch(setGame(data.game));
    };

    socket.on('rolledDice', handleRolledDice);
    socket.on('hasPutUpForAuction', handleHasPutUpForAuction);
    socket.on('passTurnToNext', handlePassTurnToNext);
    socket.on('boughtField', handleBoughtField);
    return () => {
      socket.off('rolledDice', handleRolledDice);
      socket.off('hasPutUpForAuction', handleHasPutUpForAuction);
      socket.off('passTurnToNext', handlePassTurnToNext);
      socket.off('boughtField', handleBoughtField);
    };
  }, [user]);
  const rollDice = () => {
    socket.emit('rollDice');
  };
  const buyField = () => {
    socket.emit('buyField');
  };
  const turnOfUser = game.turnOfUserId === user?.id;

  return (
    <div className="flex h-full flex-col justify-between">
      {(turnOfUser || action === 'auction') &&
        (!currentField?.specialField || action === 'rollDice') &&
        !chipTransition &&
        action && (
          <div className="mx-6 mt-6 flex h-[26%] flex-col justify-between rounded-xl bg-gameCenterModal px-4 py-2 text-xs text-white shadow-gameCenterModaShadowCombined lg:py-3">
            <div className="text-small font-bold md:text-standard lg:text-xl xl:text-3xl">
              {action === 'rollDice'
                ? 'Ваш хід'
                : action === 'buy'
                  ? 'Придбати поле?'
                  : action === 'auction'
                    ? 'Аукціон'
                    : ''}
            </div>
            {action === 'rollDice' && (
              <>
                <div className="flex w-full items-center gap-2 font-fixelDisplay">
                  <div className="flex h-6 items-center justify-center gap-1 rounded-md bg-gradient-to-r from-[#FBD07C] to-[#F7F779] px-2 text-[#19376D]">
                    <div className="h-5 w-5">
                      <HintBulb />
                    </div>
                    <p className="text-xs">Порада</p>
                  </div>
                  <p className="text-[10px]">
                    Пам'ятайте: інколи краще зберегти гроші, ніж витратити їх на
                    все, що трапляється.
                  </p>
                </div>
                <Button
                  variant={'blueGame'}
                  size={screenSize.width > 1200 ? 'default' : 'xs'}
                  className="font-custom text-[9px] text-white md:text-sm lg:text-lg"
                  onClick={rollDice}
                >
                  Кинути кубики
                </Button>
              </>
            )}
            {action === 'buy' && (
              <>
                <div className="flex w-full items-center gap-2 font-fixelDisplay">
                  <div className="flex h-6 items-center justify-center gap-1 rounded-md bg-gradient-to-r from-[#FBD07C] to-[#F7F779] px-1 text-[#19376D]">
                    <div className="h-5 w-5">
                      <HintBulb />
                    </div>
                  </div>
                  <p className="text-[10px]">
                    Якщо ви відмовитесь від покупки, поле буде виставлено на
                    аукціон.
                  </p>
                </div>
                <div className="flex w-full gap-1 lg:gap-4">
                  <Button
                    variant={'blueGame'}
                    size={screenSize.width > 1200 ? 'default' : 'xs'}
                    className="font-custom text-[9px] text-white md:text-sm lg:text-lg"
                    onClick={buyField}
                  >
                    Придбати за {currentField.price}
                  </Button>
                  <div
                    className={`flex h-[38px] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-buttonBlueGradient px-[1px]`}
                  >
                    <Button
                      variant={'gameDarkBlue'}
                      size={screenSize.width > 1200 ? 'default' : 'xs'}
                      className="font-custom"
                    >
                      <p className="bg-[linear-gradient(184.39deg,#5AB2F7_4.38%,#12CFF3_97.25%)] bg-clip-text text-4xl text-[9px] font-bold text-transparent md:text-sm lg:text-lg">
                        На аукціон
                      </p>
                    </Button>
                  </div>
                </div>
              </>
            )}
            {action === 'auction' && (
              <>
                <div className="flex w-full items-center gap-2 font-fixelDisplay">
                  <div className="flex h-6 items-center justify-center gap-1 rounded-md bg-gradient-to-r from-[#FBD07C] to-[#F7F779] px-1 text-[#19376D]">
                    <div className="h-5 w-5">
                      <HintBulb />
                    </div>
                  </div>
                  <p className="text-[10px]">
                    Якщо ви відмовитесь від покупки, поле буде виставлено на
                    аукціон.
                  </p>
                </div>
                <div className="flex gap-1 lg:gap-4">
                  <Button
                    size={screenSize.width > 1200 ? 'default' : 'xs'}
                    className="font-custom text-[9px] text-white md:text-sm lg:text-lg"
                  >
                    Підняти на 100
                  </Button>
                  <Button
                    variant={'white'}
                    size={screenSize.width > 1200 ? 'default' : 'xs'}
                    className="font-custom text-[9px] md:text-sm lg:text-lg"
                  >
                    Відмовитись
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      <div className="absolute left-[50%] top-[46%] translate-x-[-50%] translate-y-[-50%]">
        <div className="flex gap-5">
          <DicesContainer />
        </div>
      </div>
    </div>
  );
};

export default Center;
