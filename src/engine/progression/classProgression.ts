import type { ClassRoadmapStatus, ProgressionCharacter } from "./characterProgressionTypes";

export function getClassRoadmapStatus(character: ProgressionCharacter): ClassRoadmapStatus {
  return {
    class1: "live-v1a",
    class2: "locked-v1a",
    class3: "schema-only",
    production_status: "NO-GO",
    notes: [
      `${character.class_name} Class 1 เปิดใช้งานใน V1A`,
      "Class 2 ยังไม่เปิดใน V1A และต้องรอ V1B Lv60 หลัง validation/simulation gates",
      "Class 3 เป็นโครงข้อมูลเท่านั้น ยังไม่ live",
      "Production status: NO-GO",
    ],
  };
}

export function isMainCharacterRuleValid(character: ProgressionCharacter) {
  return character.is_main_character
    ? character.legendary_equivalent_multiplier === 1.85 && character.star === "none-v1a"
    : true;
}
