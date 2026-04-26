import { configExportObjects, exportManifest } from "@/config/exportManifest";
import { dropConfig } from "@/config/dropConfig";
import { equipmentConfig } from "@/config/equipmentConfig";
import { featureFlagsConfig } from "@/config/featureFlagsConfig";
import { classConfig } from "@/config/classConfig";
import { formationConfig } from "@/config/formationConfig";
import { itemMaterialConfig } from "@/config/itemMaterialConfig";
import { skillConfig } from "@/config/skillConfig";
import { gachaBoxes } from "@/data/mockGacha";
import type { ValidationStatus } from "@/types/game";

export type ConfigValidationResult = {
  id: string;
  label: string;
  status: ValidationStatus;
  detail: string;
};

type MetaLike = {
  schema_version?: string;
  config_version?: string;
  effective_at?: string;
  generated_at?: string;
  checksum?: string;
  source_spec?: string;
};

export function hasRequiredConfigMeta(config: MetaLike): boolean {
  return Boolean(
    config.schema_version &&
      config.config_version &&
      config.effective_at &&
      config.generated_at &&
      config.checksum &&
      config.source_spec,
  );
}

export function validateUniqueIds(items: ReadonlyArray<{ export_id: string }>): boolean {
  const ids = items.map((item) => item.export_id);
  return new Set(ids).size === ids.length;
}

export function validateV1AFeatureFlagsDisabled(): boolean {
  return (
    featureFlagsConfig.flags.ENABLE_WLD_WITHDRAW === false &&
    featureFlagsConfig.flags.ENABLE_WLD_REWARD_RANKING === false &&
    featureFlagsConfig.flags.ENABLE_PAID_GEM_GACHA === false &&
    featureFlagsConfig.flags.ENABLE_BOX_2 === false &&
    featureFlagsConfig.flags.ENABLE_BOX_3 === false &&
    featureFlagsConfig.flags.ENABLE_CLASS_2 === false &&
    featureFlagsConfig.flags.ENABLE_CLASS_3 === false &&
    featureFlagsConfig.flags.ENABLE_EPIC_NORMAL_DROP === false &&
    featureFlagsConfig.flags.ENABLE_CRAFTING === false &&
    featureFlagsConfig.flags.ENABLE_EQUIPMENT_SET_BONUS === false &&
    featureFlagsConfig.flags.ENABLE_SHARD_EXCHANGE === false &&
    featureFlagsConfig.flags.ENABLE_WLD_GUILD_REWARD === false
  );
}

export function validateLiveGachaRatesTotal100(): boolean {
  return gachaBoxes
    .filter((box) => box.enabled)
    .every((box) => Object.values(box.rates).reduce((sum, rate) => sum + rate, 0) === 100);
}

export function validateUniqueClassIds(): boolean {
  const ids = classConfig.rows.map((row) => row.class_id);
  return new Set(ids).size === ids.length;
}

export function validateClassConfigV1A(): boolean {
  return (
    validateUniqueClassIds() &&
    classConfig.rows.filter((row) => row.class_tier === 1 && row.live_in_v1a).length === 5 &&
    classConfig.roadmapLocks.class2.live_in_v1a === false &&
    classConfig.roadmapLocks.class3.live_in_v1a === false &&
    classConfig.rows.every((row) => Boolean(row.starter_weapon)) &&
    classConfig.mainCharacterRules.legendaryEquivalentMultiplier === 1.85
  );
}

const requiredSkillFields = [
  "skill_id",
  "skill_name",
  "class_required",
  "class_tier",
  "unlock_level",
  "skill_type",
  "element",
  "target_type",
  "base_coef",
  "mp_cost",
  "cooldown",
  "status_effect",
  "status_chance",
  "duration",
  "boss_modifier",
  "ai_condition",
  "priority_weight",
  "use_character_element",
  "ignore_taunt",
  "can_crit",
  "can_miss",
  "description_th",
  "description_short",
  "effect_formula",
  "asset_id",
  "live_in_v1a",
  "schema_only",
  "config_version",
] as const;

export function validateUniqueSkillIds(): boolean {
  const ids = skillConfig.rows.map((row) => row.skill_id);
  return new Set(ids).size === ids.length;
}

export function validateLiveSkillsHaveRequiredFields(): boolean {
  return skillConfig.rows
    .filter((row) => row.live_in_v1a)
    .every((row) =>
      requiredSkillFields.every((field) => {
        const value = row[field];
        return value !== undefined && value !== null && value !== "";
      }),
    );
}

