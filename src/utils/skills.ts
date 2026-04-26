import type { ClassName, SkillConfig } from "@/types/game";

export const classOrder: ClassName[] = [
  "Swordsman",
  "Archer",
  "Thief",
  "Priest",
  "Mage",
];

export const classThaiNames: Record<ClassName, string> = {
  Swordsman: "นักดาบ",
  Archer: "นักธนู",
  Thief: "โจร",
  Priest: "นักบวช",
  Mage: "นักเวทย์",
};

export const skillThaiNames: Record<string, string> = {
  swordsman_slash_01: "ฟันผ่า",
  swordsman_guard_break_02: "ฟันทำลายเกราะ",
  swordsman_brave_guard_03: "ตั้งโล่กล้าหาญ",
  archer_precise_shot_01: "ยิงเจาะจุด",
  archer_arrow_rain_02: "ฝนธนู",
  archer_eagle_eye_03: "สายตาเหยี่ยว",
  thief_quick_stab_01: "แทงไว",
  thief_backstab_02: "ลอบแทงหลัง",
  thief_smoke_step_03: "ก้าวเงาควัน",
  priest_light_smite_01: "แสงพิพากษา",
  priest_minor_heal_02: "ฟื้นฟูเบื้องต้น",
  priest_holy_shield_03: "โล่ศักดิ์สิทธิ์",
  mage_fire_bolt_01: "ลูกไฟ",
  mage_frost_wave_02: "คลื่นน้ำแข็ง",
  mage_arcane_burst_03: "ระเบิดอาคม",
};

export const skillAssetIds: Record<string, string> = {
  swordsman_slash_01: "icon_skill_swordsman_slash",
  swordsman_guard_break_02: "icon_skill_swordsman_guard_break",
  swordsman_brave_guard_03: "icon_skill_swordsman_brave_guard",
  archer_precise_shot_01: "icon_skill_archer_precise_shot",
  archer_arrow_rain_02: "icon_skill_archer_arrow_rain",
  archer_eagle_eye_03: "icon_skill_archer_eagle_eye",
  thief_quick_stab_01: "icon_skill_thief_quick_stab",
  thief_backstab_02: "icon_skill_thief_backstab",
  thief_smoke_step_03: "icon_skill_thief_smoke_step",
  priest_light_smite_01: "icon_skill_priest_light_smite",
  priest_minor_heal_02: "icon_skill_priest_minor_heal",
  priest_holy_shield_03: "icon_skill_priest_holy_shield",
  mage_fire_bolt_01: "icon_skill_mage_fire_bolt",
  mage_frost_wave_02: "icon_skill_mage_frost_wave",
  mage_arcane_burst_03: "icon_skill_mage_arcane_burst",
};

export function groupSkillsByClass(
  skills: SkillConfig[],
): Record<ClassName, SkillConfig[]> {
  return classOrder.reduce(
    (groups, className) => ({
      ...groups,
      [className]: skills.filter((skill) => skill.class_required === className),
    }),
    {} as Record<ClassName, SkillConfig[]>,
  );
}

export function getSkillsForClass(
  skills: SkillConfig[],
  className: ClassName,
): SkillConfig[] {
  return skills.filter((skill) => skill.class_required === className);
}

export function sortEquippedSkillsByPriority(
  skills: SkillConfig[],
  equippedSkillIds: string[],
): SkillConfig[] {
  return equippedSkillIds
    .flatMap((skillId) => {
      const skill = skills.find((item) => item.skill_id === skillId);
      return skill ? [skill] : [];
    })
    .sort((a, b) => {
      const priorityDelta =
        equippedSkillIds.indexOf(a.skill_id) - equippedSkillIds.indexOf(b.skill_id);

      if (priorityDelta !== 0) {
        return priorityDelta;
      }

      if (b.priority_weight !== a.priority_weight) {
        return b.priority_weight - a.priority_weight;
      }

      return a.skill_id.localeCompare(b.skill_id);
    });
}

export function formatMpCost(skill: SkillConfig): string {
  return `MP ${skill.mp_cost}`;
}

export function formatCooldown(skill: SkillConfig): string {
  return `CD ${skill.cooldown}`;
}

export function formatStatusChance(skill: SkillConfig): string {
  return skill.status_effect === "none"
    ? "No status"
    : `${skill.status_effect} ${skill.status_chance}%`;
}

export function getElementBadgeLabel(skill: SkillConfig): string {
  return skill.element;
}

export function getSkillTypeLabel(skill: SkillConfig): string {
  return skill.skill_type;
}

export function getTargetTypeLabel(skill: SkillConfig): string {
  return skill.target_type.replaceAll("_", " ");
}

export function getSkillDisplayName(skill: SkillConfig): string {
  return skillThaiNames[skill.skill_id] ?? skill.skill_name;
}
