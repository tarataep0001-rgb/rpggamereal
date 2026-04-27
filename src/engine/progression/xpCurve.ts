export const V1A_EFFECTIVE_LEVEL_CAP = 50 as const;

export function getXpRequiredForLevel(level: number): number {
  if (level < 1) return 0;

  if (level <= 100) {
    return Math.floor(100 * 1.15 ** (level - 1));
  }

  let xp = getXpRequiredForLevel(100);
  for (let current = 101; current <= level; current += 1) {
    xp = Math.floor(xp * 1.25);
  }
  return xp;
}

export function getTotalXpForLevel(level: number): number {
  if (level <= 1) return 0;

  let total = 0;
  for (let current = 1; current < level; current += 1) {
    total += getXpRequiredForLevel(current);
  }
  return total;
}
