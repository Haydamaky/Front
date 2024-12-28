export const findClosest = (num: number, quantity: number) => {
  const targets = [10, 20, 30, 40];
  const sortedTargets = targets.sort(
    (a, b) => Math.abs(num - a) - Math.abs(num - b),
  );
  const closestTargets = sortedTargets.slice(0, quantity);
  return closestTargets.map(target => (target === 40 ? 0 : target));
};
