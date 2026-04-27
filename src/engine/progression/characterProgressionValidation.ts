import type {
  CharacterProgressionInput,
  CharacterProgressionResult,
  CharacterProgressionValidationResult,
} from "./characterProgressionTypes";
import { isMainCharacterRuleValid } from "./classProgression";
import { class1UnlockSpec } from "./skillProgression";

function result(errors: string[], warnings: string[]): CharacterProgressionValidationResult {
  return {
    status: errors.length > 0 ? "fail" : "pass",
    errors,
    warnings,
    checked_at: new Date(0).toISOString(),
  };
}

export function validateCharacterProgressionInput(input: CharacterProgressionInput) {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (input.effective_level_cap !== 50) errors.push("V1A effective level cap must remain 50.");
  if (input.character.level > input.effective_level_cap) errors.push("Character level exceeds effective cap.");
  if (!isMainCharacterRuleValid(input.character)) {
    errors.push("Main character must have multiplier x1.85 and no Star system in V1A.");
  }
  if (input.teammate.current_star > 5) errors.push("Star level cannot exceed 5.");
  if (input.inventory_preview.used_inventory_slots > input.inventory_preview.inventory_slots) {
    errors.push("Inventory used slots cannot exceed inventory slots.");
  }

  const specRows = class1UnlockSpec[input.character.class_name];
  const expectedLevels = specRows.map((row) => row.level).join(",");
  if (expectedLevels !== "10,20,40") errors.push("Class 1 unlock levels must be Lv10/Lv20/Lv40.");
  if (input.active_skill_ids.some((skillId) => skillId.includes("class_2") || skillId.includes("class_3"))) {
    errors.push("Class 2/3 skills must not be live in V1A loadout.");
  }
  if (input.skill_levels.some((skill) => skill.current_skill_level > 10)) {
    warnings.push("Skill level preview is clamped at Lv10 for V1A mock.");
  }

  return result(errors, warnings);
}

export function validateCharacterProgressionResult(
  input: CharacterProgressionInput,
  progression: Omit<CharacterProgressionResult, "validation">,
) {
  const errors: string[] = [];
  const warnings: string[] = [];
  const inputValidation = validateCharacterProgressionInput(input);

  errors.push(...inputValidation.errors);
  warnings.push(...inputValidation.warnings);

  if (progression.xp_preview.effective_level_cap !== 50) errors.push("XP preview cap must be 50.");
  if (progression.xp_preview.level_after > 50) errors.push("XP preview level exceeds V1A cap.");
  if (progression.class_roadmap.class2 !== "locked-v1a") errors.push("Class 2 must remain locked.");
  if (progression.class_roadmap.class3 !== "schema-only") errors.push("Class 3 must remain schema-only.");
  if (progression.skill_upgrade_preview.no_wld !== true) errors.push("Skill upgrade preview must not require WLD.");
  if (progression.skill_upgrade_preview.no_paid_gem !== true) errors.push("Skill upgrade preview must not require Paid Gem.");
  if (progression.skill_upgrade_preview.no_ledger !== true) errors.push("Skill upgrade preview must not use ledger.");
  if (progression.reset_ticket_preview.basic_reset_ticket.does_not_refund_materials !== true) {
    errors.push("Reset Ticket preview must not refund materials.");
  }
  if (progression.star_preview.current_star > 5) errors.push("Star max is 5.");
  if (progression.progression_log_preview.no_wld !== true) errors.push("Progression log must mark no WLD.");
  if (progression.progression_log_preview.no_paid_gem !== true) errors.push("Progression log must mark no Paid Gem.");
  if (progression.progression_log_preview.no_ledger !== true) errors.push("Progression log must mark no ledger.");

  return result(errors, warnings);
}
