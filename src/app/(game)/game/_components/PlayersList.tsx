'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { socket } from '@/socket';
import { setGame } from '@/store/slices/game';
import { useEffect, useRef, useState } from 'react';
import { Avatar } from '@nextui-org/react';
import { getUserInfo } from '@/store/slices/user';

const PlayersList = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector(state => state.game.game);
  const user = useAppSelector(state => state.user);
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
      console.log(game);
      dispatch(setGame(game));
      const now = Date.now();
      const timeToEnd = Math.floor((+game.turnEnds - now) / 1000);
      setTurnTime(timeToEnd);
      startCountdown(timeToEnd);
    });

    socket.on('tradedField', (data: any) => {
      const now = Date.now();
      const timeToEnd = Math.floor((+data.turnEnds - now) / 1000);
      setTurnTime(timeToEnd);
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
  return (
    <div className="flex h-full flex-col justify-between py-2 text-xs">
      {game.players?.map(player => (
        <div
          key={player.id}
          className="relative flex h-[23%] flex-col items-center justify-center bg-pink-400"
        >
          {game.turnOfUserId === player.userId && (
            <div className="absolute right-[5%] top-[-2%] rounded-[0.150rem] bg-base p-[2px]">
              90
            </div>
          )}
          <Avatar
            size="md"
            src="https://i.pravatar.cc/150?u=a04258114e29026302d"
          />
          <p>{player.user.nickname}</p>
          <p>{player.money}$</p>
        </div>
      ))}
    </div>
  );
};

export default PlayersList;
