import { Field } from '@/types/field';
import Image from 'next/image';

interface FieldProps {
  field: Field;
}

function FieldComponent({ field }: FieldProps) {
  const fieldColorPosVariants: Record<string, string> = {
    'vertical-left': 'left-0 top-0 h-[100%] w-[8%] translate-x-[-100%]',
    'vertical-right': 'right-0 top-0 h-[100%] w-[8%] translate-x-[100%]',
    'horizontal-top': 'left-0 top-0 h-[8%] w-[100%] translate-y-[-100%]',
    'horizontal-bottom': 'left-0 bottom-0 h-[8%] w-[100%] translate-y-[100%]',
  };
  const colorVariants: Record<string, string> = {
    pink: 'bg-pink-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
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
  return (
    <div className={`relative h-full w-full text-wrap bg-white`}>
      <div className={`m-full h-full`}>
        <div className="h-full w-full">
          <Image
            src={field.imageUrl}
            alt={field.name}
            fill
            className="object-contain"
          />
        </div>
      </div>
      {field.hasOwnProperty('price') && (
        <div className={`absolute ${fieldColorPos} ${priceColor}`}></div>
      )}
      <div className={`absolute left-0 top-0`}>
        {field.players.length > 0 &&
          field.players.map(player => <p key={player.id}>{player}</p>)}
      </div>
    </div>
  );
}

export default FieldComponent;
