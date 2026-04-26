import type {
  CharacterGrade,
  ClassName,
  CharacterRole,
  Element,
  GameCharacter,
  GrowthStatBlock,
  MainCharacter,
  StatBlock,
} from "@/types/game";

type ClassStatTemplate = {
  base: StatBlock;
  growth: GrowthStatBlock;
};

export type ClassPreview = {
  className: ClassName;
  classNameTh: string;
  roleSummary: string;
  starterWeaponId: string;
  coreStats: string[];
  role: CharacterRole;
  assetId: string;
};

export const classStatTemplates: Record<ClassName, ClassStatTemplate> = {
  Swordsman: {
    base: { HP: 120, ATK: 18, MAG: 6, DEF: 12, RES: 8, SPD: 20, ACC: 80, EVA: 5, CRIT: 5, CRIT_DMG: 150 },
    growth: { HP: 18, ATK: 3.2, MAG: 0.8, DEF: 2.0, RES: 1.2, SPD: 0.35, ACC: 0.1, EVA: 0.03, CRIT: 0, CRIT_DMG: 0 },
  },
  Archer: {
    base: { HP: 90, ATK: 22, MAG: 5, DEF: 8, RES: 8, SPD: 28, ACC: 90, EVA: 8, CRIT: 7, CRIT_DMG: 150 },
    growth: { HP: 13, ATK: 3.6, MAG: 0.7, DEF: 1.2, RES: 1.0, SPD: 0.5, ACC: 0.15, EVA: 0.05, CRIT: 0, CRIT_DMG: 0 },
  },
  Thief: {
    base: { HP: 85, ATK: 20, MAG: 5, DEF: 7, RES: 7, SPD: 34, ACC: 85, EVA: 12, CRIT: 9, CRIT_DMG: 155 },
    growth: { HP: 12, ATK: 3.3, MAG: 0.7, DEF: 1.0, RES: 0.9, SPD: 0.65, ACC: 0.12, EVA: 0.1, CRIT: 0, CRIT_DMG: 0 },
  },
  Priest: {
    base: { HP: 100, ATK: 8, MAG: 20, DEF: 8, RES: 14, SPD: 22, ACC: 80, EVA: 6, CRIT: 5, CRIT_DMG: 145 },
    growth: { HP: 14, ATK: 1.0, MAG: 3.4, DEF: 1.1, RES: 2.0, SPD: 0.35, ACC: 0.08, EVA: 0.03, CRIT: 0, CRIT_DMG: 0 },
  },
  Mage: {
    base: { HP: 80, ATK: 5, MAG: 25, DEF: 6, RES: 10, SPD: 20, ACC: 82, EVA: 5, CRIT: 6, CRIT_DMG: 150 },
    growth: { HP: 11, ATK: 0.7, MAG: 4.0, DEF: 0.8, RES: 1.5, SPD: 0.3, ACC: 0.1, EVA: 0.03, CRIT: 0, CRIT_DMG: 0 },
  },
};

const gradeMultipliers: Record<CharacterGrade, number> = {
  Common: 1,
  Uncommon: 1.25,
  Rare: 1.55,
  Epic: 1.85,
};

const shardValues: Record<CharacterGrade, number> = {
  Common: 5,
  Uncommon: 15,
  Rare: 50,
  Epic: 100,
};

function statsFor(baseClass: ClassName, level: number, multiplier: number): StatBlock {
  const template = classStatTemplates[baseClass];
  const levelOffset = level - 1;
  const stat = (key: keyof StatBlock) =>
    Math.floor((template.base[key] + template.growth[key] * levelOffset) * multiplier);

  return {
    HP: stat("HP"),
    ATK: stat("ATK"),
    MAG: stat("MAG"),
    DEF: stat("DEF"),
    RES: stat("RES"),
    SPD: stat("SPD"),
    ACC: stat("ACC"),
    EVA: stat("EVA"),
    CRIT: stat("CRIT"),
    CRIT_DMG: stat("CRIT_DMG"),
  };
}

function powerFrom(stats: StatBlock): number {
  return Math.floor(
    stats.HP * 1.2 +
      (stats.ATK + stats.MAG) * 18 +
      (stats.DEF + stats.RES) * 12 +
      stats.SPD * 25 +
      (stats.ACC + stats.EVA + stats.CRIT) * 8,
  );
}

function createCharacter(params: {
  id: string;
  displayName: string;
  displayNameTh: string;
  grade: CharacterGrade;
  element: Element;
  baseClass: ClassName;
  role: GameCharacter["role"];
  level?: number;
  formationCell?: GameCharacter["formationCell"];
}): GameCharacter {
  const level = params.level ?? 1;
  const gradeMultiplier = gradeMultipliers[params.grade];
  const stats = statsFor(params.baseClass, level, gradeMultiplier);

  return {
    id: params.id,
    displayName: params.displayName,
    displayNameTh: params.displayNameTh,
    grade: params.grade,
    element: params.element,
    baseClass: params.baseClass,
    role: params.role,
    level,
    levelCap: 50,
    gradeMultiplier,
    activeSkillSlots: 3,
    classPath2: "locked",
    classPath3: "schema-only",
    shardValue: shardValues[params.grade],
    star: 0,
    shardState: {
      shardItemId: `${params.id}_shard`,
      owned: 0,
      requiredForNextStep: 50,
    },
    stats,
    power: powerFrom(stats),
    formationCell: params.formationCell,
  };
}

export const mainCharacter: MainCharacter = {
  ...createCharacter({
    id: "main_hero",
    displayName: "Hero",
    displayNameTh: "ฮีโร่",
    grade: "Epic",
    element: "Fire",
    baseClass: "Swordsman",
    role: "frontline",
    level: 12,
    formationCell: "front_center",
  }),
  id: "main_hero",
  isMainCharacter: true,
  star: "none-v1a",
  gradeMultiplier: 1.85,
  starterWeaponId: "gear_sword_t1_common",
};

