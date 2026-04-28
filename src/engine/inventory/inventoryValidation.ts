import type { InventoryEngineState, InventoryValidationResult } from "./inventoryTypes";
import { getStackLimit } from "./inventoryRules";

function makeResult(errors: string[], warnings: string[]): InventoryValidationResult {
  return {
    status: errors.length > 0 ? "invalid" : warnings.length > 0 ? "warning" : "valid",
    errors,
    warnings,
    checked_at: "local-mock-check",
  };
}

export function validateInventoryState(inventory: InventoryEngineState): InventoryValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const gearIds = new Set<string>();

  if (inventory.inventory_slots < inventory.used_inventory_slots) {
    errors.push("inventorySlots must be greater than or equal to usedInventorySlots");
  }

  if (inventory.used_inventory_slots < 0) {
    errors.push("usedInventorySlots must be non-negative");
  }

  for (const material of inventory.materials) {
    const limit = getStackLimit(material.item_type);
    if (typeof limit === "number" && material.quantity > limit) {
      errors.push(`${material.item_id} exceeds stack limit ${limit}`);
    }
  }

  for (const gear of inventory.gear_instances) {
    if (gearIds.has(gear.gear_instance_id)) {
      errors.push(`duplicate gear_instance_id: ${gear.gear_instance_id}`);
    }
    gearIds.add(gear.gear_instance_id);

    if (!gear.gear_template_id) {
      errors.push(`${gear.gear_instance_id} missing gear_template_id`);
    }

    if (gear.gear_level_snapshot <= 0) {
      errors.push(`${gear.gear_instance_id} missing valid gear_level_snapshot`);
    }

    if (gear.enhance_level < 0 || gear.enhance_level > 50) {
      errors.push(`${gear.gear_instance_id} enhancement level must be between 0 and 50`);
    }

    if (gear.grade === "Epic" && gear.live_in_v1a) {
      errors.push(`${gear.gear_instance_id} Epic normal drop must remain disabled in V1A`);
    }
  }

  for (const [slot, gearId] of Object.entries(inventory.equipped_items)) {
    if (!gearId) {
      continue;
    }
    const gear = inventory.gear_instances.find((item) => item.gear_instance_id === gearId);
    if (!gear) {
      errors.push(`equipped gear ${gearId} does not exist`);
      continue;
    }
    if (gear.slot !== slot) {
      errors.push(`equipped gear ${gearId} slot mismatch: ${gear.slot} in ${slot}`);
    }
  }

  if (inventory.mailbox.active_mail_count > inventory.mailbox.max_active_mails) {
    errors.push("mailbox count exceeds V1A max active mails");
  }

  if (inventory.feature_locks.crafting_enabled) {
    errors.push("Crafting must remain disabled/schema-only in V1A");
  }

  if (inventory.feature_locks.set_bonus_enabled) {
    errors.push("Set Bonus must remain disabled/schema-only in V1A");
  }

  if (inventory.feature_locks.epic_normal_drop_enabled) {
    errors.push("Epic normal drop must remain disabled in V1A");
  }

  warnings.push("Validation is frontend/local mock only; production inventory must be server-authoritative.");

  return makeResult(errors, warnings);
}
