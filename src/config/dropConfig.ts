import { createConfigMeta } from "@/config/meta";

const configMeta = createConfigMeta({
  configKey: "drop_config",
  notes:
    "Drop Config นี้เป็น mock/export-ready foundation. ยังไม่มี drop engine จริง และยังไม่ได้รัน simulation จริง.",
  status: "validated_mock",
});

export type DropStageTypeKey = "normal" | "elite" | "mini_boss" | "main_boss" | "idle" | "weekly_boss";

export type DropTableRow = {
  drop_table_id: string;
  chapter: 1 | 2 | 3 | 4 | 5;
  table_type: DropStageTypeKey;
  live_in_v1a: true;
  epic_normal_drop_enabled: false;
  config_version: string;
};

export type GearChestRow = {
  chest_id: string;
  display_name: string;
  grade_table_snapshot: Record<"Common" | "Uncommon" | "Rare", number>;
  family_roll_rule: {
    deployed_team_class_family_weight: 60;
    random_valid_family_weight: 40;
    note: string;
  };
  required_snapshot_fields: string[];
  asset_id: string;
  config_version: string;
};

export const gearRollChance = {
  normalFirstClear: 8,
  eliteFirstClear: 15,
  miniBossFirstClear: 35,
  mainBossFirstClear: 60,
  rewardedReplayRateMultiplier: 0.2,
} as const;

export const gradeDistribution = {
  chapter1To3: { Common: 60, Uncommon: 30, Rare: 10 },
  chapter4To5: { Common: 35, Uncommon: 42, Rare: 23 },
} as const;

export const materialDropDefaults = {
  Normal: ["Powder x10-20", "Stone Lv1 chance"],
  Elite: ["Powder x20-40", "Stone Lv1 / Lv2", "Skill Book Fragment"],
  "Mini-Boss": ["Skill Book first clear", "Stone Lv2", "Gear Chest"],
  "Main Boss": ["Skill Book", "Class Emblem Fragment", "Gear Chest"],
} as const;

export const bossWeeklyRepeatReward = {
  rates: {
    SkillBook: 35,
    StoneLv2: 30,
    GearChest: 15,
    ClassEmblemFragment: 20,
  },
  frequency: "1 time per boss_id per account per weekly period",
  weeklyReset: "Monday 00:00 Asia/Bangkok",
  uniqueness: ["user_id", "boss_id", "weekly_period"],
} as const;

const tableTypes: DropStageTypeKey[] = [
  "normal",
  "elite",
  "mini_boss",
  "main_boss",
  "idle",
  "weekly_boss",
];

export const dropTableRows: DropTableRow[] = ([1, 2, 3, 4, 5] as const).flatMap((chapter) =>
  tableTypes.map((tableType) => ({
    drop_table_id: `drop_ch${chapter}_${tableType}`,
    chapter,
    table_type: tableType,
    live_in_v1a: true,
    epic_normal_drop_enabled: false,
    config_version: configMeta.config_version,
  })),
);

const chestSnapshotFields = [
  "chest_id",
  "source_stage_id",
  "tier_snapshot",
  "grade_table_snapshot",
  "drop_config_version",
  "received_at",
];

const familyRollRule = {
  deployed_team_class_family_weight: 60,
  random_valid_family_weight: 40,
  note:
    "60% weighted from currently deployed team class families at chest opening, 40% random valid family. Family selection must not change tier/grade snapshot.",
} as const;

export const gearChestRows: GearChestRow[] = [
  {
    chest_id: "common_gear_chest",
    display_name: "Common Gear Chest",
    grade_table_snapshot: { Common: 100, Uncommon: 0, Rare: 0 },
    family_roll_rule: familyRollRule,
    required_snapshot_fields: chestSnapshotFields,
    asset_id: "icon_drop_gear",
    config_version: configMeta.config_version,
  },
  {
    chest_id: "uncommon_gear_chest",
    display_name: "Uncommon Gear Chest",
    grade_table_snapshot: { Common: 0, Uncommon: 100, Rare: 0 },
    family_roll_rule: familyRollRule,
    required_snapshot_fields: chestSnapshotFields,
    asset_id: "icon_drop_gear",
    config_version: configMeta.config_version,
  },
  {
    chest_id: "rare_gear_chest",
    display_name: "Rare Gear Chest",
    grade_table_snapshot: { Common: 0, Uncommon: 0, Rare: 100 },
    family_roll_rule: familyRollRule,
    required_snapshot_fields: chestSnapshotFields,
    asset_id: "icon_drop_gear",
    config_version: configMeta.config_version,
  },
  {
    chest_id: "mixed_gear_chest_v1a",
    display_name: "Mixed Gear Chest V1A",
    grade_table_snapshot: { Common: 60, Uncommon: 30, Rare: 10 },
    family_roll_rule: familyRollRule,
    required_snapshot_fields: chestSnapshotFields,
    asset_id: "icon_mixed_gear_chest",
    config_version: configMeta.config_version,
  },
  {
    chest_id: "boss_gear_chest_v1a",
    display_name: "Boss Gear Chest V1A",
    grade_table_snapshot: { Common: 0, Uncommon: 50, Rare: 50 },
    family_roll_rule: familyRollRule,
    required_snapshot_fields: chestSnapshotFields,
    asset_id: "icon_boss_chest",
    config_version: configMeta.config_version,
  },
];

export const dropConfig = {
  ...configMeta,
  export_id: "drop_config",
  gearRollChance,
  gradeDistribution,
  materialDropDefaults,
  gearChestRows,
  bossWeeklyRepeatReward,
  dropTableRows,
  dropTableIdPattern: "drop_ch{chapter}_{normal|elite|mini_boss|main_boss|idle|weekly_boss}",
  disabled: {
    epicNormalDropInV1A: true,
  },
  limitations: [
    "frontend/local validation only",
    "no real drop engine",
    "no simulation run",
    "not production config",
  ],
} as const;
