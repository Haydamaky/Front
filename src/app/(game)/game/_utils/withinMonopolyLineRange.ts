export const rangesOfLines = [
  [0, 11],
  [11, 21],
  [21, 31],
  [31, 40],
];

export const withinMonopolyLineRange = (
  firstNumber: number,
  secondNumber: number,
) => {
  return rangesOfLines.some(
    ([start, end]) =>
      firstNumber >= start &&
      firstNumber < end &&
      secondNumber >= start &&
      secondNumber < end,
  );
};
