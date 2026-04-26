import { classConfig } from "@/config/classConfig";
import { dropConfig } from "@/config/dropConfig";
import { economyConfig } from "@/config/economyConfig";
import { equipmentConfig } from "@/config/equipmentConfig";
import { featureFlagsConfig } from "@/config/featureFlagsConfig";
import { formationConfig } from "@/config/formationConfig";
import { itemMaterialConfig } from "@/config/itemMaterialConfig";
import { createConfigMeta } from "@/config/meta";
import { skillConfig } from "@/config/skillConfig";

export const configExportObjects = [
  economyConfig,
  featureFlagsConfig,
  classConfig,
  skillConfig,
  formationConfig,
  equipmentConfig,
  itemMaterialConfig,
  dropConfig,
] as const;

export const exportManifest = {
  ...createConfigMeta({
    configKey: "export_manifest",
    notes:
      "Manifest lists config foundation groups. Phase 13 upgrades class, skill, and formation validation state only. Enemy, boss, stage, and later config exports are not completed here.",
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
      depends_on: ["feature_flags_config"],
      status: "export_ready_mock",
      required_for_v1a: true,
      validation_state: "validated_mock",
      notes: "References 78 mock equipment templates.",
    },
    {
      export_id: "item_material_config",
      file_key: "src/config/itemMaterialConfig.ts",
      depends_on: ["economy_config"],
      status: "export_ready_mock",
      required_for_v1a: true,
      validation_state: "mock",
      notes: "Skeleton materials and fragment conversion.",
    },
    {
      export_id: "drop_config",
      file_key: "src/config/dropConfig.ts",
      depends_on: ["equipment_config", "item_material_config"],
      status: "export_ready_mock",
      required_for_v1a: true,
      validation_state: "mock",
      notes: "Drop foundation only; no enemy/stage tables completed.",
    },
  ],
} as const;
