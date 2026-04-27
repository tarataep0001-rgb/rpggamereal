import assert from "node:assert/strict";

import { createMockStageProgressInput } from "./mockStageProgressInput";
import { processBattleForStageProgress } from "./stageProgressEngine";
import { validateProcessedStageProgress } from "./progressValidation";

const input = createMockStageProgressInput();
const processed = processBattleForStageProgress(input);
const validation = validateProcessedStageProgress(processed);

assert.equal(processed.result, "victory");
assert.equal(processed.stars_after, 3);
assert.equal(processed.first_clear.first_clear_available, true);
assert.equal(processed.star_chest.available, true);
assert.equal(processed.next_stage_unlocked, "1-6");
assert.equal(processed.replay.bangkok_business_date, "2026-04-27");
assert.equal(processed.reward_log_preview.no_wld_reward, true);
assert.equal(processed.reward_log_preview.no_paid_gem_reward, true);
assert.equal(processed.reward_log_preview.no_ledger, true);
assert.equal(validation.status, "pass", validation.errors.join("\n"));

console.log(
  JSON.stringify(
    {
      stage_id: processed.stage_id,
      result: processed.result,
      stars: processed.stars_after,
      first_clear_available: processed.first_clear.first_clear_available,
      star_chest_available: processed.star_chest.available,
      next_stage_unlocked: processed.next_stage_unlocked,
      reward_preview_totals: {
        xp: processed.first_clear.xp_reward,
        gold: processed.first_clear.gold_reward,
        drops: processed.first_clear.material_rewards.length + processed.star_chest.reward_snapshot.length,
      },
      validation_status: processed.validation.status,
    },
    null,
    2,
  ),
);
