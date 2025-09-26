'use client';

import GameBoard from './_components/GameBoard';
import PlayersList from './_components/players/PlayersList';

const GamePage = () => {
  return (
    <main className="max-h-screen overflow-y-hidden text-white light">
      <div className="h-screen w-full">
        <div className="w-full">
          <div className="ml-[22%] grid h-full grid-cols-[105fr_895fr] gap-10">
            <PlayersList />
            <GameBoard />
          </div>
        </div>
      </div>
    </main>
  );
};

export default GamePage;
