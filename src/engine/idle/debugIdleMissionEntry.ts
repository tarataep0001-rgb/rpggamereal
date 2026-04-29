import assert from "node:assert/strict";
import {
  canClaimMission,
  createAutoFarmPreview,
  createIdleClaimAtomicityPreview,
  createIdleMissionPreview,
  createMockIdleMissionInput,
  validateIdleMissionPreview,
} from "./index";

const input = createMockIdleMissionInput({
  now: "2026-04-29T12:00:00+07:00",
  accumulatedHours: 12,
  autoFarmUsedToday: 1,
});
const preview = createIdleMissionPreview(input);
const autoFarmPreview = createAutoFarmPreview(input);
const atomicity = createIdleClaimAtomicityPreview(input);
const validation = validateIdleMissionPreview({ input, preview });
const dailyClaim = canClaimMission(
  preview.daily_missions[0],
  preview.daily_missions[0].mission_id,
  preview.bangkok_business_date,
);

assert.equal(preview.idle_reward.capped_hours, 8);
assert.equal(preview.idle_reward.max_idle_hours, 8);
assert.equal(preview.idle_reward.xp_ready, 800);
assert.equal(preview.idle_reward.gold_ready, 400);
assert.equal(autoFarmPreview.auto_farm_hours, 2);
assert.equal(autoFarmPreview.free_auto_farm_per_day, 2);
assert.equal(autoFarmPreview.remaining_free_auto_farm, 1);
assert.equal(autoFarmPreview.next_extra_price, 20);
assert.equal(preview.bangkok_business_date, "2026-04-29");
assert.equal(preview.bangkok_week_key, "2026-W18");
assert.equal(preview.daily_missions.filter((mission) => mission.claimable).length, 4);
assert.equal(preview.weekly_missions.filter((mission) => mission.claimable).length, 2);
assert.equal(dailyClaim.can_claim, true);
assert.equal(atomicity.blocked_before_partial_reward, false);
assert.equal(validation.status, "pass");
assert.equal(preview.no_wld_reward, true);
assert.equal(preview.no_paid_gem_reward, true);
assert.equal(preview.no_ledger, true);

console.log(
  JSON.stringify(
    {
      idle_stage: preview.idle_reward.idle_stage,
      capped_hours: preview.idle_reward.capped_hours,
      xp_ready: preview.idle_reward.xp_ready,
      gold_ready: preview.idle_reward.gold_ready,
      auto_farm_remaining: autoFarmPreview.remaining_free_auto_farm,
      next_extra_price: autoFarmPreview.next_extra_price,
      daily_mission_claimable_count: preview.daily_missions.filter((mission) => mission.claimable).length,
      weekly_mission_claimable_count: preview.weekly_missions.filter((mission) => mission.claimable).length,
      bangkok_business_date: preview.bangkok_business_date,
      bangkok_week_key: preview.bangkok_week_key,
      validation_status: validation.status,
      no_wld_paid_ledger_check:
        preview.no_wld_reward && preview.no_paid_gem_reward && preview.no_ledger,
    },
    null,
    2,
  ),
);
