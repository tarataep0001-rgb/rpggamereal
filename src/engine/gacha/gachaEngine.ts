import { createGachaLogPreview } from "./gachaLog";
import { resolveCharacterRoll, resolveGradeRoll } from "./gachaPool";
import { createGachaRng } from "./gachaRng";
import { GACHA_GRADES } from "./gachaRules";
import { applyPityPreview, createPitySnapshot } from "./pitySystem";
import { previewCharacterUnlockOrDuplicate, previewDuplicateShardGain } from "./shardSystem";
import { validateGachaInput } from "./gachaValidation";
import type {
  GachaCurrencySpendSnapshot,
  GachaEngineResult,
  GachaGrade,
  GachaInput,
  GachaOddsSnapshot,
  GachaRollResult,
} from "./gachaTypes";

export function createOddsSnapshot(boxConfig: GachaInput["box"]): GachaOddsSnapshot {
  return {
    box_id: boxConfig.id,
    grade_rates: { ...boxConfig.rates },
    per_character_rates: boxConfig.pool.map((entry) => ({
      character_id: entry.character_id,
      grade: entry.grade,
      rate_percent: entry.ratePercent,
    })),
    rates_total: GACHA_GRADES.reduce((total, grade) => total + boxConfig.rates[grade], 0),
    equal_weight_within_grade: true,
  };
}

export function createCurrencySpendSnapshot(
  currencyState: GachaInput["currency_state"],
  boxConfig: GachaInput["box"],
): GachaCurrencySpendSnapshot {
  return {
    currency: "Free/Test Gem",
    single_pull_cost: 1,
    balance_before: currencyState.free_test_gem,
    balance_after_preview: Math.max(0, currencyState.free_test_gem - (boxConfig.enabled ? 1 : 0)),
    paid_gem_spend: 0,
    wld_spend: 0,
    ledger_created: false,
    spend_applied: false,
  };
}

export { applyPityPreview, createPitySnapshot, previewCharacterUnlockOrDuplicate, previewDuplicateShardGain, validateGachaInput };

export function runSinglePull(input: GachaInput): GachaEngineResult {
  const validation = validateGachaInput(input);
  const rng = createGachaRng(input.seed);
  const pityBefore = createPitySnapshot(input.pity_state);
  let gradeResult: { grade: GachaGrade; roll: number | null };

  if (pityBefore.guaranteed_triggered) {
    gradeResult = { grade: "Rare", roll: null };
  } else {
    gradeResult = resolveGradeRoll({ rates: input.box.rates, rng });
  }

  const characterResult = resolveCharacterRoll({
    grade: gradeResult.grade,
    gachaInput: input,
    rng,
  });

  const result: GachaRollResult = {
    ...characterResult,
    grade_roll: gradeResult.roll,
    guaranteed_by_pity: pityBefore.guaranteed_triggered,
  };
  const pityAfter = applyPityPreview({
    pulls_since_last_rare: input.pity_state.pulls_since_last_rare,
    result_grade: result.grade,
  });
  const oddsSnapshot = createOddsSnapshot(input.box);
  const currencySpendSnapshot = createCurrencySpendSnapshot(input.currency_state, input.box);
  const shardPreview = previewCharacterUnlockOrDuplicate(input.roster, {
    character_id: result.character_id,
    grade: result.grade,
  });
  const previewBase = {
    preview_id: `gacha_preview_${input.box.id}_${input.seed}`,
    box_id: input.box.id,
    seed: input.seed,
    result,
    odds_snapshot: oddsSnapshot,
    pity_snapshot_before: pityBefore,
    pity_snapshot_after: pityAfter,
    currency_spend_snapshot: currencySpendSnapshot,
    shard_preview: shardPreview,
    validation,
    local_mock_only: true,
    no_wld: true,
    no_paid_gem: true,
    no_ledger: true,
    no_backend_authority: true,
  } satisfies Omit<GachaEngineResult, "log_preview">;

  return {
    ...previewBase,
    log_preview: createGachaLogPreview({
      box_id: previewBase.box_id,
      seed: previewBase.seed,
      result: previewBase.result,
      odds_snapshot: previewBase.odds_snapshot,
      pity_snapshot_before: previewBase.pity_snapshot_before,
      pity_snapshot_after: previewBase.pity_snapshot_after,
      currency_spend_snapshot: previewBase.currency_spend_snapshot,
      shard_preview: previewBase.shard_preview,
      validation: previewBase.validation,
      config_versions: input.config_versions,
    }),
  };
}
