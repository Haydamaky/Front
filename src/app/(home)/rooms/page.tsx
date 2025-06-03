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
    <main
      className='mt-16 w-full bg-[url("/images/roomsBg.svg")] bg-left-top bg-repeat-y'
      style={{
        backgroundSize: '100% auto',
      }}
    >
      <div className="mx-auto grid h-[300vh] w-9/12 grid-cols-1 text-base md:grid-cols-[45fr_55fr] md:gap-8 lg:gap-16">
        <div className="h-[55vh] w-full rounded-lg bg-chatBorderGradient p-[2px]">
          <MutualChat />
        </div>
        <GamesList />
      </div>
    </main>
  );
};

export default RoomsPage;
