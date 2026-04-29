import type { IdleAtomicityPreview, IdleMissionInput, IdleRewardItem } from "./idleTypes";

export function createIdleClaimAtomicityPreview(
  input: IdleMissionInput,
  rewardItems: readonly IdleRewardItem[] = [],
): IdleAtomicityPreview {
  const itemRewardsNeedSlots = rewardItems.filter((reward) => reward.reward_type !== "currency").length;
  const freeInventorySlots = Math.max(0, input.inventory.inventory_slots - input.inventory.used_inventory_slots);
  const freeMailboxSlots = Math.max(0, input.inventory.mailbox_limit - input.inventory.mailbox_count);
  const canFitInventory = itemRewardsNeedSlots <= freeInventorySlots;
  const canOverflowToMailbox = itemRewardsNeedSlots <= freeInventorySlots + freeMailboxSlots;
  const blocked = !canFitInventory && !canOverflowToMailbox;

  return {
    inventory_slots: input.inventory.inventory_slots,
    used_inventory_slots: input.inventory.used_inventory_slots,
    mailbox_count: input.inventory.mailbox_count,
    mailbox_limit: input.inventory.mailbox_limit,
    item_rewards_need_slots: itemRewardsNeedSlots,
    can_fit_inventory: canFitInventory,
    can_overflow_to_mailbox: canOverflowToMailbox,
    blocked_before_partial_reward: blocked,
    currency_rewards_skip_mailbox: true,
    wld_ledger_rewards_never_mailbox: true,
    all_or_nothing_claim: true,
    notes: [
      "Reward claim is all-or-nothing.",
      "If inventory lacks space, eligible item rewards attempt mailbox overflow.",
      "If mailbox also lacks space, claim is blocked before partial rewards.",
      "Currency rewards do not go to mailbox.",
      "WLD/ledger rewards never go to mailbox.",
    ],
  };
}
