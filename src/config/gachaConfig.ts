import { createConfigMeta } from "./meta";
import type { CharacterGrade } from "../types/game";

export const V1A_GACHA_BOX_IDS = {
  box1: "box_1_v1a",
  box2: "box_2_internal",
  box3: "box_3_disabled",
} as const;

export const V1A_GACHA_PITY_LIMIT = 30;

export const V1A_BOX1_GRADE_RATES: Record<Exclude<CharacterGrade, "Epic">, number> = {
  Common: 70,
  Uncommon: 25,
  Rare: 5,
};

export const V1A_BOX1_POOL_IDS: Record<Exclude<CharacterGrade, "Epic">, readonly string[]> = {
  Common: [
    "ch_common_sword_fire_guard",
    "ch_common_archer_wind_shot",
    "ch_common_thief_dark_cut",
    "ch_common_priest_light_aid",
    "ch_common_mage_fire_spark",
  ],
  Uncommon: [
    "ch_uncommon_sword_earth_guard",
    "ch_uncommon_archer_fire_burst",
    "ch_uncommon_thief_wind_dash",
    "ch_uncommon_priest_water_care",
    "ch_uncommon_mage_water_wave",
  ],
  Rare: [
    "ch_rare_sword_light_vanguard",
    "ch_rare_archer_wind_hunter",
    "ch_rare_thief_dark_stalker",
    "ch_rare_priest_light_oracle",
    "ch_rare_mage_earth_sage",
  ],
};

export const gachaConfig = {
  ...createConfigMeta({
    configKey: "gacha_config",
    notes:
      "V1A local mock gacha config. Box 1 uses Free/Test Gem only. Paid Gem, WLD, ledger, backend authority, Box 2, Box 3, and multi-pull remain disabled.",
  }),
  export_id: "gacha_config",
  box1: {
    box_id: V1A_GACHA_BOX_IDS.box1,
    currency: "Free/Test Gem",
    single_pull_enabled: true,
    multi_pull_enabled: false,
    paid_gem_gacha_enabled: false,
    grade_rates: V1A_BOX1_GRADE_RATES,
    pool_ids: V1A_BOX1_POOL_IDS,
    pity_limit: V1A_GACHA_PITY_LIMIT,
  },
  locked: {
    paid_gem_gacha_enabled: false,
    box2_enabled: false,
    box2_internal_test_only: true,
    box3_enabled: false,
    shard_exchange_enabled: false,
    no_wld: true,
    no_ledger: true,
  },
} as const;
