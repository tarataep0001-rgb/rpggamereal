import assert from "node:assert/strict";
import { getEnhancementGoldCost, getEnhancementSuccessRate } from "./enhancementRules";
import { processInventoryPreview } from "./inventoryEngine";
import { createMockInventoryInput } from "./mockInventoryInput";
import { previewSalvage } from "./salvageRules";

const input = createMockInventoryInput();
const result = processInventoryPreview(input);
const equippedGear = input.inventory.gear_instances.find((gear) => gear.equipped);

assert.equal(result.usage.inventory_slots, 100);
assert.equal(result.usage.used_inventory_slots, 99);
assert.equal(result.selected_gear.gear_instance_id, "gear_inst_bow_002");
assert.equal(result.equip_preview.can_equip, false);
assert.match(result.equip_preview.blocked_reasons.join(" "), /class/i);
assert.equal(result.enhancement_preview.target_enhance_level, 11);
assert.equal(getEnhancementSuccessRate(11), 70);
assert.equal(getEnhancementGoldCost(11), 12100);
assert.match(result.enhancement_preview.failure_rule, /unchanged/i);
assert.equal(result.salvage_preview.can_salvage, true);
assert.equal(result.validation.status, "warning");
assert.equal(result.mailbox_preview.can_overflow_to_mailbox, true);
assert.equal(result.mailbox_preview.blocked_before_partial_reward, false);

if (!equippedGear) {
  throw new Error("Expected equipped gear in mock inventory input");
}

const blockedSalvage = previewSalvage(equippedGear);
assert.equal(blockedSalvage.can_salvage, false);
assert.match(blockedSalvage.blocked_reasons.join(" "), /equipped|locked/i);

console.log(
  JSON.stringify(
    {
      inventory_usage: `${result.usage.used_inventory_slots}/${result.usage.inventory_slots}`,
      selected_gear_id: result.selected_gear.gear_instance_id,
      equip_preview_status: result.equip_preview.can_equip ? "allowed" : "blocked",
      enhancement_target: result.enhancement_preview.target_enhance_level,
      success_rate: result.enhancement_preview.success_rate,
      gold_cost: result.enhancement_preview.gold_cost,
      failure_rule: result.enhancement_preview.failure_rule,
      salvage_preview: result.salvage_preview.can_salvage ? "allowed" : "blocked",
      locked_salvage_preview: blockedSalvage.can_salvage ? "allowed" : "blocked",
      validation_status: result.validation.status,
      mailbox_overflow: result.mailbox_preview.can_overflow_to_mailbox,
    },
    null,
    2,
  ),
);
