export const createColorVariants = (property: string, suffix: string) =>
  ({
    pink: `bg-pink-${suffix}`,
    green: `bg-green-${suffix}`,
    blue: `bg-blue-${suffix === '700' ? '700' : '300'}`,
    red: `bg-red-${suffix}`,
    yellow: `bg-yellow-${suffix}`,
    'dark-blue': `bg-blue-${suffix}`,
    purple: `bg-purple-${suffix}`,
    orange: `bg-orange-${suffix}`,
    gray: `bg-gray-${suffix}`,
    black: 'bg-black',
    tortoise: `bg-teal-${suffix}`,
  }) as Record<string, string>;

export const colorVariatsBorder500 = createColorVariants('border', '500');
