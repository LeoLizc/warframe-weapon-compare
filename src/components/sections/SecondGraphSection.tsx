import { type WeaponModeData, type WeaponWithModes } from '../../types/weapons';
import { RadarSection } from './RadarSection';
import { Checkbox } from '@mantine/core';
import { useListState } from '@mantine/hooks';

interface StateType {
  checked: boolean;
  key: string;
  label: keyof WeaponModeData;
}

const initialValues: StateType[] = [
  { checked: false, key: crypto.randomUUID(), label: 'blast' },
  { checked: false, key: crypto.randomUUID(), label: 'cold' },
  { checked: false, key: crypto.randomUUID(), label: 'corrosive' },
  { checked: false, key: crypto.randomUUID(), label: 'electricity' },
  { checked: false, key: crypto.randomUUID(), label: 'heat' },
  { checked: false, key: crypto.randomUUID(), label: 'impact' },
  { checked: false, key: crypto.randomUUID(), label: 'magnetic' },
  { checked: false, key: crypto.randomUUID(), label: 'puncture' },
  { checked: false, key: crypto.randomUUID(), label: 'radiation' },
  { checked: false, key: crypto.randomUUID(), label: 'slash' },
  { checked: false, key: crypto.randomUUID(), label: 'toxin' },
  { checked: false, key: crypto.randomUUID(), label: 'viral' },
  { checked: false, key: crypto.randomUUID(), label: 'void' },
  { checked: false, key: crypto.randomUUID(), label: 'shotSpeed' },
  { checked: false, key: crypto.randomUUID(), label: 'total' },
  { checked: false, key: crypto.randomUUID(), label: 'critChance' },
  { checked: false, key: crypto.randomUUID(), label: 'speed' },
  { checked: false, key: crypto.randomUUID(), label: 'critMultiplier' },
  { checked: false, key: crypto.randomUUID(), label: 'statusChance' },
];

interface SecondGraphProps {
  data: WeaponWithModes[];
}

export const SecondGraphSection = ({ data }: SecondGraphProps) => {
  const [values, handlers] = useListState(initialValues);

  const comparisonData = data.map((item) => ({
    color: item.color,
    // eslint-disable-next-line unicorn/no-array-reduce
    data: values.reduce<Record<string, number>>((accumulator, element) => {
      if (!element.checked) return accumulator;

      return {
        ...accumulator,
        [element.label]: item.data[element.label] as number,
      };
    }, {}),
    weapon: item.name,
  }));

  return (
    <div className="flex gap-2 justify-between max-h-full">
      <RadarSection
        data={comparisonData}
        description="Compare the weapons"
        title="Weapons Comparison"
      />
      <div className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden pr-4">
        {values.map((value, _index) => (
          <Checkbox
            checked={value.checked}
            key={value.key}
            label={value.label}
            onChange={(event) =>
              handlers.setItemProp(
                _index,
                'checked',
                event.currentTarget.checked,
              )
            }
            size="xs"
          />
        ))}
      </div>
    </div>
  );
};
