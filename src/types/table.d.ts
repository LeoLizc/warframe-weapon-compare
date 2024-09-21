export type Table = Record<string, null | number | string>;

export type SubCategory = Record<string, Table>;
export type Tables = Record<string, SubCategory | Table>;
