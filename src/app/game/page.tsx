'use client';

import { useEffect, useState } from 'react';
import { socket } from '../../socket';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setGame, setGame as setGameRedux } from '../../store/GameSlice';

type MessageObjType = {
  text: string;
  chatId: string;
  userId?: number;
  nickname?: string;
};

interface Dices {
  firstDice: number;
  secondDice: number;
}

const GamePage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<MessageObjType[]>([]);
  const game = useAppSelector(state => state.game.game);
  const [dices, setDices] = useState<Dices>({} as Dices);
  const dispatch = useAppDispatch();
  useEffect(() => {
    fetch('http://localhost:3000/games/currentGame', { credentials: 'include' })
      .then(data => data.json())
      .then(currentGame => {
        dispatch(setGame(currentGame));
      });
    socket.on('rolledDice', data => {
      setDices(data.dices);
    });
    dispatch(setGameRedux(game));
    return () => {
      socket.off('onMessage');
      socket.off('error');
    };
  }, []);

  const onRollDice = () => {
    socket.emit('rollDice');
  };
  return (
    <div className="space-between flex">
      <div className="w-1/2">
        <h1>Game</h1>
        <div>
          {game.players?.map(player => (
            <div key={player.id}>
              <p>{player.user.nickname}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div>
          <div>First Dice: {dices.firstDice}</div>
          <div>Second Dice: {dices.secondDice}</div>
        </div>
        <button className="bg-lime-400" onClick={onRollDice}>
          Roll Dice
        </button>
      </div>
      <div className="w-1/2">
        <h1>Chat</h1>
        <div>
          {messages.length &&
            messages.map((msgObj, index) => <p key={index}>{msgObj.text}</p>)}
        </div>
        <input
          type="text"
          //   value={message?.text}
          //   onChange={e =>
          //     setMessage(prevMessageObj => ({
          //       ...prevMessageObj,
          //       text: e.target.value,
          //     }))
          //   }
          placeholder="Type your message..."
        />
        <button>Send</button>
      </div>
    </div>
  );
};

export default GamePage;
