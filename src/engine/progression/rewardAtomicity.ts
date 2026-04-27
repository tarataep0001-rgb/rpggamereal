import type { BattleDrop } from "../battle/battleTypes";
import type { RewardAtomicityPreview, StageProgressInput } from "./progressTypes";

function countItemSlots(rewards: BattleDrop[]) {
  return rewards.filter((reward) => !["gold", "free_gem"].includes(reward.item_id)).length;
}

export function createRewardAtomicityPreview(
  input: StageProgressInput,
  rewards: BattleDrop[],
): RewardAtomicityPreview {
  const itemRewardsNeedSlots = countItemSlots(rewards);
  const freeSlots = input.inventoryPreview.inventorySlots - input.inventoryPreview.usedInventorySlots;
  const mailboxRoom = input.inventoryPreview.mailboxLimit - input.inventoryPreview.mailboxCount;
  const canFitInventory = itemRewardsNeedSlots <= freeSlots;
  const canOverflowMailbox = !canFitInventory && itemRewardsNeedSlots <= freeSlots + mailboxRoom;

  return {
    inventorySlots: input.inventoryPreview.inventorySlots,
    usedInventorySlots: input.inventoryPreview.usedInventorySlots,
    mailboxCount: input.inventoryPreview.mailboxCount,
    mailboxLimit: input.inventoryPreview.mailboxLimit,
    itemRewardsNeedSlots,
    canFitInventory,
    canOverflowMailbox,
    blockedBeforePartialReward: !canFitInventory && !canOverflowMailbox,
    notes: [
      "Reward claim must be all-or-nothing in the real system.",
      "If inventory lacks space, eligible item rewards attempt mailbox overflow.",
      "If mailbox also lacks room, claim is blocked before partial reward.",
      "Currency rewards do not go to mailbox.",
      "WLD/ledger rewards never go to mailbox.",
    ],
  };
}