export const box1GachaCharacters: GameCharacter[] = [
  createCharacter({ id: "ch_common_sword_fire_guard", displayName: "Fire Guard", displayNameTh: "องครักษ์ไฟ", grade: "Common", element: "Fire", baseClass: "Swordsman", role: "tank" }),
  createCharacter({ id: "ch_common_archer_wind_shot", displayName: "Wind Shot", displayNameTh: "ธนูลม", grade: "Common", element: "Wind", baseClass: "Archer", role: "damage" }),
  createCharacter({ id: "ch_common_thief_dark_cut", displayName: "Dark Cut", displayNameTh: "คมมีดเงา", grade: "Common", element: "Dark", baseClass: "Thief", role: "assassin" }),
  createCharacter({ id: "ch_common_priest_light_aid", displayName: "Light Aid", displayNameTh: "ผู้เยียวยาแสง", grade: "Common", element: "Light", baseClass: "Priest", role: "healer", level: 10, formationCell: "back_center" }),
  createCharacter({ id: "ch_common_mage_fire_spark", displayName: "Fire Spark", displayNameTh: "ประกายเพลิง", grade: "Common", element: "Fire", baseClass: "Mage", role: "magic", level: 9, formationCell: "middle_center" }),
  createCharacter({ id: "ch_uncommon_sword_earth_guard", displayName: "Earth Guard", displayNameTh: "พิทักษ์ศิลา", grade: "Uncommon", element: "Earth", baseClass: "Swordsman", role: "tank" }),
  createCharacter({ id: "ch_uncommon_archer_fire_burst", displayName: "Fire Burst", displayNameTh: "ธนูเพลิง", grade: "Uncommon", element: "Fire", baseClass: "Archer", role: "damage", level: 11, formationCell: "back_top" }),
  createCharacter({ id: "ch_uncommon_thief_wind_dash", displayName: "Wind Dash", displayNameTh: "เงาวายุ", grade: "Uncommon", element: "Wind", baseClass: "Thief", role: "assassin" }),
  createCharacter({ id: "ch_uncommon_priest_water_care", displayName: "Water Care", displayNameTh: "พรสายน้ำ", grade: "Uncommon", element: "Water", baseClass: "Priest", role: "healer" }),
  createCharacter({ id: "ch_uncommon_mage_water_wave", displayName: "Water Wave", displayNameTh: "คลื่นเวทน้ำ", grade: "Uncommon", element: "Water", baseClass: "Mage", role: "magic" }),
  createCharacter({ id: "ch_rare_sword_light_vanguard", displayName: "Light Vanguard", displayNameTh: "แนวหน้าแสง", grade: "Rare", element: "Light", baseClass: "Swordsman", role: "frontline" }),
  createCharacter({ id: "ch_rare_archer_wind_hunter", displayName: "Wind Hunter", displayNameTh: "พรานวายุ", grade: "Rare", element: "Wind", baseClass: "Archer", role: "damage" }),
  createCharacter({ id: "ch_rare_thief_dark_stalker", displayName: "Dark Stalker", displayNameTh: "นักล่าเงา", grade: "Rare", element: "Dark", baseClass: "Thief", role: "assassin" }),
  createCharacter({ id: "ch_rare_priest_light_oracle", displayName: "Light Oracle", displayNameTh: "โหรแสง", grade: "Rare", element: "Light", baseClass: "Priest", role: "support" }),
  createCharacter({ id: "ch_rare_mage_earth_sage", displayName: "Earth Sage", displayNameTh: "ปราชญ์ศิลา", grade: "Rare", element: "Earth", baseClass: "Mage", role: "magic" }),
];

export const mockCharacters: GameCharacter[] = [
  mainCharacter,
  ...box1GachaCharacters.filter((character) =>
    [
      "ch_common_priest_light_aid",
      "ch_uncommon_archer_fire_burst",
      "ch_common_mage_fire_spark",
    ].includes(character.id),
  ),
];

export const class1Previews: ClassPreview[] = [
  {
    className: "Swordsman",
    classNameTh: "นักดาบ",
    roleSummary: "Front bruiser / balanced physical fighter",
    starterWeaponId: "gear_sword_t1_common",
    coreStats: ["HP", "ATK", "DEF"],
    role: "frontline",
    assetId: "portrait_class_swordsman",
  },
  {
    className: "Archer",
    classNameTh: "นักธนู",
    roleSummary: "Backline physical DPS / accuracy / crit",
    starterWeaponId: "gear_bow_t1_common",
    coreStats: ["ATK", "ACC", "CRIT"],
    role: "damage",
    assetId: "portrait_class_archer",
  },
  {
    className: "Thief",
    classNameTh: "โจร",
    roleSummary: "Fast attacker / backline pressure / evasion",
    starterWeaponId: "gear_dagger_t1_common",
    coreStats: ["SPD", "EVA", "ATK"],
    role: "assassin",
    assetId: "portrait_class_thief",
  },
  {
    className: "Priest",
    classNameTh: "นักบวช",
    roleSummary: "Healer / shield / support",
    starterWeaponId: "gear_staff_t1_common",
    coreStats: ["MAG", "RES", "Heal"],
    role: "healer",
    assetId: "portrait_class_priest",
  },
  {
    className: "Mage",
    classNameTh: "นักเวทย์",
    roleSummary: "Magic DPS / AoE / elemental damage",
    starterWeaponId: "gear_staff_t1_common",
    coreStats: ["MAG", "MP", "AoE"],
    role: "magic",
    assetId: "portrait_class_mage",
  },
];
