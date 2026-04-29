import { GACHA_PITY_LIMIT } from "./gachaRules";
import type { GachaGrade, GachaPitySnapshot } from "./gachaTypes";

export function applyPityPreview(input: {
  pulls_since_last_rare: number;
  result_grade?: GachaGrade;
}): GachaPitySnapshot {
  const pullsSinceLastRare = Math.max(0, input.pulls_since_last_rare);
  const guaranteedTriggered = pullsSinceLastRare >= GACHA_PITY_LIMIT - 1;

  if (!input.result_grade) {
    return {
      pulls_since_last_rare: pullsSinceLastRare,
      pity_limit: GACHA_PITY_LIMIT,
      next_guaranteed_rare_in: Math.max(1, GACHA_PITY_LIMIT - pullsSinceLastRare),
      guaranteed_triggered: guaranteedTriggered,
      guaranteed_grade: "Rare",
      reason: guaranteedTriggered
        ? "pull #30 guarantees Rare before grade roll"
        : "Rare is not guaranteed before this pull",
    };
  }

  const nextCounter = input.result_grade === "Rare" ? 0 : Math.min(GACHA_PITY_LIMIT, pullsSinceLastRare + 1);

  return {
    pulls_since_last_rare: nextCounter,
    pity_limit: GACHA_PITY_LIMIT,
    next_guaranteed_rare_in: input.result_grade === "Rare" ? GACHA_PITY_LIMIT : Math.max(1, GACHA_PITY_LIMIT - nextCounter),
    guaranteed_triggered: guaranteedTriggered,
    guaranteed_grade: "Rare",
    reason:
      input.result_grade === "Rare"
        ? "Rare result resets pity counter to 0"
        : "Non-Rare result increments pity counter by 1",
  };
}

export function createPitySnapshot(pityState: { pulls_since_last_rare: number }): GachaPitySnapshot {
  return applyPityPreview({ pulls_since_last_rare: pityState.pulls_since_last_rare });
}
