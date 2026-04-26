import type { CharacterGrade, GachaBox, GachaPoolEntry } from "@/types/game";

export function getPerCharacterRate(entry: GachaPoolEntry): string {
  return `${entry.ratePercent}%`;
}

export function formatGachaRate(rate: number): string {
  return `${rate.toFixed(rate % 1 === 0 ? 0 : 2)}%`;
}

export function getPityProgress(currentCounter: number, pityLimit: number): number {
  if (pityLimit <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((currentCounter / pityLimit) * 100));
}

export function getPityText(currentCounter: number, pityLimit: number): string {
  const remaining = Math.max(0, pityLimit - currentCounter);
  return `${remaining} pulls until guaranteed Rare`;
}

export function groupPoolByGrade(pool: GachaPoolEntry[]) {
  return (["Common", "Uncommon", "Rare"] as const).map((grade) => ({
    grade,
    entries: pool.filter((entry) => entry.grade === grade),
  }));
}

export function getDuplicateShardValue(grade: Exclude<CharacterGrade, "Epic">): number {
  const shardValues: Record<Exclude<CharacterGrade, "Epic">, number> = {
    Common: 5,
    Uncommon: 10,
    Rare: 20,
  };

  return shardValues[grade];
}

export function getBoxStatusText(box: GachaBox): string {
  if (box.enabled) {
    return "Box 1 เปิดใน V1A";
  }

  return box.id === "box_2_internal" ? "Box 2 ยังไม่เปิดใน V1A" : "Box 3 ยังไม่เปิด";
}
