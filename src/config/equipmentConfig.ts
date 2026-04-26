import { createConfigMeta } from "@/config/meta";
import { equipmentFamilyMeta, equipmentTemplates } from "@/data/mockEquipment";
import type {
  ClassName,
  GearFamily,
  GearGrade,
  GearSlot,
  GearTier,
  ItemBindType,
  StatBlock,
  Substat,
} from "@/types/game";

const configMeta = createConfigMeta({
  configKey: "equipment_config",
  notes:
    "Equipment Template 78 รายการ. Crafting ยังไม่เปิดใน V1A, Set Bonus ยังไม่เปิดใน V1A, Epic Gear ไม่ดรอปปกติใน V1A.",
  status: "validated_mock",
});

export type EquipmentTemplateExportRow = {
  gear_template_id: string;
  display_name_th: string;
  family: GearFamily;
  slot: GearSlot;
  tier: GearTier;
  grade: GearGrade;
  required_min_level: number;
  class_restriction: ClassName[] | "any";
  main_stat_type: keyof StatBlock;
  bind_type: ItemBindType;
  schema_only: false;
  live_in_v1a: true;
  asset_id: string;
  config_version: string;
};

export const equipmentFamilies = equipmentFamilyMeta.map((meta) => meta.family);

export const equipmentSlots: GearSlot[] = [
  "Weapon",
  "Armor",
  "Helmet",
  "Gloves",
  "Boots",
  "Necklace",
  "Ring",
  "Charm",
];

export const familySlotMapping: Record<GearFamily, GearSlot> = {
  sword: "Weapon",
  bow: "Weapon",
  dagger: "Weapon",
  staff: "Weapon",
  heavy_armor: "Armor",
  light_armor: "Armor",
  robe: "Armor",
  helmet: "Helmet",
  gloves: "Gloves",
  boots: "Boots",
  necklace: "Necklace",
  ring: "Ring",
  charm: "Charm",
};

export const equipmentTiers = [
  { tier: 1, chapter_range: "Chapter 1-3", tier_min_level: 1 },
  { tier: 2, chapter_range: "Chapter 4-5", tier_min_level: 31 },
] as const;

export const liveEquipmentGrades: GearGrade[] = ["Common", "Uncommon", "Rare"];

export const equipmentAssetByFamily: Record<GearFamily, string> = {
  sword: "icon_gear_sword_common",
  bow: "icon_gear_bow_common",
  dagger: "icon_gear_dagger_common",
  staff: "icon_gear_staff_common",
  heavy_armor: "icon_gear_heavy_armor",
  light_armor: "icon_gear_light_armor",
  robe: "icon_gear_robe",
  helmet: "icon_gear_helmet",
  gloves: "icon_gear_gloves",
  boots: "icon_gear_boots",
  necklace: "icon_gear_necklace",
  ring: "icon_gear_ring",
  charm: "icon_gear_charm",
};

export const equipmentTemplateRows: EquipmentTemplateExportRow[] = equipmentTemplates.map(
  (template) => ({
    ...template,
    live_in_v1a: true,
    asset_id: equipmentAssetByFamily[template.family],
    config_version: configMeta.config_version,
  }),
);

export const gearInstanceRules = {
  gear_template_id: "Identifies family + tier + grade only.",
  gear_level_snapshot: "Every dropped/created gear instance must store gear_level_snapshot.",
  equipment_main_stat:
    "EquipmentMainStat uses RequiredLevel = gear_level_snapshot. This is display/export config only.",
  stage_drop_snapshot:
    "For stage drops, gear_level_snapshot = max(tier_min_level, source_stage_recommended_level).",
  non_stage_snapshot:
    "For crafted/shop/admin/test gear, gear_level_snapshot must be set by source_config.",
  salvage_blocked_when: ["equipped", "locked"],
  equipment_stack_rule: "Equipment does not stack; each equipment instance uses 1 inventory slot.",
} as const;

export const equipmentFeatureLocks = {
  epic_normal_drop: { enabled: false, schema_only: true },
  set_bonus: { enabled: false, schema_only: true },
  crafting: { enabled: false, schema_only: true },
  salvage: { enabled: true, schema_only: false },
} as const;

