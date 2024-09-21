import { type WeaponAttack } from '../types/weapons';

export const WEAPON_DEFAULT_ATTACKS: Omit<
  WeaponAttack,
  'damage' | 'falloff' | 'name'
> = {
  chargeTime: 0,
  critChance: 0,
  critMultiplier: 1,
  shotSpeed: 0,
  speed: 0,
  statusChance: 0,
};

export const WEAPON_DEFAULT_DAMAGE = {
  blast: 0,
  cold: 0,
  corrosive: 0,
  electricity: 0,
  heat: 0,
  impact: 0,
  magnetic: 0,
  puncture: 0,
  radiation: 0,
  slash: 0,
  total: 0,
  toxin: 0,
  viral: 0,
  void: 0,
};

export const WEAPON_DEFAULT_FALLOFF = {
  end: 0,
  reduction: 0,
  start: 0,
};
