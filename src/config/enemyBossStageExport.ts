import { bossRows } from "@/config/bossConfig";
import { bossSkillRows } from "@/config/bossSkillConfig";
import { enemyCompositionRows } from "@/config/enemyCompositionConfig";
import { enemyRows } from "@/config/enemyConfig";
import { enemySkillRows } from "@/config/enemySkillConfig";
import { createConfigMeta } from "@/config/meta";
import { stageRows, tutorialOverrideRows } from "@/config/stageConfig";
import {
  validateBossConfigV1A,
  validateBossSkillConfigV1A,
  validateEnemyCompositionConfigV1A,
  validateEnemyConfigV1A,
  validateEnemySkillConfigV1A,
  validateStageConfigV1A,
} from "@/utils/configValidation";

export const enemyBossStageExport = {
  ...createConfigMeta({
    configKey: "enemy_boss_stage_export",
    notes:
      "Export Enemy / Boss / Stage summary เป็น mock/export-ready foundation เท่านั้น ยังไม่ใช่ production config.",
    status: "validated_mock",
  }),
  export_id: "enemy_boss_stage_export",
  enemy_config: {
    enemy_master_count: enemyRows.length,
    validation_passed: validateEnemyConfigV1A(),
  },
  enemy_skill_config: {
    enemy_skill_template_count: enemySkillRows.length,
    validation_passed: validateEnemySkillConfigV1A(),
  },
  boss_config: {
    boss_count: bossRows.length,
    mini_boss_count: bossRows.filter((row) => row.boss_type === "mini-boss").length,
    main_boss_count: bossRows.filter((row) => row.boss_type === "main-boss").length,
    validation_passed: validateBossConfigV1A(),
  },
  boss_skill_config: {
    boss_skill_row_count: bossSkillRows.length,
    validation_passed: validateBossSkillConfigV1A(),
  },
  stage_config: {
    stage_row_count: stageRows.length,
    tutorial_override_count: tutorialOverrideRows.length,
    validation_passed: validateStageConfigV1A(),
  },
  enemy_composition_config: {
    enemy_composition_row_count: enemyCompositionRows.length,
    validation_passed: validateEnemyCompositionConfigV1A(),
  },
  limitations: [
    "frontend/local validation only",
    "no real battle engine",
    "no simulation run",
    "not production config",
  ],
} as const;
