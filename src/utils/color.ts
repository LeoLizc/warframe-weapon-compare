const AVAILABLE_COLORS = [
  '#FF6633',
  '#FFFF99',
  '#00B3E6',
  '#3366E6',
  '#999966',
  '#E6B3B3',
  '#4D8000',
  '#CC80CC',
  '#66664D',
  '#1AB399',
  '#E666B3',
  '#CC9999',
  '#4D8066',
  '#809980',
  '#1AFF33',
  '#999933',
  '#FF3380',
  '#4D80CC',
  '#9900B3',
];

export const requestColor = () => {
  const index = Math.floor(Math.random() * AVAILABLE_COLORS.length);
  const color = AVAILABLE_COLORS[index];

  AVAILABLE_COLORS.splice(index, 1);

  return color;
};

export const releaseColor = (color: string) => {
  AVAILABLE_COLORS.push(color);
};
