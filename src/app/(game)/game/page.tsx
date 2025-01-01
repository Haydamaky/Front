'use client';

import { useEffect } from 'react';
import GameBoard from './_components/GameBoard';
import PlayersList from './_components/players/PlayersList';
import { getUserInfo } from '@/store/slices/user';
import { useAppDispatch } from '@/hooks/store';
import { socket } from '@/socket';

const GamePage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
    const handleError = (err: any) => console.log(err);
    socket.on('error', handleError);
    socket.on('playerWon', data => console.log(data));
    return () => {
      socket.off('error', handleError);
    };
  }, []);
  return (
    <div className="grid h-full grid-cols-[11fr_89fr] gap-10">
      <PlayersList />
      <GameBoard />
    </div>
  );
};

export default GamePage;
