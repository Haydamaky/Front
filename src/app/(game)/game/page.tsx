'use client';

import { useEffect, useState } from 'react';
import { socket } from '@/socket';
import { useAppSelector } from '@/hooks/store';
import PlayersList from './_components/PlayersList';

const GamePage = () => {
  const [dices, setDices] = useState<string[]>([]);
  useEffect(() => {
    socket.on('error', (err: any) => console.log(err));

    socket.on('tradedField', (data: any) => {
      let dicesData = data.dices;
      setDices(dicesData ? dicesData.split(':') : []);
    });

    socket.on('rolledDice', (data: any) => {
      console.log('rolledDice');
      let dicesData = data.dices;
      setDices(dicesData ? dicesData.split(':') : []);
    });
    return () => {
      socket.off('rolledDice');
      socket.off('error');
      socket.off('tradedField');
    };
  }, []);

  const onRollDice = () => {
    socket.emit('rollDice');
  };

  const onTradeField = () => {
    socket.emit('tradeField');
  };
  return (
    <div className="grid h-full grid-cols-[12fr_88fr] gap-5">
      <PlayersList />
      <div className="">
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
    </div>
  );
};

export default GamePage;
