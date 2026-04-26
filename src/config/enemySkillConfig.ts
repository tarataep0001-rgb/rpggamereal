import { createConfigMeta } from "@/config/meta";

const configMeta = createConfigMeta({
  configKey: "enemy_skills_config",
  notes:
    "Enemy Skill Template config เป็น mock/export-ready foundation เท่านั้น ยังไม่มี battle engine จริง.",
  status: "validated_mock",
});

export type EnemySkillExportRow = {
  enemy_skill_id: string;
  display_name_th: string;
  skill_type: "physical_damage" | "magic_damage" | "buff" | "heal" | "debuff" | "summon_schema";
  damage_coef?: number;
  effect_coef?: number;
  cooldown: number;
  target_type: string;
  status_effect: string;
  status_chance: number;
  duration: number;
  trigger_condition: string;
  asset_id: string;
  config_version: string;
};

export const enemySkillRows: EnemySkillExportRow[] = [
  {
    enemy_skill_id: "enemy_basic_attack",
    display_name_th: "โจมตีพื้นฐาน",
    skill_type: "physical_damage",
    damage_coef: 1,
    cooldown: 0,
    target_type: "standard_front",
    status_effect: "none",
    status_chance: 0,
    duration: 0,
    trigger_condition: "always",
    asset_id: "vfx_boss_basic_attack",
    config_version: configMeta.config_version,
  },
  {
    enemy_skill_id: "enemy_guard",
    display_name_th: "ตั้งการ์ด",
    skill_type: "buff",
    effect_coef: 20,
    cooldown: 3,
    target_type: "self",
    status_effect: "DEF Up",
    status_chance: 100,
    duration: 2,
    trigger_condition: "hp_below_70",
    asset_id: "icon_enemy_tank",
    config_version: configMeta.config_version,
  },
  {
    enemy_skill_id: "enemy_arrow_shot",
    display_name_th: "ยิงธนู",
    skill_type: "physical_damage",
    damage_coef: 1.1,
    cooldown: 1,
    target_type: "back_or_standard",
    status_effect: "none",
    status_chance: 0,
    duration: 0,
    trigger_condition: "target_valid",
    asset_id: "icon_enemy_archer",
    config_version: configMeta.config_version,
  },
  {
    enemy_skill_id: "enemy_firebolt",
    display_name_th: "ลูกไฟศัตรู",
    skill_type: "magic_damage",
    damage_coef: 1.2,
    cooldown: 2,
    target_type: "standard_front",
    status_effect: "Burn",
    status_chance: 20,
    duration: 2,
    trigger_condition: "target_valid",
    asset_id: "vfx_fire_bolt",
    config_version: configMeta.config_version,
  },
  {
    enemy_skill_id: "enemy_heal_minor",
    display_name_th: "ฟื้นฟูเล็กน้อย",
    skill_type: "heal",
    effect_coef: 1,
    cooldown: 3,
    target_type: "ally_lowest_hp",
    status_effect: "none",
    status_chance: 0,
    duration: 0,
    trigger_condition: "ally_hp_below_50",
    asset_id: "icon_enemy_healer",
    config_version: configMeta.config_version,
  },
  {
    enemy_skill_id: "enemy_slow_hex",
    display_name_th: "คำสาปชะลอ",
    skill_type: "debuff",
    effect_coef: 25,
    cooldown: 3,
    target_type: "standard_front",
    status_effect: "SPD Down",
    status_chance: 25,
    duration: 2,
    trigger_condition: "target_valid",
    asset_id: "icon_enemy_controller",
    config_version: configMeta.config_version,
  },
  {
    enemy_skill_id: "enemy_summon_pebble",
    display_name_th: "อัญเชิญหินเล็ก",
    skill_type: "summon_schema",
    effect_coef: 1,
    cooldown: 4,
    target_type: "self_side",
    status_effect: "none",
    status_chance: 0,
    duration: 0,
    trigger_condition: "schema_placeholder",
    asset_id: "icon_enemy_summoner",
    config_version: configMeta.config_version,
  },
  {
    enemy_skill_id: "enemy_berserk_hit",
    display_name_th: "โจมตีคลั่ง",
    skill_type: "physical_damage",
    damage_coef: 1.35,
    cooldown: 2,
    target_type: "standard_front",
    status_effect: "none",
    status_chance: 0,
    duration: 0,
    trigger_condition: "hp_below_40",
    asset_id: "icon_enemy_berserker",
    config_version: configMeta.config_version,
  },
];

export const enemySkillConfig = {
  ...configMeta,
  export_id: "enemy_skills_config",
  rows: enemySkillRows,
} as const;
