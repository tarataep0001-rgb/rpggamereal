import { box1GachaCharacters, mainCharacter } from "@/data/mockCharacters";
import { equipmentTemplates } from "@/data/mockEquipment";
import { mockAssets } from "@/data/mockAssets";
import { mockSkills } from "@/data/mockSkills";

export type LocalAssetImage = {
  entityId: string;
  kind: "character" | "skill" | "equipment" | "ui";
  label: string;
  path: string;
  status: "generated-local-svg";
  safetyNote: string;
};

const safetyNote =
  "Original local SVG placeholder. No external URL, copyrighted asset, paid asset, WLD, payment, ledger, or production-money behavior.";

export const characterImageAssets: LocalAssetImage[] = [
  mainCharacter,
  ...box1GachaCharacters,
].map((character) => ({
  entityId: character.id,
  kind: "character",
  label: `${character.displayName} / ${character.grade} / ${character.baseClass}`,
  path: `/assets/generated/characters/${character.id}.svg`,
  status: "generated-local-svg",
  safetyNote,
}));

export const skillImageAssets: LocalAssetImage[] = mockSkills.map((skill) => ({
  entityId: skill.skill_id,
  kind: "skill",
  label: `${skill.skill_name} / ${skill.class_required} / ${skill.skill_type}`,
  path: `/assets/generated/skills/${skill.skill_id}.svg`,
  status: "generated-local-svg",
  safetyNote,
}));

export const equipmentImageAssets: LocalAssetImage[] = equipmentTemplates.map(
  (template) => ({
    entityId: template.gear_template_id,
    kind: "equipment",
    label: `${template.display_name_th} / T${template.tier} / ${template.grade}`,
    path: `/assets/generated/equipment/${template.gear_template_id}.svg`,
    status: "generated-local-svg",
    safetyNote,
  }),
);

export const uiImageAssets: LocalAssetImage[] = mockAssets.map((asset) => ({
  entityId: asset.asset_id,
  kind: "ui",
  label: `${asset.display_name} / ${asset.category}`,
  path: `/assets/generated/ui/${asset.asset_id}.svg`,
  status: "generated-local-svg",
  safetyNote,
}));

export const localAssetImages: LocalAssetImage[] = [
  ...characterImageAssets,
  ...skillImageAssets,
  ...equipmentImageAssets,
  ...uiImageAssets,
];

export const localAssetImageCounts = {
  characters: characterImageAssets.length,
  skills: skillImageAssets.length,
  equipment: equipmentImageAssets.length,
  ui: uiImageAssets.length,
  total: localAssetImages.length,
} as const;

const assetAliases: Record<string, string> = {
  portrait_main_swordsman_hero: "main_hero",
  hero_portrait_swordsman: "main_hero",
  starter_teammate_priest_light: "ch_common_priest_light_aid",
  portrait_starter_priest_light: "ch_common_priest_light_aid",
  portrait_class_swordsman: "main_hero",
  portrait_class_archer: "ch_common_archer_wind_shot",
  portrait_class_thief: "ch_common_thief_dark_cut",
  portrait_class_priest: "ch_common_priest_light_aid",
  portrait_class_mage: "ch_common_mage_fire_spark",
  icon_skill_swordsman_slash: "swordsman_slash_01",
  icon_skill_swordsman_guard_break: "swordsman_guard_break_02",
  icon_skill_swordsman_brave_guard: "swordsman_brave_guard_03",
  icon_skill_archer_precise_shot: "archer_precise_shot_01",
  icon_skill_archer_arrow_rain: "archer_arrow_rain_02",
  icon_skill_archer_eagle_eye: "archer_eagle_eye_03",
  icon_skill_thief_quick_stab: "thief_quick_stab_01",
  icon_skill_thief_backstab: "thief_backstab_02",
  icon_skill_thief_smoke_step: "thief_smoke_step_03",
  icon_skill_priest_light_smite: "priest_light_smite_01",
  icon_skill_priest_minor_heal: "priest_minor_heal_02",
  icon_skill_priest_holy_shield: "priest_holy_shield_03",
  icon_skill_mage_fire_bolt: "mage_fire_bolt_01",
  icon_skill_mage_frost_wave: "mage_frost_wave_02",
  icon_skill_mage_arcane_burst: "mage_arcane_burst_03",
};

export function getLocalAssetImagePath(entityId: string): string | null {
  const normalizedId = assetAliases[entityId] ?? entityId;

  return (
    localAssetImages.find((asset) => asset.entityId === normalizedId)?.path ?? null
  );
}
