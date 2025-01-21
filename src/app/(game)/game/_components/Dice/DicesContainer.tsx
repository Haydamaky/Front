import { useAppDispatch } from '@/hooks/store';
import Dice from './Dice';
import { useEffect, useState } from 'react';
import { Game } from '@/types';
import { socket } from '@/socket';
import { setGame } from '@/store/slices/game';
import { setFields } from '@/store/slices/fields';
import { Field } from '@/types/field';

const DicesContainer = () => {
  const dispatch = useAppDispatch();

  const [localGameAfterDiceRoll, setLocalGameAfterDiceRoll] =
    useState<null | Game>(null);
  const [localFields, setLocalFields] = useState<Field[]>([]);

  useEffect(() => {
    const handleRollDiced = (data: any) => {
      setLocalGameAfterDiceRoll(data.game);
      setLocalFields(data.fields);
    };
    const handlePassTurnToNext = (data: any) => {
      setLocalGameAfterDiceRoll(null);
    };
    socket.on('passTurnToNext', handlePassTurnToNext);
    socket.on('rolledDice', handleRollDiced);
    return () => {
      socket.off('rolledDice', handleRollDiced);
      socket.off('passTurnToNext', handlePassTurnToNext);
    };
  }, []);
  let dicesArrStr: string[];
  if (localGameAfterDiceRoll?.dices) {
    dicesArrStr = localGameAfterDiceRoll.dices.split(':');
  } else {
    dicesArrStr = [];
  }

  const diceNumbArr = dicesArrStr.map(Number);

  if (!localGameAfterDiceRoll) return;
  return (
    <div className="absolute left-[50%] top-[46%] translate-x-[-50%] translate-y-[-50%]">
      <div className="flex gap-5">
        {diceNumbArr.map((dice, index) => {
          if (index === diceNumbArr.length - 1)
            return (
              <Dice
                key={index}
                id={index}
                diceNum={dice}
                afterAnimation={() => {
                  dispatch(setGame(localGameAfterDiceRoll));
                  dispatch(setFields(localFields));
                }}
              />
            );
          return <Dice diceNum={dice} id={index} key={index} />;
        })}
      </div>
    </div>
  );
};

export default DicesContainer;
