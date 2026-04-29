import type { CellId } from "../../types/game";

export type IdleRewardItem = {
  item_id: string;
  display_name: string;
  quantity: number;
  reward_type: "material" | "drop" | "currency";
  asset_id?: string;
};

export type IdleTeamXpRow = {
  character_id: string;
  display_name: string;
  cell_id: CellId | "undeployed";
  deployed: boolean;
  level: number;
  level_cap: 50;
  xp_share_percent: 0 | 100;
  xp_gain_preview: number;
  level_capped: boolean;
  capped_no_conversion_v1a: boolean;
};

export type IdleRewardSnapshot = {
  reward_snapshot_id: string;
  source: "idle_claim" | "auto_farm" | "mission_claim";
  period_key: string;
  rewards: IdleRewardItem[];
  no_wld_reward: true;
  no_paid_gem_reward: true;
  no_ledger: true;
  local_mock_only: true;
};

export type IdleRewardPreview = {
  idle_stage: string;
  idle_stage_global_index: number;
  highest_three_star_stage: string;
  accumulated_hours: number;
  capped_hours: number;
  max_idle_hours: 8;
  xp_ready: number;
  gold_ready: number;
  material_preview: IdleRewardItem[];
  drop_preview: IdleRewardItem[];
  deployed_team_snapshot: IdleTeamXpRow[];
  xp_distribution_preview: IdleTeamXpRow[];
  reward_snapshot: IdleRewardSnapshot;
  config_versions: {
    idle_config: string;
    stage_config: string;
    drop_config: string;
    source_spec: string;
  };
  created_at: string;
  no_wld_reward: true;
  no_ledger: true;
};

export type AutoFarmPreview = {
  auto_farm_hours: 2;
  free_auto_farm_per_day: 2;
  used_free_auto_farm_today: number;
  remaining_free_auto_farm: number;
  extra_purchase_index: number;
  extra_price_ladder: readonly [20, 40, 60, 80, 100, 120];
  next_extra_price: number | null;
  bangkok_business_date: string;
  can_use_free_auto_farm: boolean;
  paid_disabled_note: string;
  free_test_gem_preview_only: true;
  no_wld_payment: true;
  no_paid_gem_payment: true;
};

export type MissionFrequency = "daily" | "weekly";

export type MissionRewardConfig = {
  gold?: number;
  free_gem?: number;
  guild_point?: number;
  materials?: IdleRewardItem[];
};

export type MissionConfig = {
  mission_id: string;
  frequency: MissionFrequency;
  name: string;
  description: string;
  progress_key: string;
  target: number;
  reward: MissionRewardConfig;
};

export type MissionState = {
  mission_id: string;
  period_key: string;
  progress: number;
  claimed: boolean;
};

export type MissionPreview = {
  mission_id: string;
  frequency: MissionFrequency;
  name: string;
  description: string;
  progress: number;
  target: number;
  period_key: string;
  claimable: boolean;
  claimed: boolean;
  blocked_reason: string | null;
  reward_snapshot: IdleRewardSnapshot;
};

export type MissionClaimValidation = {
  mission_id: string;
  can_claim: boolean;
  reason: string;
};

export type IdleAtomicityPreview = {
  inventory_slots: number;
  used_inventory_slots: number;
  mailbox_count: number;
  mailbox_limit: number;
  item_rewards_need_slots: number;
  can_fit_inventory: boolean;
  can_overflow_to_mailbox: boolean;
  blocked_before_partial_reward: boolean;
  currency_rewards_skip_mailbox: true;
  wld_ledger_rewards_never_mailbox: true;
  all_or_nothing_claim: true;
  notes: string[];
};

export type IdleMissionValidationResult = {
  status: "pass" | "warning" | "fail";
  errors: string[];
  warnings: string[];
  checked_at: string;
};

export type IdleMissionInput = {
  now: string;
  idle_stage: string;
  highest_three_star_stage: string;
  idle_stage_global_index: number;
  accumulated_hours: number;
  inventory: {
    inventory_slots: number;
    used_inventory_slots: number;
    mailbox_count: number;
    mailbox_limit: number;
  };
  team_snapshot: IdleTeamXpRow[];
  auto_farm: {
    used_today: number;
    extra_purchase_count_today: number;
  };
  mission_progress: Record<string, number>;
  claimed_daily: MissionState[];
  claimed_weekly: MissionState[];
  config_versions: IdleRewardPreview["config_versions"];
};

export type IdleMissionPreview = {
  preview_id: string;
  bangkok_business_date: string;
  bangkok_week_key: string;
  daily_reset_display: "00:00 Asia/Bangkok";
  weekly_reset_display: "Monday 00:00 Asia/Bangkok";
  idle_reward: IdleRewardPreview;
  auto_farm: AutoFarmPreview;
  daily_missions: MissionPreview[];
  weekly_missions: MissionPreview[];
  atomicity: IdleAtomicityPreview;
  validation: IdleMissionValidationResult;
  no_wld_reward: true;
  no_paid_gem_reward: true;
  no_ledger: true;
  no_backend_authority: true;
  local_mock_only: true;
};
