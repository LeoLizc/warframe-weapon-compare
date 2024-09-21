import { NativeSelect } from '@mantine/core';
import { type TargetedEvent } from 'preact/compat';

export interface ListingSectionProps {
  data: Array<{
    color: string;
    modes: string[];
    name: string;
    weapon: string;
  }>;
  onSelect: (weapon: string, mode: string) => void;
}

export const ListingSection = ({ data, onSelect }: ListingSectionProps) => {
  const onChangeBuilder =
    (weapon: string, modes: string[]) =>
    (event: TargetedEvent<HTMLSelectElement, Event>) => {
      const index = event.currentTarget.selectedIndex;
      const mode = modes[index];
      onSelect(weapon, mode);
    };

  return (
    <div className="w-full flex items-center gap-4">
      {data.length > 0 &&
        data.map((item) => (
          <div
            className="flex items-center gap-2"
            key={item.weapon}
          >
            <span
              className="w-3 h-3 border-gray-50 border-[1px]"
              style={{
                backgroundColor: item.color,
              }}
            />
            <NativeSelect
              data={item.modes.map((mode) => `${item.weapon} (${mode})`)}
              onChange={onChangeBuilder(item.weapon, item.modes)}
              radius="md"
              value={item.name}
              // size="xs"
              variant="unstyled"
            />
          </div>
        ))}
    </div>
  );
};
