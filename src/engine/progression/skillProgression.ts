import type {
  ProgressionClassName,
  SkillLoadoutValidation,
  SkillUnlockRow,
  SkillUpgradePreview,
} from "./characterProgressionTypes";

const skillUnlocksByClass: Record<ProgressionClassName, SkillUnlockRow[]> = {
  Swordsman: [
    { level: 10, skill_id: "swordsman_slash_01", skill_name_th: "ฟันผ่า", unlocked: false },
    { level: 20, skill_id: "swordsman_guard_break_02", skill_name_th: "ฟันทำลายเกราะ", unlocked: false },
    { level: 40, skill_id: "swordsman_brave_guard_03", skill_name_th: "ตั้งโล่กล้าหาญ", unlocked: false },
  ],
  Archer: [
    { level: 10, skill_id: "archer_precise_shot_01", skill_name_th: "ยิงเจาะจุด", unlocked: false },
    { level: 20, skill_id: "archer_arrow_rain_02", skill_name_th: "ฝนธนู", unlocked: false },
    { level: 40, skill_id: "archer_eagle_eye_03", skill_name_th: "สายตาเหยี่ยว", unlocked: false },
  ],
  Thief: [
    { level: 10, skill_id: "thief_quick_stab_01", skill_name_th: "แทงไว", unlocked: false },
    { level: 20, skill_id: "thief_backstab_02", skill_name_th: "ลอบแทงหลัง", unlocked: false },
    { level: 40, skill_id: "thief_smoke_step_03", skill_name_th: "ก้าวเงาควัน", unlocked: false },
  ],
  Priest: [
    { level: 10, skill_id: "priest_light_smite_01", skill_name_th: "แสงพิพากษา", unlocked: false },
    { level: 20, skill_id: "priest_minor_heal_02", skill_name_th: "ฟื้นฟูเบื้องต้น", unlocked: false },
    { level: 40, skill_id: "priest_holy_shield_03", skill_name_th: "โล่ศักดิ์สิทธิ์", unlocked: false },
  ],
  Mage: [
    { level: 10, skill_id: "mage_fire_bolt_01", skill_name_th: "ลูกไฟ", unlocked: false },
    { level: 20, skill_id: "mage_frost_wave_02", skill_name_th: "คลื่นน้ำแข็ง", unlocked: false },
    { level: 40, skill_id: "mage_arcane_burst_03", skill_name_th: "ระเบิดอาคม", unlocked: false },
  ],
};

export function getClass1SkillUnlockRows(
  className: ProgressionClassName,
  level: number,
): SkillUnlockRow[] {
  return skillUnlocksByClass[className].map((row) => ({
    ...row,
    unlocked: level >= row.level,
  }));
}

export function getUnlockedClass1Skills(className: ProgressionClassName, level: number) {
  return getClass1SkillUnlockRows(className, level).filter((row) => row.unlocked);
}

export function getNextSkillUnlock(className: ProgressionClassName, level: number) {
  return getClass1SkillUnlockRows(className, level).find((row) => !row.unlocked) ?? null;
}

export function previewSkillUpgrade(skillId: string, currentSkillLevel: number): SkillUpgradePreview {
  const skillLevelCap = 10 as const;
  const nextLevel = currentSkillLevel >= skillLevelCap ? null : currentSkillLevel + 1;
  const safeCurrent = Math.max(1, Math.min(skillLevelCap, currentSkillLevel));
  const requiredGold = nextLevel ? 250 * nextLevel * nextLevel : 0;
  const requiredMaterials = (() => {
    if (!nextLevel) return [];
    if (nextLevel <= 3) return [{ item_id: "mat_skill_book_fragment", quantity: nextLevel * 2 }];
    if (nextLevel <= 6) return [{ item_id: "mat_skill_book", quantity: Math.max(1, nextLevel - 3) }];
    return [
      { item_id: "mat_skill_book", quantity: nextLevel - 5 },
      { item_id: "mat_stone_lv2", quantity: nextLevel - 6 },
    ];
  })();

  return {
    skill_id: skillId,
    current_skill_level: safeCurrent,
    next_skill_level: nextLevel,
    skill_level_cap: skillLevelCap,
    required_gold: requiredGold,
    required_materials: requiredMaterials,
    effect_preview: nextLevel
      ? `Mock preview: coefficient/value increases for skill level ${nextLevel}.`
      : "Skill Lv10 cap reached for V1A mock preview.",
    mock_only: true,
    no_wld: true,
    no_paid_gem: true,
    no_ledger: true,
  };
}

export function validateSkillLoadoutForLevel(
  className: ProgressionClassName,
  level: number,
  loadout: string[],
): SkillLoadoutValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  const unlockedIds = new Set(getUnlockedClass1Skills(className, level).map((row) => row.skill_id));

  loadout.forEach((skillId) => {
    if (!unlockedIds.has(skillId)) {
      errors.push(`${skillId} is not unlocked for ${className} Lv${level}.`);
    }
    if (!skillId.startsWith(className.toLowerCase())) {
      errors.push(`${skillId} does not belong to ${className}.`);
    }
  });

  if (loadout.length > 3) warnings.push("V1A active loadout display expects up to 3 skills.");

  return {
    status: errors.length > 0 ? "fail" : "pass",
    errors,
    warnings,
  };
}

export const class1UnlockSpec = skillUnlocksByClass;
