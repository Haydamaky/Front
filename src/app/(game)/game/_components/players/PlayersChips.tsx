import {
  colorVariats500,
  colorVariats700,
  positionCoors,
  withinMonopolyLineRange,
} from '../../_utils';
import { findClosest } from '../../_utils/findClosest';
import { useEffect, useState } from 'react';
import PlayerChip from './PlayerChip';
import { Game } from '@/types';
import { socket } from '@/socket';

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
        gameAfterDiceRoll.players.map((player: any, index: number) => {
          const colorOfPlayer = colorVariats500[player.color];
          const colorOfPlayerDarker = colorVariats700[player.color];
          const playersOnSameField = gameAfterDiceRoll?.players.filter(
            (checkingPlayer: any) =>
              checkingPlayer.currentFieldIndex === player.currentFieldIndex &&
              checkingPlayer.userId !== player.userId,
          );
          let translate = '';
          const isHorizonatlField =
            player.currentFieldIndex <= 11 ||
            (player.currentFieldIndex > 20 && player.currentFieldIndex <= 31);
          const dicesStringsArr = gameAfterDiceRoll?.dices.split(':');
          const dicesNumArr = dicesStringsArr.map(Number);
          let indexBefore =
            player.currentFieldIndex - dicesNumArr[0] - dicesNumArr[1];
          const isHorizonatlFieldBefore =
            indexBefore <= 11 || (indexBefore > 20 && indexBefore <= 31);
          if (indexBefore < 0) {
            indexBefore += 40;
          }
          const onSameLineStill = withinMonopolyLineRange(
            indexBefore,
            player.currentFieldIndex,
          );
          const currentPlayersTurn =
            player.userId === gameAfterDiceRoll?.turnOfUserId;
          const indexInPositionsArray = player.currentFieldIndex - 1;
          let closestCornerOnWay = (indexBefore + player.currentFieldIndex) / 2;
          let posOfPlayer = positionCoors[indexInPositionsArray];
          const beforeToIndexes =
            !onSameLineStill && currentPlayersTurn
              ? isHorizonatlField !== isHorizonatlFieldBefore
                ? findClosest(closestCornerOnWay, 1)
                : findClosest(closestCornerOnWay, 2)
              : [];
          const beforeToPositions = beforeToIndexes.map(
            beforeToIndex => positionCoors[beforeToIndex],
          );

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
              beforeToPositions={beforeToPositions}
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
