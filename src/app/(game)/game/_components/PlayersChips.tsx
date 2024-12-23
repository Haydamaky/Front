import { useAppSelector } from '@/hooks/store';
import { createColorVariants, positionCoors } from '../_utils';
const colorVariants = createColorVariants('500');
const colorVariantsDarker = createColorVariants('700');
const PlayersChips = () => {
  const game = useAppSelector(state => state.game.game);
  return (
    <>
      {game.players?.length > 0 &&
        game.players.map((player: any, index: number) => {
          const colorOfPlayer = colorVariants[player.color];
          const colorOfPlayerDarker = colorVariantsDarker[player.color];
          const playersOnSameField = game.players.filter(
            (checkingPlayer: any) =>
              checkingPlayer.currentFieldIndex === player.currentFieldIndex &&
              checkingPlayer.userId !== player.userId,
          );
          let translate = '';
          const isHorizonatlField =
            player.currentFieldIndex < 11 ||
            (player.currentFieldIndex > 20 && player.currentFieldIndex < 31);
          const indexInPositionsArray = player.currentFieldIndex - 1;
          const posOfPlayer = positionCoors[indexInPositionsArray];
          const userIdsInOrderToTurn = game.players.map(
            player => player.userId,
          );
          let indexOfPlayerToTurn =
            userIdsInOrderToTurn.indexOf(game.turnOfUserId) + 1 === 4
              ? 0
              : userIdsInOrderToTurn.indexOf(game.turnOfUserId) + 1;

          let numberOfPlayersToTurnBefore =
            (index - indexOfPlayerToTurn + game.players.length) %
            game.players.length;
          const playersToTurnBefore: any = [];
          let indexOfPlayerToTurnTemp = indexOfPlayerToTurn;
          for (let i = 0; i < numberOfPlayersToTurnBefore; i++) {
            playersToTurnBefore.push(game.players[indexOfPlayerToTurnTemp]);
            indexOfPlayerToTurnTemp++;
            if (indexOfPlayerToTurnTemp === game.players.length) {
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
            <div
              style={{ transform: `${translate}` }}
              key={player.id}
              className={`${colorOfPlayerDarker} absolute shadow-combined ${posOfPlayer} flex h-3 w-3 items-center justify-center rounded-full transition-all duration-1000 lg:h-6 lg:w-6`}
            >
              <div
                className={`${colorOfPlayer} z-20 h-2 w-2 rounded-full border border-[#FBFBFA] lg:h-[1.15rem] lg:w-[1.15rem]`}
              ></div>
            </div>
          );
        })}
    </>
  );
};

export default PlayersChips;
