import type {
  InventoryEngineState,
  InventoryRewardItem,
  MailboxOverflowPreview,
} from "./inventoryTypes";
import { canAddItemToInventory } from "./inventoryRules";

function countRequiredSlots(inventory: InventoryEngineState, rewards: InventoryRewardItem[]) {
  return rewards.reduce((total, reward) => {
    const preview = canAddItemToInventory(inventory, reward);
    return total + preview.required_slots;
  }, 0);
}

export function previewMailboxOverflow(
  inventory: InventoryEngineState,
  itemRewardList: InventoryRewardItem[],
): MailboxOverflowPreview {
  const requiredSlots = countRequiredSlots(inventory, itemRewardList);
  const availableInventorySlots = Math.max(
    0,
    inventory.inventory_slots - inventory.used_inventory_slots,
  );
  const overflowSlots = Math.max(0, requiredSlots - availableInventorySlots);
  const availableMailboxSlots = Math.max(
    0,
    inventory.mailbox.max_active_mails - inventory.mailbox.active_mail_count,
  );
  const canFitInventory = overflowSlots === 0;
  const canOverflowToMailbox = !canFitInventory && overflowSlots <= availableMailboxSlots;
  const blockedBeforePartialReward = !canFitInventory && !canOverflowToMailbox;

  return {
    action: "mailbox_overflow_preview",
    reward_item_count: itemRewardList.length,
    required_slots: requiredSlots,
    available_inventory_slots: availableInventorySlots,
    overflow_slots: overflowSlots,
    can_fit_inventory: canFitInventory,
    can_overflow_to_mailbox: canOverflowToMailbox,
    blocked_before_partial_reward: blockedBeforePartialReward,
    mailbox_count_after_preview: canOverflowToMailbox
      ? inventory.mailbox.active_mail_count + overflowSlots
      : inventory.mailbox.active_mail_count,
    notes: [
      "If inventory has space, eligible item rewards stay in inventory.",
      "If inventory is full and mailbox has room, eligible item rewards go to overflow mail.",
      "If inventory and mailbox are both full, claim/drop-to-mail action is blocked before partial rewards.",
      "WLD/ledger rewards never use mailbox.",
    ],
  };
}
