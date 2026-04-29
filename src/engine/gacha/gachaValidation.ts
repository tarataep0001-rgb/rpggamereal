import { gachaConfig, V1A_GACHA_BOX_IDS } from "../../config/gachaConfig";
import { GACHA_GRADES, GACHA_PITY_LIMIT } from "./gachaRules";
import type { GachaGrade, GachaInput, GachaValidationResult } from "./gachaTypes";

function buildResult(errors: string[], warnings: string[]): GachaValidationResult {
  return {
    status: errors.length > 0 ? "fail" : warnings.length > 0 ? "warning" : "pass",
    errors,
    warnings,
    checked_at: new Date().toISOString(),
  };
}

function gradeCount(input: GachaInput, grade: GachaGrade): number {
  return input.box.pool.filter((entry) => entry.grade === grade).length;
}

export function validateGachaInput(input: GachaInput): GachaValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const ratesTotal = GACHA_GRADES.reduce((total, grade) => total + input.box.rates[grade], 0);

  if (input.box.id !== V1A_GACHA_BOX_IDS.box1) errors.push("Box 1 must be selected for V1A gacha.");
  if (!input.box.enabled) errors.push("Box 1 must be live in V1A.");
  if (input.box.currency !== "Free/Test Gem") errors.push("Box 1 must use Free/Test Gem only.");
  if (input.currency_state.paid_gem !== 0) errors.push("Paid Gem spend/balance cannot be used by V1A gacha.");
  if (gachaConfig.locked.paid_gem_gacha_enabled !== false) errors.push("Paid Gem Gacha must stay disabled.");
  if (gachaConfig.locked.box2_enabled !== false) errors.push("Box 2 must stay disabled except internal test.");
  if (gachaConfig.locked.box3_enabled !== false) errors.push("Box 3 must stay disabled.");
  if (input.box.multiPullEnabled) errors.push("Multi-pull must stay disabled/schema-only.");
  if (!input.box.singlePullEnabled) errors.push("Box 1 single pull must be available for local mock preview.");
  if (ratesTotal !== 100) errors.push(`Grade rates must total 100; got ${ratesTotal}.`);
  if (gradeCount(input, "Common") !== 5) errors.push("Common pool count must be 5.");
  if (gradeCount(input, "Uncommon") !== 5) errors.push("Uncommon pool count must be 5.");
  if (gradeCount(input, "Rare") !== 5) errors.push("Rare pool count must be 5.");
  if (input.pity_state.pity_limit !== GACHA_PITY_LIMIT) errors.push("Pity limit must be 30.");
  if (input.mode !== "local_mock_preview") errors.push("Gacha engine must run in local mock preview mode.");

  GACHA_GRADES.forEach((grade) => {
    const count = gradeCount(input, grade);
    const expectedRate = count > 0 ? input.box.rates[grade] / count : 0;

    input.box.pool
      .filter((entry) => entry.grade === grade)
      .forEach((entry) => {
        if (entry.ratePercent !== expectedRate) {
          errors.push(`${entry.character_id} per-character rate must be ${expectedRate}.`);
        }
      });
  });

  if (input.box.paidGemDisabled !== true) errors.push("Paid Gem must be disabled on gacha box.");
  return buildResult(errors, warnings);
}