export function validateSkillConfigV1A(): boolean {
  const swordsmanShield = skillConfig.rows.find(
    (row) => row.skill_id === "swordsman_brave_guard_03",
  );
  const priestShield = skillConfig.rows.find(
    (row) => row.skill_id === "priest_holy_shield_03",
  );

  return (
    validateUniqueSkillIds() &&
    skillConfig.rows.filter((row) => row.class_tier === 1 && row.live_in_v1a).length === 15 &&
    skillConfig.rows.every((row) => row.class_tier === 1 || !row.live_in_v1a) &&
    validateLiveSkillsHaveRequiredFields() &&
    Boolean(swordsmanShield?.effect_formula.includes("DEF")) &&
    !Boolean(swordsmanShield?.effect_formula.includes("MAG")) &&
    Boolean(priestShield?.effect_formula.includes("MAG")) &&
    Boolean(swordsmanShield?.asset_id) &&
    skillConfig.rows.every((row) => Boolean(row.asset_id))
  );
}

export function validateFormationConfigV1A(): boolean {
  const expectedPriority = [
    "Front Guard",
    "Backline Focus",
    "Balanced Line",
    "Cross Formation",
    "Assassin Spread",
  ];
  const cross = formationConfig.rows.find((row) => row.formation_id === "cross_formation");

  return (
    formationConfig.canonicalCells.length === 9 &&
    new Set(formationConfig.canonicalCells).size === 9 &&
    formationConfig.rows.length === 5 &&
    formationConfig.priority.every((name, index) => name === expectedPriority[index]) &&
    cross?.cross_anchor === "middle_center" &&
    (cross?.cross_required_count ?? 0) === 3 &&
    JSON.stringify(cross?.cross_required_from) ===
      JSON.stringify(["front_center", "middle_top", "middle_bottom", "back_center"]) &&
    formationConfig.cellRules.teamSizeMin === 1 &&
    formationConfig.cellRules.teamSizeMax === 6 &&
    formationConfig.cellRules.mainCharacterMandatory === true
  );
}

export function validateEquipmentConfigV1A(): boolean {
  const templateIds = equipmentConfig.templateRows.map((row) => row.gear_template_id);
  const expectedFields = [
    "gear_template_id",
    "display_name_th",
    "family",
    "slot",
    "tier",
    "grade",
    "required_min_level",
    "class_restriction",
    "main_stat_type",
    "bind_type",
    "schema_only",
    "live_in_v1a",
    "asset_id",
    "config_version",
  ] as const;

  return (
    equipmentConfig.templateRows.length === 78 &&
    new Set(templateIds).size === templateIds.length &&
    equipmentConfig.families.length === 13 &&
    new Set(equipmentConfig.families).size === 13 &&
    equipmentConfig.tiers.length === 2 &&
    equipmentConfig.liveGrades.length === 3 &&
    equipmentConfig.liveGrades.every((grade) => ["Common", "Uncommon", "Rare"].includes(grade)) &&
    equipmentConfig.disabled.epicNormalDrop === true &&
    equipmentConfig.disabled.setBonusSchemaOnly === true &&
    equipmentConfig.disabled.craftingSchemaOnly === true &&
    equipmentConfig.templateRows.every((row) =>
      expectedFields.every((field) => row[field] !== undefined && row[field] !== null && row[field] !== ""),
    ) &&
    equipmentConfig.templateRows.every((row) => row.asset_id.startsWith("icon_gear_")) &&
    equipmentConfig.templateRows.every((row) => equipmentConfig.familySlotMapping[row.family] === row.slot) &&
    equipmentConfig.substatRules.duplicate_substat_type_allowed === false
  );
}

export function validateItemMaterialConfigV1A(): boolean {
  const itemIds = itemMaterialConfig.materialRows.map((row) => row.item_id);
  const conversionIds = itemMaterialConfig.fragmentConversionRows.map((row) => row.conversion_id);
  const hasConversion = (conversionId: string) =>
    itemMaterialConfig.fragmentConversionRows.some((row) => row.conversion_id === conversionId);

  return (
    new Set(itemIds).size === itemIds.length &&
    new Set(conversionIds).size === conversionIds.length &&
    itemMaterialConfig.stackLimitConfig.Material === 9999 &&
    itemMaterialConfig.stackLimitConfig.Ticket === 999 &&
    itemMaterialConfig.stackLimitConfig["Character Shard"] === 9999 &&
    hasConversion("convert_skill_book_fragment_to_skill_book") &&
    hasConversion("convert_class_emblem_fragment_to_class_emblem") &&
    hasConversion("convert_antibreak_fragment_to_antibreak_charm") &&
    hasConversion("convert_advanced_emblem_fragment_to_advanced_emblem") &&
    itemMaterialConfig.materialRows
      .filter((row) => row.item_id.includes("advanced_emblem"))
      .every((row) => row.schema_only && !row.live_in_v1a) &&
    itemMaterialConfig.mailboxRoutingRules.wld_or_ledger_reward_uses_mailbox === false
  );
}

function distributionTotalIs100(distribution: Record<string, number>): boolean {
  return Object.values(distribution).reduce((sum, rate) => sum + rate, 0) === 100;
}

