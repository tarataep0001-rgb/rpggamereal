import { previewEnhancementAttempt } from "./enhancementRules";
import { previewEquipItem, previewUnequipItem } from "./equipmentRules";
import { previewMailboxOverflow } from "./mailboxRules";
import { calculateInventoryUsage } from "./inventoryRules";
import { previewSalvage } from "./salvageRules";
import { previewTransfer } from "./transferRules";
import { validateInventoryState } from "./inventoryValidation";
import type { InventoryEngineInput, InventoryEngineResult } from "./inventoryTypes";

export function processInventoryPreview(input: InventoryEngineInput): InventoryEngineResult {
  const selectedGear =
    input.inventory.gear_instances.find(
      (gear) => gear.gear_instance_id === input.selected_gear_instance_id,
    ) ?? input.inventory.gear_instances[0];
  const transferTarget =
    input.inventory.gear_instances.find(
      (gear) => gear.gear_instance_id === input.transfer_target_gear_instance_id,
    ) ?? selectedGear;

  const usage = calculateInventoryUsage(input.inventory);
  const equipPreview = previewEquipItem(input.character, selectedGear);
  const unequipPreview = previewUnequipItem(selectedGear, input.inventory);
  const enhancementPreview = previewEnhancementAttempt(
    selectedGear,
    input.target_enhance_level,
  );
  const salvagePreview = previewSalvage(selectedGear);
  const transferPreview = previewTransfer(
    selectedGear,
    transferTarget,
    input.inventory.materials,
  );
  const mailboxPreview = previewMailboxOverflow(input.inventory, input.reward_preview_items);
  const validation = validateInventoryState(input.inventory);

  return {
    preview_id: "inventory_preview_v1a_local_mock",
    selected_gear: selectedGear,
    usage,
    equip_preview: equipPreview,
    unequip_preview: unequipPreview,
    enhancement_preview: enhancementPreview,
    salvage_preview: salvagePreview,
    transfer_preview: transferPreview,
    mailbox_preview: mailboxPreview,
    validation,
    safety_notes: [
      "ระบบนี้เป็น local mock preview เท่านั้น",
      "ระบบจริงต้องใช้ server-authoritative inventory",
      "ไม่มี WLD / Paid Gem / ledger ในระบบนี้",
      "Production status: NO-GO",
    ],
  };
}
