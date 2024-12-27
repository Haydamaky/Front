import MutualChat from '@/app/(home)/rooms/_components/MutualChat';
import { Button } from '@/components/ui/button';
import { genFont, titleFont } from '@/config/fonts';
import useScreenSize from '@/hooks/screenSize';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { socket } from '@/socket';
import { setFields } from '@/store/slices/fields';
import { setGame } from '@/store/slices/game';
import { DataWithGame } from '@/types';
import { useEffect, useState } from 'react';

type Action = 'rollDice' | 'auction' | 'buy' | '';

const Center = () => {
  const screenSize = useScreenSize();
  const [action, setAction] = useState<Action>('');
  const dispatch = useAppDispatch();
  const fields = useAppSelector(state => state.fields.fields);
  const game = useAppSelector(state => state.game.game);
  const { data: user } = useAppSelector(state => state.user);
  const [player] = game.players.filter(player => player.userId === user?.id);
  const [currentField] = fields.filter(
    field => field.index === player?.currentFieldIndex,
  );
  useEffect(() => {
    const handleRolledDice = (data: any) => {
      setAction('buy');
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
      console.log({ game: data.game });
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
  return (
    <div className="flex h-full flex-col justify-between">
      {(game.turnOfUserId === user?.id || action === 'auction') &&
        (!currentField.specialField || action === 'rollDice') && (
          <div className="mx-6 mt-6 flex h-1/4 flex-col items-center justify-between rounded-md bg-[#FBFBFA] py-2 text-xs text-primary lg:py-3">
            <div className="text-small md:text-standard lg:text-lg xl:text-2xl">
              {action === 'rollDice'
                ? 'Ваш хід'
                : action === 'buy'
                  ? 'Придбати'
                  : action === 'auction'
                    ? 'Аукціон'
                    : ''}
            </div>
            {action === 'rollDice' && (
              <Button
                size={screenSize.width > 1200 ? 'default' : 'xs'}
                className="font-custom text-[9px] text-white md:text-sm lg:text-lg"
                onClick={rollDice}
              >
                Кинути кубики
              </Button>
            )}
            {action === 'buy' && (
              <div className="flex gap-1 lg:gap-4">
                <Button
                  size={screenSize.width > 1200 ? 'default' : 'xs'}
                  className="font-custom text-[9px] text-white md:text-sm lg:text-lg"
                  onClick={buyField}
                >
                  Придбати за {currentField.price}
                </Button>
                <Button
                  variant={'white'}
                  size={screenSize.width > 1200 ? 'default' : 'xs'}
                  className="font-custom text-[9px] md:text-sm lg:text-lg"
                >
                  Виставити на аукціон
                </Button>
              </div>
            )}
            {action === 'auction' && (
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
            )}
          </div>
        )}

      <div>Chat</div>
    </div>
  );
};

export default Center;
