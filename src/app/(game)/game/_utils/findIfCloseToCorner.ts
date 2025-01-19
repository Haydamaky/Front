export function findIfCloseToCorner(index: number) {
  const corners = new Map([
    [1, 'upper-left'],
    [11, 'upper-right'],
    [21, 'bottom-right'],
    [31, 'bottom-left'],
  ]);

  const upperLeftExtra = new Set([38, 39, 40]);
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
      if (Math.abs(index - cornerIndex) <= 3) {
        return cornerName;
      }
    }
  }

  return null;
}
