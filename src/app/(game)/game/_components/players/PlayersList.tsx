'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { socket } from '@/socket';
import { setGame } from '@/store/slices/game';
import { useEffect, useRef, useState } from 'react';
import { Avatar } from '@nextui-org/react';
import { setFields } from '@/store/slices/fields';
import { Player, PlayerColor } from '@/types/player';
import { DataWithGame } from '@/types';
import PlayerCard from './PlayerCard';

const PlayersList = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector(state => state.game.game);
  const [turnTime, setTurnTime] = useState(0);
  const intervalRef = useRef<null | NodeJS.Timeout>(null);
  useEffect(() => {
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

    const calculateTimeToEndAndSetStates = ({ game }: DataWithGame) => {
      const now = Date.now();
      const timeToEnd = Math.floor((+game.turnEnds - now) / 1000);
      setTurnTime(timeToEnd);
      startCountdown(timeToEnd);
    };

    const dispatchSetGame = (data: DataWithGame) => {
      dispatch(setGame(data.game));
    };

    const dispatchSetFields = (data: DataWithGame) => {
      dispatch(setFields(data.fields!));
    };

    socket.emitWithCallbacks('getGameData', dispatchSetGame, dispatchSetFields);

    socket.on(
      ['hasPutUpForAuction', 'getGameData', 'passTurnToNext', 'rolledDice'],
      calculateTimeToEndAndSetStates,
    );

    socket.on('passTurnToNext', dispatchSetGame);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      socket.off(
        ['hasPutUpForAuction', 'getGameData', 'passTurnToNext', 'rolledDice'],
        calculateTimeToEndAndSetStates,
      );
      socket.off('passTurnToNext', dispatchSetGame);
    };
  }, []);

  return (
    <div className="flex h-full flex-col justify-between py-6 text-xs md:text-sm lg:text-lg">
      {game.players?.map((player: Player) => {
        return (
          <PlayerCard
            player={player}
            key={player.id}
            turnOfUserId={game.turnOfUserId}
            turnTime={turnTime}
          ></PlayerCard>
        );
      })}
    </div>
  );
};

export default PlayersList;
