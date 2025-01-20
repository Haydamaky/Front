import { Game } from '@/types';
import {
  colorVariats500,
  colorVariats700,
  findClosest,
  positionCoors,
  withinMonopolyLineRange,
} from '../../_utils';
import PlayerChip from './PlayerChip';

interface PlayersChipsProps {
  game: Game | null;
}

const PlayersChips = ({ game }: PlayersChipsProps) => {
  return (
    <>
      {game?.players &&
        game.players.map((player: any, index: number) => {
          const colorOfPlayer = colorVariats500[player.color];
          const colorOfPlayerDarker = colorVariats700[player.color];
          const playersOnSameField = game?.players.filter(
            (checkingPlayer: any) =>
              checkingPlayer.currentFieldIndex === player.currentFieldIndex &&
              checkingPlayer.userId !== player.userId,
          );
          let translate = '';
          const isHorizonatlField =
            player.currentFieldIndex < 11 ||
            (player.currentFieldIndex > 20 && player.currentFieldIndex < 31);
          const dicesStringsArr = game?.dices.split(':');
          const dicesNumArr = dicesStringsArr.map(Number);
          let indexBefore =
            player.currentFieldIndex - dicesNumArr[0] - dicesNumArr[1];
          if (indexBefore <= 0) {
            indexBefore += 40;
          }
          const isHorizonatlFieldBefore =
            indexBefore <= 11 || (indexBefore > 20 && indexBefore <= 31);
          const onSameLineStill = withinMonopolyLineRange(
            indexBefore,
            player.currentFieldIndex,
          );
          const currentPlayersTurn = player.userId === game?.turnOfUserId;
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
          const userIdsInOrderToTurn = game?.players.map(
            player => player.userId,
          );
          let indexOfPlayerToTurn =
            userIdsInOrderToTurn.indexOf(game?.turnOfUserId) + 1;
          indexOfPlayerToTurn =
            indexOfPlayerToTurn >= game.players.length
              ? 0
              : indexOfPlayerToTurn;
          const numberOfPlayersToTurnBefore =
            (index - indexOfPlayerToTurn + game?.players.length) %
            game?.players.length;
          const playersToTurnBefore: any = [];
          let indexOfPlayerToTurnTemp = indexOfPlayerToTurn;
          for (let i = 0; i < numberOfPlayersToTurnBefore; i++) {
            playersToTurnBefore.push(game?.players[indexOfPlayerToTurnTemp]);
            indexOfPlayerToTurnTemp++;
            if (indexOfPlayerToTurnTemp >= game?.players.length) {
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
