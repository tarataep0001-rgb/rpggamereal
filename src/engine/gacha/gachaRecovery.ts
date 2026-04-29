import type { GachaCurrencySpendSnapshot, GachaRecoveryPolicyPreview } from "./gachaTypes";

export function createRecoveryPolicyPreview(
  currencySnapshot: GachaCurrencySpendSnapshot,
): GachaRecoveryPolicyPreview {
  return {
    finalized_result_returns_original: true,
    refund_only_without_finalized_result: true,
    refund_currency_snapshot: currencySnapshot,
    no_duplicate_reward: true,
    no_duplicate_character_unlock: true,
    no_wld_refund: true,
    no_paid_gem_refund_v1a: true,
    preview_only: true,
  };
}
