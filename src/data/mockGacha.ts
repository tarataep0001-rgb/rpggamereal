import type { GachaBox, GachaLogPreview, GachaPoolEntry } from "../types/game";
import { V1A_BOX1_GRADE_RATES, V1A_BOX1_POOL_IDS, V1A_GACHA_BOX_IDS } from "../config/gachaConfig";

const commonIds = V1A_BOX1_POOL_IDS.Common;
const uncommonIds = V1A_BOX1_POOL_IDS.Uncommon;
const rareIds = V1A_BOX1_POOL_IDS.Rare;

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
    id: V1A_GACHA_BOX_IDS.box1,
    name: "Box 1 - V1A Free/Test Pool",
    enabled: true,
    currency: "Free/Test Gem",
    singlePullEnabled: true,
    multiPullEnabled: false,
    rates: {
      ...V1A_BOX1_GRADE_RATES,
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
    id: V1A_GACHA_BOX_IDS.box2,
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
    id: V1A_GACHA_BOX_IDS.box3,
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
  status: "finalized_mock";
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
  status: "finalized_mock",
  oddsSnapshot: "Common 70 / Uncommon 25 / Rare 5, per-character equal within grade",
  pitySnapshotBefore: "pulls_since_last_rare=12",
  currencySpendSnapshot: "Free/Test Gem x1, no Paid Gem, no ledger",
  recoveryNote:
    "If finalized result exists, recovery returns original logged result. Refund only if no finalized result exists.",
};
