import { createColorVariants, positionCoors } from '../../_utils';
import { findClosest } from '../../_utils/findClosest';
import { useEffect, useRef, useState } from 'react';
import PlayerChip from './PlayerChip';
import { Game } from '@/types';
import { socket } from '@/socket';
const colorVariants = createColorVariants('bg', '500');
const colorVariantsDarker = createColorVariants('bg', '700');
const PlayersChips = () => {
  const [gameAfterDiceRoll, setGameAfterDiceRoll] = useState<null | Game>(null);
  useEffect(() => {
    const handleRollDiced = (data: any) => {
      setGameAfterDiceRoll(data.game);
    };
    const handleGetGameData = (data: any) => {
      setGameAfterDiceRoll(data.game);
    };
    socket.emit('getGameData', handleGetGameData);
    socket.on('rolledDice', handleRollDiced);
    return () => {
      socket.off('rolledDice', handleRollDiced);
    };
  }, []);
  return (
    <>
      {gameAfterDiceRoll &&
        gameAfterDiceRoll?.players.map((player: any, index: number) => {
          const colorOfPlayer = colorVariants[player.color];
          const colorOfPlayerDarker = colorVariantsDarker[player.color];
          const playersOnSameField = gameAfterDiceRoll?.players.filter(
            (checkingPlayer: any) =>
              checkingPlayer.currentFieldIndex === player.currentFieldIndex &&
              checkingPlayer.userId !== player.userId,
          );
          let translate = '';
          const isHorizonatlField =
            player.currentFieldIndex < 11 ||
            (player.currentFieldIndex > 20 && player.currentFieldIndex < 31);
          const dicesStringsArr = gameAfterDiceRoll?.dices.split(':');
          const dicesNumArr = dicesStringsArr.map(Number);
          let indexBefore =
            player.currentFieldIndex - dicesNumArr[0] - dicesNumArr[1];
          if (indexBefore < 0) {
            indexBefore += 40;
          }
          const onSameLineStill =
            (indexBefore <= 11 && player.currentFieldIndex <= 11) ||
            (indexBefore >= 11 &&
              indexBefore <= 21 &&
              player.currentFieldIndex >= 11 &&
              player.currentFieldIndex <= 21) ||
            (indexBefore >= 21 &&
              indexBefore <= 31 &&
              player.currentFieldIndex >= 21 &&
              player.currentFieldIndex <= 31) ||
            (indexBefore >= 31 && player.currentFieldIndex >= 31);
          const indexInPositionsArray = player.currentFieldIndex - 1;
          let closestCornerOnWay = (indexBefore + player.currentFieldIndex) / 2;
          let posOfPlayer = positionCoors[indexInPositionsArray];
          const beforeToPos =
            !onSameLineStill &&
            player.userId === gameAfterDiceRoll?.turnOfUserId &&
            positionCoors[
              indexBefore >= 31 ? 0 : findClosest(closestCornerOnWay)
            ];
          const userIdsInOrderToTurn = gameAfterDiceRoll?.players.map(
            player => player.userId,
          );
          let indexOfPlayerToTurn =
            userIdsInOrderToTurn.indexOf(gameAfterDiceRoll?.turnOfUserId) +
              1 ===
            4
              ? 0
              : userIdsInOrderToTurn.indexOf(gameAfterDiceRoll?.turnOfUserId) +
                1;

          let numberOfPlayersToTurnBefore =
            (index - indexOfPlayerToTurn + gameAfterDiceRoll?.players.length) %
            gameAfterDiceRoll?.players.length;
          const playersToTurnBefore: any = [];
          let indexOfPlayerToTurnTemp = indexOfPlayerToTurn;
          for (let i = 0; i < numberOfPlayersToTurnBefore; i++) {
            playersToTurnBefore.push(
              gameAfterDiceRoll?.players[indexOfPlayerToTurnTemp],
            );
            indexOfPlayerToTurnTemp++;
            if (indexOfPlayerToTurnTemp === gameAfterDiceRoll?.players.length) {
              indexOfPlayerToTurnTemp = 0;
            }
          }
          const playersToTurnBeforeOnSameField = playersOnSameField.filter(
            playerOnSameField => {
              return playersToTurnBefore.some((playerToTurnBefore: any) => {
                return playerToTurnBefore.userId === playerOnSameField.userId;
              });
            },
          );

          if (isHorizonatlField) {
            translate = 'translateY(';
            if (playersOnSameField.length === 3) {
              translate +=
                (100 * playersToTurnBeforeOnSameField.length - 150).toString() +
                '%)';
            } else if (playersOnSameField.length === 2) {
              translate +=
                (100 * playersToTurnBeforeOnSameField.length - 100).toString() +
                '%)';
            } else if (playersOnSameField.length === 1) {
              translate +=
                (100 * playersToTurnBeforeOnSameField.length - 50).toString() +
                '%)';
            } else {
              translate = 'translateY(0)';
            }
          } else {
            translate = 'translateX(';
            if (playersOnSameField.length === 3) {
              translate +=
                (150 - 100 * playersToTurnBeforeOnSameField.length).toString() +
                '%)';
            } else if (playersOnSameField.length === 2) {
              translate +=
                (100 - 100 * playersToTurnBeforeOnSameField.length).toString() +
                '%)';
            } else if (playersOnSameField.length === 1) {
              translate +=
                (50 - 100 * playersToTurnBeforeOnSameField.length).toString() +
                '%)';
            } else {
              translate = 'translateX(0)';
            }
          }

          return (
            <PlayerChip
              key={player.id}
              posOfPlayer={posOfPlayer}
              beforeToPos={beforeToPos}
              translate={translate}
              colorOfPlayer={colorOfPlayer}
              colorOfPlayerDarker={colorOfPlayerDarker}
            />
          );
        })}
    </>
  );
};

export default PlayersChips;
