import assert from "node:assert/strict";
import {
  createMockGachaInput,
  previewDuplicateShardGain,
  runSinglePull,
  validateGachaInput,
} from "./index";

const input = createMockGachaInput({
  seed: "phase21-gacha-seed",
  pullsSinceLastRare: 29,
  ownedCharacterIds: ["ch_rare_mage_earth_sage"],
});

const firstResult = runSinglePull(input);
const secondResult = runSinglePull(input);
const validation = validateGachaInput(input);
const rareShardPreview = previewDuplicateShardGain("Rare");

assert.deepEqual(firstResult.result, secondResult.result);
assert.equal(firstResult.seed, "phase21-gacha-seed");
assert.equal(firstResult.result.grade, "Rare");
assert.equal(firstResult.pity_snapshot_before.guaranteed_triggered, true);
assert.equal(firstResult.pity_snapshot_after.pulls_since_last_rare, 0);
assert.equal(firstResult.currency_spend_snapshot.currency, "Free/Test Gem");
assert.equal(firstResult.currency_spend_snapshot.paid_gem_spend, 0);
assert.equal(firstResult.currency_spend_snapshot.wld_spend, 0);
assert.equal(firstResult.log_preview.status, "finalized_mock");
assert.equal(firstResult.log_preview.recovery_policy.no_duplicate_reward, true);
assert.equal(rareShardPreview.shard_gain, 20);
assert.equal(validation.status, "pass");

console.log(
  JSON.stringify(
    {
      box_id: firstResult.box_id,
      seed: firstResult.seed,
      result_grade: firstResult.result.grade,
      result_character: firstResult.result.character_id,
      pity_before: firstResult.pity_snapshot_before.pulls_since_last_rare,
      pity_after: firstResult.pity_snapshot_after.pulls_since_last_rare,
      guaranteed_triggered: firstResult.pity_snapshot_before.guaranteed_triggered,
      duplicate_shard_preview: firstResult.shard_preview,
      validation_status: validation.status,
      repeat_deterministic_check:
        firstResult.result.character_id === secondResult.result.character_id,
    },
    null,
    2,
  ),
);
