import { useAppSelector } from '@/hooks/store';
import { Field } from '@/types/field';
import { Fragment, useEffect, useState, useRef } from 'react';
import Center from './Center';
import FieldComponent from './FieldComponent';
import PlayerChipsContainer from './players/PlayerChipsContainer';
import InspectField from './InspectField';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { api } from '@/api/api';

const GameBoard = () => {
  const fields = useAppSelector(state => state.fields.fields);

  const { data: user } = useAppSelector(state => state.user);
  const { game } = useAppSelector(state => state.game);
  const [fieldClicked, setFieldClicked] = useState<null | Field>(null);
  const inspectFieldRef = useRef<HTMLDivElement | null>(null);

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

  const handleMortgageField = () => {
    api.mortgageField({ index: fieldClicked?.index });
    setFieldClicked(null);
  };
  const handlePayRedeptionField = () => {
    api.unmortgageField({ index: fieldClicked?.index });
    setFieldClicked(null);
  };
  const handleBuyBranch = () => {
    api.buyBranch({ index: fieldClicked?.index });
    api.buyBranch({ index: fieldClicked?.index });
    setFieldClicked(null);
  };
  const handleSellBranch = () => {
    api.sellBranch({ index: fieldClicked?.index });
    api.sellBranch({ index: fieldClicked?.index });
    setFieldClicked(null);
  };
  let buttons: JSX.Element | null = null;
  const noBranches = fieldClicked?.amountOfBranches === 0;
  const maxBranches = fieldClicked?.amountOfBranches === 5;
  if (fieldClicked?.ownedBy === user?.id && userHasAllGroup) {
    buttons = (
      <div className="mt-2 flex w-[90%] items-center justify-center gap-2 font-custom">
        {!maxBranches && (
          <Button
            onClick={handleBuyBranch}
            variant="blueGame"
            size="inspectField"
          >
            Invest
          </Button>
        )}
        {noBranches ? (
          <div
            onClick={handleMortgageField}
            className="w-full rounded-[3px] bg-redGradient p-[1px]"
          >
            <Button variant="forGradient" size="inspectField">
              Pledge
            </Button>
          </div>
        ) : (
          <div
            onClick={handleSellBranch}
            className="w-full rounded-[3px] bg-redGradient p-[1px]"
          >
            <Button variant="forGradient" size="inspectField">
              Sale
            </Button>
          </div>
        )}
      </div>
    );
  }

  if (fieldClicked?.ownedBy === user?.id && !userHasAllGroup) {
    buttons = fieldClicked?.isPledged ? (
      <div
        onClick={handlePayRedeptionField}
        className="mt-2 w-[90%] rounded-[3px] bg-greedGradient p-[1px] font-custom"
      >
        <Button variant="forGradient" size="inspectField">
          Redeem
        </Button>
      </div>
    ) : (
      <div
        onClick={handleMortgageField}
        className="mt-2 w-[90%] rounded-[3px] bg-redGradient p-[1px] font-custom"
      >
        <Button variant="forGradient" size="inspectField">
          Pledge
        </Button>
      </div>
    );
  }
  if (
    fieldClicked?.ownedBy === user?.id &&
    userHasAllGroup &&
    fieldClicked?.isPledged
  ) {
    buttons = (
      <div
        onClick={handlePayRedeptionField}
        className="mt-2 w-[90%] rounded-[3px] bg-greedGradient p-[1px] font-custom"
      >
        <Button variant="forGradient" size="inspectField">
          Redeem
        </Button>
      </div>
    );
  }
  if (fieldClicked?.ownedBy !== user?.id) {
    buttons = null;
  }
  return (
    <div className="relative grid h-[100vh] w-[calc(100vh-3rem)] grid-cols-[14fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_14fr] grid-rows-[14fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_7fr_14fr] gap-[1px] py-10 text-black">
      {fields &&
        fields.map((field: Field, index: number) => {
          if (index === 13) {
            return (
              <Fragment key={field._id}>
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
              key={field._id}
              onClick={handleFieldClicked}
            />
          );
        })}
      <PlayerChipsContainer />
      {fieldClicked && (
        <InspectField
          field={fieldClicked}
          infoFieldRef={inspectFieldRef}
          buttons={buttons}
        />
      )}
      <div className="absolute right-[-40%] top-[6%] flex w-[27%] flex-col text-white">
        <h2>Number of houses and hotels:</h2>
        <div className="mt-4 flex w-full justify-between">
          <div className="flex items-center gap-4">
            <p className="text-2xl">x{game.housesQty}</p>
            <Image
              src="/images/BuildSilver.svg"
              alt="silver-building"
              width={30}
              height={38}
            />
          </div>
          <div className="flex items-center gap-4">
            <p className="text-2xl">x{game.hotelsQty}</p>
            <Image
              src="/images/BuildGold.svg"
              alt="silver-building"
              width={42}
              height={42}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
