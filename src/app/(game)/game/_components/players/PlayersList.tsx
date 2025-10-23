'use client';

import { api } from '@/api/build/api';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setFields } from '@/store/slices/fields';
import { setErrorGame, setGame, setLoadingGame } from '@/store/slices/game';
import { DataWithGame } from '@/types';
import { Player } from '@/types/player';
import { useEffect, useRef, useState } from 'react';
import PlayerCard from '../playerCard/PlayerCard';

const PlayersList = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const { game, loading } = useAppSelector(state => state.game);
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
      if (
        currentField?.ownedBy === user.data?.id &&
        game.turnOfUserId === user.data?.id
      ) {
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

    const getAllGameData = async () => {
      try {
        if (user.data) {
          dispatch(setLoadingGame(true));
          await api.getAllGameData();
          dispatch(setLoadingGame(false));
        }
      } catch (err) {
        dispatch(setErrorGame('Couldnt get game'));
        dispatch(setLoadingGame(false));
      }
    };
    if (!game) {
      getAllGameData();
    }

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
      ['hasPutUpForAuction', 'gameData', 'passTurnToNext', 'updateGameData'],
      calculateTimeToEndAndSetStates,
    );

    api.on.passTurnToNext(dispatchSetGame, dispatchSetFields);
    api.onMany(
      ['payedForField', 'updateGameData'],
      dispatchSetGame,
      dispatchSetFields,
    );
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      api.offMany(
        [
          'hasPutUpForAuction',
          'gameData',
          'passTurnToNext',
          'tradeOffered',
          'updateGameData',
        ],
        calculateTimeToEndAndSetStates,
      );
      api.off.passTurnToNext(dispatchSetGame);
      api.offMany(
        ['payedForField', 'updateGameData'],
        dispatchSetFields,
        dispatchSetGame,
      );
      api.off.rolledDice(setRolledDiceapi);
      api.off.tradeOffered(dispatchSetGame);
    };
  }, [user.data]);
  if (loading) return null;
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
