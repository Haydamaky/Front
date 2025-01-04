import { useAppSelector } from '@/hooks/store';
import { Field } from '@/types/field';
import Image from 'next/image';
import { memo } from 'react';

interface FieldProps {
  field: Field;
}

const FieldComponent = ({ field }: FieldProps) => {
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
  const priceColor = colorVariants[field.color];
  const fieldColorPos = fieldColorPosVariants[field.line];
  const textPos = field.line.includes('vertical-right')
    ? 'rotate-90'
    : field.line.includes('vertical-left')
      ? 'rotate-[-90deg]'
      : '';
  const [player] = game.players.filter(player => player.userId === user?.id);
  const bgColor = field.ownedBy === player?.userId ? player.color : 'white';
  return (
    <div
      className={`relative h-full w-full text-wrap`}
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="w-ful relative h-full"
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
          <p className={`${textPos}`}>{field.price}mm</p>
        </div>
      )}
    </div>
  );
};

export default FieldComponent;
