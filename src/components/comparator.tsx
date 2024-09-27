/* eslint-disable react-hooks/exhaustive-deps */
import { useWeapons } from '../hooks/useWeapons';
import { BentoElement } from './BentoElement';
import { ListingSection } from './sections/ListingSection';
import { RadarSection } from './sections/RadarSection';
import { SecondGraphSection } from './sections/SecondGraphSection';
import { TableSection } from './sections/TableSection';
import { Loader, MultiSelect } from '@mantine/core';
import {
  type CSSProperties,
  useCallback,
  useMemo,
  useRef,
} from 'preact/compat';

const gridStyles: CSSProperties = {
  display: 'grid',
  // gridAutoRows: 'minmax(calc(calc(100dvh / 6) - 1rem), auto)',
  // gridAutoRows: 'calc(calc(100dvh / 6) - 1rem)',
  gridAutoRows: '98px',
  gridGap: '1rem',
  gridTemplateColumns: 'repeat(12, 1fr)',
};

export const Comparator = () => {
  const {
    removeWeapon,
    selectedWeapons,
    selectWeapon,
    showSelect,
    weaponNames,
  } = useWeapons();

  // const selectedValues = useRef<Map<string, boolean>>(new Map());
  const selectedValues = useRef<Map<string, boolean>>(
    // eslint-disable-next-line unicorn/no-array-reduce
    selectedWeapons.reduce((accumulator, weapon) => {
      accumulator.set(weapon.name, true);
      return accumulator;
    }, new Map()),
  );

  const firstChartData = useMemo(() => {
    if (selectedWeapons.length === 0) return [];
    return selectedWeapons.map((weapon) => {
      const attack = weapon.data;

      const data = {
        // Blast: attack.damage.blast,
        // Cold: attack.damage.cold,
        // Corrosive: attack.damage.corrosive,
        // Electricity: attack.damage.electricity,
        // Heat: attack.damage.heat,
        // Impact: attack.damage.impact,
        // Magnetic: attack.damage.magnetic,
        // Puncture: attack.damage.puncture,
        // Radiation: attack.damage.radiation,
        // Void: attack.damage.void,
        critChance: attack.critChance,
        // Toxin: attack.damage.toxin,
        // Viral: attack.damage.viral,
        critMultiplier: attack.critMultiplier,
        speed: attack.speed,
        statusChance: attack.statusChance,
        // Slash: attack.damage.slash,
        total: attack.total,
      };

      return { color: weapon.color, data, weapon: weapon.name };
    });
  }, [selectedWeapons]);

  const tableData = useMemo(() => {
    return selectedWeapons.slice(0, 6).map((weapon) => weapon.data);
  }, [selectedWeapons]);

  const listingData = selectedWeapons.map((weapon) => ({
    color: weapon.color,
    modes: weapon.attacks,
    name: weapon.data.name,
    weapon: weapon.name,
  }));

  const onSelectRemove = useCallback(
    (value: string) => {
      selectedValues.current.delete(value);

      removeWeapon(value);
    },
    [removeWeapon, selectedValues],
  );

  const onSelectSubmit = useCallback(
    (value: string) => {
      if (selectedValues.current.has(value)) {
        onSelectRemove(value);
        return;
      }

      selectedValues.current.set(value, true);
      selectWeapon(value);
    },
    [selectedValues],
  );

  const showElements = useMemo(
    () => selectedWeapons.length > 0,
    [selectedWeapons],
  );

  // console.log(showSelect);

  return (
    <div style={gridStyles}>
      <BentoElement
        colSpan={12}
        rowSpan={2}
      >
        <div className=" h-full flex flex-col justify-evenly">
          <MultiSelect
            data={weaponNames}
            description="Select the weapons to compare"
            disabled={!showSelect}
            label="Select Weapons"
            leftSection={!showSelect && <Loader size={18} />}
            limit={6}
            maxValues={6}
            onOptionSubmit={onSelectSubmit}
            onRemove={onSelectRemove}
            searchable
            size="md"
            variant="filled"
            // w={900}
          />
          <ListingSection
            data={listingData}
            onSelect={selectWeapon}
          />
        </div>
      </BentoElement>

      {showElements && (
        <>
          <BentoElement
            colSpan={6}
            rowSpan={4}
          >
            <RadarSection
              data={firstChartData}
              description="Compare the weapons"
              title="Weapons Comparison"
            />
          </BentoElement>
          {/* <BentoSpace
        colSpan={2}
        rowSpan={4}
      /> */}

          <BentoElement
            colSpan={6}
            rowSpan={4}
          >
            <SecondGraphSection data={selectedWeapons} />
          </BentoElement>
          <BentoElement colSpan={12}>
            <TableSection data={tableData} />
          </BentoElement>
        </>
      )}
    </div>
  );
};
