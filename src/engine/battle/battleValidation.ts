import type { BattleInputSnapshot, BattleValidationResult } from "./battleTypes";

function hasForbiddenMoneyField(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  return Object.keys(value).some((key) => {
    const lowerKey = key.toLowerCase();
    return lowerKey.includes("wld") || lowerKey.includes("paidgem") || lowerKey.includes("ledger");
  });
}

export function validateBattleInput(input: BattleInputSnapshot): BattleValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const unitIds = input.team_snapshot.map((unit) => unit.unit_id);
  const uniqueUnitIds = new Set(unitIds);

  if (!input.battle_id) errors.push("battle_id is required");
  if (!input.stage_id) errors.push("stage_id is required");
  if (!input.deterministic_seed) errors.push("deterministic_seed is required");
  if (!input.config_versions) errors.push("config_versions are required");
  if (!input.skill_loadout_snapshot) errors.push("skill_loadout_snapshot is required");
  if (!input.formation_snapshot) errors.push("formation_snapshot is required");
  if (input.team_snapshot.length < 1 || input.team_snapshot.length > 6) {
    errors.push("team snapshot must contain 1-6 deployed units");
  }
  if (!unitIds.includes("main_hero")) errors.push("main_hero must be deployed");
  if (uniqueUnitIds.size !== unitIds.length) errors.push("duplicate player unit_id detected");
  if (input.enemy_snapshot.length === 0) errors.push("enemy snapshot must not be empty");

  const invalidHpUnits = [...input.team_snapshot, ...input.enemy_snapshot].filter((unit) => unit.max_hp <= 0);
  if (invalidHpUnits.length > 0) {
    errors.push(`all battle units must start with HP > 0: ${invalidHpUnits.map((unit) => unit.unit_id).join(", ")}`);
  }

  if (hasForbiddenMoneyField(input.reward_preview)) {
    errors.push("battle input must not include WLD, Paid Gem, or ledger reward fields");
  }

  if (input.turn_limit <= 0) warnings.push("turn_limit should be positive");

  return {
    status: errors.length === 0 ? "pass" : "fail",
    errors,
    warnings,
  };
}
