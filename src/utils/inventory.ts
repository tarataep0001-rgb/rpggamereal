import type { GearGrade } from "@/types/game";

export type InventoryStackType = "equipment" | "material" | "consumable" | "ticket" | "shard" | "currency";

export function calculateInventoryUsagePercent(used: number, total: number): number {
  if (total <= 0) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round((used / total) * 100)));
}

export function getStackLimitByItemType(type: InventoryStackType): number | "no-slot" | "no-stack" {
  const limits: Record<InventoryStackType, number | "no-slot" | "no-stack"> = {
    equipment: "no-stack",
    material: 9999,
    consumable: 999,
    ticket: 999,
    shard: 9999,
    currency: "no-slot",
  };

  return limits[type];
}

export function getSalvageReturn(grade: GearGrade | "Epic"): string {
  const returns: Record<GearGrade | "Epic", string> = {
    Common: "Enhancement Powder x10",
    Uncommon: "Enhancement Powder x25",
    Rare: "Enhancement Powder x60",
    Epic: "Enhancement Powder x150 (schema/test only)",
  };

  return returns[grade];
}

export function formatGearLevelSnapshot(level: number): string {
  return `RequiredLevel snapshot Lv${level}`;
}

export function formatBindType(bindType: string): string {
  const labels: Record<string, string> = {
    none: "Unbound",
    account_bound: "Account bound",
    character_bound: "Character bound",
    account_inventory_unbound: "account_inventory_unbound",
  };

  return labels[bindType] ?? bindType;
}

export function isInventoryCloseToFull(used: number, total: number): boolean {
  return calculateInventoryUsagePercent(used, total) >= 80;
}
