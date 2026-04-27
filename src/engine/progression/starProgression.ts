import type {
  DuplicateShardPreview,
  ProgressionGrade,
  StarUpgradePreview,
  TeammateStarState,
} from "./characterProgressionTypes";

const duplicateShardValues: Record<Exclude<ProgressionGrade, "Epic">, number> = {
  Common: 5,
  Uncommon: 10,
  Rare: 20,
};

const shardRequiredByNextStar: Record<1 | 2 | 3 | 4 | 5, number> = {
  1: 20,
  2: 40,
  3: 80,
  4: 120,
  5: 200,
};

export function previewDuplicateShardGain(
  grade: Exclude<ProgressionGrade, "Epic">,
): DuplicateShardPreview {
  return {
    grade,
    shard_gain: duplicateShardValues[grade],
    first_unlock_star: 0,
    extra_shards_after_star5_stored: true,
  };
}

export function previewStarUpgrade(teammate: TeammateStarState): StarUpgradePreview {
  if (teammate.current_star >= 5) {
    return {
      character_id: teammate.character_id,
      current_star: 5,
      next_star: null,
      shards_owned: teammate.shards_owned,
      shards_required: 0,
      can_upgrade: false,
      extra_shards_stored: teammate.shards_owned,
      deterministic_no_failure: true,
      shard_exchange_disabled_v1a: true,
    };
  }

  const nextStar = (teammate.current_star + 1) as 1 | 2 | 3 | 4 | 5;
  const required = shardRequiredByNextStar[nextStar];

  return {
    character_id: teammate.character_id,
    current_star: teammate.current_star,
    next_star: nextStar,
    shards_owned: teammate.shards_owned,
    shards_required: required,
    can_upgrade: teammate.shards_owned >= required,
    extra_shards_stored: Math.max(0, teammate.shards_owned - required),
    deterministic_no_failure: true,
    shard_exchange_disabled_v1a: true,
  };
}
