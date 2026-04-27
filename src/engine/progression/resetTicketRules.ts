import type { ProgressionCharacter, ResetTicketPreview } from "./characterProgressionTypes";

export function previewResetTicketUse(
  character: ProgressionCharacter,
  inventoryState: { inventory_slots: number; used_inventory_slots: number; has_basic_reset_ticket: boolean },
): ResetTicketPreview {
  const inventoryHasSpace = inventoryState.used_inventory_slots < inventoryState.inventory_slots;
  const canPreview = character.is_main_character && inventoryState.has_basic_reset_ticket && inventoryHasSpace;
  const blockedReason = (() => {
    if (!character.is_main_character) return "Basic Reset Ticket applies to main character Class 1 choice only.";
    if (!inventoryState.has_basic_reset_ticket) return "Basic Reset Ticket not available in local mock inventory preview.";
    if (!inventoryHasSpace) return "Inventory full; incompatible gear unequip would be blocked.";
    return null;
  })();

  return {
    basic_reset_ticket: {
      can_preview: canPreview,
      blocked_reason: blockedReason,
      does_not_reset_level: true,
      does_not_reset_skill_levels: true,
      does_not_reset_gear: true,
      does_not_reset_resources: true,
      does_not_reset_gacha_characters: true,
      does_not_reset_star_levels: true,
      does_not_refund_materials: true,
    },
    advanced_reset_ticket: {
      schema_only: true,
      disabled_until_roadmap: true,
    },
  };
}
