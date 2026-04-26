import { formatNumber } from "@/utils/formatting";

export function calculateMockGuildBossHp(
  guildLevel: number,
  tierMultiplier = 1,
): number {
  return Math.floor(500000 * 1.25 ** (guildLevel - 1) * tierMultiplier);
}

export function formatGuildPointFormula(actualDamage: number): string {
  const basePoint = Math.floor(actualDamage / 1000);
  const capped = Math.min(500, Math.max(actualDamage > 0 ? 1 : 0, basePoint));
  return `${formatNumber(actualDamage)} actual_damage => ${capped} Guild Point before participation`;
}

export function calculateMockKillShareDisplay(
  pool: number,
  memberDamage: number,
  totalGuildDamage: number,
): string {
  if (totalGuildDamage <= 0) {
    return "0 Guild Point";
  }

  const share = Math.floor((pool * memberDamage) / totalGuildDamage);
  return `${formatNumber(share)} Guild Point share`;
}
