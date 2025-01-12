import { useAppSelector } from '@/hooks/store';
import { socket } from '@/socket';
import { Field } from '@/types/field';
import { Fragment, useEffect } from 'react';
import Center from './Center';
import FieldComponent from './FieldComponent';
import PlayerChipsContainer from './players/PlayerChipsContainer';

const GameBoard = () => {
  const fields = useAppSelector(state => state.fields.fields);

  useEffect(() => {
    socket.on('error', (err: any) => console.log(err));
    return () => {
      socket.off('error');
    };
  }, []);

  return (
    <div className="relative grid h-[100vh] w-[calc(100vh-3rem)] grid-cols-[14fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_14fr] grid-rows-[14fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_14fr] gap-[1px] py-10 text-black">
      {fields.map((field: Field, index: number) => {
        if (index === 13) {
          return (
            <Fragment key={field.id}>
              <div className="col-span-9 col-start-2 row-span-9 row-start-2 bg-primaryGame">
                <Center />
              </div>
              <FieldComponent field={field} />
            </Fragment>
          );
        }
        return <FieldComponent field={field} key={field.id} />;
      })}
      <PlayerChipsContainer />
    </div>
  );
};

export default GameBoard;
