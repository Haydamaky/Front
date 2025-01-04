import { Fragment, useEffect, useState } from 'react';
import { socket } from '@/socket';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { Field } from '@/types/field';
import FieldComponent from './FieldComponent';
import { setFields } from '@/store/slices/fields';
import PlayersChips from './players/PlayersChips';
import { setGame } from '@/store/slices/game';
import Center from './Center';

const GameBoard = () => {
  const fields = useAppSelector(state => state.fields.fields);
  const dispatch = useAppDispatch();
  const [dices, setDices] = useState<string[]>([]);
  useEffect(() => {
    socket.on('error', (err: any) => console.log(err));
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
    };
  }, []);

  return (
    <div className="relative grid h-[100vh] w-[calc(100vh-3rem)] grid-cols-[14fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_14fr] grid-rows-[14fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_14fr] gap-[1px] py-8 text-black">
      {fields.map((field: Field, index: number) => {
        if (index === 13) {
          return (
            <Fragment key={field.id}>
              <div className="bg-primaryGame col-span-9 col-start-2 row-span-9 row-start-2">
                <Center />
              </div>
              <FieldComponent field={field} />
            </Fragment>
          );
        }
        return <FieldComponent field={field} key={field.id} />;
      })}
      <PlayersChips />
    </div>
  );
};

export default GameBoard;
