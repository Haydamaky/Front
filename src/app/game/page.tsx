'use client';

import { useEffect, useRef, useState } from 'react';
import { socket } from '../../socket';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setGame, setGame as setGameRedux } from '../../store/GameSlice';

type MessageObjType = {
  text: string;
  chatId: string;
  userId?: number;
  nickname?: string;
};

const GamePage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<MessageObjType[]>([]);
  const game = useAppSelector(state => state.game.game);
  const [dices, setDices] = useState<string[]>([]);
  const [turnTime, setTurnTime] = useState(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    fetch('http://localhost:3000/games/currentGame', { credentials: 'include' })
      .then(data => data.json())
      .then(currentGame => {
        dispatch(setGameRedux(currentGame));
      });

    socket.on('error', (err: any) => {
      console.log(err);
    });

    socket.on('rejoin', (data: any) => {
      let dicesData = data.dices;
      if (!data.dices) {
        setDices([]);
      } else {
        const dices = dicesData.split(':');
        setDices(dices);
      }
      const now = Date.now();
      const timeToEnd = Math.floor((+data.turnEnds - now) / 1000);
      setTurnTime(timeToEnd);
      let countDown = timeToEnd;
      if (interval) clearInterval(interval);
      interval = setInterval(() => {
        console.log({ countDown, timeToEnd });
        if (countDown <= 0) {
          console.log('clearINterval');
          clearInterval(interval);
          return;
        }
        countDown--;
        setTurnTime(prev => prev - 1);
      }, 1000);
    });

    socket.on('tradedField', (data: any) => {
      let dicesData = data.dices;
      if (!data.dices) {
        setDices([]);
      } else {
        const dices = dicesData.split(':');
        setDices(dices);
      }
      const now = Date.now();
      const timeToEnd = Math.floor((+data.turnEnds - now) / 1000);
      setTurnTime(timeToEnd);
      let countDown = timeToEnd;
      if (interval) clearInterval(interval);
      interval = setInterval(() => {
        console.log({ countDown, timeToEnd });
        if (countDown <= 0) {
          console.log('clearINterval');
          clearInterval(interval);
          return;
        }
        countDown--;
        setTurnTime(prev => prev - 1);
      }, 1000);
    });
    let interval: NodeJS.Timeout;
    socket.on('rolledDice', data => {
      console.log('rolledDIce');
      let dicesData = data.dices;
      if (!data.dices) {
        setDices([]);
      } else {
        const dices = dicesData.split(':');
        setDices(dices);
      }
      const now = Date.now();
      const timeToEnd = Math.floor((+data.turnEnds - now) / 1000);
      setTurnTime(timeToEnd);
      let countDown = timeToEnd;
      if (interval) clearInterval(interval);
      interval = setInterval(() => {
        console.log({ countDown, timeToEnd });
        if (countDown <= 0) {
          console.log('clearINterval');
          clearInterval(interval);
          return;
        }
        countDown--;
        setTurnTime(prev => prev - 1);
      }, 1000);
    });

    return () => {
      if (interval) {
        clearInterval(interval);
      }
      socket.off('rolledDice');
      socket.off('onMessage');
      socket.off('startTradeField');
      socket.off('error');
      socket.off('rejoin');
      socket.off('tradedField');
    };
  }, []);

  const onRollDice = () => {
    socket.emit('rollDice');
  };

  const onRejoin = () => {
    socket.emit('rejoinGame');
  };

  const onTradeField = () => {
    socket.emit('tradeField');
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
      <div className="mr-20">{turnTime}</div>
      <div className="mr-20">
        <div>
          <div>First Dice: {dices[0]}</div>
          <div className="min-w-60">Second Dice: {dices[1]}</div>
        </div>
        {!!dices.length && (
          <button className="bg-orange-500" onClick={onTradeField}>
            Trade Field
          </button>
        )}
        {!dices.length && (
          <button className="ml-4 bg-lime-400" onClick={onRollDice}>
            Roll Dice
          </button>
        )}
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
