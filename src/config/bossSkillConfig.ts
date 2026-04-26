import { bossRows } from "@/config/bossConfig";
import { createConfigMeta } from "@/config/meta";

const configMeta = createConfigMeta({
  configKey: "boss_skills_config",
  notes:
    "Boss Skill Rows are export-ready mock data. Each boss has concrete skill rows; no trait-only implementation.",
  status: "validated_mock",
});

export type BossSkillExportRow = {
  boss_skill_id: string;
  boss_id: string;
  trigger_condition: string;
  cooldown: number;
  target_type: string;
  damage_coef: number;
  status_effect: string;
  status_chance: number;
  duration: number;
  phase_required: "none" | 40 | 20;
  description_th: string;
  asset_id: string;
  config_version: string;
};

function statusForBoss(bossId: string) {
  if (bossId.includes("ch1")) return { effect: "none", chance: 0, duration: 0 };
  if (bossId.includes("fire") || bossId.includes("ch2_20")) return { effect: "Burn", chance: 25, duration: 2 };
  if (bossId.includes("dark") || bossId.includes("ch5")) return { effect: "DEF Down", chance: 25, duration: 2 };
  if (bossId.includes("ch3") || bossId.includes("ch4")) return { effect: "SPD Down", chance: 20, duration: 2 };
  return { effect: "none", chance: 0, duration: 0 };
}

function bossSkillRowsForBoss(boss: (typeof bossRows)[number]): BossSkillExportRow[] {
  const isMain = boss.boss_type === "main-boss";
  const status = statusForBoss(boss.boss_id);
  const signatureDamage = isMain ? 1.45 : 1.25;
  const signatureTarget = isMain ? "row" : "standard_front";

  const rows: BossSkillExportRow[] = [
    {
      boss_skill_id: `${boss.boss_id}_basic_attack`,
      boss_id: boss.boss_id,
      trigger_condition: "always",
      cooldown: 0,
      target_type: "standard_front",
      damage_coef: 1,
      status_effect: "none",
      status_chance: 0,
      duration: 0,
      phase_required: "none",
      description_th: "โจมตีพื้นฐานของบอส",
      asset_id: "vfx_boss_basic_attack",
      config_version: configMeta.config_version,
    },
    {
      boss_skill_id: `${boss.boss_id}_signature_skill`,
      boss_id: boss.boss_id,
      trigger_condition: "cooldown_ready",
      cooldown: 2,
      target_type: signatureTarget,
      damage_coef: signatureDamage,
      status_effect: status.effect,
      status_chance: boss.boss_id === "boss_ch1_10_main" ? 0 : status.chance,
      duration: boss.boss_id === "boss_ch1_10_main" ? 0 : status.duration,
      phase_required: "none",
      description_th:
        boss.boss_id === "boss_ch1_10_main"
          ? "ท่าหลักแบบ tutorial ไม่มี hard control"
          : "ท่าประจำตัวบอสแบบ mock export",
      asset_id: "vfx_boss_signature",
      config_version: configMeta.config_version,
    },
    {
      boss_skill_id: `${boss.boss_id}_phase_skill`,
      boss_id: boss.boss_id,
      trigger_condition: "phase_reached",
      cooldown: 3,
      target_type: isMain ? "all_enemies" : "row",
      damage_coef: isMain ? 1.35 : 1.15,
      status_effect: boss.boss_id === "boss_ch1_10_main" ? "none" : status.effect,
      status_chance: boss.boss_id === "boss_ch1_10_main" ? 0 : Math.min(status.chance + 5, 35),
      duration: boss.boss_id === "boss_ch1_10_main" ? 0 : status.duration,
      phase_required: 40,
      description_th: "สกิลเฟสบอสเมื่อ HP เหลือตามเงื่อนไข",
      asset_id: "vfx_boss_phase",
      config_version: configMeta.config_version,
    },
  ];

  if (isMain) {
    rows.push({
      boss_skill_id: `${boss.boss_id}_rage_skill`,
      boss_id: boss.boss_id,
      trigger_condition: "phase_20_and_cooldown_ready",
      cooldown: 3,
      target_type: boss.boss_id === "boss_ch1_10_main" ? "standard_front" : "all_enemies",
      damage_coef: boss.boss_id === "boss_ch1_10_main" ? 1.1 : 1.3,
      status_effect: boss.boss_id === "boss_ch1_10_main" ? "none" : status.effect,
      status_chance: boss.boss_id === "boss_ch1_10_main" ? 0 : Math.min(status.chance + 10, 35),
      duration: boss.boss_id === "boss_ch1_10_main" ? 0 : status.duration,
      phase_required: 20,
      description_th: "สกิล rage ช่วงท้ายของบอสหลัก",
      asset_id: "vfx_boss_rage",
      config_version: configMeta.config_version,
    });
  }

  return rows;
}

export const bossSkillRows: BossSkillExportRow[] = bossRows.flatMap(bossSkillRowsForBoss);

export const bossSkillConfig = {
  ...configMeta,
  export_id: "boss_skills_config",
  rows: bossSkillRows,
} as const;
