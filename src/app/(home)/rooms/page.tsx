'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { socket } from '@/socket';
import { MUTUAL_CHAT_ID } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { Game } from '@/types/game';
import { MessageObjType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@nextui-org/input';
import { formatDateToTime } from '@/lib/utils';
import { useAppSelector } from '@/hooks/store';

const RoomsPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState<MessageObjType>({
    text: '',
    chatId: MUTUAL_CHAT_ID,
    updatedAt: '',
    senderId: '',
  });
  const [messages, setMessages] = useState<MessageObjType[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const user = useAppSelector(state => state.user);
  const handleOnMessage = (data: MessageObjType) => {
    setMessages(prevMessages => [...prevMessages, data]);
    console.log('hui');
    console.log({ scrolledToBottom: isScrolledToBottom(containerRef.current) });
    if (
      data.senderId === user.data?.id ||
      isScrolledToBottom(containerRef.current)
    ) {
      setScroll(_ => true);
    }
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
    socket.on('onMessage', handleOnMessage);
    socket.on('clearStartedGame', handleClearStartedGame);
    socket.on('startGame', handleStartGame);
    socket.on('onParticipateGame', handleOnParticipateGame);
    socket.on('error', console.error);
    fetchChatData();
    fetchGames();
    return () => {
      socket.off('onMessage', handleOnMessage);
      socket.off('clearStartedGame', handleClearStartedGame);
      socket.off('startGame', handleStartGame);
      socket.off('onParticipateGame', handleOnParticipateGame);
      socket.off('error');
    };
  }, [router]);

  const sendMessage = () => {
    socket.emit('newMessage', { text: message.text, chatId: MUTUAL_CHAT_ID });
    setMessage(prevMessage => ({ ...prevMessage, text: '' }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handleJoinGame = (id: string) => {
    socket.emit('joinGame', { id });
  };

  const handleLeaveGame = (id: string) => {
    socket.emit('leaveGame', { id });
  };

  const containerRef = useRef<HTMLDivElement | null>(null);
  function isScrolledToBottom(container: HTMLDivElement | null) {
    if (container) {
      return (
        container.scrollHeight - container.scrollTop - container.clientHeight <
        10
      );
    }
  }

  const [scroll, setScroll] = useState(true);
  const messageRef = useCallback((node: any) => {
    if (node) {
      node.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
      });
      setScroll(false);
    }
  }, []);

  return (
    <div className="mx-auto grid h-[300vh] w-11/12 max-w-7xl grid-cols-1 md:w-full md:grid-cols-[45fr_55fr] md:gap-8 lg:gap-16">
      <div className="flex h-[40vh] max-w-3xl flex-col rounded-lg border-2 border-solid px-2 md:sticky md:top-[10vh] md:h-[80vh]">
        <h1 className="mx-auto w-32 text-center font-custom text-sm">
          Спільний чат
        </h1>
        <div className="scrollbar flex-1 overflow-y-scroll" ref={containerRef}>
          {messages.map((message, index: number) => {
            const time = formatDateToTime(message.updatedAt);
            if (index === messages.length - 1 && scroll) {
              return (
                <div key={message.id}>
                  <p
                    className="bg-pink-400"
                    ref={messageRef}
                  >{`${time} ${message.sender?.nickname} - ${message.text}`}</p>
                </div>
              );
            }
            return (
              <div key={message.id}>
                <p>{`${time} ${message.sender?.nickname} - ${message.text}`}</p>
              </div>
            );
          })}
        </div>
        <div className="mb-1 mt-1 flex items-center">
          <Input
            className="mr-2 w-full"
            type="text"
            size={'sm'}
            value={message.text}
            onKeyDown={handleKeyDown}
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
