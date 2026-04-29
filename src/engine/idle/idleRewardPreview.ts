import { calculateIdleGold, calculateIdleXp, IDLE_MAX_HOURS } from "./idleRules";
import { createIdleXpDistributionPreview } from "./idleXpDistribution";
import type { IdleMissionInput, IdleRewardItem, IdleRewardPreview } from "./idleTypes";

function materialPreview(stageGlobalIndex: number): IdleRewardItem[] {
  return [
    {
      item_id: "mat_enhancement_powder",
      display_name: "Enhancement Powder",
      quantity: Math.max(10, stageGlobalIndex * 4),
      reward_type: "material",
      asset_id: "icon_mat_enhancement_powder",
    },
    {
      item_id: "mat_stone_lv1",
      display_name: "Stone Lv1",
      quantity: Math.max(1, Math.floor(stageGlobalIndex / 3)),
      reward_type: "material",
      asset_id: "icon_mat_stone_lv1",
    },
  ];
}

function dropPreview(stageGlobalIndex: number): IdleRewardItem[] {
  return [
    {
      item_id: "mock_idle_gear_chest",
      display_name: "Idle Gear Chest mock chance",
      quantity: stageGlobalIndex >= 5 ? 1 : 0,
      reward_type: "drop",
      asset_id: "icon_reward_chest",
    },
  ];
}

export function createIdleRewardPreview(input: IdleMissionInput): IdleRewardPreview {
  const cappedHours = Math.min(IDLE_MAX_HOURS, Math.max(0, input.accumulated_hours));
  const xpReady = calculateIdleXp(input.idle_stage_global_index, cappedHours);
  const goldReady = calculateIdleGold(input.idle_stage_global_index, cappedHours);
  const materialRewards = materialPreview(input.idle_stage_global_index);
  const dropRewards = dropPreview(input.idle_stage_global_index);

  return {
    idle_stage: input.idle_stage,
    idle_stage_global_index: input.idle_stage_global_index,
    highest_three_star_stage: input.highest_three_star_stage,
    accumulated_hours: input.accumulated_hours,
    capped_hours: cappedHours,
    max_idle_hours: IDLE_MAX_HOURS,
    xp_ready: xpReady,
    gold_ready: goldReady,
    material_preview: materialRewards,
    drop_preview: dropRewards,
    deployed_team_snapshot: input.team_snapshot.filter((unit) => unit.deployed),
    xp_distribution_preview: createIdleXpDistributionPreview(input.team_snapshot, xpReady),
    reward_snapshot: {
      reward_snapshot_id: `idle_reward_snapshot_${input.idle_stage}_${input.now}`,
      source: "idle_claim",
      period_key: input.now,
      rewards: [
        { item_id: "gold", display_name: "Gold", quantity: goldReady, reward_type: "currency" },
        ...materialRewards,
        ...dropRewards.filter((drop) => drop.quantity > 0),
      ],
      no_wld_reward: true,
      no_paid_gem_reward: true,
      no_ledger: true,
      local_mock_only: true,
    },
    config_versions: {
      ...input.config_versions,
    },
    created_at: input.now,
    no_wld_reward: true,
    no_ledger: true,
  };
}
