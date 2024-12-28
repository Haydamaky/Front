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

export const colorVariatsBorder500 = createColorVariants('border', '500');
export const colorVariats500 = createColorVariants('bg', '500');
export const colorVariats700 = createColorVariants('bg', '700');