type GradeRollRange = Record<GearGrade, { min: number; max: number; unit: "percent" | "flat" | "percentage_point" }>;

export const substatRollRangeConfig: Record<
  "HP%" | "ATK%" | "MAG%" | "DEF%" | "RES%" | "SPD" | "ACC" | "EVA" | "CRIT" | "CRIT_DMG" | "MPGain",
  GradeRollRange
> = {
  "HP%": {
    Common: { min: 2, max: 4, unit: "percent" },
    Uncommon: { min: 3, max: 5, unit: "percent" },
    Rare: { min: 4, max: 7, unit: "percent" },
  },
  "ATK%": {
    Common: { min: 1, max: 3, unit: "percent" },
    Uncommon: { min: 2, max: 4, unit: "percent" },
    Rare: { min: 3, max: 5, unit: "percent" },
  },
  "MAG%": {
    Common: { min: 1, max: 3, unit: "percent" },
    Uncommon: { min: 2, max: 4, unit: "percent" },
    Rare: { min: 3, max: 5, unit: "percent" },
  },
  "DEF%": {
    Common: { min: 1, max: 3, unit: "percent" },
    Uncommon: { min: 2, max: 4, unit: "percent" },
    Rare: { min: 3, max: 6, unit: "percent" },
  },
  "RES%": {
    Common: { min: 1, max: 3, unit: "percent" },
    Uncommon: { min: 2, max: 4, unit: "percent" },
    Rare: { min: 3, max: 6, unit: "percent" },
  },
  SPD: {
    Common: { min: 1, max: 2, unit: "flat" },
    Uncommon: { min: 2, max: 3, unit: "flat" },
    Rare: { min: 3, max: 5, unit: "flat" },
  },
  ACC: {
    Common: { min: 2, max: 4, unit: "flat" },
    Uncommon: { min: 3, max: 6, unit: "flat" },
    Rare: { min: 5, max: 9, unit: "flat" },
  },
  EVA: {
    Common: { min: 1, max: 3, unit: "flat" },
    Uncommon: { min: 2, max: 5, unit: "flat" },
    Rare: { min: 4, max: 8, unit: "flat" },
  },
  CRIT: {
    Common: { min: 1, max: 2, unit: "percentage_point" },
    Uncommon: { min: 2, max: 3, unit: "percentage_point" },
    Rare: { min: 3, max: 5, unit: "percentage_point" },
  },
  CRIT_DMG: {
    Common: { min: 3, max: 6, unit: "percentage_point" },
    Uncommon: { min: 5, max: 9, unit: "percentage_point" },
    Rare: { min: 8, max: 14, unit: "percentage_point" },
  },
  MPGain: {
    Common: { min: 1, max: 3, unit: "percentage_point" },
    Uncommon: { min: 2, max: 4, unit: "percentage_point" },
    Rare: { min: 3, max: 6, unit: "percentage_point" },
  },
};

export const substatCountByGrade: Record<GearGrade, { min: number; max: number }> = {
  Common: { min: 0, max: 1 },
  Uncommon: { min: 1, max: 2 },
  Rare: { min: 2, max: 3 },
};

export const substatRules: { allowed_stats: Substat[]; duplicate_substat_type_allowed: false } = {
  allowed_stats: ["HP", "ATK", "MAG", "DEF", "RES", "SPD", "ACC", "EVA", "CRIT", "CRIT_DMG"],
  duplicate_substat_type_allowed: false,
};

export const equipmentConfig = {
  ...configMeta,
  export_id: "equipment_config",
  families: equipmentFamilies,
  slots: equipmentSlots,
  familySlotMapping,
  tiers: equipmentTiers,
  liveGrades: liveEquipmentGrades,
  disabled: {
    epicNormalDrop: true,
    setBonusSchemaOnly: true,
    craftingSchemaOnly: true,
  },
  featureLocks: equipmentFeatureLocks,
  gearRule: gearInstanceRules,
  substatCountByGrade,
  substatRollRangeConfig,
  substatRules,
  templateCount: equipmentTemplateRows.length,
  templateRows: equipmentTemplateRows,
  templateIds: equipmentTemplateRows.map((template) => template.gear_template_id),
} as const;
