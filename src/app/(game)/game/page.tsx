'use client';

import GameBoard from './_components/GameBoard';
import PlayersList from './_components/PlayersList';

const GamePage = () => {
  return (
    <div className="grid h-full grid-cols-[11fr_89fr] gap-10">
      <PlayersList />
      <GameBoard />
    </div>
  );
};

export default GamePage;
