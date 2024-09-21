export const normailze = (number: number) => {
  return number >= 0 && number < 1 ? number : number / 100;
};

export function standardize(list: number[]): number[];
export function standardize(
  list: Record<string, number>,
): Record<string, number>;
// eslint-disable-next-line func-style
export function standardize(list: number[] | Record<string, number>) {
  let max = 0;
  if (Array.isArray(list)) {
    max = Math.max(...list);
    return list.map((value) => value / max);
  }

  max = Math.max(...Object.values(list));
  const result: Record<string, number> = {};
  for (const key in list) {
    if (Object.prototype.hasOwnProperty.call(list, key)) {
      result[key] = list[key] / max;
    }
  }

  return result;
}
