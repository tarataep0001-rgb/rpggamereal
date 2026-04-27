import type { ProcessedStageProgressResult, StageProgressInput } from "./progressTypes";
import { isStageUnlocked } from "./stageProgressionRules";

function containsForbiddenRewardField(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  return Object.keys(value).some((key) => {
    const lowerKey = key.toLowerCase();
    return lowerKey.includes("wld") || lowerKey.includes("paidgem") || lowerKey.includes("paid_gem") || lowerKey.includes("ledger");
  });
}

export function validateStageProgressInput(input: StageProgressInput) {
  const errors: string[] = [];
  const warnings: string[] = [];
  const battle = input.battleResult;

  if (!input.stage.stage_id) errors.push("stage_id exists");
  if (!isStageUnlocked(input.state, input.stage.stage_id)) errors.push("stage is locked before attempt");
  if (!battle.deterministic_seed) errors.push("battle result deterministic seed missing");
  if (battle.snapshot_info.team_snapshot !== "present") errors.push("team_snapshot missing");
  if (battle.snapshot_info.enemy_snapshot !== "present") errors.push("enemy_snapshot missing");
  if (!battle.config_versions) errors.push("config_versions missing");
  if (!battle.config_versions.stage_config_version) errors.push("stage_config_version missing");
  if (containsForbiddenRewardField(battle.reward_preview)) errors.push("forbidden WLD/Paid Gem/ledger reward field found");

  Object.entries(input.state.rewardedReplayCounters).forEach(([stageId, counter]) => {
    if (counter.count < 0) errors.push(`negative replay counter for ${stageId}`);
  });

  if (input.state.firstClearClaimed[input.stage.stage_id] && battle.result !== "victory") {
    warnings.push("defeat does not duplicate first-clear reward");
  }

  return {
    status: errors.length === 0 ? "pass" as const : "fail" as const,
    errors,
    warnings,
    checked_at: new Date(0).toISOString(),
  };
}

export function validateProcessedStageProgress(result: ProcessedStageProgressResult) {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (containsForbiddenRewardField(result.first_clear)) errors.push("first-clear contains forbidden money fields");
  if (containsForbiddenRewardField(result.star_chest)) errors.push("StarChest contains forbidden money fields");
  if (containsForbiddenRewardField(result.replay)) errors.push("replay contains forbidden money fields");
  if (result.reward_log_preview.no_wld_reward !== true) errors.push("reward log must mark no WLD reward");
  if (result.reward_log_preview.no_paid_gem_reward !== true) errors.push("reward log must mark no Paid Gem reward");
  if (result.reward_log_preview.no_ledger !== true) errors.push("reward log must mark no ledger");
  if (result.replay.rewarded_replay_used_today < 0) errors.push("replay counter must be non-negative");
  if (result.first_clear.first_clear_claimed_before && result.first_clear.first_clear_available) {
    errors.push("first-clear cannot be duplicated");
  }
  if (result.star_chest.claimed_before && result.star_chest.available) {
    errors.push("StarChest cannot be duplicated");
  }
  if (result.atomicity.blockedBeforePartialReward) {
    warnings.push("reward claim would be blocked before partial grant");
  }

  return {
    status: errors.length === 0 ? "pass" as const : "fail" as const,
    errors,
    warnings,
    checked_at: new Date(0).toISOString(),
  };
}
