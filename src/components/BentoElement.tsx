import { type AutoRelSize, type RelSize } from '../types/relSize';
import { type FunctionComponent } from 'preact';
import { type CSSProperties } from 'preact/compat';
import { useMemo } from 'preact/hooks';

type BentoSizeProps = { colSpan?: RelSize } & { rowSpan?: AutoRelSize };

type BentoElementProps = {
  className?: string;
  style?: CSSProperties;
} & BentoSizeProps;

/**
 * @description Just an element that can be used in a BentoGrid. It represents a single cell in the grid.
 * @param {BentoElementProps} props
 * @param {RelSize} props.colSpan - The number of columns the element should span.
 * @param {AutoRelSize} props.rowSpan - The number of rows the element should span.
 * @returns
 */
export const BentoElement: FunctionComponent<BentoElementProps> = ({
  children,
  colSpan = 4,
  rowSpan = 'auto',
  style,
}) => {
  const divStyles = useMemo(() => {
    const styles: CSSProperties = {
      ...style,
      gridColumn: `span ${colSpan}`,
      gridRow: rowSpan === 'auto' ? 'auto' : `span ${rowSpan}`,
      width: '100%',
    };
    return styles;
  }, [colSpan, rowSpan, style]);
  return (
    <div
      className="bg-[#000]/40 rounded-lg p-4 backdrop-blur-md border border-[#111]/60"
      style={divStyles}
    >
      {children}
    </div>
  );
};
