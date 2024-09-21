type Key = number | string | symbol;

export const removeDuplicates = <T extends Record<Key, unknown>>(
  array: T[],
  key: Key,
): T[] => {
  const seen = new Set();

  return array.filter((item) => {
    const keyValue = item[key];
    if (seen.has(keyValue)) {
      return false;
    } else {
      seen.add(keyValue);
      return true;
    }
  });
};
