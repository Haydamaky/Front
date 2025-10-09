import type { FC } from 'react';
import { Player } from '@/types/player';
import RollDiceAction from './RollDiceAction';
import BuyFieldAction from './BuyFieldAction';
import PayRentAction from './PayRentAction';
import VDNHAction from './VDNHAction';
import CoinAction from './CoinAction';
import SecretPayAction from './SecretPayAction';
import { Action } from '@/types';
import { Field } from '@/types/field';
import { useAppSelector } from '@/hooks/store';
import { ACTION_TITLES } from '../../_utils/constants';
import { api } from '@/api/build/api';

interface Props {
  action: Action;
  currentField: Field;
  secretInfo: {
    users: string[];
    amounts: number[];
  };
  amountToPay: number;
}

const ActionsSection: FC<Props> = ({
  action,
  currentField,
  secretInfo,
  amountToPay,
}) => {
  let renderJsx = null;

  const game = useAppSelector(state => state.game.game);
  const { data: user } = useAppSelector(state => state.user);

  const payForSecret = () => {
    if (secretInfo.users.length > 2 && secretInfo.amounts[0] === null) {
      api.payToUserForSecret();
    } else {
      api.payToBankForSecret();
    }
  };
  console.log('action', action);
  switch (action) {
    case 'rollDice':
      renderJsx = <RollDiceAction onRollDice={api.rollDice} />;
      break;

    case 'buy':
      if (!currentField.ownedBy) {
        renderJsx = (
          <BuyFieldAction
            fieldPrice={currentField.price}
            onBuyField={api.buyField}
            onPutUpForAuction={api.putUpForAuction}
          />
        );
      }
      if (currentField.ownedBy && currentField.ownedBy !== user?.id) {
        renderJsx = (
          <PayRentAction
            rentAmount={currentField.income[currentField.amountOfBranches]}
            onPayRent={api.payForPrivateField}
          />
        );
      }
      renderJsx = null;
      break;

    case 'payForField':
      renderJsx = (
        <PayRentAction
          rentAmount={currentField.income[currentField.amountOfBranches]}
          onPayRent={api.payForPrivateField}
        />
      );
      break;

    case 'VDNH':
      renderJsx = (
        <VDNHAction
          amountToPay={currentField.toPay || 0}
          onPay={api.payToBankForSpecialField}
        />
      );
      break;

    case 'COIN':
      renderJsx = (
        <CoinAction
          amountToPay={currentField.toPay || 0}
          onPay={api.payToBankForSpecialField}
        />
      );
      break;

    case 'secretPay':
      renderJsx = (
        <SecretPayAction
          secretInfo={secretInfo}
          amountToPay={amountToPay}
          gamePlayers={game.players}
          onPay={payForSecret}
        />
      );
      break;
  }
  console.log('renderJsx', renderJsx);
  return (
    <div className="flex flex-col justify-between rounded-xl bg-gameCenterModal px-4 py-2 text-xs text-white shadow-gameCenterModaShadowCombined lg:py-3">
      <div className="mb-3 text-small font-bold md:text-standard lg:text-xl xl:text-3xl">
        {ACTION_TITLES[action as keyof typeof ACTION_TITLES]}
      </div>
      {renderJsx}
    </div>
  );
};

export default ActionsSection;
