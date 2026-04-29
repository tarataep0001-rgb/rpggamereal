import { createRecoveryPolicyPreview } from "./gachaRecovery";
import type {
  GachaCurrencySpendSnapshot,
  GachaInput,
  GachaLogPreviewEntry,
  GachaOddsSnapshot,
  GachaPitySnapshot,
  GachaRollResult,
  GachaShardPreview,
  GachaValidationResult,
} from "./gachaTypes";

export function createGachaLogPreview(input: {
  box_id: string;
  seed: string;
  result: GachaRollResult;
  odds_snapshot: GachaOddsSnapshot;
  pity_snapshot_before: GachaPitySnapshot;
  pity_snapshot_after: GachaPitySnapshot;
  currency_spend_snapshot: GachaCurrencySpendSnapshot;
  shard_preview: GachaShardPreview;
  validation: GachaValidationResult;
  config_versions: GachaInput["config_versions"];
}): GachaLogPreviewEntry {
  return {
    gacha_log_id: `gacha_log_mock_${input.box_id}_${input.seed}`,
    box_id: input.box_id,
    seed: input.seed,
    status: input.validation.status === "fail" ? "failed_mock" : "finalized_mock",
    odds_snapshot: input.odds_snapshot,
    pity_snapshot_before: input.pity_snapshot_before,
    pity_snapshot_after: input.pity_snapshot_after,
    currency_spend_snapshot: input.currency_spend_snapshot,
    result_grade: input.result.grade,
    result_character_id: input.result.character_id,
    is_duplicate: !input.shard_preview.is_new_unlock,
    shard_gain: input.shard_preview.shard_gain,
    recovery_policy: createRecoveryPolicyPreview(input.currency_spend_snapshot),
    created_at: "2026-04-29T00:00:00.000Z",
    config_versions: input.config_versions,
  };
}
