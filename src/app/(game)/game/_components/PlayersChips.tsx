import { useAppSelector } from '@/hooks/store';

const PlayersChips = () => {
  const game = useAppSelector(state => state.game.game);
  const colorVariants: Record<string, string> = {
    pink: 'bg-pink-500',
    green: 'bg-green-500',
    blue: 'bg-blue-300',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    'dark-blue': 'bg-blue-900',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    gray: 'bg-gray-700',
    black: 'bg-black',
    tortoise: 'bg-teal-300',
  };
  const colorVariantsDarker: Record<string, string> = {
    pink: 'bg-pink-700',
    green: 'bg-green-700',
    blue: 'bg-blue-700',
    red: 'bg-red-700',
    yellow: 'bg-yellow-700',
    'dark-blue': 'bg-blue-700',
    purple: 'bg-purple-700',
    orange: 'bg-orange-700',
    gray: 'bg-gray-700',
    black: 'bg-black',
    tortoise: 'bg-teal-700',
  };
  const positionCoors = [
    'left-[7%] top-[9%]',
    'left-[19%] top-[9%]',
    'left-[26.4%] top-[9%]',
    'left-[33.8%] top-[9%]',
    'left-[41.2%] top-[9%]',
    'left-[48.6%] top-[9%]',
    'left-[56%] top-[9%]',
    'left-[63.4%] top-[9%]',
    'left-[70.8%] top-[9%]',
    'left-[78.2%] top-[9%]',
    'left-[90.2%] top-[9%]',
    'left-[90.2%] top-[20%]',
    'left-[90.2%] top-[27.3%]',
    'left-[90.2%] top-[34.6%]',
    'left-[90.2%] top-[41.9%]',
    'left-[90.2%] top-[49.1%]',
    'left-[90.2%] top-[56.3%]',
    'left-[90.2%] top-[63.5%]',
    'left-[90.2%] top-[70.3%]',
    'left-[90.2%] top-[77.3%]',
    'left-[90.2%] top-[89%]',
    'left-[78.2%] top-[89%]',
    'left-[70.8%] top-[89%]',
    'left-[63.4%] top-[89%]',
    'left-[56%] top-[89%]',
    'left-[48.6%] top-[89%]',
    'left-[41.2%] top-[89%]',
    'left-[33.8%] top-[89%]',
    'left-[26.4%] top-[89%]',
    'left-[19%] top-[89%]',
    'left-[7%] top-[89%]',
    'left-[7] top-[77.3%]',
    'left-[7] top-[70.3%]',
    'left-[7] top-[63.5%]',
    'left-[7] top-[56.3%]',
    'left-[7] top-[49.1%]',
    'left-[7] top-[41.9%]',
    'left-[7] top-[34.6%]',
    'left-[7] top-[27.3%]',
    'left-[7] top-[20%]',
    'left-[7] top-[9%]',
  ];
  return (
    <>
      {game.players?.length > 0 &&
        game.players.map((player: any, index: number) => {
          const colorOfPlayer = colorVariants[player.color];
          const colorOfPlayerDarker = colorVariantsDarker[player.color];
          const rightIndex = player.currentFieldIndex - 1;
          const posOfPlayer = positionCoors[rightIndex];
          const playersOnSameField = game.players.filter(
            (checkingPlayer: any) =>
              checkingPlayer.currentFieldIndex === player.currentFieldIndex,
          );
          let translate = '0';
          if (
            playersOnSameField.length === 4 &&
            (player.currentFieldIndex < 11 ||
              (player.currentFieldIndex > 20 && player.currentFieldIndex < 31))
          ) {
            translate = 'translateY(';
            if (index < 2)
              translate += '-' + (100 * index + 52).toString() + '%)';
            else {
              let amountToTranslate = 52;
              if (index === 2) amountToTranslate = 50;
              translate +=
                (100 * (index - 2) + amountToTranslate).toString() + '%)';
            }
          } else {
            translate = 'translateX(';
            if (index < 2) translate += (100 * index + 52).toString() + '%)';
            else {
              let amountToTranslate = 52;
              if (index === 2) amountToTranslate = 50;
              translate +=
                '-' + (100 * (index - 2) + amountToTranslate).toString() + '%)';
            }
          }

          return (
            <div
              style={{ transform: `${translate}` }}
              key={player.id}
              className={`${colorOfPlayerDarker} shadow-combined absolute ${posOfPlayer} flex h-3 w-3 items-center justify-center rounded-full transition-all lg:h-6 lg:w-6`}
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
