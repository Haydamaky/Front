import { useAppSelector } from '@/hooks/store';
import { socket } from '@/socket';
import { Field } from '@/types/field';
import { Fragment, useEffect, useState, useRef } from 'react';
import Center from './Center';
import FieldComponent from './FieldComponent';
import PlayerChipsContainer from './players/PlayerChipsContainer';
import InspectField from './InspectField';

const GameBoard = () => {
  const fields = useAppSelector(state => state.fields.fields);
  const [fieldClicked, setFieldClicked] = useState<null | Field>(null);
  const inspectFieldRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    socket.on('error', (err: any) => console.log(err));
    return () => {
      socket.off('error');
    };
  }, []);

  const handleFieldClicked = (field: Field) => {
    setFieldClicked(field);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      inspectFieldRef.current &&
      !inspectFieldRef.current.contains(event.target as Node)
    ) {
      setFieldClicked(null);
    }
  };

  useEffect(() => {
    if (fieldClicked) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [fieldClicked]);

  return (
    <div className="relative grid h-[100vh] w-[calc(100vh-3rem)] grid-cols-[14fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_14fr] grid-rows-[14fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_14fr] gap-[1px] py-10 text-black">
      {fields.map((field: Field, index: number) => {
        if (index === 13) {
          return (
            <Fragment key={field.id}>
              <div className="col-span-9 col-start-2 row-span-9 row-start-2 bg-primaryGame">
                <Center />
              </div>
              <FieldComponent field={field} onClick={handleFieldClicked} />
            </Fragment>
          );
        }
        return (
          <FieldComponent
            field={field}
            key={field.id}
            onClick={handleFieldClicked}
          />
        );
      })}
      <PlayerChipsContainer />
      {fieldClicked && (
        <InspectField field={fieldClicked} ref={inspectFieldRef} />
      )}
    </div>
  );
};

export default GameBoard;
