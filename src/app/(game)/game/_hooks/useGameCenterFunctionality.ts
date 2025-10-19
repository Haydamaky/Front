import { api } from '@/api/build/api';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setGame } from '@/store/slices/game';
import { Action, DataWithGame } from '@/types';
import { AuctionType } from '@/types/auction';
import { Player } from '@/types/player';
import { TradeData } from '@/types/trade';
import { useEffect, useRef, useState } from 'react';

export const useGameCenterFunctionality = () => {
  const dispatch = useAppDispatch();
  const fields = useAppSelector(state => state.fields.fields);
  const game = useAppSelector(state => state.game.game);
  const { data: user } = useAppSelector(state => state.user);
  const [action, setAction] = useState<Action>(
    game.turnOfUserId === user?.id && !game.dices ? 'rollDice' : '',
  );

  const { data: chipTransition } = useAppSelector(
    state => state.chipTransition,
  );
  const { data: trade } = useAppSelector(state => state.trade);
  const [tradeAcceptance, setTradeAcceptance] = useState<null | TradeData>(
    null,
  );
  const [playerWon, setPlayerWon] = useState<undefined | Player>(undefined);
  const [playerWithTurn] = game.players.filter(
    player => player.userId === game.turnOfUserId,
  );
  const [currentField] = fields.filter(
    field => field.index === playerWithTurn?.currentFieldIndex,
  );
  const [secretInfo, setSecretInfo] = useState<{
    users: string[];
    amounts: number[];
  }>({
    users: [],
    amounts: [],
  });
  const [amountToPay, setAmountToPay] = useState(0);
  const rolledDice = useRef(false);
  const [auction, setAuction] = useState<null | AuctionType>(null);

  useEffect(() => {
    if (rolledDice.current) {
      if (!currentField.ownedBy && !currentField.specialField) {
        setAction('buy');
      }
      if (currentField.ownedBy && currentField.ownedBy !== user?.id) {
        setAction('payForPrivateField');
      }
      if (currentField.toPay && currentField.name === 'ВДНХ') {
        setAction('VDNH');
      }
      if (currentField.toPay && currentField.name === 'COIN') {
        setAction('COIN');
      }

      if (currentField.secret && secretInfo) {
        if (secretInfo.users.length === 1) {
          if (secretInfo.amounts[0] < 0) {
            setAction('secretPay');
            setAmountToPay(secretInfo.amounts[0]);
          }
        } else if (secretInfo.users.length === 2) {
          const index = secretInfo.users.findIndex(
            userId => userId === user?.id,
          );
          if (secretInfo.amounts[index] < 0) {
            setAction('secretPay');
            setAmountToPay(secretInfo.amounts[index]);
          }
        } else if (
          secretInfo.users.length > 2 &&
          user?.id !== secretInfo.users[0]
        ) {
          if (secretInfo.amounts.length === 2) {
            if (secretInfo.amounts[1] < 0) {
              setAction('secretPay');
              setAmountToPay(secretInfo.amounts[1]);
            }
          }

          if (secretInfo.amounts.length === 1) {
            if (secretInfo.amounts[0] < 0) {
              setAction('secretPay');
              setAmountToPay(secretInfo.amounts[0]);
            }
          }
        }
      }
      rolledDice.current = false;
    }
  }, [game]);
  useEffect(() => {
    const handleRolledDice = (data: any) => {
      rolledDice.current = true;
      setAction('');
    };
    const handleHasPutUpForAuction = (data: any) => {
      setAction('auction');
      setAuction(data.auction);
    };
    const handleChangeAuction = (data: any) => {
      setAuction(data.auction);
    };
    const handleSecret = (data: any) => {
      setSecretInfo(data);
    };
    const handleUpdatePlayers = (data: any) => {
      setSecretInfo(data.secretInfo);
      if (!data?.secretInfo?.users?.includes(user?.id || 'notIncluded'))
        setAction('');
      dispatch(setGame(data.game));
    };
    const handlePassTurnToNext = (data: DataWithGame) => {
      if (data.game.turnOfUserId === user?.id) {
        setAction('rollDice');
      } else {
        setAction('');
      }
    };
    const onPlayerWon = (data: any) => {
      const playerWon = data.game.players.find(
        (player: Player) => !player.lost,
      ) as Player | undefined;

      if (playerWon) {
        setPlayerWon(playerWon);
      }
    };
    const handleGameData = (data: any) => {
      if (data.auction) {
        setAction('auction');
        setAuction(data.auction);
      }
      if (data.secretInfo) {
        setSecretInfo(data);
      }
    };
    const handleTradeOffered = (data: any) => {
      setTradeAcceptance(data.trade);
    };
    api.on.tradeOffered(handleTradeOffered);
    api.on.gameData(handleGameData);
    api.on.playerWon(onPlayerWon);
    api.on.raisedPrice(handleChangeAuction);
    api.on.refusedFromAuction(handleChangeAuction);
    api.on.rolledDice(handleRolledDice);
    api.on.hasPutUpForAuction(handleHasPutUpForAuction);
    api.on.passTurnToNext(handlePassTurnToNext);
    api.on.secret(handleSecret);
    api.on.updatePlayers(handleUpdatePlayers);
    return () => {
      api.off.rolledDice(handleRolledDice);
      api.off.refusedFromAuction(handleChangeAuction);
      api.off.raisedPrice(handleChangeAuction);
      api.off.passTurnToNext(handlePassTurnToNext);
      api.off.playerWon(onPlayerWon);
      api.off.secret(handleSecret);
      api.off.updatePlayers(handleUpdatePlayers);
      api.off.gameData(handleGameData);
      api.off.tradeOffered(handleTradeOffered);
    };
  }, [user]);

  const turnOfUser = game.turnOfUserId === user?.id;
  const currentPlayer = game.players.find(player => player.userId === user?.id);

  return {
    tradeAcceptance,
    setTradeAcceptance,
    trade,
    action,
    currentField,
    secretInfo,
    amountToPay,
    playerWon,
    game,
    user,
    chipTransition,
    turnOfUser,
    auction,
    currentPlayer,
  };
};
