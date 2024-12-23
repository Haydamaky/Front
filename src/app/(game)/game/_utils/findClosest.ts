export const findClosest = (num: number): number => {
  const targets = [10, 20, 30, 40];
  let closest = targets[0];
  let minDiff = Math.abs(num - closest);
  for (const target of targets.slice(1)) {
    const diff = Math.abs(num - target);
    if (diff < minDiff) {
      minDiff = diff;
      closest = target;
    }
  }

  return closest === 40 ? 0 : closest;
};
