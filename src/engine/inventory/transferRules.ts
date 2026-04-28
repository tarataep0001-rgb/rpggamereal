import type {
  InventoryGearInstance,
  InventoryMaterialStack,
  TransferPreview,
} from "./inventoryTypes";

function getMaterialQuantity(materialState: InventoryMaterialStack[], itemId: string) {
  return materialState.find((item) => item.item_id === itemId)?.quantity ?? 0;
}

export function previewTransfer(
  sourceGear: InventoryGearInstance,
  targetGear: InventoryGearInstance,
  materialState: InventoryMaterialStack[],
): TransferPreview {
  const blockedReasons: string[] = [];
  const transferStoneCount = getMaterialQuantity(materialState, "mat_transfer_stone");

  if (transferStoneCount <= 0) {
    blockedReasons.push("Transfer Stone required");
  }

  if (sourceGear.equipped || sourceGear.locked) {
    blockedReasons.push("source gear must be unequipped and unlocked");
  }

  if (targetGear.equipped || targetGear.locked) {
    blockedReasons.push("target gear must be unequipped and unlocked");
  }

  if (sourceGear.slot !== targetGear.slot) {
    blockedReasons.push("target must use the same slot or compatible slot family");
  }

  return {
    action: "transfer_preview",
    source_gear_instance_id: sourceGear.gear_instance_id,
    target_gear_instance_id: targetGear.gear_instance_id,
    can_transfer: blockedReasons.length === 0,
    blocked_reasons: blockedReasons,
    required_materials: [{ item_id: "mat_transfer_stone", quantity: 1 }],
    transfer_level_preview: sourceGear.enhance_level,
    result_summary:
      blockedReasons.length === 0
        ? `Preview transfers +${sourceGear.enhance_level} to ${targetGear.gear_instance_id}.`
        : "Transfer blocked in local mock preview.",
    log_preview: {
      transfer_log_required_real_system: true,
      does_not_duplicate_item: true,
      preview_only: true,
      no_wld: true,
      no_paid_gem: true,
      no_ledger: true,
    },
  };
}
