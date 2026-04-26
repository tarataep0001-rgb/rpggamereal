import type { GachaBox, GachaLogPreview, GachaPoolEntry } from "@/types/game";

const commonIds = [
  "ch_common_sword_fire_guard",
  "ch_common_archer_wind_shot",
  "ch_common_thief_dark_cut",
  "ch_common_priest_light_aid",
  "ch_common_mage_fire_spark",
] as const;

const uncommonIds = [
  "ch_uncommon_sword_earth_guard",
  "ch_uncommon_archer_fire_burst",
  "ch_uncommon_thief_wind_dash",
  "ch_uncommon_priest_water_care",
  "ch_uncommon_mage_water_wave",
] as const;

const rareIds = [
  "ch_rare_sword_light_vanguard",
  "ch_rare_archer_wind_hunter",
  "ch_rare_thief_dark_stalker",
  "ch_rare_priest_light_oracle",
  "ch_rare_mage_earth_sage",
] as const;

const commonPool: GachaPoolEntry[] = commonIds.map((character_id) => ({
  character_id,
  grade: "Common",
  ratePercent: 14,
  weightWithinGrade: 20,
}));

const uncommonPool: GachaPoolEntry[] = uncommonIds.map((character_id) => ({
  character_id,
  grade: "Uncommon",
  ratePercent: 5,
  weightWithinGrade: 20,
}));

const rarePool: GachaPoolEntry[] = rareIds.map((character_id) => ({
  character_id,
  grade: "Rare",
  ratePercent: 1,
  weightWithinGrade: 20,
}));

const disabledPity = {
  pityLimit: 30,
  currentCounter: 0,
  guaranteedGrade: "Rare",
  resetOnGrade: "Rare",
} as const;

export const box1PityPreview = {
  pullsSinceLastRare: 12,
  pityLimit: 30,
  nextGuaranteeAt: 30,
  rareGuaranteedOnPull: 30,
  guaranteedRareWeight: "Equal weight among Rare characters",
} as const;

export const duplicateShardRules = [
  { grade: "Common", shards: 5 },
  { grade: "Uncommon", shards: 10 },
  { grade: "Rare", shards: 20 },
] as const;

export const gachaBoxes: GachaBox[] = [
  {
    id: "box_1_v1a",
    name: "Box 1 - V1A Free/Test Pool",
    enabled: true,
    currency: "Free/Test Gem",
    singlePullEnabled: true,
    multiPullEnabled: false,
    rates: {
      Common: 70,
      Uncommon: 25,
      Rare: 5,
    },
    pool: [...commonPool, ...uncommonPool, ...rarePool],
    pityState: {
      pityLimit: 30,
      currentCounter: box1PityPreview.pullsSinceLastRare,
      guaranteedGrade: "Rare",
      resetOnGrade: "Rare",
    },
    pityRule:
      "If no Rare in previous 29 pulls, pull #30 guarantees Rare. Rare resets counter to 0.",
    paidGemDisabled: true,
  },
  {
    id: "box_2_internal",
    name: "Box 2 - Internal Test Only",
    enabled: false,
    currency: "Free/Test Gem",
    singlePullEnabled: false,
    multiPullEnabled: false,
    rates: {
      Common: 0,
      Uncommon: 0,
      Rare: 0,
    },
    pool: [],
    pityState: disabledPity,
    pityRule: "Disabled except internal test.",
    paidGemDisabled: true,
  },
  {
    id: "box_3_disabled",
    name: "Box 3 - Disabled",
    enabled: false,
    currency: "Paid Gem",
    singlePullEnabled: false,
    multiPullEnabled: false,
    rates: {
      Common: 0,
      Uncommon: 0,
      Rare: 0,
    },
    pool: [],
    pityState: disabledPity,
    pityRule: "Disabled in V1A.",
    paidGemDisabled: true,
  },
];

export const paidGemGachaEnabled = false;

export const gachaLogPreview: GachaLogPreview & {
  status: "mock-finalized";
  oddsSnapshot: string;
  pitySnapshotBefore: string;
  currencySpendSnapshot: string;
  recoveryNote: string;
} = {
  logId: "preview_only_001",
  boxId: "box_1_v1a",
  resultCharacterId: "ch_common_priest_light_aid",
  grade: "Common",
  pityCounterBefore: 12,
  pityCounterAfter: 13,
  status: "mock-finalized",
  oddsSnapshot: "Common 70 / Uncommon 25 / Rare 5, per-character equal within grade",
  pitySnapshotBefore: "pulls_since_last_rare=12",
  currencySpendSnapshot: "Free/Test Gem x1, no Paid Gem, no ledger",
  recoveryNote:
    "If finalized result exists, recovery returns original logged result. Refund only if no finalized result exists.",
};
