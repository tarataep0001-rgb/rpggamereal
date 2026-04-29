import type { CharacterGrade, CharacterRole, ClassName, Element, GachaBox } from "../../types/game";

export type GachaGrade = Exclude<CharacterGrade, "Epic">;
export type GachaLogStatus =
  | "preview"
  | "finalized_mock"
  | "failed_mock"
  | "recovery_required_mock";

export type GachaRosterEntry = {
  character_id: string;
  grade: GachaGrade;
  current_star: 0 | 1 | 2 | 3 | 4 | 5;
  shards_owned: number;
  unlocked: boolean;
};

export type GachaCharacterSummary = {
  character_id: string;
  display_name: string;
  display_name_th: string;
  grade: GachaGrade;
  element: Element;
  class_name: ClassName;
  role: CharacterRole;
  asset_id: string;
};

export type GachaCurrencyState = {
  free_test_gem: number;
  paid_gem: 0;
};

export type GachaInput = {
  box: GachaBox;
  seed: string;
  pity_state: {
    pulls_since_last_rare: number;
    pity_limit: 30;
  };
  currency_state: GachaCurrencyState;
  roster: GachaRosterEntry[];
  character_pool: GachaCharacterSummary[];
  config_versions: {
    gacha_config: string;
    source_spec: string;
  };
  mode: "local_mock_preview";
};

export type GachaOddsSnapshot = {
  box_id: string;
  grade_rates: Record<GachaGrade, number>;
  per_character_rates: Array<{
    character_id: string;
    grade: GachaGrade;
    rate_percent: number;
  }>;
  rates_total: number;
  equal_weight_within_grade: true;
};

export type GachaPitySnapshot = {
  pulls_since_last_rare: number;
  pity_limit: 30;
  next_guaranteed_rare_in: number;
  guaranteed_triggered: boolean;
  guaranteed_grade: "Rare";
  reason: string;
};

export type GachaCurrencySpendSnapshot = {
  currency: "Free/Test Gem";
  single_pull_cost: 1;
  balance_before: number;
  balance_after_preview: number;
  paid_gem_spend: 0;
  wld_spend: 0;
  ledger_created: false;
  spend_applied: false;
};

export type GachaRollResult = {
  grade: GachaGrade;
  character_id: string;
  character: GachaCharacterSummary;
  grade_roll: number | null;
  character_roll_index: number;
  guaranteed_by_pity: boolean;
};

export type GachaStarPreview = {
  character_id: string;
  current_star: 0 | 1 | 2 | 3 | 4 | 5;
  next_star: 1 | 2 | 3 | 4 | 5 | null;
  shards_owned_after_preview: number;
  shards_required_for_next_star: number;
  can_upgrade_after_preview: boolean;
  extra_shards_stored: number;
  shard_exchange_enabled: false;
};

export type GachaShardPreview = {
  is_new_unlock: boolean;
  shard_gain: number;
  star_preview: GachaStarPreview;
  extra_shards_stored: number;
  shard_exchange_enabled: false;
};

export type GachaRecoveryPolicyPreview = {
  finalized_result_returns_original: true;
  refund_only_without_finalized_result: true;
  refund_currency_snapshot: GachaCurrencySpendSnapshot;
  no_duplicate_reward: true;
  no_duplicate_character_unlock: true;
  no_wld_refund: true;
  no_paid_gem_refund_v1a: true;
  preview_only: true;
};

export type GachaLogPreviewEntry = {
  gacha_log_id: string;
  box_id: string;
  seed: string;
  status: GachaLogStatus;
  odds_snapshot: GachaOddsSnapshot;
  pity_snapshot_before: GachaPitySnapshot;
  pity_snapshot_after: GachaPitySnapshot;
  currency_spend_snapshot: GachaCurrencySpendSnapshot;
  result_grade: GachaGrade;
  result_character_id: string;
  is_duplicate: boolean;
  shard_gain: number;
  recovery_policy: GachaRecoveryPolicyPreview;
  created_at: string;
  config_versions: GachaInput["config_versions"];
};

export type GachaValidationResult = {
  status: "pass" | "warning" | "fail";
  errors: string[];
  warnings: string[];
  checked_at: string;
};

export type GachaEngineResult = {
  preview_id: string;
  box_id: string;
  seed: string;
  result: GachaRollResult;
  odds_snapshot: GachaOddsSnapshot;
  pity_snapshot_before: GachaPitySnapshot;
  pity_snapshot_after: GachaPitySnapshot;
  currency_spend_snapshot: GachaCurrencySpendSnapshot;
  shard_preview: GachaShardPreview;
  log_preview: GachaLogPreviewEntry;
  validation: GachaValidationResult;
  local_mock_only: true;
  no_wld: true;
  no_paid_gem: true;
  no_ledger: true;
  no_backend_authority: true;
};
