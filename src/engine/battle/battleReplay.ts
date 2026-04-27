import type { BattleEngineResult, BattleInputSnapshot } from "./battleTypes";
import { runBattle } from "./battleEngine";

export function replayBattle(input: BattleInputSnapshot): BattleEngineResult {
  return runBattle(input);
}

export function isDeterministicReplay(input: BattleInputSnapshot) {
  return JSON.stringify(runBattle(input)) === JSON.stringify(runBattle(input));
}
