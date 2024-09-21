import { type RelSize } from '../types/relSize';
import { type FunctionComponent } from 'preact';
import { type CSSProperties } from 'preact/compat';
import { useMemo } from 'preact/hooks';

type BentoSizeProps = { colSpan?: RelSize } & { rowSpan?: RelSize };

type BentoElementProps = {
  className?: string;
  style?: CSSProperties;
} & BentoSizeProps;

/**
 * @description Just an element that can be used in a BentoGrid. It represents a single cell in the grid.
 * @param {BentoElementProps} props
 * @param {RelSize} props.colSpan - The number of columns the element should span. Default is 4.
 * @param {RelSize} props.rowSpan - The number of rows the element should span. Default is 1.
 * @returns
 */
export const BentoSpace: FunctionComponent<BentoElementProps> = ({
  colSpan = 2,
  rowSpan = 1,
  style,
}) => {
  const divStyles = useMemo(() => {
    const styles: CSSProperties = {
      ...style,
      gridColumn: `span ${colSpan}`,
      gridRow: `span ${rowSpan}`,
      width: '100%',
    };
    return styles;
  }, [colSpan, rowSpan, style]);
  return (
    <div
      className="bg-transparent"
      style={divStyles}
    />
  );
};
