import type { BattleDrop, BattleEngineResult } from "../battle/battleTypes";

export type ProgressValidationResult = {
  status: "pass" | "fail";
  errors: string[];
  warnings: string[];
  checked_at: string;
};

export type StageProgressModel = {
  highestStageCleared: string;
  unlockedStages: string[];
  starRatings: Record<string, 0 | 1 | 2 | 3>;
  firstClearClaimed: Record<string, boolean>;
  starChestClaimed: Record<string, boolean>;
  rewardedReplayCounters: Record<string, { businessDate: string; count: number; cap: number }>;
};

export type StageProgressStage = {
  stage_id: string;
  chapter: number;
  stage_number: number;
  stage_type: BattleEngineResult["stage_type"];
  drop_table_id: string;
  first_clear_reward_formula: string;
  star_chest_reward: string;
};

export type FirstClearRewardSnapshot = {
  stage_id: string;
  first_clear_claimed_before: boolean;
  first_clear_available: boolean;
  first_clear_reward_snapshot: string;
  xp_reward: number;
  gold_reward: number;
  material_rewards: BattleDrop[];
  item_rewards: BattleDrop[];
  gear_chance_preview: string;
  created_at: string;
  config_versions: BattleEngineResult["config_versions"] & { drop_config_version: string };
};

export type StarChestSnapshot = {
  stage_id: string;
  available: boolean;
  claimed_before: boolean;
  unlocked_now: boolean;
  reward_snapshot: BattleDrop[];
  created_at: string;
};

export type ReplayRewardPreview = {
  stage_id: string;
  eligible: boolean;
  rewarded_replay_cap_per_day: number;
  rewarded_replay_used_today: number;
  bangkok_business_date: string;
  cap_reached: boolean;
  message_th: string;
  xp_reward: number;
  gold_reward: number;
  drops: BattleDrop[];
  gear_chance_multiplier: 0.2;
};

export type RewardAtomicityPreview = {
  inventorySlots: number;
  usedInventorySlots: number;
  mailboxCount: number;
  mailboxLimit: number;
  itemRewardsNeedSlots: number;
  canFitInventory: boolean;
  canOverflowMailbox: boolean;
  blockedBeforePartialReward: boolean;
  notes: string[];
};

export type XpDistributionPreview = {
  unit_id: string;
  display_name: string;
  alive_at_end: boolean;
  xp_percent: 100 | 70 | 0;
  xp_amount: number;
  capped_no_extra_xp: boolean;
};

export type ProcessedStageProgressResult = {
  stage_id: string;
  result: BattleEngineResult["result"];
  previous_highest_stage: string;
  next_stage_unlocked: string | null;
  stars_before: 0 | 1 | 2 | 3;
  stars_after: 0 | 1 | 2 | 3;
  first_clear: FirstClearRewardSnapshot;
  star_chest: StarChestSnapshot;
  replay: ReplayRewardPreview;
  xp_distribution: XpDistributionPreview[];
  atomicity: RewardAtomicityPreview;
  reward_log_preview: {
    log_id: string;
    stage_id: string;
    reward_snapshot_id: string;
    local_mock_only: true;
    no_wld_reward: true;
    no_paid_gem_reward: true;
    no_ledger: true;
  };
  validation: ProgressValidationResult;
  safety_notes: string[];
};

export type StageProgressInput = {
  state: StageProgressModel;
  stage: StageProgressStage;
  battleResult: BattleEngineResult;
  bangkokBusinessDate: string;
  inventoryPreview: {
    inventorySlots: number;
    usedInventorySlots: number;
    mailboxCount: number;
    mailboxLimit: number;
  };
};
