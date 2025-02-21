'use client';
import { useAppSelector } from '@/hooks/store';
import { socket } from '@/socket';
import { DataWithGame, Game } from '@/types';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import GameRow from './GameRow';

const GamesList: FC = () => {
  const router = useRouter();
  const [games, setGames] = useState<Game[]>([]);
  const user = useAppSelector(state => state.user);

  useEffect(() => {
    const handleLeaveGame = (id: string) => {
      socket.emit('leaveGame', { id });
    };
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

    const onNewGameCreated = (game: Game) => {
      setGames(prevGames => [game, ...prevGames]);
    };

    const handleStartGame = ({ game }: DataWithGame) => {
      if (game) {
        document.cookie = `gameId=${game.id}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=None; domain=.plankton-app-sfddt.ondigitalocean.app; Secure`;
      }
      router.push('/game');
    };

    const handleOnParticipateGame = (game: Game) => {
      setGames(prevGames => {
        const index = prevGames.findIndex(curGame => curGame.id === game.id);
        const updatedGames = [...prevGames];
        updatedGames[index] = game;
        return updatedGames;
      });
    };

    socket.on('clearStartedGame', handleClearStartedGame);
    socket.on('startGame', handleStartGame);
    socket.on('onParticipateGame', handleOnParticipateGame);
    socket.on('newGameCreated', onNewGameCreated);
    fetchGames();
    return () => {
      socket.off('clearStartedGame', handleClearStartedGame);
      socket.off('startGame', handleStartGame);
      socket.off('onParticipateGame', handleOnParticipateGame);
      socket.off('newGameCreated', onNewGameCreated);
    };
  }, [router]);
  const onCreateGame = () => {
    socket.emit('createGame');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-8 font-custom">
        <h1 className="self-end text-6xl text-primary">Rooms</h1>
        <Button className="bg-primary text-white" onClick={onCreateGame}>
          Create Room
        </Button>
      </div>
      <ul className="flex flex-col gap-6">
        {games?.map(game => <GameRow game={game} key={game.id} />)}
      </ul>
    </div>
  );
};

export default GamesList;
