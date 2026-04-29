import { GACHA_DUPLICATE_SHARDS, GACHA_STAR_REQUIREMENTS } from "./gachaRules";
import type { GachaGrade, GachaRosterEntry, GachaShardPreview, GachaStarPreview } from "./gachaTypes";

function createStarPreview(params: {
  character_id: string;
  current_star: 0 | 1 | 2 | 3 | 4 | 5;
  shards_owned_after_preview: number;
}): GachaStarPreview {
  if (params.current_star >= 5) {
    return {
      character_id: params.character_id,
      current_star: 5,
      next_star: null,
      shards_owned_after_preview: params.shards_owned_after_preview,
      shards_required_for_next_star: 0,
      can_upgrade_after_preview: false,
      extra_shards_stored: params.shards_owned_after_preview,
      shard_exchange_enabled: false,
    };
  }

  const nextStar = (params.current_star + 1) as 1 | 2 | 3 | 4 | 5;
  const required = GACHA_STAR_REQUIREMENTS[nextStar];

  return {
    character_id: params.character_id,
    current_star: params.current_star,
    next_star: nextStar,
    shards_owned_after_preview: params.shards_owned_after_preview,
    shards_required_for_next_star: required,
    can_upgrade_after_preview: params.shards_owned_after_preview >= required,
    extra_shards_stored: Math.max(0, params.shards_owned_after_preview - required),
    shard_exchange_enabled: false,
  };
}

export function previewDuplicateShardGain(characterGrade: GachaGrade): Pick<
  GachaShardPreview,
  "is_new_unlock" | "shard_gain" | "shard_exchange_enabled"
> {
  return {
    is_new_unlock: false,
    shard_gain: GACHA_DUPLICATE_SHARDS[characterGrade],
    shard_exchange_enabled: false,
  };
}

export function previewCharacterUnlockOrDuplicate(
  currentRoster: readonly GachaRosterEntry[],
  pulledCharacter: { character_id: string; grade: GachaGrade },
): GachaShardPreview {
  const rosterEntry = currentRoster.find((entry) => entry.character_id === pulledCharacter.character_id);
  const isDuplicate = Boolean(rosterEntry?.unlocked);
  const shardGain = isDuplicate ? GACHA_DUPLICATE_SHARDS[pulledCharacter.grade] : 0;
  const currentStar = rosterEntry?.current_star ?? 0;
  const shardsOwnedAfterPreview = (rosterEntry?.shards_owned ?? 0) + shardGain;
  const starPreview = createStarPreview({
    character_id: pulledCharacter.character_id,
    current_star: currentStar,
    shards_owned_after_preview: shardsOwnedAfterPreview,
  });

  return {
    is_new_unlock: !isDuplicate,
    shard_gain: shardGain,
    star_preview: starPreview,
    extra_shards_stored: starPreview.extra_shards_stored,
    shard_exchange_enabled: false,
  };
}
