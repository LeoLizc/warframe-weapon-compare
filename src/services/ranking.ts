import { type WeaponModeData } from '../types/weapons';

type RankingFunction = (element: boolean | string) => number;

const generateRanking = (values: string[]): RankingFunction => {
  const result: { [value: string]: number } = {};
  for (const [index, value] of values.entries()) {
    result[value] = index + 1;
  }

  return (element) =>
    result[`${element}`] ?? result['N/A'] ?? values.length + 1;
};

const weaponAttributeRanking: Record<
  Extract<keyof WeaponModeData, string>,
  RankingFunction
> = {
  isPrime: generateRanking(['true', 'false']),
  noise: generateRanking(['Silent', 'Normal', 'Alarming']),
};

export const getBestItem = (
  items: string[],
  attribute: string,
): null | string => {
  const uniqueItems = [...new Set(items)];

  if (uniqueItems.length <= 1) {
    return null;
  }

  const ranking = weaponAttributeRanking[attribute];
  if (!ranking) {
    return null;
  }

  let bestItem: null | string = null;

  for (const item of uniqueItems) {
    if (bestItem === null) {
      bestItem = item;
    } else if (ranking(item) < ranking(bestItem)) {
      bestItem = item;
    }
  }

  return bestItem;
};

export const evaluateRanking = (
  items: Array<number | string>,
  attribute: string,
) => {
  const uniqueItems = [...new Set(items)];

  if (uniqueItems.length <= 1) {
    return null;
  }

  return (
    getBestItem(uniqueItems as string[], attribute) ??
    Math.max(...(uniqueItems as number[]))
  );
};
