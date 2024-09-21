export interface WeaponAttack {
  chargeTime?: number;
  critChance: number;
  critMultiplier: number;
  damage: WeaponDamage;
  falloff?: WeaponFalloff;
  name: string;
  shotSpeed?: number;
  speed: number;
  statusChance: number;
}

export interface WeaponDamage {
  blast: number;
  cold: number;
  corrosive: number;
  electricity: number;
  heat: number;
  impact: number;
  magnetic: number;
  puncture: number;
  radiation: number;
  slash: number;
  total: number; // Daño total
  toxin: number;
  viral: number;
  void: number;
}

export interface WeaponFalloff {
  end: number;
  reduction?: number;
  start: number;
}

export interface Weapon {
  attacks: WeaponAttack[]; // Lista de ataques del arma.
  category: string;
  isPrime: boolean;
  masteryReq: number;
  name: string;
  noise?: string;
}

export interface WeaponModeData
  extends WeaponDamage,
    Omit<Weapon, 'attacks'>,
    Omit<WeaponAttack, 'damage' | 'falloff'> {
  [key: string]: unknown;
}

export interface WeaponWithModes {
  attacks: string[];
  color: string;
  data: WeaponModeData;
  name: string;
}
