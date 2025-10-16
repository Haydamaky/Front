import { useEffect, useRef, useState } from 'react';
import { api } from '@/api/build/api';
import { DataWithGame } from '@/types';

export const useTurnTimer = () => {
  const [turnTime, setTurnTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCountdown = (timeToEnd: number) => {
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
    api.onMany(
      ['hasPutUpForAuction', 'gameData', 'passTurnToNext', 'updateGameData'],
      calculateTimeToEndAndSetStates,
    );

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      api.offMany(
        ['hasPutUpForAuction', 'gameData', 'passTurnToNext', 'updateGameData'],
        calculateTimeToEndAndSetStates,
      );
    };
  }, []);

  return {
    turnTime,
    calculateTimeToEndAndSetStates,
  };
};