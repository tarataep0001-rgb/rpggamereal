import type { BattleRuntimeUnit, BattleSkillSnapshot } from "./battleTypes";

function living(units: BattleRuntimeUnit[]) {
  return units.filter((unit) => unit.current_hp > 0);
}

export function resolveTargets(
  actor: BattleRuntimeUnit,
  skill: BattleSkillSnapshot | null,
  allies: BattleRuntimeUnit[],
  opponents: BattleRuntimeUnit[],
): BattleRuntimeUnit[] {
  const targetType = skill?.target_type ?? "single_enemy";

  if (targetType === "self") return [actor];
  if (targetType === "all_allies") return living(allies);
  if (targetType === "single_ally" || targetType === "ally_lowest_hp") {
    return living(allies)
      .sort((left, right) => left.current_hp / left.max_hp - right.current_hp / right.max_hp)
      .slice(0, 1);
  }
  if (targetType === "all_enemies") return living(opponents);

  return living(opponents)
    .sort((left, right) => {
      if (left.required_target !== right.required_target) return left.required_target ? -1 : 1;
      return left.current_hp - right.current_hp || left.unit_id.localeCompare(right.unit_id);
    })
    .slice(0, 1);
}
