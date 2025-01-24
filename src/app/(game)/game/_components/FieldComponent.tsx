import { useAppSelector } from '@/hooks/store';
import { Field } from '@/types/field';
import {
  gradientColorVariantsFields,
  gradientColorVariantsFields0Deg,
} from '../_utils';
import Image from 'next/image';

interface FieldProps {
  field: Field;
  onClick: (field: Field) => void;
}

const FieldComponent = ({ field, onClick }: FieldProps) => {
  const game = useAppSelector(state => state.game.game);
  const { data: user } = useAppSelector(state => state.user);
  const fieldColorPosVariants: Record<string, string> = {
    'vertical-left': 'left-0 top-0 h-[100%] w-[18%] translate-x-[-100%]',
    'vertical-right': 'right-0 top-0 h-[100%] w-[18%] translate-x-[100%]',
    'horizontal-top': 'left-0 top-0 h-[18%] w-[100%] translate-y-[-100%]',
    'horizontal-bottom': 'left-0 bottom-0 h-[18%] w-[100%] translate-y-[100%]',
  };
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
  const branchesPositions: Record<string, string> = {
    'vertical-left': 'bottom-[40%] right-[-22%] -rotate-90',
    'vertical-right': 'bottom-[40%] left-[-22%] rotate-90',
    'horizontal-top': 'bottom-[-7%] left-[50%] translate-x-[-50%]',
    'horizontal-bottom': 'top-[-7%] left-[50%] translate-x-[-50%]',
  };
  const isHorizontal = field.line.includes('horizontal');
  const priceColor = colorVariants[field.color];
  const fieldColorPos = fieldColorPosVariants[field.line];
  const branchesPos = branchesPositions[field.line];
  const textPos = field.line.includes('vertical-right')
    ? 'rotate-90'
    : field.line.includes('vertical-left')
      ? 'rotate-[-90deg]'
      : '';
  const [player] = game.players.filter(
    player => player.userId === field.ownedBy,
  );
  const bg = player
    ? field.line.includes('vertical-right') ||
      field.line.includes('vertical-left')
      ? gradientColorVariantsFields[player.color]
      : gradientColorVariantsFields0Deg[player.color]
    : 'white';
  const widthOfBranches = isHorizontal ? 'w-[100%]' : 'w-[45%]';
  return (
    <div
      className={`relative h-full w-full cursor-pointer text-wrap`}
      style={{ background: bg }}
      onClick={() => onClick(field)}
    >
      {field.isPledged && (
        <div className="absolute h-full w-full bg-[#0b1117] bg-opacity-80"></div>
      )}
      <div
        className="h-full w-full"
        style={{
          backgroundImage: `url(${field.imageUrl})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>

      {field.hasOwnProperty('price') && (
        <div
          className={`absolute ${fieldColorPos} ${priceColor} flex items-center justify-center text-sm text-gray-100`}
        >
          <p className={`${textPos}`}>
            {field.amountOfBranches
              ? field.income[field.amountOfBranches]
              : field.price}
            <span className="font-namu">m</span>
          </p>
        </div>
      )}
      {field.amountOfBranches > 0 && field.amountOfBranches < 5 && (
        <div
          className={`absolute z-10 flex ${widthOfBranches} justify-center gap-1 ${branchesPos}`}
        >
          {Array.from({ length: field.amountOfBranches }).map((_, index) => (
            <Image
              key={field.id + index}
              src="/images/BuildSilver.svg"
              alt="silver-building"
              width={13}
              height={13}
            />
          ))}
        </div>
      )}
      {field.amountOfBranches === 5 && (
        <div
          className={`absolute z-10 flex w-[45%] ${branchesPos} justify-center gap-1`}
        >
          <Image
            src="/images/BuildGold.svg"
            alt="silver-building"
            width={22}
            height={22}
          />
        </div>
      )}
    </div>
  );
};

export default FieldComponent;
