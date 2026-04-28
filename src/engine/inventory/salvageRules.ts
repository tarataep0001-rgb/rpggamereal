import type { InventoryGearGrade, InventoryGearInstance, SalvagePreview } from "./inventoryTypes";

export const salvagePowderByGrade: Record<InventoryGearGrade, number> = {
  Common: 10,
  Uncommon: 25,
  Rare: 60,
  Epic: 150,
};

export function previewSalvage(gear: InventoryGearInstance): SalvagePreview {
  const blockedReasons: string[] = [];

  if (gear.equipped) {
    blockedReasons.push("equipped item cannot be salvaged");
  }

  if (gear.locked) {
    blockedReasons.push("locked item cannot be salvaged");
  }

  const powderQuantity = salvagePowderByGrade[gear.grade] ?? 0;

  return {
    action: "salvage_preview",
    gear_instance_id: gear.gear_instance_id,
    can_salvage: blockedReasons.length === 0,
    blocked_reasons: blockedReasons,
    result_items: [
      {
        item_id: "mat_enhancement_powder",
        quantity: powderQuantity,
      },
    ],
    log_preview: {
      salvage_log_required_real_system: true,
      destroys_source_item_real_system: true,
      preview_only: true,
      no_wld: true,
      no_paid_gem: true,
      no_ledger: true,
    },
  };
}
