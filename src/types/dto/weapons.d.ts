export type WeaponsDTO = WeaponData[];

export interface WeaponData {
  accuracy?: number;
  attacks?: Attack[];
  blockingAngle?: number;
  bpCost?: number;
  category: string;
  comboDuration?: number;
  criticalChance: number;
  criticalMultiplier: number;
  damage?: Damage2;
  description: string;
  disposition?: number;
  estimatedVaultDate?: string;
  excludeFromCodex?: boolean;
  fireRate: number;
  followThrough?: number;
  heavyAttackDamage?: number;
  heavySlamAttack?: number;
  heavySlamRadialDamage?: number;
  heavySlamRadius?: number;
  isPrime: boolean;
  itemCount?: number;
  magazineSize?: number;
  masterable: boolean;
  masteryReq: number;
  maxLevelCap?: number;
  multishot?: number;
  name: string;
  noise?: string;
  omegaAttenuation: number;
  parents?: string[];
  polarities?: string[];
  procChance: number;
  productCategory: string;
  range?: number;
  reloadTime?: number;
  slamAttack?: number;
  slamRadialDamage?: number;
  slamRadius?: number;
  slideAttack?: number;
  slot: number;
  stancePolarity?: string;
  tags?: string[];
  totalDamage: number;
  tradable: boolean;
  trigger?: string;
  type: string;
  uniqueName: string;
  vaultDate?: string;
  vaulted?: boolean;
  wikiaThumbnail?: string;
  wikiaUrl?: string;
  windUp?: number;
}

export interface Attack {
  charge_time?: number;
  crit_chance: number;
  crit_mult: number;
  damage: Damage;
  falloff?: Falloff;
  flight?: number;
  name: string;
  shot_speed?: number;
  shot_type?: string;
  slam?: Slam;
  slide?: string;
  speed?: number;
  status_chance: number;
}

export interface Damage {
  blast?: number;
  cold?: number;
  corrosive?: number;
  electricity?: number;
  gas?: number;
  heat?: number;
  impact?: number;
  magnetic?: number;
  puncture?: number;
  radiation?: number;
  slash?: number;
  toxin?: number;
  viral?: number;
  void?: number;
}

export interface Slam {
  damage: string;
  radial: Radial;
}

export interface Radial {
  damage: string;
  radius: number;
}

export interface Falloff {
  end: number;
  reduction?: number;
  start: number;
}

export interface Damage2 {
  blast: number;
  cinematic: number;
  cold: number;
  corrosive: number;
  electricity: number;
  energyDrain: number;
  gas: number;
  healthDrain: number;
  heat: number;
  impact: number;
  magnetic: number;
  puncture: number;
  radiation: number;
  shieldDrain: number;
  slash: number;
  tau: number;
  total: number;
  toxin: number;
  true: number;
  viral: number;
  void: number;
}
