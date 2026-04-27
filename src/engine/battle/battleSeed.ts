import type { BattleInputSnapshot } from "./battleTypes";

export function createBattleSeed(input: Pick<BattleInputSnapshot, "battle_id" | "stage_id" | "deterministic_seed">) {
  return `${input.deterministic_seed}:${input.battle_id}:${input.stage_id}`;
}
