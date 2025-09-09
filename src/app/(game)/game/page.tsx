'use client';

import { useAppDispatch } from '@/hooks/store';
import { getUserInfo } from '@/store/slices/user';
import { useEffect } from 'react';
import GameBoard from './_components/GameBoard';
import PlayersList from './_components/players/PlayersList';
import { api } from '@/api/build/api';

const GamePage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
    const handleError = (err: any) => console.log(err);
    api.on.error(handleError);
    return () => {
      api.off.error(handleError);
    };
  }, []);
  return (
    <main className="w-full pt-16">
      <div className="ml-[22%] grid h-full grid-cols-[105fr_895fr] gap-10">
        <PlayersList />
        <GameBoard />
      </div>
    </main>
  );
};

export default GamePage;
