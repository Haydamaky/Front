export const positionCoors = [
  'left-[7%] top-[9%]',
  ...Array.from(
    { length: 9 },
    (_, i) => 'left-[' + Math.floor((19 + 7.4 * i) * 10) / 10 + '%] top-[9%]',
  ),
  'left-[90.2%] top-[9%]',
  ...Array.from(
    { length: 9 },
    (_, i) =>
      'left-[90.2%] top-[' + Math.floor((19 + 7.4 * i) * 10) / 10 + '%]',
  ),
  'left-[90.2%] top-[89%]',
  ...Array.from(
    { length: 9 },
    (_, i) =>
      'left-[' + Math.floor((78.2 - 7.4 * i) * 10) / 10 + '%] top-[89%]',
  ),
  'left-[7%] top-[89%]',
  ...Array.from(
    { length: 9 },
    (_, i) => 'left-[7%] top-[' + Math.floor((77.3 - 7.4 * i) * 10) / 10 + '%]',
  ),
  'left-[7%] top-[9%]',
];
