import type {
  EquipmentActionPreview,
  InventoryActionCharacter,
  InventoryEngineState,
  InventoryGearInstance,
  InventoryValidationResult,
} from "./inventoryTypes";

function classCanUseGear(character: InventoryActionCharacter, gear: InventoryGearInstance): boolean {
  return gear.class_restriction === "any" || gear.class_restriction.includes(character.class_name);
}

export function validateGearForCharacter(
  character: InventoryActionCharacter,
  gear: InventoryGearInstance,
): InventoryValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!gear.gear_template_id) errors.push("gear_template_id is required.");
  if (!gear.gear_instance_id) errors.push("gear_instance_id is required.");
  if (!Number.isFinite(gear.gear_level_snapshot) || gear.gear_level_snapshot <= 0) {
    errors.push("gear_level_snapshot is required.");
  }
  if (!classCanUseGear(character, gear)) errors.push("Class restriction is not satisfied.");
  if (character.level < gear.required_min_level) errors.push("Required level is not satisfied.");
  if (gear.enhance_level < 0 || gear.enhance_level > 50) {
    errors.push("Enhancement level must be between 0 and 50.");
  }
  if (gear.grade === "Epic") warnings.push("Epic normal drop is disabled in V1A.");

  return {
    status: errors.length > 0 ? "invalid" : warnings.length > 0 ? "warning" : "valid",
    errors,
    warnings,
    checked_at: "local-mock-check",
  };
}

export function previewEquipItem(
  character: InventoryActionCharacter,
  gear: InventoryGearInstance,
): EquipmentActionPreview {
  const validation = validateGearForCharacter(character, gear);
  const blockedReasons = [...validation.errors];

  if (gear.equipped) {
    blockedReasons.push("Gear is already equipped.");
  }

  return {
    action: "equip_preview",
    gear_instance_id: gear.gear_instance_id,
    slot: gear.slot,
    can_equip: blockedReasons.length === 0,
    blocked_reasons: blockedReasons,
    preview_only: true,
  };
}

export function previewUnequipItem(
  gear: InventoryGearInstance,
  inventory: InventoryEngineState,
): EquipmentActionPreview {
  const blockedReasons: string[] = [];

  if (!gear.equipped) {
    blockedReasons.push("Gear is not equipped.");
  }

  if (inventory.used_inventory_slots >= inventory.inventory_slots) {
    blockedReasons.push("Inventory full; unequip/reset is blocked.");
  }

  return {
    action: "unequip_preview",
    gear_instance_id: gear.gear_instance_id,
    slot: gear.slot,
    can_unequip: blockedReasons.length === 0,
    blocked_reasons: blockedReasons,
    preview_only: true,
  };
}
