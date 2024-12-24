'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { socket } from '@/socket';
import { setGame } from '@/store/slices/game';
import { useEffect, useRef, useState } from 'react';
import { Avatar } from '@nextui-org/react';
import { getUserInfo } from '@/store/slices/user';
import { setFields } from '@/store/slices/fields';

type PlayerColor = 'white' | 'black' | 'blue' | 'red' | 'yellow';

interface Player {
  id: number;
  color: PlayerColor;
  userId: string;
  money: number;
  user: { nickname: string };
}

const PlayersList = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector(state => state.game.game);
  const [usersTurnId, setUsersTurnId] = useState('');
  const [turnTime, setTurnTime] = useState(0);
  const intervalRef = useRef<null | NodeJS.Timeout>(null);
  useEffect(() => {
    dispatch(getUserInfo());
    const startCountdown = (timeToEnd: any) => {
      let countDown = timeToEnd;
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        if (countDown <= 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return;
        }
        countDown--;
        setTurnTime(prev => prev - 1);
      }, 1000);
    };

    socket.emit('getGameData', ({ game, fields }: any) => {
      dispatch(setGame(game));
      dispatch(setFields(fields));
      const now = Date.now();
      const timeToEnd = Math.floor((+game.turnEnds - now) / 1000);
      setTurnTime(timeToEnd);
      startCountdown(timeToEnd);
      setUsersTurnId(game.turnOfUserId);
    });

    socket.on('hasPutUpForAuction', (data: any) => {
      const now = Date.now();
      const timeToEnd = Math.floor((+data.turnEnds - now) / 1000);
      setTurnTime(timeToEnd);
      startCountdown(timeToEnd);
    });

    socket.on('passTurnToNext', (game: any) => {
      const now = Date.now();
      dispatch(setGame(game));
      const timeToEnd = Math.floor((+game.turnEnds - now) / 1000);
      setTurnTime(timeToEnd);
      setUsersTurnId(game.turnOfUserId);
      startCountdown(timeToEnd);
    });

    socket.on('rolledDice', (data: any) => {
      const now = Date.now();
      const timeToEnd = Math.floor((+data.turnEnds - now) / 1000);
      setTurnTime(timeToEnd);
      startCountdown(timeToEnd);
    });

    socket.on('error', (err: any) => console.log(err));
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      socket.off('rolledDice');
      socket.off('getGameData');
      socket.off('error');
      socket.off('tradedField');
    };
  }, []);
  const colorVariants: Record<string, string> = {
    pink: 'border-pink-500',
    green: 'border-green-500',
    blue: 'border-blue-500',
    red: 'border-red-500',
    yellow: 'border-yellow-500',
  };

  return (
    <div className="flex h-full flex-col justify-between py-6 text-xs md:text-sm lg:text-lg">
      {game.players?.map((player: Player) => {
        const borderColor = colorVariants[player.color];
        const highLigthedShadow =
          player.userId === usersTurnId
            ? 'shadow-[0px_0px_4px_3px_rgba(255,247,0,1)]'
            : '';
        return (
          <div
            key={player.id}
            className={`bg-playerCard ${borderColor} ${highLigthedShadow} relative flex h-[23%] flex-col items-center justify-center overflow-hidden border-2 border-solid`}
          >
            {player.userId === usersTurnId && (
              <div className="absolute right-[5%] top-[-2%] rounded-[0.150rem] bg-base px-1 py-[2px] text-primary md:px-2 md:py-1 lg:px-3 lg:py-2">
                {turnTime}
              </div>
            )}
            <Avatar
              size="md"
              src="https://i.pravatar.cc/150?u=a04258114e29026302d"
            />
            <p>{player.user.nickname}</p>
            <p>{player.money}$</p>
          </div>
        );
      })}
    </div>
  );
};

export default PlayersList;
