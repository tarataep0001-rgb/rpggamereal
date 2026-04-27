import assert from "node:assert/strict";

import { createMockBattleInput } from "./mockBattleInput";
import { runBattle } from "./battleEngine";
import { validateBattleInput } from "./battleValidation";

const input = createMockBattleInput();
const validation = validateBattleInput(input);

assert.equal(validation.status, "pass", validation.errors.join("\n"));

const first = runBattle(input);
const second = runBattle(input);

assert.deepEqual(first, second, "same input and seed must produce identical output");
assert.equal(first.snapshot_info.team_snapshot, "present");
assert.equal(first.snapshot_info.enemy_snapshot, "present");
assert.ok(first.snapshot_info.deterministic_seed);
assert.ok(first.damage_logs.length > 0, "battle must produce damage logs");
assert.ok(first.skill_cast_logs.length > 0, "battle must produce skill cast logs");
assert.ok(
  first.damage_logs.every((log) => "shield_damage" in log && "actual_hp_damage" in log),
  "damage logs must include shield and actual HP split",
);
assert.ok(first.turns_used > 0, "battle must advance at least one turn");

console.log(
  JSON.stringify(
    {
      battle_id: first.battle_id,
      result: first.result,
      turns_used: first.turns_used,
      winner: first.result === "victory" ? "player" : "enemy",
      damage_log_count: first.damage_logs.length,
      skill_cast_count: first.skill_cast_logs.length,
      seed: first.snapshot_info.deterministic_seed,
    },
    null,
    2,
  ),
);
