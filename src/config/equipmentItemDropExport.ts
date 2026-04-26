import { dropConfig } from "@/config/dropConfig";
import { equipmentConfig } from "@/config/equipmentConfig";
import { itemMaterialConfig } from "@/config/itemMaterialConfig";
import { createConfigMeta } from "@/config/meta";
import {
  validateDropConfigV1A,
  validateEquipmentConfigV1A,
  validateItemMaterialConfigV1A,
} from "@/utils/configValidation";

export const equipmentItemDropExport = {
  ...createConfigMeta({
    configKey: "equipment_item_drop_export",
    notes:
      "Export Equipment / Item / Material / Drop summary. Mock/export-ready foundation only; no reward engine or production config.",
    status: "validated_mock",
  }),
  export_id: "equipment_item_drop_export",
  equipment_config: {
    template_count: equipmentConfig.templateRows.length,
    family_count: equipmentConfig.families.length,
    tier_count: equipmentConfig.tiers.length,
    live_grades: equipmentConfig.liveGrades,
    crafting_enabled: false,
    set_bonus_enabled: false,
    epic_normal_drop_enabled: false,
    validation_passed: validateEquipmentConfigV1A(),
  },
  item_material_config: {
    material_count: itemMaterialConfig.materialRows.length,
    fragment_conversion_count: itemMaterialConfig.fragmentConversionRows.length,
    stack_limits: itemMaterialConfig.stackLimitConfig,
    validation_passed: validateItemMaterialConfigV1A(),
  },
  drop_config: {
    gear_chest_count: dropConfig.gearChestRows.length,
    drop_table_pattern_count: dropConfig.dropTableRows.length,
    boss_weekly_table_total: Object.values(dropConfig.bossWeeklyRepeatReward.rates).reduce(
      (sum, rate) => sum + rate,
      0,
    ),
    validation_passed: validateDropConfigV1A(),
  },
  limitations: [
    "frontend/local validation only",
    "no real drop engine",
    "no simulation run",
    "not production config",
  ],
} as const;
