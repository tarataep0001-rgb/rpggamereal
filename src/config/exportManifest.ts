import { classConfig } from "@/config/classConfig";
import { bossConfig } from "@/config/bossConfig";
import { bossSkillConfig } from "@/config/bossSkillConfig";
import { dropConfig } from "@/config/dropConfig";
import { economyConfig } from "@/config/economyConfig";
import { equipmentConfig } from "@/config/equipmentConfig";
import { enemyCompositionConfig } from "@/config/enemyCompositionConfig";
import { enemyConfig } from "@/config/enemyConfig";
import { enemySkillConfig } from "@/config/enemySkillConfig";
import { featureFlagsConfig } from "@/config/featureFlagsConfig";
import { formationConfig } from "@/config/formationConfig";
import { itemMaterialConfig } from "@/config/itemMaterialConfig";
import { createConfigMeta } from "@/config/meta";
import { skillConfig } from "@/config/skillConfig";
import { stageConfig } from "@/config/stageConfig";

export const configExportObjects = [
  economyConfig,
  featureFlagsConfig,
  classConfig,
  skillConfig,
  formationConfig,
  equipmentConfig,
  itemMaterialConfig,
  dropConfig,
  enemySkillConfig,
  enemyConfig,
  bossConfig,
  bossSkillConfig,
  stageConfig,
  enemyCompositionConfig,
] as const;

export const exportManifest = {
  ...createConfigMeta({
    configKey: "export_manifest",
    notes:
      "Manifest lists config foundation groups. Phase 15 adds enemy, boss, stage, and enemy composition mock export artifacts. Later business configs remain outside production validation.",
  }),
  export_id: "export_manifest",
  items: [
    {
      export_id: "economy_config",
      file_key: "src/config/economyConfig.ts",
      depends_on: [],
      status: "export_ready_mock",
      required_for_v1a: true,
      validation_state: "validated_mock",
      notes: "Economy display constants only; no real WLD conversion.",
    },
    {
      export_id: "feature_flags_config",
      file_key: "src/config/featureFlagsConfig.ts",
      depends_on: [],
      status: "export_ready_mock",
      required_for_v1a: true,
      validation_state: "validated_mock",
      notes: "Sensitive V1A flags locked disabled.",
    },
    {
      export_id: "class_config",
      file_key: "src/config/classConfig.ts",
      depends_on: ["feature_flags_config", "economy_config"],
      status: "export_ready_mock",
      required_for_v1a: true,
      validation_state: "validated_mock",
      notes: "5 Class 1 rows live; Class 2/3 locked/schema-only.",
    },
    {
      export_id: "skill_config",
      file_key: "src/config/skillConfig.ts",
      depends_on: ["class_config"],
      status: "export_ready_mock",
      required_for_v1a: true,
      validation_state: "validated_mock",
      notes: "Exports 15 live Class 1 skill rows with asset references and system constants.",
    },
    {
      export_id: "formation_config",
      file_key: "src/config/formationConfig.ts",
      depends_on: ["class_config", "feature_flags_config"],
      status: "export_ready_mock",
      required_for_v1a: true,
      validation_state: "validated_mock",
      notes: "Exports 9 canonical cells and 5 formation pattern rows.",
    },
    {
      export_id: "equipment_config",
      file_key: "src/config/equipmentConfig.ts",
      depends_on: ["economy_config", "feature_flags_config"],
      status: "export_ready_mock",
      required_for_v1a: true,
      validation_state: "validated_mock",
      notes: "Exports 78 equipment template rows, substat ranges, gear instance rules, crafting/set bonus locks.",
    },
    {
      export_id: "item_material_config",
      file_key: "src/config/itemMaterialConfig.ts",
      depends_on: ["economy_config"],
      status: "export_ready_mock",
      required_for_v1a: true,
      validation_state: "validated_mock",
      notes: "Exports material rows, stack limits, fragment conversions, and salvage config.",
    },
    {
      export_id: "drop_config",
      file_key: "src/config/dropConfig.ts",
      depends_on: ["equipment_config", "item_material_config", "feature_flags_config"],
      status: "export_ready_mock",
      required_for_v1a: true,
      validation_state: "validated_mock",
      notes: "Exports gear roll rates, grade distributions, gear chest config, drop table ID patterns, and weekly boss foundation.",
    },
    {
      export_id: "enemy_skills_config",
      file_key: "src/config/enemySkillConfig.ts",
      depends_on: ["skill_config", "economy_config"],
      status: "export_ready_mock",
      required_for_v1a: true,
      validation_state: "validated_mock",
      notes: "Exports 8 enemy skill templates for V1A mock enemy behavior references.",
    },
    {
      export_id: "enemies_config",
      file_key: "src/config/enemyConfig.ts",
      depends_on: ["enemy_skills_config"],
      status: "export_ready_mock",
      required_for_v1a: true,
      validation_state: "validated_mock",
      notes: "Exports 20 enemy master rows across Chapter 1-5 enemy families.",
    },
    {
      export_id: "boss_config",
      file_key: "src/config/bossConfig.ts",
      depends_on: ["drop_config"],
      status: "export_ready_mock",
      required_for_v1a: true,
      validation_state: "validated_mock",
      notes: "Exports exactly 15 V1A boss rows: 10 mini-bosses and 5 main bosses.",
    },
    {
      export_id: "boss_skills_config",
      file_key: "src/config/bossSkillConfig.ts",
      depends_on: ["boss_config"],
      status: "export_ready_mock",
      required_for_v1a: true,
      validation_state: "validated_mock",
      notes: "Exports concrete boss skill rows so bosses are not trait-only placeholders.",
    },
    {
      export_id: "stages_config",
      file_key: "src/config/stageConfig.ts",
      depends_on: ["enemies_config", "boss_config", "drop_config"],
      status: "export_ready_mock",
      required_for_v1a: true,
      validation_state: "validated_mock",
      notes: "Exports 150 deterministic Chapter 1-5 stage rows with tutorial overrides.",
    },
    {
      export_id: "enemy_compositions_config",
      file_key: "src/config/enemyCompositionConfig.ts",
      depends_on: ["stages_config", "enemies_config", "boss_config"],
      status: "export_ready_mock",
      required_for_v1a: true,
      validation_state: "validated_mock",
      notes: "Exports 150 enemy composition rows, one composition per stage.",
    },
  ],
} as const;
