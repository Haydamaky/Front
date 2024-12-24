import MutualChat from '@/app/(home)/rooms/_components/MutualChat';
import { Button } from '@/components/ui/button';
import { genFont, titleFont } from '@/config/fonts';
import useScreenSize from '@/hooks/screenSize';
import { useAppSelector } from '@/hooks/store';
import { socket } from '@/socket';
import { useEffect, useState } from 'react';

type Action = 'rollDice' | 'auction' | 'buy' | '';

const Center = () => {
  const screenSize = useScreenSize();
  const [action, setAction] = useState<Action>('');
  const fields = useAppSelector(state => state.fields.fields);
  const game = useAppSelector(state => state.game.game);
  const { data: user } = useAppSelector(state => state.user);
  const [player] = game.players.filter(player => player.userId === user?.id);
  const [currentField] = fields.filter(
    field => field.index === player?.currentFieldIndex,
  );
  useEffect(() => {
    const handleError = (err: any) => console.log(err);
    const handleRolledDice = (data: any) => {
      setAction('buy');
    };
    const handleHasPutUpForAuction = (data: any) => {
      setAction('auction');
    };
    const handlePassTurnToNext = (game: any) => {
      if (game.turnOfUserId === user?.id) {
        setAction('rollDice');
      } else {
        setAction('');
      }
    };

    socket.on('error', handleError);
    socket.on('rolledDice', handleRolledDice);
    socket.on('hasPutUpForAuction', handleHasPutUpForAuction);
    socket.on('passTurnToNext', handlePassTurnToNext);
    return () => {
      socket.off('error', handleError);
      socket.off('rolledDice', handleRolledDice);
      socket.off('hasPutUpForAuction', handleHasPutUpForAuction);
      socket.off('passTurnToNext', handlePassTurnToNext);
    };
  }, [user]);
  console.log({ action });
  return (
    <div className="flex h-full flex-col justify-between">
      {game.turnOfUserId === user?.id && (
        <div className="mx-6 mt-6 flex h-1/4 flex-col items-center justify-between rounded-md bg-[#FBFBFA] py-2 text-xs text-primary lg:py-3">
          <div className="text-small md:text-standard lg:text-lg xl:text-2xl">
            {action === 'rollDice'
              ? 'Ваш хід'
              : action === 'buy'
                ? 'Придбати'
                : action === 'auction'
                  ? 'Виставити на аукціон'
                  : ''}
          </div>
          {action === 'rollDice' && (
            <Button
              size={screenSize.width > 1200 ? 'default' : 'xs'}
              className="font-custom text-[9px] text-white md:text-sm lg:text-lg"
            >
              Кинути кубики
            </Button>
          )}
          {action === 'buy' && (
            <div className="flex gap-1 lg:gap-4">
              <Button
                size={screenSize.width > 1200 ? 'default' : 'xs'}
                className="font-custom text-[9px] text-white md:text-sm lg:text-lg"
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
