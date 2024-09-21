import {
  WEAPON_DEFAULT_ATTACKS as WDA,
  WEAPON_DEFAULT_DAMAGE as WDD,
  WEAPON_DEFAULT_FALLOFF as WDF,
} from '../constants/weaponDefaults';
import { type WeaponsDTO } from '../types/dto/weapons';
import {
  type Weapon,
  type WeaponModeData,
  type WeaponWithModes,
} from '../types/weapons';
import { normailze } from '../utils/standart';

export const fetchWeapons = async (): Promise<Weapon[]> => {
  const response = await fetch(
    'https://api.warframestat.us/weapons/?language=en&remove=damagePerShot,imageName,patchlogs,components,drops,introduced,buildPrice,buildQuantity,buildTime,consumeOnBuild,marketCost,releaseDate,skipBuildTimePrice',
  );
  const data: WeaponsDTO = await response.json();

  return transformWeaponData(
    data.filter(
      (weapon) =>
        !weapon.excludeFromCodex &&
        !weapon.uniqueName.toLocaleLowerCase().includes('doppelganger'),
    ),
  );
};

/**
 * Similar to fetchWeapons, but it uses localStorage to cache the data.
 * actually uses fetchWeapons to get the data.
 */
export const getWeapons = async ({
  omitCache = false,
}: {
  omitCache?: boolean;
}): Promise<Weapon[]> => {
  if (!omitCache) {
    const cachedData = localStorage.getItem('weapons');
    if (cachedData) {
      return JSON.parse(cachedData);
    }
  }

  const data = await fetchWeapons();
  localStorage.setItem('weapons', JSON.stringify(data));
  return data;
};

export const extractWeaponMode = (
  weapon: Weapon,
  attackName?: string,
): WeaponModeData => {
  const attackData =
    attackName === undefined
      ? weapon.attacks[0]
      : (weapon?.attacks.find((attackItem) => attackItem.name === attackName) ??
        weapon?.attacks[0]);

  const { damage, falloff: _, ...attack } = attackData;
  const { attacks: omittedAttacks, ...weaponData } = weapon;

  return {
    ...damage,
    ...attack,
    ...weaponData,
    name: `${weapon.name} (${attack.name})`,
  };
};

export const getWeapon = async (
  name: string,
  attackName?: string,
): Promise<Omit<WeaponWithModes, 'color'> | undefined> => {
  const weapons = await getWeapons({});
  const weapon = weapons.find((weaponItem) => weaponItem.name === name);

  if (!weapon) {
    return undefined;
  }

  return {
    attacks: weapon.attacks.map((attack) => attack.name),
    data: extractWeaponMode(weapon, attackName),
    name: weapon.name,
  };
};

// eslint-disable-next-line func-style
export function transformWeaponData(apiData: WeaponsDTO): Weapon[] {
  return apiData.map((weapon) => {
    const attacks = weapon.attacks?.map((attack) => ({
      chargeTime: attack.charge_time ?? WDA.chargeTime,
      critChance: normailze(attack.crit_chance ?? WDA.critChance),
      critMultiplier: attack.crit_mult ?? WDA.critMultiplier,
      damage: {
        ...WDD,
        ...attack.damage,
        total: Object.values(attack.damage).reduce(
          (total, damage) => total + (damage || 0),
          0,
        ),
      },
      falloff: attack.falloff
        ? {
            ...WDF,
            ...attack.falloff,
          }
        : undefined,
      name: attack.name,
      shotSpeed:
        attack.shot_speed ??
        (attack.shot_type === 'Hit-Scan' ? 100 * 10 : WDA.shotSpeed),
      speed: attack.speed ?? WDA.speed,
      statusChance: normailze(attack.status_chance ?? WDA.statusChance),
    })) || [
      {
        chargeTime: undefined,
        critChance: weapon.criticalChance,
        critMultiplier: weapon.criticalMultiplier,
        damage: {
          ...WDD,
          ...weapon.damage,
          total: weapon.totalDamage,
        },
        falloff: undefined,
        name: 'Default Attack',
        shotSpeed: WDA.shotSpeed,
        speed: weapon.fireRate,
        statusChance: weapon.procChance,
      },
    ];

    return {
      attacks,
      category: weapon.category,
      isPrime: weapon.isPrime,
      masteryReq: weapon.masteryReq,
      name: weapon.name,
      noise: weapon.noise,
    };
  });
}
