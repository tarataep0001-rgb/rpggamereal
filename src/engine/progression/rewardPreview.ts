import type { BattleDrop, BattleEngineResult } from "../battle/battleTypes";
import type { FirstClearRewardSnapshot, StageProgressStage, StarChestSnapshot } from "./progressTypes";

export const DROP_CONFIG_VERSION = "drop_config_v1a_phase14_mock";

export function getGearChancePreview(stageType: BattleEngineResult["stage_type"], rewardedReplay = false) {
  const baseChance: Record<BattleEngineResult["stage_type"], number> = {
    normal: 8,
    elite: 15,
    "mini-boss": 35,
    "main-boss": 60,
  };
  const chance = rewardedReplay ? baseChance[stageType] * 0.2 : baseChance[stageType];
  return `${chance.toFixed(1).replace(".0", "")}% gear roll chance / Epic normal drop disabled`;
}

export function createFirstClearRewardSnapshot(
  stage: StageProgressStage,
  battleResult: BattleEngineResult,
  firstClearClaimedBefore: boolean,
): FirstClearRewardSnapshot {
  const available = battleResult.result === "victory" && !firstClearClaimedBefore;

  return {
    stage_id: stage.stage_id,
    first_clear_claimed_before: firstClearClaimedBefore,
    first_clear_available: available,
    first_clear_reward_snapshot: `first_clear_snapshot_${stage.stage_id}_${battleResult.deterministic_seed}`,
    xp_reward: available ? battleResult.xp_gained : 0,
    gold_reward: available ? battleResult.gold_gained : 0,
    material_rewards: available ? battleResult.drops : [],
    item_rewards: [],
    gear_chance_preview: getGearChancePreview(stage.stage_type),
    created_at: new Date(0).toISOString(),
    config_versions: {
      ...battleResult.config_versions,
      drop_config_version: DROP_CONFIG_VERSION,
    },
  };
}

export function createStarChestSnapshot(
  stage: StageProgressStage,
  battleResult: BattleEngineResult,
  starsBefore: 0 | 1 | 2 | 3,
  claimedBefore: boolean,
): StarChestSnapshot {
  const unlockedNow = battleResult.result === "victory" && battleResult.stars === 3 && starsBefore < 3;
  const rewardSnapshot: BattleDrop[] = [
    { item_id: "free_gem", label: "Free Gem", quantity: 1, icon_asset_id: "icon_reward_free_gem" },
    { item_id: "mat_enhancement_powder", label: "Enhancement Powder", quantity: 20, icon_asset_id: "icon_reward_powder" },
    { item_id: "mat_skill_book_fragment", label: "Skill Book Fragment", quantity: 1, icon_asset_id: "icon_mat_skill_book_fragment" },
  ];

  return {
    stage_id: stage.stage_id,
    available: unlockedNow && !claimedBefore,
    claimed_before: claimedBefore,
    unlocked_now: unlockedNow,
    reward_snapshot: unlockedNow && !claimedBefore ? rewardSnapshot : [],
    created_at: new Date(0).toISOString(),
  };
}
