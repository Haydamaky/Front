'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setFields } from '@/store/slices/fields';
import { setGame } from '@/store/slices/game';
import { DataWithGame } from '@/types';
import { Player } from '@/types/player';
import { useEffect, useRef, useState } from 'react';
import PlayerCard from '../playerCard/PlayerCard';
import { api } from '@/api/api';

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
        api.passTurn();
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
      api.getGameData();
    };
    getGameData();
    api.on.rejoin(getGameData);
    api.on.gameData(
      dispatchSetGame,
      dispatchSetFields,
      calculateTimeToEndAndSetStates,
    );
    api.on.tradeOffered(dispatchSetGame);
    const setRolledDiceapi = () => {
      rolledDice.current = true;
    };
    api.on.rolledDice(setRolledDiceapi);
    api.onMany(
      ['hasPutUpForAuction', 'getGameData', 'passTurnToNext', 'updateGameData'],
      calculateTimeToEndAndSetStates,
    );

    api.on.passTurnToNext(dispatchSetGame, dispatchSetFields);
    api.onMany(
      ['payedForField', 'playerSurrendered', 'updateGameData'],
      dispatchSetGame,
      dispatchSetFields,
    );
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      api.offMany(
        [
          'hasPutUpForAuction',
          'getGameData',
          'passTurnToNext',
          'tradeOffered',
          'updateGameData',
        ],
        calculateTimeToEndAndSetStates,
      );
      api.off.passTurnToNext(dispatchSetGame);
      api.offMany(
        ['payedForField', 'playerSurrendered', 'updateGameData'],
        dispatchSetFields,
        dispatchSetGame,
      );
      api.off.rejoin(getGameData);
      api.off.rolledDice(setRolledDiceapi);
      api.off.tradeOffered(dispatchSetGame);
    };
  }, []);

  return (
    <div className="relative my-auto flex h-[88%] flex-col gap-[2.7%] overflow-visible text-xs md:text-sm lg:text-lg">
      {game?.players &&
        game.players?.map((player: Player, index) => {
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
