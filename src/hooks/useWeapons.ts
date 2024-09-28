import { getWeapon, getWeapons } from '../services/weapon';
import { type WeaponWithModes } from '../types/weapons';
import { releaseColor, requestColor } from '../utils/color';
import { useEffect, useMemo, useState } from 'preact/hooks';

const updateWeaponsQuery = (weapons: string[]) => {
  const queryParameters = new URLSearchParams(location.search);
  queryParameters.set('weapons', weapons.join(','));
  history.replaceState(null, '', `${location.pathname}?${queryParameters}`);
};

export const useWeapons = () => {
  const [selectedWeapons, setSelectedWeapons] = useState<WeaponWithModes[]>([]);
  const [weaponNames, setWeaponNames] = useState<string[]>([]);

  const updateSelectedWeapons: typeof setSelectedWeapons = (
    newSelectedWeapons,
  ) => {
    setSelectedWeapons((oldSelectedWeapons) => {
      if (typeof newSelectedWeapons === 'function') {
        const newWeapons = newSelectedWeapons(oldSelectedWeapons);
        updateWeaponsQuery(newWeapons.map((weapon) => weapon.name));

        return newWeapons;
      } else {
        updateWeaponsQuery(newSelectedWeapons.map((weapon) => weapon.name));

        return newSelectedWeapons;
      }
    });
  };

  const selectWeapons = async (
    weapons: Array<{ mode?: string; name: string }>,
  ) => {
    const newSelectedWeapons = await Promise.allSettled(
      weapons.map(async ({ mode, name }) => {
        const weaponIndex = selectedWeapons.findIndex(
          (weaponItem) => weaponItem.name === name,
        );

        const weapon = await getWeapon(name, mode);
        if (!weapon) return null;

        if (weaponIndex === -1) {
          return { weapon: { ...weapon, color: requestColor() }, weaponIndex };
        } else {
          const existingWeapon = selectedWeapons[weaponIndex];
          // TODO: if weeapon and mode are the same, do not update
          // if (existingWeapon)
          return {
            weapon: { ...weapon, color: existingWeapon.color },
            weaponIndex,
          };
        }
      }),
    );

    const newSelectedWeaponsFiltered = newSelectedWeapons
      .filter((result) => result.status === 'fulfilled')
      .filter((result) => result.value !== null) // TODO can omit this using reduce
      .map((result) => result.value);

    updateSelectedWeapons((previous) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const newSelectedWeapons = [...previous];
      const newWeapons: typeof newSelectedWeapons = [];
      for (const weaponData of newSelectedWeaponsFiltered) {
        if (weaponData === null) continue;

        const { weapon, weaponIndex } = weaponData;

        if (weaponIndex === -1) {
          newWeapons.push(weapon);
        } else {
          newSelectedWeapons[weaponIndex] = weapon;
        }
      }

      return [...newSelectedWeapons, ...newWeapons];
    });
  };

  const selectWeapon = (name: string, mode?: string) => {
    selectWeapons([{ mode, name }]);
  };

  const removeWeapon = (name: string) => {
    const weapon = selectedWeapons.find((weaponItem) => {
      return weaponItem.name === name;
    });

    if (weapon) {
      releaseColor(weapon.color);
      updateSelectedWeapons((previous) =>
        previous.filter((weaponItem) => weaponItem.name !== name),
      );
    }
  };

  const showSelect = useMemo(() => weaponNames.length !== 0, [weaponNames]);

  useEffect(() => {
    (async () => {
      const weapons = await getWeapons({
        omitCache: true,
      });

      const queryParameters = new URLSearchParams(location.search);
      const alreadySelectedWeaponNames = (
        queryParameters.get('weapons') ?? ''
      ).split(',');

      const names = weapons.map((weapon) => weapon.name);
      setWeaponNames(names);

      console.log('alreadySelectedWeaponNames', alreadySelectedWeaponNames);

      selectWeapons(alreadySelectedWeaponNames.map((name) => ({ name })));
    })();
  }, []);

  return {
    removeWeapon,
    selectedWeapons,
    selectWeapon,
    showSelect,
    weaponNames,
  };
};
