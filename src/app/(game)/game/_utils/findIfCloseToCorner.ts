export function findIfCloseToCorner(index: number, quantity: number) {
  const corners = new Map([
    [1, 'upper-left'],
    [11, 'upper-right'],
    [21, 'bottom-right'],
    [31, 'bottom-left'],
  ]);

  const arrayOfLeftIndexes = Array.from({ length: quantity }, (_, i) => 40 - i);
  const upperLeftExtra = new Set(arrayOfLeftIndexes);
  if (upperLeftExtra.has(index)) {
    return 'upper-left';
  }

  const cornerEntries = Array.from(corners.entries());
  for (const [cornerIndex, cornerName] of cornerEntries) {
    if ((index >= 1 && index <= 11) || (index >= 21 && index <= 31)) {
      if (Math.abs(index - cornerIndex) <= 2) {
        return cornerName;
      }
    } else {
      if (Math.abs(index - cornerIndex) <= quantity) {
        return cornerName;
      }
    }
  }

  return null;
}
