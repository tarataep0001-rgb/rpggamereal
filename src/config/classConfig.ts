import { createConfigMeta } from "@/config/meta";
import { classStatTemplates } from "@/data/mockCharacters";
import type { ClassName, ClassTier } from "@/types/game";

export type ClassConfigRow = {
  class_id: string;
  class_name: ClassName;
  display_name_th: string;
  class_tier: ClassTier;
  live_in_v1a: boolean;
  role: string;
  starter_weapon: string;
  core_stats: string[];
  asset_id: string;
  config_version: string;
};

export const classConfigRows: ClassConfigRow[] = [
  {
    class_id: "class_1_swordsman",
    class_name: "Swordsman",
    display_name_th: "นักดาบ",
    class_tier: 1,
    live_in_v1a: true,
    role: "Front bruiser / balanced physical fighter",
    starter_weapon: "gear_sword_t1_common",
    core_stats: ["HP", "ATK", "DEF"],
    asset_id: "icon_class_swordsman",
    config_version: "v1a.class.swordsman.0",
  },
  {
    class_id: "class_1_archer",
    class_name: "Archer",
    display_name_th: "นักธนู",
    class_tier: 1,
    live_in_v1a: true,
    role: "Backline physical DPS / accuracy / crit",
    starter_weapon: "gear_bow_t1_common",
    core_stats: ["ATK", "ACC", "CRIT"],
    asset_id: "icon_class_archer",
    config_version: "v1a.class.archer.0",
  },
  {
    class_id: "class_1_thief",
    class_name: "Thief",
    display_name_th: "โจร",
    class_tier: 1,
    live_in_v1a: true,
    role: "Fast attacker / backline pressure / evasion",
    starter_weapon: "gear_dagger_t1_common",
    core_stats: ["SPD", "EVA", "ATK"],
    asset_id: "icon_class_thief",
    config_version: "v1a.class.thief.0",
  },
  {
    class_id: "class_1_priest",
    class_name: "Priest",
    display_name_th: "นักบวช",
    class_tier: 1,
    live_in_v1a: true,
    role: "Healer / shield / support",
    starter_weapon: "gear_staff_t1_common",
    core_stats: ["MAG", "RES", "HealPower"],
    asset_id: "icon_class_priest",
    config_version: "v1a.class.priest.0",
  },
  {
    class_id: "class_1_mage",
    class_name: "Mage",
    display_name_th: "นักเวทย์",
    class_tier: 1,
    live_in_v1a: true,
    role: "Magic DPS / AoE / elemental damage",
    starter_weapon: "gear_staff_t1_common",
    core_stats: ["MAG", "MP", "AoE"],
    asset_id: "icon_class_mage",
    config_version: "v1a.class.mage.0",
  },
];

export const classConfig = {
  ...createConfigMeta({
    configKey: "class_config",
    status: "validated_mock",
    notes:
      "Class 1 export rows are complete for V1A mock export. Class 2 and Class 3 remain locked/schema-only.",
  }),
  export_id: "class_config",
  rows: classConfigRows,
  class1Live: classConfigRows.map((row) => row.class_name),
  classStatTemplates,
  mainCharacterRules: {
    mandatory: true,
    legendaryEquivalentMultiplier: 1.85,
    starSystem: "none for main character in V1A",
  },
  teammateRules: {
    starSystemAppliesTo: "gacha teammates only",
    duplicateConvertsToShards: true,
    extraShardsAfterStar5Stored: true,
    shardExchange: "disabled/schema only in V1A",
  },
  roadmapLocks: {
    class2: {
      live_in_v1a: false,
      unlocks: "V1B at Lv60",
      skill1: "Lv60 only after validation/simulation gates",
      skill2: "Lv75 future content",
      skill3: "Lv90 future content",
      placeholderOnlySkillsCannotGoLive: true,
    },
    class3: {
      live_in_v1a: false,
      schema_only: true,
      unlocks: "later at Lv120",
      skills: ["Lv120", "Lv140", "Lv160", "Lv180"],
      rowsMustBeCompletedAndVersionedBeforeLive: true,
    },
  },
  starterWeaponMapping: Object.fromEntries(
    classConfigRows.map((row) => [row.class_name, row.starter_weapon]),
  ) as Record<ClassName, string>,
} as const;
