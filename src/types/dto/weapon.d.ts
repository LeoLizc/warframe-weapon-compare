export interface WeaponData {
  attacks: Attack[];
  bpCost: string;
  buildPrice: number;
  buildQuantity: number;
  buildTime: number;
  category: string;
  components: Component[];
  consumeOnBuild: boolean;
  criticalChance: number;
  criticalMultiplier: number;
  description: string;
  disposition: number;
  estimatedVaultDate: string;
  fireRate: number;
  introduced: Introduced;
  marketCost: string;
  masteryReq: number;
  mr: number;
  name: string;
  omegaAttenuation: number;
  patchlogs: Patchlog[];
  polarities: string[];
  procChance: number;
  productCategory: string;
  releaseDate: number;
  riven_disposition: number;
  skipBuildTimePrice: number;
  slot: number;
  tags: string[];
  thumbnail: string;
  totalDamage: number;
  tradable: boolean;
  type: string;
  uniqueName: string;
  url: string;
  vaultDate: string;
  vaulted: boolean;
  wikiaThumbnail: string;
  wikiaUrl: string;
}

export interface Patchlog {
  additions: string;
  changes: string;
  date: string;
  fixes: string;
  name: string;
  url: string;
}

export interface Component {
  category: string;
  description: string;
  name: string;
  productCategory: string;
  tradable: boolean;
  type: string;
  uniqueName: string;
}

export interface Introduced {
  aliases: string[];
  date: string;
  name: string;
  parent: string;
  url: string;
}

export interface Attack {
  channeling: number;
  charge_time: number;
  crit_chance: number;
  crit_mult: number;
  damage: Damage;
  duration: number;
  falloff: Falloff;
  flight: number;
  jump: string;
  name: string;
  pellet: Pellet;
  radius: number;
  shot_speed: number;
  shot_type: number;
  slam: Slam;
  slide: string;
  speed: number;
  status_chance: number;
  wall: string;
}

export interface Pellet {
  count: number;
  name: string;
}

export interface Falloff {
  end: number;
  reduction: number;
  start: number;
}

export interface Damage {
  blast: number;
  cold: number;
  corrosive: number;
  electric: number;
  gas: number;
  heat: number;
  impact: number;
  magnetic: number;
  puncture: number;
  radiation: number;
  slash: number;
  toxin: number;
  true: number;
  viral: number;
  void: number;
}

export interface Slam {
  damage: number;
  radial: Radial;
}

export interface Radial {
  damage: number;
  element: string;
  proc: number;
  radius: number;
}
