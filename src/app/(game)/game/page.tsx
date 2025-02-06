'use client';

import { useAppDispatch } from '@/hooks/store';
import { socket } from '@/socket';
import { getUserInfo } from '@/store/slices/user';
import { Player } from '@/types/player';
import { useEffect, useState } from 'react';
import GameBoard from './_components/GameBoard';
import PlayersList from './_components/players/PlayersList';

const GamePage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
    const handleError = (err: any) => console.log(err);
    socket.on('error', handleError);
    return () => {
      socket.off('error', handleError);
    };
  }, []);
  return (
    <div className="ml-[22%] grid h-full grid-cols-[105fr_895fr] gap-10">
      <PlayersList />
      <GameBoard />
    </div>
  );
};

export default GamePage;
