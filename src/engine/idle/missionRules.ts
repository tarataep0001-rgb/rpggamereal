import type { MissionConfig } from "./idleTypes";

export const dailyMissionConfigs: MissionConfig[] = [
  {
    mission_id: "daily_clear_stage_3",
    frequency: "daily",
    name: "Clear any stage 3 times",
    description: "Clear any stage 3 times",
    progress_key: "clear_stage",
    target: 3,
    reward: {
      gold: 500,
      materials: [
        {
          item_id: "mat_enhancement_powder",
          display_name: "Enhancement Powder",
          quantity: 20,
          reward_type: "material",
          asset_id: "icon_mat_enhancement_powder",
        },
      ],
    },
  },
  {
    mission_id: "daily_win_battle_5",
    frequency: "daily",
    name: "Win 5 battles",
    description: "Win 5 battles",
    progress_key: "win_battle",
    target: 5,
    reward: {
      gold: 800,
      materials: [
        {
          item_id: "mat_stone_lv1",
          display_name: "Stone Lv1",
          quantity: 1,
          reward_type: "material",
          asset_id: "icon_mat_stone_lv1",
        },
      ],
    },
  },
  {
    mission_id: "daily_claim_idle_1",
    frequency: "daily",
    name: "Claim Idle reward 1 time",
    description: "Claim Idle reward 1 time",
    progress_key: "claim_idle",
    target: 1,
    reward: {
      gold: 300,
      materials: [
        {
          item_id: "mat_skill_book_fragment",
          display_name: "Skill Book Fragment",
          quantity: 1,
          reward_type: "material",
          asset_id: "icon_mat_skill_book_fragment",
        },
      ],
    },
  },
  {
    mission_id: "daily_use_auto_farm_1",
    frequency: "daily",
    name: "Use Auto Farm 1 time",
    description: "Use Auto Farm 1 time",
    progress_key: "use_auto_farm",
    target: 1,
    reward: {
      gold: 300,
      materials: [
        {
          item_id: "mat_enhancement_powder",
          display_name: "Enhancement Powder",
          quantity: 10,
          reward_type: "material",
          asset_id: "icon_mat_enhancement_powder",
        },
      ],
    },
  },
  {
    mission_id: "daily_open_gacha_1",
    frequency: "daily",
    name: "Use Box 1 gacha 1 time",
    description: "Use Box 1 gacha 1 time",
    progress_key: "open_gacha",
    target: 1,
    reward: { free_gem: 1 },
  },
];

export const weeklyMissionConfigs: MissionConfig[] = [
  {
    mission_id: "weekly_clear_stage_30",
    frequency: "weekly",
    name: "Clear any stage 30 times",
    description: "Clear any stage 30 times",
    progress_key: "clear_stage",
    target: 30,
    reward: {
      gold: 5000,
      materials: [
        {
          item_id: "mat_skill_book",
          display_name: "Skill Book",
          quantity: 1,
          reward_type: "material",
          asset_id: "icon_mat_skill_book",
        },
      ],
    },
  },
  {
    mission_id: "weekly_claim_idle_5",
    frequency: "weekly",
    name: "Claim Idle reward 5 times",
    description: "Claim Idle reward 5 times",
    progress_key: "claim_idle",
    target: 5,
    reward: {
      gold: 3000,
      materials: [
        {
          item_id: "mat_stone_lv2",
          display_name: "Stone Lv2",
          quantity: 1,
          reward_type: "material",
          asset_id: "icon_mat_stone_lv2",
        },
      ],
    },
  },
  {
    mission_id: "weekly_use_gacha_10",
    frequency: "weekly",
    name: "Use Box 1 gacha 10 times",
    description: "Use Box 1 gacha 10 times",
    progress_key: "open_gacha",
    target: 10,
    reward: { free_gem: 5 },
  },
  {
    mission_id: "weekly_guild_boss_3",
    frequency: "weekly",
    name: "Participate in Guild Boss 3 times",
    description: "Participate in Guild Boss 3 times",
    progress_key: "guild_boss",
    target: 3,
    reward: { guild_point: 300 },
  },
];
