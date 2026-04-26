import type { MockShopItem } from "@/data/mockShop";
import { formatNumber } from "@/utils/formatting";

export function formatShopResetTime(text: string): string {
  return text.replace("Asia/Bangkok", "Asia/Bangkok");
}

export function getInventoryExpansionPrice(purchaseCount: number): number {
  return Math.min(200, 50 + purchaseCount * 25);
}

export function getShopItemLockReason(item: MockShopItem): string {
  return item.locked ? item.unlock_condition : "Available as mock display";
}

export function formatShopPrice(item: MockShopItem): string {
  return `${formatNumber(item.price)} ${item.currency}`;
}

export function groupShopItemsBySection(items: MockShopItem[]) {
  return {
    gold: items.filter((item) => item.section === "gold"),
    gem: items.filter((item) => item.section === "gem"),
    guild: items.filter((item) => item.section === "guild"),
  };
}
