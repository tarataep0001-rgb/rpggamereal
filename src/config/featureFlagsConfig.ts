import { createConfigMeta } from "@/config/meta";

export const featureFlagsConfig = {
  ...createConfigMeta({
    configKey: "feature_flags_config",
    notes:
      "V1A locked feature flags. WLD, Paid Gem, withdrawal, ledger, crafting, set bonus, and future classes remain disabled.",
  }),
  export_id: "feature_flags_config",
  flags: {
    ENABLE_WLD_WITHDRAW: false,
    ENABLE_WLD_REWARD_RANKING: false,
    ENABLE_PAID_GEM_GACHA: false,
    ENABLE_BOX_2: false,
    ENABLE_BOX_3: false,
    ENABLE_CLASS_2: false,
    ENABLE_CLASS_3: false,
    ENABLE_EPIC_NORMAL_DROP: false,
    ENABLE_CRAFTING: false,
    ENABLE_EQUIPMENT_SET_BONUS: false,
    ENABLE_SHARD_EXCHANGE: false,
    ENABLE_WLD_GUILD_REWARD: false,
  },
  constants: {
    V1A_CHAPTER_MAX: 5,
    V1A_EFFECTIVE_LEVEL_CAP: 50,
    V1A_NORMAL_GEAR_MAX_GRADE: "Rare",
    V1A_GACHA_CURRENCY: "Free/Test Gem",
    REGION_DEFAULT_RESTRICTED: true,
    LAUNCH_STATUS_DEFAULT: "NO-GO",
  },
} as const;
