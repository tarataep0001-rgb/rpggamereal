import type { ProgressionCharacter, XpApplyPreview } from "./characterProgressionTypes";
import { getXpRequiredForLevel, V1A_EFFECTIVE_LEVEL_CAP } from "./xpCurve";

export function previewApplyXp(
  character: ProgressionCharacter,
  xpAmount: number,
  effectiveCap: 50 = V1A_EFFECTIVE_LEVEL_CAP,
): XpApplyPreview {
  let level = Math.min(character.level, effectiveCap);
  let xp = character.level >= effectiveCap ? 0 : Math.max(0, character.current_xp);
  let remainingGain = Math.max(0, xpAmount);
  let levelsGained = 0;
  let discarded = 0;

  while (remainingGain > 0 && level < effectiveCap) {
    const required = getXpRequiredForLevel(level);
    const needed = Math.max(0, required - xp);

    if (remainingGain < needed) {
      xp += remainingGain;
      remainingGain = 0;
    } else {
      remainingGain -= needed;
      level += 1;
      xp = 0;
      levelsGained += 1;
    }
  }

  if (level >= effectiveCap && remainingGain > 0) {
    discarded += remainingGain;
    remainingGain = 0;
    xp = 0;
  }

  return {
    current_level: character.level,
    current_xp: character.current_xp,
    xp_gain: xpAmount,
    effective_level_cap: effectiveCap,
    next_level_xp_required: level >= effectiveCap ? null : getXpRequiredForLevel(level),
    level_after: level,
    xp_after: xp,
    levels_gained: levelsGained,
    xp_discarded_at_cap: discarded,
    capped: level >= effectiveCap,
  };
}
