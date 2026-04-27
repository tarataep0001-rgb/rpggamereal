import type {
  CharacterProgressionInput,
  CharacterProgressionResult,
  ProgressionCharacter,
} from "./characterProgressionTypes";
import { previewApplyXp } from "./characterLeveling";
import { getClassRoadmapStatus } from "./classProgression";
import { previewResetTicketUse } from "./resetTicketRules";
import {
  getClass1SkillUnlockRows,
  getNextSkillUnlock,
  previewSkillUpgrade,
  validateSkillLoadoutForLevel,
} from "./skillProgression";
import { previewDuplicateShardGain, previewStarUpgrade } from "./starProgression";
import { validateCharacterProgressionResult } from "./characterProgressionValidation";

export function processCharacterProgressionPreview(
  input: CharacterProgressionInput,
): CharacterProgressionResult {
  const xpPreview = previewApplyXp(input.character, input.xp_gain_preview, input.effective_level_cap);
  const unlockedSkills = getClass1SkillUnlockRows(input.character.class_name, input.character.level);
  const featuredSkill = input.skill_levels[0] ?? {
    skill_id: input.active_skill_ids[0] ?? "swordsman_slash_01",
    current_skill_level: 1,
  };

  const progression = {
    xp_preview: xpPreview,
    unlocked_skills: unlockedSkills,
    next_skill_unlock: getNextSkillUnlock(input.character.class_name, input.character.level),
    skill_upgrade_preview: previewSkillUpgrade(featuredSkill.skill_id, featuredSkill.current_skill_level),
    loadout_validation: validateSkillLoadoutForLevel(
      input.character.class_name,
      input.character.level,
      input.active_skill_ids,
    ),
    class_roadmap: getClassRoadmapStatus(input.character),
    star_preview: previewStarUpgrade(input.teammate),
    duplicate_preview: previewDuplicateShardGain(input.teammate.grade),
    reset_ticket_preview: previewResetTicketUse(input.character, input.inventory_preview),
    progression_log_preview: {
      log_id: `local_character_progression_${input.character.character_id}_${input.character.level}`,
      local_mock_only: true,
      no_wld: true,
      no_paid_gem: true,
      no_ledger: true,
      no_production_authority: true,
    },
  } satisfies Omit<CharacterProgressionResult, "validation">;

  return {
    ...progression,
    validation: validateCharacterProgressionResult(input, progression),
  };
}

export function createProgressionCharacter(params: ProgressionCharacter): ProgressionCharacter {
  return { ...params };
}

export {
  getXpRequiredForLevel,
  getTotalXpForLevel,
} from "./xpCurve";
export { previewApplyXp } from "./characterLeveling";
export {
  getClass1SkillUnlockRows,
  getNextSkillUnlock,
  getUnlockedClass1Skills,
  previewSkillUpgrade,
  validateSkillLoadoutForLevel,
} from "./skillProgression";
export { getClassRoadmapStatus } from "./classProgression";
export { previewStarUpgrade, previewDuplicateShardGain } from "./starProgression";
export { previewResetTicketUse } from "./resetTicketRules";
