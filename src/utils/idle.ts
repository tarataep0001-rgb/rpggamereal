import { formatNumber } from "@/utils/formatting";

export function getIdleCapPercent(accumulatedHours: number, maxIdleHours: number): number {
  if (maxIdleHours <= 0) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round((accumulatedHours / maxIdleHours) * 100)));
}

export function getAutoFarmPriceLabel(price: number, index: number): string {
  return `ครั้งที่ ${index + 1}: ${price} Gem`;
}

export function summarizeIdleDropPreview(
  drops: ReadonlyArray<{ display_name: string; quantity: number }>,
): string {
  return drops.map((drop) => `${drop.display_name} x${formatNumber(drop.quantity)}`).join(", ");
}
