import type { EnhancementBand, EnhancementPreview, InventoryGearInstance } from "./inventoryTypes";

export const enhancementSuccessTable: EnhancementBand[] = [
  {
    label: "+1 to +10",
    min_target: 1,
    max_target: 10,
    success_rate: 100,
    failure_rule: "failure none",
    stone_tier: "Stone Lv1",
  },
  {
    label: "+11 to +20",
    min_target: 11,
    max_target: 20,
    success_rate: 70,
    failure_rule: "failure level unchanged",
    stone_tier: "Stone Lv2",
  },
  {
    label: "+21 to +30",
    min_target: 21,
    max_target: 30,
    success_rate: 40,
    failure_rule: "failure -1 enhance level",
    stone_tier: "Stone Lv3",
  },
  {
    label: "+31 to +40",
    min_target: 31,
    max_target: 40,
    success_rate: 15,
    failure_rule: "failure -3 enhance levels",
    stone_tier: "Mystic Stone",
  },
  {
    label: "+41 to +50",
    min_target: 41,
    max_target: 50,
    success_rate: 5,
    failure_rule: "failure item breaks 100% unless Anti-break Charm is used",
    stone_tier: "Mystic Stone",
    schema_only: true,
  },
];

export function getEnhancementBand(targetEnhanceLevel: number): EnhancementBand {
  const band = enhancementSuccessTable.find(
    (item) => targetEnhanceLevel >= item.min_target && targetEnhanceLevel <= item.max_target,
  );

  return band ?? enhancementSuccessTable[enhancementSuccessTable.length - 1];
}

export function getEnhancementSuccessRate(targetEnhanceLevel: number): number {
  return getEnhancementBand(targetEnhanceLevel).success_rate;
}

export function getEnhancementFailureRule(targetEnhanceLevel: number): string {
  return getEnhancementBand(targetEnhanceLevel).failure_rule;
}

export function getEnhancementGoldCost(targetEnhanceLevel: number): number {
  return Math.floor(100 * targetEnhanceLevel ** 2);
}

export function previewEnhancementAttempt(
  gear: InventoryGearInstance,
  targetEnhanceLevel: number,
): EnhancementPreview {
  const target = Math.max(1, Math.min(50, targetEnhanceLevel));
  const band = getEnhancementBand(target);
  const stoneItemId =
    band.stone_tier === "Stone Lv1"
      ? "mat_stone_lv1"
      : band.stone_tier === "Stone Lv2"
        ? "mat_stone_lv2"
        : band.stone_tier === "Stone Lv3"
          ? "mat_stone_lv3_schema"
          : "mat_mystic_stone_schema";
  const materials = [{ item_id: stoneItemId, quantity: 1 }];
  const goldCost = getEnhancementGoldCost(target);

  return {
    action: "enhancement_preview",
    gear_instance_id: gear.gear_instance_id,
    current_enhance_level: gear.enhance_level,
    target_enhance_level: target,
    success_rate: band.success_rate,
    failure_rule: band.failure_rule,
    required_stone: band.stone_tier,
    gold_cost: goldCost,
    anti_break_note:
      target >= 41 ? "+41 ถึง +50 มีความเสี่ยงไอเทมแตกถ้าไม่มียันต์กันแตก" : null,
    materials_spent: materials,
    log_preview: {
      target_enhance_level: target,
      materials_spent: materials,
      gold_spent: goldCost,
      success_rate_snapshot: band.success_rate,
      rng_roll: "placeholder",
      result: "placeholder",
      item_snapshot_before: `${gear.gear_instance_id}+${gear.enhance_level}`,
      item_snapshot_after: `${gear.gear_instance_id}+${target}`,
    },
    no_wld: true,
    no_paid_gem: true,
    no_ledger: true,
  };
}
