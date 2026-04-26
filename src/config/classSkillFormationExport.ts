import { classConfig } from "@/config/classConfig";
import { formationConfig } from "@/config/formationConfig";
import { createConfigMeta } from "@/config/meta";
import { skillConfig } from "@/config/skillConfig";
import {
  validateClassConfigV1A,
  validateFormationConfigV1A,
  validateSkillConfigV1A,
} from "@/utils/configValidation";

export const classSkillFormationExport = {
  ...createConfigMeta({
    configKey: "class_skill_formation_export",
    status:
      validateClassConfigV1A() && validateSkillConfigV1A() && validateFormationConfigV1A()
        ? "validated_mock"
        : "invalid",
    notes:
      "Phase 13 aggregate view for Class / Skill / Formation config export readiness. Mock/local validation only.",
  }),
  export_id: "class_skill_formation_export",
  class_config: {
    export_id: classConfig.export_id,
    live_class_1_count: classConfig.rows.filter((row) => row.live_in_v1a).length,
    class_2_status: "locked in V1A",
    class_3_status: "schema only",
    validation_pass: validateClassConfigV1A(),
  },
  skill_config: {
    export_id: skillConfig.export_id,
    live_class_1_skill_count: skillConfig.rows.filter((row) => row.live_in_v1a).length,
    normal_attack_coef: skillConfig.skillSystemConstants.normalAttack.NormalAttackCoef,
    validation_pass: validateSkillConfigV1A(),
  },
  formation_config: {
    export_id: formationConfig.export_id,
    canonical_cell_count: formationConfig.canonicalCells.length,
    formation_pattern_count: formationConfig.rows.length,
    validation_pass: validateFormationConfigV1A(),
  },
  limitations: [
    "frontend/local validation only",
    "no battle engine",
    "no simulation run",
    "no production config",
  ],
} as const;
