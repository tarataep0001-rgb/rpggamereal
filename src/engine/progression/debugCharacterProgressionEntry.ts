import assert from "node:assert/strict";
import { processCharacterProgressionPreview } from "./characterProgressionEngine";
import { createMockCharacterProgressionInput } from "./mockCharacterProgressionInput";
import { getXpRequiredForLevel } from "./xpCurve";

const input = createMockCharacterProgressionInput();
const progression = processCharacterProgressionPreview(input);

assert.equal(input.effective_level_cap, 50);
assert.equal(getXpRequiredForLevel(1), 100);
assert.equal(progression.xp_preview.effective_level_cap, 50);
assert.equal(progression.unlocked_skills.map((row) => row.level).join(","), "10,20,40");
assert.equal(progression.unlocked_skills.filter((row) => row.unlocked).length, 1);
assert.equal(progression.next_skill_unlock?.level, 20);
assert.equal(progression.class_roadmap.class2, "locked-v1a");
assert.equal(progression.class_roadmap.class3, "schema-only");
assert.equal(progression.skill_upgrade_preview.no_wld, true);
assert.equal(progression.skill_upgrade_preview.no_paid_gem, true);
assert.equal(progression.skill_upgrade_preview.no_ledger, true);
assert.equal(progression.reset_ticket_preview.basic_reset_ticket.does_not_refund_materials, true);
assert.equal(progression.star_preview.current_star <= 5, true);
assert.equal(progression.duplicate_preview.shard_gain, 5);
assert.equal(progression.validation.status, "pass");

console.log(JSON.stringify({
  current_level: input.character.level,
  xp_required_next_level: progression.xp_preview.next_level_xp_required,
  preview_level_after: progression.xp_preview.level_after,
  unlocked_skills: progression.unlocked_skills.filter((row) => row.unlocked).map((row) => row.skill_id),
  next_skill_unlock: progression.next_skill_unlock,
  class_roadmap_status: progression.class_roadmap,
  skill_upgrade_preview: progression.skill_upgrade_preview,
  validation_status: progression.validation.status,
}, null, 2));
