import type { BattleEngineResult } from "../battle/battleTypes";

export function calculateStageStars(battleResult: BattleEngineResult): 0 | 1 | 2 | 3 {
  if (battleResult.result !== "victory") return 0;

  const deadPlayerUnits = battleResult.final_unit_states.filter(
    (unit) => unit.side === "player" && !unit.alive,
  ).length;

  if (battleResult.turns_used <= 18 && deadPlayerUnits <= 1) return 3;
  if (battleResult.turns_used <= 30) return 2;
  return 1;
}
