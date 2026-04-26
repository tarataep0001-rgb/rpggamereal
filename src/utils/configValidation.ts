import { configExportObjects, exportManifest } from "@/config/exportManifest";
import { equipmentConfig } from "@/config/equipmentConfig";
import { featureFlagsConfig } from "@/config/featureFlagsConfig";
import { classConfig } from "@/config/classConfig";
import { formationConfig } from "@/config/formationConfig";
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
    id: "gacha-rates-total",
    label: "gacha rates total 100",
    status: validateLiveGachaRatesTotal100() ? "pass" : "fail",
    detail: "Enabled gacha boxes must total 100%.",
  },
];
