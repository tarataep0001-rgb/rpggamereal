import { AUTO_FARM_HOURS, EXTRA_AUTO_FARM_PRICES, FREE_AUTO_FARM_PER_DAY } from "./idleRules";
import { getBangkokBusinessDate } from "./bangkokBusinessDate";
import type { AutoFarmPreview, IdleMissionInput } from "./idleTypes";

export function createAutoFarmPreview(input: IdleMissionInput): AutoFarmPreview {
  const remainingFree = Math.max(0, FREE_AUTO_FARM_PER_DAY - input.auto_farm.used_today);
  const extraIndex = Math.max(0, input.auto_farm.extra_purchase_count_today);

  return {
    auto_farm_hours: AUTO_FARM_HOURS,
    free_auto_farm_per_day: FREE_AUTO_FARM_PER_DAY,
    used_free_auto_farm_today: input.auto_farm.used_today,
    remaining_free_auto_farm: remainingFree,
    extra_purchase_index: extraIndex,
    extra_price_ladder: EXTRA_AUTO_FARM_PRICES,
    next_extra_price: EXTRA_AUTO_FARM_PRICES[extraIndex] ?? null,
    bangkok_business_date: getBangkokBusinessDate(input.now),
    can_use_free_auto_farm: remainingFree > 0,
    paid_disabled_note: "Uses Free/Test Gem preview only. Paid Gem and WLD payment are disabled.",
    free_test_gem_preview_only: true,
    no_wld_payment: true,
    no_paid_gem_payment: true,
  };
}
