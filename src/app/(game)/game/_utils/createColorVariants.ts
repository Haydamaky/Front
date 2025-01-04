const createColorVariants = (property: string, suffix: string) =>
  ({
    pink: `${property}-pink-${suffix}`,
    green: `${property}-green-${suffix}`,
    blue: `${property}-blue-${suffix}`,
    red: `${property}-red-${suffix}`,
    yellow: `${property}-yellow-${suffix}`,
    'dark-blue': `${property}-blue-${suffix}`,
    purple: `${property}-purple-${suffix}`,
    orange: `${property}-orange-${suffix}`,
    gray: `${property}-gray-${suffix}`,
    black: `${property}-black`,
    tortoise: `${property}-teal-${suffix}`,
  }) as Record<string, string>;

export const gradientColorVariants = {
  green: 'linear-gradient(180deg, #57EBDE 0%, #AEFB2A 100%)',
  yellow: 'linear-gradient(180deg, #FF930F 0%, #FFF95B 100%)',
  blue: 'linear-gradient(180deg, #0D41E1 0%, #07C8F9 100%)',
  purple: 'linear-gradient(180deg, #A106F4 0%, #E707FA 100%)',
} as Record<string, string>;

export const colorVariatsBorder500 = createColorVariants('border', '500');
export const colorVariats500 = createColorVariants('bg', '500');
export const colorVariats700 = createColorVariants('bg', '700');
