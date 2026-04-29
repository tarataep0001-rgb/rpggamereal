import type { IdleRewardItem, IdleRewardSnapshot, MissionConfig } from "./idleTypes";

function rewardItems(config: MissionConfig): IdleRewardItem[] {
  const rewards: IdleRewardItem[] = [];

  if (config.reward.gold) {
    rewards.push({ item_id: "gold", display_name: "Gold", quantity: config.reward.gold, reward_type: "currency" });
  }
  if (config.reward.free_gem) {
    rewards.push({
      item_id: "free_gem",
      display_name: "Free Gem",
      quantity: config.reward.free_gem,
      reward_type: "currency",
      asset_id: "icon_free_gem",
    });
  }
  if (config.reward.guild_point) {
    rewards.push({
      item_id: "guild_point",
      display_name: "Guild Point",
      quantity: config.reward.guild_point,
      reward_type: "currency",
      asset_id: "icon_guild_point",
    });
  }

  return [...rewards, ...(config.reward.materials ?? [])];
}

export function createMissionRewardSnapshot(
  missionConfig: MissionConfig,
  periodKey: string,
): IdleRewardSnapshot {
  return {
    reward_snapshot_id: `mission_reward_snapshot_${missionConfig.mission_id}_${periodKey}`,
    source: "mission_claim",
    period_key: periodKey,
    rewards: rewardItems(missionConfig),
    no_wld_reward: true,
    no_paid_gem_reward: true,
    no_ledger: true,
    local_mock_only: true,
  };
}
