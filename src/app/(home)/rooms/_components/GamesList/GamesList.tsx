'use client';
import { useAppSelector } from '@/hooks/store';
import { socket } from '@/socket';
import { Game } from '@/types';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import GameRow from './GameRow';

const GamesList: FC = () => {
  const router = useRouter();
  const [games, setGames] = useState<Game[]>([]);
  const user = useAppSelector(state => state.user);

  useEffect(() => {
    socket.on('clearStartedGame', handleClearStartedGame);
    socket.on('startGame', handleStartGame);
    socket.on('onParticipateGame', handleOnParticipateGame);
    fetchGames();
    return () => {
      socket.off('clearStartedGame', handleClearStartedGame);
      socket.off('startGame', handleStartGame);
      socket.off('onParticipateGame', handleOnParticipateGame);
    };
  }, [router]);

  const handleClearStartedGame = (gameId: string) => {
    setGames(prevGames => {
      const indexOfGame = prevGames.findIndex(game => game.id === gameId);
      const updatedGames = [...prevGames];
      if (indexOfGame !== -1) updatedGames.splice(indexOfGame, 1);
      return updatedGames;
    });
  };

  const fetchGames = async () => {
    const games = await socket.emitWithAck('getVisibleGames');
    setGames(games);
  };

  const handleStartGame = ({ gameId }: { gameId: string }) => {
    if (gameId) {
      document.cookie = `gameId=${gameId}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
    }
    router.push('/game');
  };

  const handleOnParticipateGame = (game: Game) => {
    setGames(prevGames => {
      const index = prevGames.findIndex(curGame => curGame.id === game.id);
      const updatedGames = [...prevGames];

      const updatedGame = { ...prevGames[index], ...game };
      if (index !== -1) updatedGames.splice(index, 1, updatedGame);

      return updatedGames;
    });
  };

  const handleLeaveGame = (id: string) => {
    socket.emit('leaveGame', { id });
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-8 font-custom">
        <h1 className="self-end text-6xl text-primary">кімнати</h1>
        <Button className="bg-primary text-white">Створити кімнату</Button>
      </div>
      <ul>{games?.map(game => <GameRow game={game} key={game.id} />)}</ul>
    </div>
  );
};

export default GamesList;
