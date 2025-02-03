import { Button } from '@/components/ui/button';
import useScreenSize from '@/hooks/screenSize';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { socket } from '@/socket';
import { setFields } from '@/store/slices/fields';
import { setGame } from '@/store/slices/game';
import { DataWithGame } from '@/types';
import { useEffect, useRef, useState } from 'react';
import Chat from './Chat/Chat';
import HintBulb from './HintBulb';
import DicesContainer from './Dice/DicesContainer';
import Image from 'next/image';
import { Avatar } from '@nextui-org/react';
import { Player } from '@/types/player';
import Link from 'next/link';

type Action = 'rollDice' | 'auction' | 'buy' | 'payForField' | 'secretPay' | '';

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
  const [playerWon, setPlayerWon] = useState<undefined | Player>(undefined);
  const [player] = game.players.filter(player => player.userId === user?.id);
  const [currentField] = fields.filter(
    field => field.index === player?.currentFieldIndex,
  );
  const [secretInfo, setSecretInfo] = useState<{
    users: string[];
    amounts: number[];
  }>({
    users: [],
    amounts: [],
  });
  const [amountToPay, setAmountToPay] = useState(0);
  const rolledDice = useRef(false);
  useEffect(() => {
    if (rolledDice.current) {
      if (!currentField.ownedBy && !currentField.specialField) {
        setAction('buy');
      }
      if (currentField.ownedBy && currentField.ownedBy !== user?.id) {
        setAction('payForField');
      }
      if (currentField.secret) {
        if (secretInfo.users.length === 1) {
          if (secretInfo.amounts[0] < 0) {
            setAction('secretPay');
            setAmountToPay(secretInfo.amounts[0]);
          }
        } else if (secretInfo.users.length === 2) {
          const index = secretInfo.users.findIndex(
            userId => userId === user?.id,
          );
          if (secretInfo.amounts[index] < 0) {
            setAction('secretPay');
            setAmountToPay(secretInfo.amounts[index]);
          }
        } else if (
          secretInfo.users.length > 2 &&
          user?.id !== secretInfo.users[0]
        ) {
          if (secretInfo.amounts.length === 2) {
            if (secretInfo.amounts[1] < 0) {
              setAction('secretPay');
              setAmountToPay(secretInfo.amounts[1]);
            }
          }

          if (secretInfo.amounts.length === 1) {
            if (secretInfo.amounts[0] < 0) {
              setAction('secretPay');
              setAmountToPay(secretInfo.amounts[0]);
            }
          }
        }
      }
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
    const handleSecret = (data: any) => {
      setAction('secretPay');
      setSecretInfo(data);
    };
    const handlePassTurnToNext = (data: DataWithGame) => {
      if (data.game.turnOfUserId === user?.id) {
        setAction('rollDice');
      } else {
        setAction('');
      }
    };
    const onPlayerWon = (data: any) => {
      const playerWon = data.game.players.find(
        (player: Player) => player.lost,
      ) as Player | undefined;

      if (playerWon) {
        setPlayerWon(playerWon);
      }
    };
    socket.on('playerWon', onPlayerWon);
    socket.on('rolledDice', handleRolledDice);
    socket.on('hasPutUpForAuction', handleHasPutUpForAuction);
    socket.on('passTurnToNext', handlePassTurnToNext);
    socket.on('secret', handleSecret);
    return () => {
      socket.off('rolledDice', handleRolledDice);
      socket.off('hasPutUpForAuction', handleHasPutUpForAuction);
      socket.off('passTurnToNext', handlePassTurnToNext);
      socket.off('playerWon', onPlayerWon);
      socket.off('secret', handleSecret);
    };
  }, [user]);
  const rollDice = () => {
    socket.emit('rollDice');
  };
  const buyField = () => {
    socket.emit('buyField');
  };
  const payForField = () => {
    socket.emit('payForField');
  };
  const turnOfUser = game.turnOfUserId === user?.id;
  console.log({ action, secretInfo, currentField });
  return (
    <div className="relative h-full p-3">
      <div className="absolute left-[50%] top-[2%] w-[calc(100%-24px)] translate-x-[-50%]">
        {(turnOfUser || action === 'auction' || action === 'secretPay') &&
          !chipTransition &&
          action &&
          (currentField.ownedBy !== game.turnOfUserId || !game.dices) && (
            <div className="flex flex-col justify-between rounded-xl bg-gameCenterModal px-4 py-2 text-xs text-white shadow-gameCenterModaShadowCombined lg:py-3">
              <div className="mb-3 text-small font-bold md:text-standard lg:text-xl xl:text-3xl">
                {action === 'rollDice'
                  ? 'Ваш хід'
                  : action === 'buy'
                    ? 'Придбати поле?'
                    : action === 'payForField'
                      ? 'Оплата оренди'
                      : action === 'secretPay'
                        ? 'Неочікувані витрати'
                        : action === 'auction'
                          ? 'Аукціон'
                          : ''}
              </div>
              {action === 'rollDice' && (
                <>
                  <div className="mb-3 flex w-full items-center gap-2 font-fixelDisplay">
                    <div className="flex h-6 items-center justify-center gap-1 rounded-md bg-gradient-to-r from-[#FBD07C] to-[#F7F779] px-2 text-[#19376D]">
                      <div className="h-5 w-5">
                        <HintBulb />
                      </div>
                      <p className="text-xs">Порада</p>
                    </div>
                    <p className="text-[10px]">
                      Пам'ятайте: інколи краще зберегти гроші, ніж витратити їх
                      на все, що трапляється.
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
              {action === 'buy' && !currentField.ownedBy && (
                <>
                  <div className="mb-3 flex w-full items-center gap-2 font-fixelDisplay">
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
              {action === 'payForField' && (
                <>
                  <div className="mb-3 flex w-full items-center gap-2 font-fixelDisplay">
                    <p className="text-[10px]">
                      Попадаючи на чуже поле, ви зобов'язані сплатити власнику
                      орендну плату відповідно до вартості цього поля.
                    </p>
                  </div>
                  <Button
                    variant={'blueGame'}
                    size={screenSize.width > 1200 ? 'default' : 'xs'}
                    className="font-custom text-[9px] text-white md:text-sm lg:text-lg"
                    onClick={payForField}
                  >
                    Оплатити оренду{' '}
                    {currentField.income[currentField.amountOfBranches]}
                  </Button>
                </>
              )}
              {action === 'secretPay' && (
                <>
                  <div className="mb-3 flex w-full items-center gap-2 font-fixelDisplay">
                    <p className="text-[10px]">
                      {secretInfo.users.length === 1
                        ? `Невідомість вимагає жертв! Ти потрапив(ла) на секретне
                      поле і маєш здійснити платіж.`
                        : `Гравець ${game.players.find(player => player.userId === secretInfo.users[0])?.user.nickname} активував(ла) секретне поле, і це призвело до події, яка зачепила вас.`}
                    </p>
                  </div>
                  <Button
                    variant={'blueGame'}
                    size={screenSize.width > 1200 ? 'default' : 'xs'}
                    className="font-custom text-[9px] text-white md:text-sm lg:text-lg"
                    onClick={payForField}
                  >
                    Сплатити {Math.abs(amountToPay)}
                  </Button>
                </>
              )}
              {action === 'buy' &&
                currentField.ownedBy &&
                currentField.ownedBy !== user?.id && (
                  <>
                    <div className="mb-3 flex w-full items-center gap-2 font-fixelDisplay">
                      <p className="text-[10px]">
                        Попадаючи на чуже поле, ви зобов'язані сплатити власнику
                        орендну плату відповідно до вартості цього поля.
                      </p>
                    </div>
                    <Button
                      variant={'blueGame'}
                      size={screenSize.width > 1200 ? 'default' : 'xs'}
                      className="font-custom text-[9px] text-white md:text-sm lg:text-lg"
                      onClick={payForField}
                    >
                      Оплатити оренду{' '}
                      {currentField.income[currentField.amountOfBranches]}
                    </Button>
                  </>
                )}
              {action === 'auction' && (
                <>
                  <div className="mb-3 flex w-full items-center gap-2 font-fixelDisplay">
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
      </div>
      <div className="absolute left-[50%] top-[46%] translate-x-[-50%] translate-y-[-50%]">
        <div className="flex gap-5">
          <DicesContainer />
        </div>
      </div>
      <Chat chatId={game?.chat?.id} gameId={game.id} players={game.players} />
      {playerWon && !chipTransition && (
        <div className="fixed left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center bg-[#060606F2]">
          <h1 className="bg-[linear-gradient(268.72deg,#F6BE19_20.14%,#FBFBFA_125.62%)] bg-clip-text text-7xl font-bold text-transparent">
            Переможець
          </h1>

          <div className="pb-[9%]">
            <div className="relative mt-[60%] h-[9rem] w-[9rem]">
              <Image
                className="pointer-events-none absolute right-[-15%] top-[-38%] z-10 select-none"
                src="/images/Crown.svg"
                alt="back-button"
                width={100}
                height={100}
              />
              <Avatar
                className="pointer-events-none h-full w-full select-none"
                src="https://i.pravatar.cc/150?u=a04258114e29026302d"
              />
            </div>
            <p className="mt-[15%] text-center text-4xl text-white">
              {playerWon?.user.nickname}
            </p>
          </div>

          <Link href="/rooms" className="block">
            <div className="absolute bottom-[5%] left-[5%] flex cursor-pointer">
              <Image
                className="pointer-events-none select-none"
                src="/images/BackButton.svg"
                alt="back-button"
                width={32}
                height={32}
              />
              <p className="mb-[10%] ml-[14%] font-custom text-2xl text-white">
                Вийти
              </p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Center;
