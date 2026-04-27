import type { BattleRuntimeUnit } from "./battleTypes";
import type { DeterministicRng } from "./deterministicRng";
import { getEffectiveStats } from "./statCalculator";

export function getTurnOrder(units: BattleRuntimeUnit[], rng: DeterministicRng): BattleRuntimeUnit[] {
  return units
    .filter((unit) => unit.current_hp > 0)
    .map((unit) => ({ unit, seedTie: rng.nextInt(1000000) }))
    .sort((left, right) => {
      const leftStats = getEffectiveStats(left.unit);
      const rightStats = getEffectiveStats(right.unit);
      if (rightStats.SPD !== leftStats.SPD) return rightStats.SPD - leftStats.SPD;
      if (left.unit.side !== right.unit.side) return left.unit.side === "player" ? -1 : 1;
      return left.unit.unit_id.localeCompare(right.unit.unit_id) || left.seedTie - right.seedTie;
    })
    .map((entry) => entry.unit);
}
