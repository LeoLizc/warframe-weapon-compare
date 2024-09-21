export const invertGroup = <
  T extends Record<string, unknown>,
  K extends keyof T & string,
  L extends string = K,
>({
  data,
  key,
  mapGroup,
  mapItem,
  newKey,
}: {
  data: T[];
  key: K;
  mapGroup?: (item: Record<string, unknown>) => Record<string, unknown>;
  mapItem?: (item: unknown) => unknown;
  newKey?: L;
}): Array<
  {
    [key in L]: string;
  } & {
    [key: string]: unknown;
  }
> => {
  // eslint-disable-next-line no-param-reassign
  if (!newKey) newKey = key as string as L;
  // eslint-disable-next-line no-param-reassign
  if (!mapItem) mapItem = (item) => item;
  // eslint-disable-next-line no-param-reassign
  if (!mapGroup) mapGroup = (item) => item as Record<string, unknown>;

  type Ultra = [string, Record<string, unknown>];

  // eslint-disable-next-line unicorn/no-array-reduce
  const newData = data.reduce<Record<string, Ultra>>((accumulator, item) => {
    for (const itemKey of Object.keys(item)) {
      if (itemKey === key) continue;

      if (accumulator[itemKey]) {
        accumulator[itemKey][1][item[key] as string] = mapItem(item[itemKey]);
      } else {
        accumulator[itemKey] = [
          itemKey as string,
          { [item[key] as string]: mapItem(item[itemKey]) },
        ];
      }
    }

    return accumulator;
  }, {});

  return Object.values(newData).map(([category, finalData]) => {
    let response: {
      [key in L]: string;
    } & {
      [key: string]: unknown;
    } = {
      [newKey as L]: category,
    } as { [key in L]: string };

    response = { ...response, ...mapGroup(finalData) };

    return response;
  });
};
