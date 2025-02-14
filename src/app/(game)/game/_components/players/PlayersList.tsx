'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { socket } from '@/socket';
import { setFields } from '@/store/slices/fields';
import { setGame } from '@/store/slices/game';
import { DataWithGame } from '@/types';
import { Player } from '@/types/player';
import { useEffect, useRef, useState } from 'react';
import PlayerCard from '../playerCard/PlayerCard';

const PlayersList = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const game = useAppSelector(state => state.game.game);
  const fields = useAppSelector(state => state.fields.fields);
  const { data: chipTransition } = useAppSelector(
    state => state.chipTransition,
  );
  const [turnTime, setTurnTime] = useState(0);
  const rolledDice = useRef(false);
  const startCountdown = (timeToEnd: any) => {
    let countDown = timeToEnd;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (countDown <= -1) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }
      countDown--;
      setTurnTime(prev => prev - 1);
    }, 1000);
  };
  const calculateTimeToEndAndSetStates = ({ game }: DataWithGame) => {
    const now = Date.now();
    const timeToEnd = Math.ceil((+game.turnEnds - now) / 1000);
    setTurnTime(timeToEnd);
    startCountdown(timeToEnd);
  };
  useEffect(() => {
    if (rolledDice.current && !chipTransition) {
      calculateTimeToEndAndSetStates({ game });
      const currentPlayer = game.players.find(
        player => player.userId === game.turnOfUserId,
      );
      const currentField = fields.find(
        fields => fields.index === currentPlayer?.currentFieldIndex,
      );
      if (currentField?.ownedBy === user.data?.id) {
        console.log('PassTurn');
        socket.emit('passTurn');
      }

      rolledDice.current = false;
    }
  }, [game, chipTransition]);
  const intervalRef = useRef<null | NodeJS.Timeout>(null);
  useEffect(() => {
    const dispatchSetGame = (data: DataWithGame) => {
      if (data.game) {
        dispatch(setGame(data.game));
      }
    };

    const dispatchSetFields = (data: DataWithGame) => {
      if (data.fields) {
        dispatch(setFields(data.fields));
      }
    };
    const getGameData = () => {
      socket.emit('getGameData');
    };
    getGameData();
    socket.on('rejoin', getGameData);
    socket.on(
      'gameData',
      dispatchSetGame,
      dispatchSetFields,
      calculateTimeToEndAndSetStates,
    );
    socket.on('tradeOffered', dispatchSetGame);
    const setRolledDiceSocket = () => {
      rolledDice.current = true;
    };
    socket.on('rolledDice', setRolledDiceSocket);
    socket.on(
      ['hasPutUpForAuction', 'getGameData', 'passTurnToNext', 'updateGameData'],
      calculateTimeToEndAndSetStates,
    );

    socket.on('passTurnToNext', dispatchSetGame, dispatchSetFields);
    socket.on(
      ['payedForField', 'playerSurrendered', 'updateGameData'],
      dispatchSetGame,
      dispatchSetFields,
    );
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      socket.off(
        [
          'hasPutUpForAuction',
          'getGameData',
          'passTurnToNext',
          'tradeOffered',
          'updateGameData',
        ],
        calculateTimeToEndAndSetStates,
      );
      socket.off(['passTurnToNext'], dispatchSetGame);
      socket.off(
        ['payedForField', 'playerSurrendered', 'updateGameData'],
        dispatchSetFields,
        dispatchSetGame,
      );
      socket.off('rejoin', getGameData);
      socket.off('rolledDice', setRolledDiceSocket);
      socket.off('tradeOffered', dispatchSetGame);
    };
  }, []);

  return (
    <div className="relative my-auto flex h-[88%] flex-col gap-[2.7%] overflow-visible text-xs md:text-sm lg:text-lg">
      {game.players?.map((player: Player, index) => {
        return (
          <PlayerCard
            player={player}
            key={player.id}
            turnOfUserId={game.turnOfUserId}
            turnTime={turnTime}
            index={index}
          ></PlayerCard>
        );
      })}
    </div>
  );
};

export default PlayersList;
