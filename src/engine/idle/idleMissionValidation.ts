import { EXTRA_AUTO_FARM_PRICES, FREE_AUTO_FARM_PER_DAY, IDLE_MAX_HOURS, AUTO_FARM_HOURS } from "./idleRules";
import type { IdleMissionInput, IdleMissionPreview, IdleMissionValidationResult, MissionPreview } from "./idleTypes";

function buildResult(errors: string[], warnings: string[]): IdleMissionValidationResult {
  return {
    status: errors.length > 0 ? "fail" : warnings.length > 0 ? "warning" : "pass",
    errors,
    warnings,
    checked_at: new Date().toISOString(),
  };
}

function validateMissionRewards(missions: readonly MissionPreview[], errors: string[]) {
  missions.forEach((mission) => {
    if (!mission.reward_snapshot) errors.push(`${mission.mission_id} missing reward snapshot.`);
    if (mission.reward_snapshot.no_wld_reward !== true) errors.push(`${mission.mission_id} must have no WLD reward.`);
    if (mission.reward_snapshot.no_paid_gem_reward !== true) errors.push(`${mission.mission_id} must have no Paid Gem reward.`);
    if (mission.reward_snapshot.no_ledger !== true) errors.push(`${mission.mission_id} must have no ledger.`);
  });
}

export function validateIdleMissionPreview(params: {
  input: IdleMissionInput;
  preview: IdleMissionPreview;
}): IdleMissionValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!params.input.idle_stage) errors.push("idle_stage must exist.");
  if (params.input.idle_stage !== params.input.highest_three_star_stage) {
    warnings.push("idle_stage is using a valid mock fallback instead of highest three-star stage.");
  }
  if (params.input.accumulated_hours < 0) errors.push("accumulated_hours must be >= 0.");
  if (params.preview.idle_reward.capped_hours > IDLE_MAX_HOURS) errors.push("capped_hours must be <= 8.");
  if (params.preview.auto_farm.auto_farm_hours !== AUTO_FARM_HOURS) errors.push("Auto Farm hours must be 2.");
  if (params.preview.auto_farm.free_auto_farm_per_day !== FREE_AUTO_FARM_PER_DAY) errors.push("Free Auto Farm per day must be 2.");
  if (params.preview.auto_farm.extra_price_ladder.join(",") !== EXTRA_AUTO_FARM_PRICES.join(",")) {
    errors.push("Extra Auto Farm price ladder mismatch.");
  }
  if (params.preview.bangkok_business_date.length !== 10) errors.push("Daily mission period must use Bangkok business date.");
  if (!/^\d{4}-W\d{2}$/.test(params.preview.bangkok_week_key)) errors.push("Weekly mission period must use Bangkok week key.");
  validateMissionRewards([...params.preview.daily_missions, ...params.preview.weekly_missions], errors);
  if (!params.preview.atomicity) errors.push("inventory/mailbox atomicity preview must exist.");
  if (params.preview.no_wld_reward !== true || params.preview.no_paid_gem_reward !== true || params.preview.no_ledger !== true) {
    errors.push("Preview must explicitly exclude WLD, Paid Gem reward, and ledger.");
  }

  return buildResult(errors, warnings);
}
