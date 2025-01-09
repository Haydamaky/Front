import {
  colorVariats500,
  colorVariats700,
  //positionCoors,
  withinMonopolyLineRange,
  findClosest,
} from '../../_utils';
import { useEffect, useState } from 'react';
import PlayerChip from './PlayerChip';
import { Game } from '@/types';
import { socket } from '@/socket';

const positionCoors = [
  'left-[6%] top-[9.5%]',
  'left-[17.5%] top-[9.5%]',
  'left-[25.2%] top-[9.5%]',
  'left-[32.9%] top-[9.5%]',
  'left-[40.6%] top-[9.5%]',
  'left-[48.3%] top-[9.5%]',
  'left-[56%] top-[9.5%]',
  'left-[63.7%] top-[9.5%]',
  'left-[71.4%] top-[9.5%]',
  'left-[79.1%] top-[9.5%]',
  'left-[90.8%] top-[9.5%]',
  'left-[90.8%] top-[20%]',
  'left-[90.8%] top-[27.1%]',
  'left-[90.8%] top-[34.2%]',
  'left-[90.8%] top-[41.3%]',
  'left-[90.8%] top-[48.4%]',
  'left-[90.8%] top-[55.5%]',
  'left-[90.8%] top-[62.6%]',
  'left-[90.8%] top-[69.6%]',
  'left-[90.8%] top-[76.8%]',
  'left-[90.8%] top-[87%]',
  'left-[79.2%] top-[87%]',
  'left-[71.5%] top-[87%]',
  'left-[63.8%] top-[87%]',
  'left-[56.1%] top-[87%]',
  'left-[48.4%] top-[87%]',
  'left-[40.7%] top-[87%]',
  'left-[33%] top-[87%]',
  'left-[25.3%] top-[87%]',
  'left-[17.6%] top-[87%]',
  'left-[6%] top-[87%]',
  'left-[6%] top-[76.5%]',
  'left-[6%] top-[69.4%]',
  'left-[6%] top-[62.3%]',
  'left-[6%] top-[55.2%]',
  'left-[6%] top-[48.1%]',
  'left-[6%] top-[41%]',
  'left-[6%] top-[33.9%]',
  'left-[6%] top-[26.8%]',
  'left-[6%] top-[19.7%]',
  'left-[6%] top-[9.5%]',
];
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
          console.log({ player });
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
          if (indexBefore < 0) {
            indexBefore += 40;
          }
          const isHorizonatlFieldBefore =
            indexBefore <= 11 || (indexBefore > 20 && indexBefore <= 31);
          const onSameLineStill = withinMonopolyLineRange(
            indexBefore,
            player.currentFieldIndex,
          );
          const currentPlayersTurn =
            player.userId === gameAfterDiceRoll?.turnOfUserId;
          const indexInPositionsArray = player.currentFieldIndex - 1;
          let closestCornerOnWay = (indexBefore + player.currentFieldIndex) / 2;
          if (indexBefore >= 31) closestCornerOnWay = 40;
          let posOfPlayer = positionCoors[indexInPositionsArray];
          const beforeToIndexes =
            !onSameLineStill && currentPlayersTurn
              ? isHorizonatlField !== isHorizonatlFieldBefore
                ? findClosest(closestCornerOnWay, 1)
                : findClosest(closestCornerOnWay, 2)
              : [];
          const beforeToPositions = beforeToIndexes.map(
            (beforeToIndex: number) => positionCoors[beforeToIndex],
          );
          const userIdsInOrderToTurn = gameAfterDiceRoll?.players.map(
            player => player.userId,
          );
          let indexOfPlayerToTurn =
            userIdsInOrderToTurn.indexOf(gameAfterDiceRoll?.turnOfUserId) + 1;
          indexOfPlayerToTurn === gameAfterDiceRoll.players.length
            ? 0
            : indexOfPlayerToTurn;
          const numberOfPlayersToTurnBefore =
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
                return playerToTurnBefore?.userId === playerOnSameField.userId;
              });
            },
          );

          const calculateTranslate = (
            playersOnSameFieldLength: number,
            playersToTurnBeforeOnSameFieldLength: number,
          ) => {
            return (
              (
                playersToTurnBeforeOnSameFieldLength * 100 -
                50 * playersOnSameFieldLength
              ).toString() + '%)'
            );
          };
          const translateOn = calculateTranslate(
            playersOnSameField.length,
            playersToTurnBeforeOnSameField.length,
          );
          translate = isHorizonatlField
            ? 'translateY(' + translateOn
            : 'translateX(' + translateOn;

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
