import { useEffect, useState } from 'react';
import { socket } from '@/socket';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { Field } from '@/types/field';
import FieldComponent from './FieldComponent';
import { setFields } from '@/store/slices/fields';
import PlayersChips from './PlayersChips';
import { setGame } from '@/store/slices/game';

const GameBoard = () => {
  const fields = useAppSelector(state => state.fields.fields);
  const dispatch = useAppDispatch();
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
      dispatch(setFields(data.fields));
      dispatch(setGame(data.game));
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
    <div className="relative grid h-[100vh] w-[calc(100vh-1.5rem)] grid-cols-[16fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_16fr] grid-rows-[16fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_16fr] gap-[1px] py-4 text-black">
      {fields.map((field: Field, index: number) => {
        if (index === 13) {
          return (
            <>
              <div className="col-span-9 col-start-2 row-span-9 row-start-2 bg-white">
                <p className="text-center">Center</p>
              </div>
              <FieldComponent field={field} key={field.id} />
            </>
          );
        }
        return <FieldComponent field={field} key={field.id} />;
      })}
      <PlayersChips />
      {/* <div>
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
      )} */}
    </div>
  );
};

export default GameBoard;
