import GamesList from './_components/GamesList/GamesList';
import MutualChat from './_components/MutualChat';

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
      <MutualChat />
      <GamesList />
    </div>
  );
};

export default RoomsPage;
