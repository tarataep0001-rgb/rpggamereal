import { createConfigMeta } from "@/config/meta";
import type { ChapterId, Element } from "@/types/game";

const configMeta = createConfigMeta({
  configKey: "enemies_config",
  notes:
    "Enemy Master config เป็น mock/export-ready foundation เท่านั้น ยังไม่มี battle behavior จริง.",
  status: "validated_mock",
});

export type EnemyRole =
  | "balanced attacker"
  | "backline pressure"
  | "magic damage"
  | "high DEF/HP"
  | "support/heal"
  | "higher ATK lower DEF"
  | "backline/direct target pressure"
  | "debuff/status"
  | "optional minion support";

export type EnemyMasterRow = {
  enemy_id: string;
  display_name_th: string;
  enemy_type: "Soldier" | "Archer" | "Mage" | "Tank" | "Healer" | "Berserker" | "Assassin" | "Controller" | "Summoner";
  element: Element;
  role: EnemyRole;
  chapter_appearance: ChapterId[];
  stat_modifier: {
    hp: number;
    atk: number;
    mag: number;
    def: number;
    res: number;
    spd: number;
  };
  skill_list: string[];
  target_priority: string;
  asset_id: string;
  live_in_v1a: true;
  schema_only: false;
  config_version: string;
};

const typeRole = {
  Soldier: "balanced attacker",
  Archer: "backline pressure",
  Mage: "magic damage",
  Tank: "high DEF/HP",
  Healer: "support/heal",
  Berserker: "higher ATK lower DEF",
  Assassin: "backline/direct target pressure",
  Controller: "debuff/status",
  Summoner: "optional minion support",
} as const;

const typeAsset = {
  Soldier: "icon_enemy_soldier",
  Archer: "icon_enemy_archer",
  Mage: "icon_enemy_mage",
  Tank: "icon_enemy_tank",
  Healer: "icon_enemy_healer",
  Berserker: "icon_enemy_berserker",
  Assassin: "icon_enemy_assassin",
  Controller: "icon_enemy_controller",
  Summoner: "icon_enemy_summoner",
} as const;

const typeSkillList = {
  Soldier: ["enemy_basic_attack"],
  Archer: ["enemy_basic_attack", "enemy_arrow_shot"],
  Mage: ["enemy_basic_attack", "enemy_firebolt"],
  Tank: ["enemy_basic_attack", "enemy_guard"],
  Healer: ["enemy_basic_attack", "enemy_heal_minor"],
  Berserker: ["enemy_basic_attack", "enemy_berserk_hit"],
  Assassin: ["enemy_basic_attack", "enemy_arrow_shot"],
  Controller: ["enemy_basic_attack", "enemy_slow_hex"],
  Summoner: ["enemy_basic_attack", "enemy_summon_pebble"],
} as const;

const typeStatModifier = {
  Soldier: { hp: 1, atk: 1, mag: 0.7, def: 1, res: 0.9, spd: 1 },
  Archer: { hp: 0.9, atk: 1.12, mag: 0.6, def: 0.85, res: 0.9, spd: 1.12 },
  Mage: { hp: 0.82, atk: 0.6, mag: 1.25, def: 0.75, res: 1.05, spd: 0.95 },
  Tank: { hp: 1.35, atk: 0.85, mag: 0.55, def: 1.35, res: 1.15, spd: 0.75 },
  Healer: { hp: 0.95, atk: 0.65, mag: 1.05, def: 0.85, res: 1.25, spd: 0.92 },
  Berserker: { hp: 1.05, atk: 1.3, mag: 0.5, def: 0.75, res: 0.8, spd: 1.05 },
  Assassin: { hp: 0.85, atk: 1.2, mag: 0.55, def: 0.7, res: 0.75, spd: 1.35 },
  Controller: { hp: 0.95, atk: 0.7, mag: 1.1, def: 0.85, res: 1.1, spd: 0.98 },
  Summoner: { hp: 1, atk: 0.7, mag: 1.15, def: 0.9, res: 1.1, spd: 0.88 },
} as const;

function enemy(
  enemy_id: string,
  display_name_th: string,
  enemy_type: EnemyMasterRow["enemy_type"],
  element: Element,
  chapter: ChapterId,
): EnemyMasterRow {
  return {
    enemy_id,
    display_name_th,
    enemy_type,
    element,
    role: typeRole[enemy_type],
    chapter_appearance: [chapter],
    stat_modifier: typeStatModifier[enemy_type],
    skill_list: [...typeSkillList[enemy_type]],
    target_priority:
      enemy_type === "Assassin" || enemy_type === "Archer"
        ? "back_or_standard"
        : "standard_front",
    asset_id: typeAsset[enemy_type],
    live_in_v1a: true,
    schema_only: false,
    config_version: configMeta.config_version,
  };
}

export const enemyRows: EnemyMasterRow[] = [
  enemy("enemy_ch1_soldier_fire", "ทหารเพลิง", "Soldier", "Fire", 1),
  enemy("enemy_ch1_archer_wind", "นักธนูลม", "Archer", "Wind", 1),
  enemy("enemy_ch1_mage_fire", "นักเวทย์เพลิง", "Mage", "Fire", 1),
  enemy("enemy_ch1_tank_earth", "ผู้พิทักษ์ดิน", "Tank", "Earth", 1),
  enemy("enemy_ch2_soldier_water", "ทหารสายน้ำ", "Soldier", "Water", 2),
  enemy("enemy_ch2_archer_fire", "นักธนูเถ้าถ่าน", "Archer", "Fire", 2),
  enemy("enemy_ch2_healer_water", "ผู้เยียวยาน้ำ", "Healer", "Water", 2),
  enemy("enemy_ch2_berserker_fire", "นักรบคลั่งเพลิง", "Berserker", "Fire", 2),
  enemy("enemy_ch3_tank_earth", "เกราะศิลา", "Tank", "Earth", 3),
  enemy("enemy_ch3_assassin_wind", "เงาลม", "Assassin", "Wind", 3),
  enemy("enemy_ch3_controller_earth", "ผู้ผนึกศิลา", "Controller", "Earth", 3),
  enemy("enemy_ch3_archer_wind", "นักธนูหุบเขา", "Archer", "Wind", 3),
  enemy("enemy_ch4_mage_water", "นักเวทย์บึงน้ำ", "Mage", "Water", 4),
  enemy("enemy_ch4_soldier_earth", "ทหารธาราหิน", "Soldier", "Earth", 4),
  enemy("enemy_ch4_healer_water", "ผู้รักษาบึง", "Healer", "Water", 4),
  enemy("enemy_ch4_summoner_earth", "ผู้อัญเชิญหิน", "Summoner", "Earth", 4),
  enemy("enemy_ch5_light_soldier", "ทหารแสง", "Soldier", "Light", 5),
  enemy("enemy_ch5_dark_assassin", "นักฆ่าเงา", "Assassin", "Dark", 5),
  enemy("enemy_ch5_light_healer", "ผู้เยียวยาแสง", "Healer", "Light", 5),
  enemy("enemy_ch5_dark_controller", "ผู้ควบคุมเงา", "Controller", "Dark", 5),
];

export const enemyConfig = {
  ...configMeta,
  export_id: "enemies_config",
  rows: enemyRows,
  requiredEnemyIds: enemyRows.map((row) => row.enemy_id),
} as const;
