'use client';
import { useAppDispatch } from '@/hooks/store';
import GamesList from './_components/GamesList/GamesList';
import MutualChat from './_components/MutualChat';
import { useEffect } from 'react';
import { getUserInfo } from '@/store/slices/user';

const RoomsPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);
  return (
    <div className="mx-auto grid h-[300vh] w-11/12 max-w-7xl grid-cols-1 md:w-full md:grid-cols-[45fr_55fr] md:gap-8 lg:gap-16">
      <MutualChat />
      <GamesList />
    </div>
  );
};

export default RoomsPage;
