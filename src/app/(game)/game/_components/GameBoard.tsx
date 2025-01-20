import { useAppSelector } from '@/hooks/store';
import { socket } from '@/socket';
import { Field } from '@/types/field';
import { Fragment, useEffect, useState, useRef } from 'react';
import Center from './Center';
import FieldComponent from './FieldComponent';
import PlayerChipsContainer from './players/PlayerChipsContainer';
import InspectField from './InspectField';
import { Button } from '@/components/ui/button';

const GameBoard = () => {
  const fields = useAppSelector(state => state.fields.fields);
  const { data: user } = useAppSelector(state => state.user);
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
  const groupOfField = fields.filter(
    field => field.group === fieldClicked?.group,
  );
  const userHasAllGroup = groupOfField.every(
    field => field.ownedBy === user?.id,
  );
  const handlePledgeField = () => {
    socket.emit('pledgeField', { index: fieldClicked?.index });
  };
  let buttons: JSX.Element | null = null;

  if (fieldClicked?.ownedBy === user?.id && !userHasAllGroup) {
    buttons = fieldClicked?.isPledged ? (
      <div className="bg-greedGradient mt-2 w-[90%] rounded-[3px] p-[1px] font-custom">
        <Button variant="forGradient" size="inspectField">
          Викупити
        </Button>
      </div>
    ) : (
      <div
        onClick={handlePledgeField}
        className="bg-redGradient mt-2 w-[90%] rounded-[3px] p-[1px] font-custom"
      >
        <Button variant="forGradient" size="inspectField">
          Застава
        </Button>
      </div>
    );
  }

  if (fieldClicked?.ownedBy === user?.id && userHasAllGroup) {
    const isInvestable = fieldClicked?.amountOfBranches === 0;

    buttons = (
      <div className="mt-2 flex w-[90%] items-center justify-center gap-2 font-custom">
        <Button variant="blueGame" size="inspectField">
          Інвест
        </Button>
        <div
          onClick={handlePledgeField}
          className="bg-redGradient w-full rounded-[3px] p-[1px]"
        >
          <Button variant="forGradient" size="inspectField">
            {isInvestable ? 'Застава' : 'Продаж'}
          </Button>
        </div>
      </div>
    );
  }

  if (fieldClicked?.ownedBy !== user?.id) {
    buttons = null;
  }
  console.log({ fieldClicked });
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
        <InspectField
          field={fieldClicked}
          ref={inspectFieldRef}
          buttons={buttons}
        />
      )}
    </div>
  );
};

export default GameBoard;