export function validateDropConfigV1A(): boolean {
  const expectedDropTableIds = ([1, 2, 3, 4, 5] as const).flatMap((chapter) =>
    ["normal", "elite", "mini_boss", "main_boss", "idle", "weekly_boss"].map(
      (tableType) => `drop_ch${chapter}_${tableType}`,
    ),
  );
  const actualDropTableIds = dropConfig.dropTableRows.map((row) => row.drop_table_id);

  return (
    Boolean(dropConfig.gearRollChance.normalFirstClear) &&
    distributionTotalIs100(dropConfig.gradeDistribution.chapter1To3) &&
    distributionTotalIs100(dropConfig.gradeDistribution.chapter4To5) &&
    distributionTotalIs100(dropConfig.bossWeeklyRepeatReward.rates) &&
    dropConfig.disabled.epicNormalDropInV1A === true &&
    expectedDropTableIds.every((id) => actualDropTableIds.includes(id)) &&
    dropConfig.dropTableRows.every((row) => row.epic_normal_drop_enabled === false) &&
    dropConfig.bossWeeklyRepeatReward.frequency.includes("1 time per boss_id") &&
    dropConfig.bossWeeklyRepeatReward.weeklyReset === "Monday 00:00 Asia/Bangkok" &&
    dropConfig.gearChestRows.length === 5 &&
    dropConfig.gearChestRows.every((row) => distributionTotalIs100(row.grade_table_snapshot))
  );
}

export const configValidationResults: ConfigValidationResult[] = [
  {
    id: "manifest-unique-export-ids",
    label: "unique ID check",
    status: validateUniqueIds(exportManifest.items) ? "pass" : "fail",
    detail: "Export manifest export_id values are unique.",
  },
  {
    id: "missing-reference-placeholder",
    label: "missing reference check placeholder",
    status: "not-run",
    detail: "Full cross-config reference scan is reserved for later export phases.",
  },
  {
    id: "numeric-min-max-placeholder",
    label: "numeric min/max bound check placeholder",
    status: "not-run",
    detail: "Numeric bounds are not production-validated in Phase 12.",
  },
  {
    id: "disabled-feature-reference",
    label: "disabled-feature reference check",
    status: validateV1AFeatureFlagsDisabled() ? "pass" : "fail",
    detail: "WLD, Paid Gem, Box 2/3, Class 2/3, crafting, set bonus, shard exchange disabled.",
  },
  {
    id: "required-meta",
    label: "required config metadata present",
    status: configExportObjects.every(hasRequiredConfigMeta) ? "pass" : "fail",
    detail:
      "schema_version, config_version, effective_at, generated_at, checksum/hash, source_spec present.",
  },
  {
    id: "class-config-v1a",
    label: "class_config V1A rows valid",
    status: validateClassConfigV1A() ? "pass" : "fail",
    detail: "5 live Class 1 rows, Class 2/3 locked, starter weapons, multiplier x1.85.",
  },
  {
    id: "skill-config-v1a",
    label: "skill_config V1A rows valid",
    status: validateSkillConfigV1A() ? "pass" : "fail",
    detail:
      "15 Class 1 live skills, required fields, asset IDs, DEF/MAG shield formula checks.",
  },
  {
    id: "formation-config-v1a",
    label: "formation_config V1A rows valid",
    status: validateFormationConfigV1A() ? "pass" : "fail",
    detail: "9 canonical cells, 5 patterns, priority, Cross Formation, team size 1-6.",
  },
  {
    id: "equipment-template-count",
    label: "equipment template count 78",
    status: equipmentConfig.templateCount === 78 ? "pass" : "fail",
    detail: `${equipmentConfig.templateCount} equipment templates referenced.`,
  },
  {
    id: "equipment-config-v1a",
    label: "equipment_config V1A rows valid",
    status: validateEquipmentConfigV1A() ? "pass" : "fail",
    detail: "78 templates, 13 families, 2 tiers, Common/Uncommon/Rare only, locks disabled.",
  },
  {
    id: "item-material-config-v1a",
    label: "item_material_config V1A rows valid",
    status: validateItemMaterialConfigV1A() ? "pass" : "fail",
    detail: "Unique material IDs, stack limits, fragment conversion rows, advanced emblem schema-only.",
  },
  {
    id: "drop-config-v1a",
    label: "drop_config V1A rows valid",
    status: validateDropConfigV1A() ? "pass" : "fail",
    detail: "Gear roll rates, 100% distributions, 30 drop table IDs, weekly boss rules.",
  },
  {
    id: "gacha-rates-total",
    label: "gacha rates total 100",
    status: validateLiveGachaRatesTotal100() ? "pass" : "fail",
    detail: "Enabled gacha boxes must total 100%.",
  },
];
