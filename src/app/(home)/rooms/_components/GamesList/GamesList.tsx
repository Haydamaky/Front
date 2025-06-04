'use client';
import { DataWithGame, Game } from '@/types';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import GameRow from './GameRow';
import { api } from '@/api/api';
import { client } from '@/api';
import DoubleLayerBtn from '@/components/custom/DoubleLayerBtn';

const GamesList: FC = () => {
  const router = useRouter();
  const [games, setGames] = useState<Game[]>([]);
  useEffect(() => {
    const handleClearStartedGame = (gameId: string) => {
      setGames(prevGames => {
        const indexOfGame = prevGames.findIndex(game => game.id === gameId);
        const updatedGames = [...prevGames];
        if (indexOfGame !== -1) updatedGames.splice(indexOfGame, 1);
        return updatedGames;
      });
    };

    const fetchGames = async () => {
      const games = await api.getVisibleGames();
      setGames(games);
    };

    const onNewGameCreated = (game: Game) => {
      setGames(prevGames => [game, ...prevGames]);
    };

    const handleStartGame = async ({ game }: DataWithGame) => {
      if (game) {
        const res = await client.post('game/set-cookie', { gameId: game.id });
        if ([200, 201].includes(res.status)) {
          router.push('/game');
        }
      }
    };

    const handleOnParticipateGame = (game: Game) => {
      setGames(prevGames => {
        const index = prevGames.findIndex(curGame => curGame.id === game.id);
        const updatedGames = [...prevGames];
        if (game.players.length !== 0) {
          updatedGames[index] = game;
        } else {
          updatedGames.splice(index, 1);
        }
        return updatedGames;
      });
    };

    api.on.clearStartedGame(handleClearStartedGame);
    api.on.startGame(handleStartGame);
    api.on.onParticipateGame(handleOnParticipateGame);
    api.on.newGameCreated(onNewGameCreated);
    fetchGames();
    return () => {
      api.off.clearStartedGame(handleClearStartedGame);
      api.off.startGame(handleStartGame);
      api.off.onParticipateGame(handleOnParticipateGame);
      api.off.newGameCreated(onNewGameCreated);
    };
  }, [router]);
  const onCreateGame = () => {
    api.createGame();
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-8 font-custom">
        <h1 className="self-end text-6xl">Rooms</h1>
        <DoubleLayerBtn onClick={onCreateGame}>Create Room</DoubleLayerBtn>
      </div>
      <ul className="mt-4 flex flex-col gap-6">
        {games?.map(game => <GameRow game={game} key={game.id} />)}
      </ul>
    </div>
  );
};

export default GamesList;
