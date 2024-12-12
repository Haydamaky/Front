'use client';
import { useEffect, useState } from 'react';
import { socket } from '../../socket';
import { MUTUAL_CHAT_ID } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { Game } from '@/types/game';
import { MessageObjType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@nextui-org/input';

const RoomsPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState<MessageObjType>({
    text: '',
    chatId: MUTUAL_CHAT_ID,
  });
  const [messages, setMessages] = useState<MessageObjType[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  const handleOnMessage = (data: MessageObjType) => {
    setMessages(prevMessages => [...prevMessages, data]);
  };

  const handleClearStartedGame = (gameId: string) => {
    setGames(prevGames => {
      const indexOfGame = prevGames.findIndex(game => game.id === gameId);
      const updatedGames = [...prevGames];
      if (indexOfGame !== -1) updatedGames.splice(indexOfGame, 1);
      return updatedGames;
    });
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
      if (index !== -1) {
        updatedGames.splice(index, 1, game);
      } else {
        updatedGames.push(game);
      }
      return updatedGames;
    });
  };

  const fetchChatData = async () => {
    const chatData = await socket.emitWithAck('chatData', {
      chatId: MUTUAL_CHAT_ID,
    });
    setMessages(chatData.messages);
  };

  const fetchGames = async () => {
    const games = await socket.emitWithAck('getVisibleGames');
    setGames(games);
  };

  useEffect(() => {
    // Register socket event listeners
    socket.on('onMessage', handleOnMessage);
    socket.on('clearStartedGame', handleClearStartedGame);
    socket.on('startGame', handleStartGame);
    socket.on('onParticipateGame', handleOnParticipateGame);
    socket.on('error', console.error);

    // Fetch initial chat data
    fetchChatData();
    fetchGames();

    // Cleanup listeners on component unmount
    return () => {
      socket.off('onMessage', handleOnMessage);
      socket.off('clearStartedGame', handleClearStartedGame);
      socket.off('startGame', handleStartGame);
      socket.off('onParticipateGame', handleOnParticipateGame);
      socket.off('connect');
      socket.off('disconnect');
      socket.off('error');
    };
  }, [router]);

  const sendMessage = () => {
    socket.emit('newMessage', { text: message.text, chatId: MUTUAL_CHAT_ID });
    setMessage({ text: '', chatId: MUTUAL_CHAT_ID });
  };

  const handleJoinGame = (id: string) => {
    socket.emit('joinGame', { id });
  };

  const handleLeaveGame = (id: string) => {
    socket.emit('leaveGame', { id });
  };
  return (
    <div className="h-full">
      <div className="flex h-1/2 flex-col rounded border-2 border-solid">
        <h1 className="mx-auto w-32 text-center font-custom text-sm">
          Спільний чат
        </h1>
        <div className="flex-1 overflow-y-auto">
          {messages.map((msgObj, index) => (
            <p key={index}>{msgObj.text}</p>
          ))}
        </div>
        <div className="mb-1 flex items-center px-2">
          <Input
            className="mr-2 w-full"
            type="text"
            size={'sm'}
            value={message.text}
            classNames={{
              input: ['bg-base', 'text-primary', 'placeholder:text-primary'],
              inputWrapper: ['divide-solid border-2'],
            }}
            placeholder="Написати повідомлення..."
            radius="sm"
            onChange={e =>
              setMessage(prevMessage => ({
                ...prevMessage,
                text: e.target.value,
              }))
            }
          />
          <Button size="sm" onClick={sendMessage} variant={'tertiary'}>
            надіслати
          </Button>
        </div>
      </div>

      <div className="w-1/2">
        <h1>Games</h1>
        <div>
          {games.map(game => (
            <div key={game.id}>
              <p>id: {game.id}</p>
              <div>
                Players:
                {game.players?.map(player => (
                  <div key={player.id}>
                    <p>{player.user.nickname}</p>
                  </div>
                ))}
                <button
                  className="bg-rose-600"
                  onClick={() => handleLeaveGame(game.id)}
                >
                  Leave game
                </button>
              </div>
              <button
                className="bg-lime-600"
                onClick={() => handleJoinGame(game.id)}
              >
                Join Game
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;
