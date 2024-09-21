export interface MultiSize {
  lg?: number;
  md?: number;
  sm?: number;
  xl?: number;
  xs?: number;
}

export type RelSize = MultiSize | number;

export type ExtendedRelSize<T> =
  | {
      [key in MultiSize]?: MultiSize[key] | T;
    }
  | number
  | T;

export type AutoRelSize = ExtendedRelSize<'auto'>;
