import { getWeapon, getWeapons } from '../services/weapon';
import { type WeaponWithModes } from '../types/weapons';
import { releaseColor, requestColor } from '../utils/color';
import { useEffect, useMemo, useState } from 'preact/hooks';

export const useWeapons = () => {
  const [selectedWeapons, setSelectedWeapons] = useState<WeaponWithModes[]>([]);
  const [weaponNames, setWeaponNames] = useState<string[]>([]);

  const selectWeapon = async (name: string, mode?: string) => {
    const weaponIndex = selectedWeapons.findIndex(
      (weaponItem) => weaponItem.name === name,
    );

    const weapon = await getWeapon(name, mode);
    if (!weapon) return;

    if (weaponIndex === -1) {
      setSelectedWeapons((previous) => [
        ...previous,
        { ...weapon, color: requestColor() },
      ]);
    } else {
      const existingWeapon = selectedWeapons[weaponIndex];
      setSelectedWeapons((previous) =>
        previous.toSpliced(weaponIndex, 1, {
          ...weapon,
          color: existingWeapon.color,
        }),
      );
    }
  };

  const removeWeapon = (name: string) => {
    const weapon = selectedWeapons.find((weaponItem) => {
      return weaponItem.name === name;
    });

    if (weapon) {
      releaseColor(weapon.color);
      setSelectedWeapons((previous) =>
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
      const names = weapons.map((weapon) => weapon.name);
      setWeaponNames(names);
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
