import { createConfigMeta } from "@/config/meta";

export const dropConfig = {
  ...createConfigMeta({
    configKey: "drop_config",
    notes:
      "Drop config foundation only. Real reward tables and authoritative reward calculations are later phases.",
  }),
  export_id: "drop_config",
  gearRollChance: {
    normalFirstClear: 8,
    eliteFirstClear: 15,
    miniBossFirstClear: 35,
    mainBossFirstClear: 60,
    rewardedReplayRateMultiplier: 0.2,
  },
  gradeDistribution: {
    chapter1To3: { Common: 60, Uncommon: 30, Rare: 10 },
    chapter4To5: { Common: 35, Uncommon: 42, Rare: 23 },
  },
  bossWeeklyRepeatReward: {
    limit: "1 time per boss_id per account per weekly period",
    weeklyReset: "Monday 00:00 Asia/Bangkok",
  },
  disabled: {
    epicNormalDropInV1A: true,
  },
} as const;
