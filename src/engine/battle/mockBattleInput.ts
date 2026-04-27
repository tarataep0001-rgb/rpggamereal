import type { BattleInputSnapshot, BattleSkillKind, BattleSkillSnapshot, BattleUnitSnapshot } from "./battleTypes";
import { BATTLE_FORMULA_VERSION } from "./battleConstants";
import type { Element, StatBlock } from "../../types/game";

function stats(stats: StatBlock): StatBlock {
  return { ...stats };
}

function skill(seed: {
  skill_id: string;
  skill_name: string;
  skill_type: BattleSkillKind;
  element?: Element;
  target_type?: BattleSkillSnapshot["target_type"];
  base_coef: number;
  mp_cost: number;
  cooldown: number;
  status_effect?: string;
  status_chance?: number;
  duration?: number;
  ai_condition?: string;
  priority_weight?: number;
  can_crit?: boolean;
  can_miss?: boolean;
}): BattleSkillSnapshot {
  return {
    skill_id: seed.skill_id,
    skill_name: seed.skill_name,
    skill_type: seed.skill_type,
    element: seed.element ?? "Neutral",
    target_type: seed.target_type ?? "single_enemy",
    base_coef: seed.base_coef,
    mp_cost: seed.mp_cost,
    cooldown: seed.cooldown,
    status_effect: seed.status_effect ?? "none",
    status_chance: seed.status_chance ?? 0,
    duration: seed.duration ?? 0,
    ai_condition: seed.ai_condition ?? "mock_condition_true",
    priority_weight: seed.priority_weight ?? 50,
    can_crit: seed.can_crit ?? (seed.skill_type === "physical_damage" || seed.skill_type === "magic_damage"),
    can_miss: seed.can_miss ?? (seed.skill_type === "physical_damage" || seed.skill_type === "magic_damage" || seed.skill_type === "debuff"),
  };
}

function unit(seed: Omit<BattleUnitSnapshot, "skills" | "skill_priority"> & {
  skills: BattleSkillSnapshot[];
  skill_priority?: string[];
}): BattleUnitSnapshot {
  return {
    ...seed,
    stats: stats(seed.stats),
    skills: seed.skills.map((entry) => ({ ...entry })),
    skill_priority: seed.skill_priority ?? seed.skills.map((entry) => entry.skill_id),
  };
}

const normalAttackOnly = skill({
  skill_id: "enemy_basic_attack",
  skill_name: "โจมตีพื้นฐาน",
  skill_type: "physical_damage",
  base_coef: 1,
  mp_cost: 0,
  cooldown: 0,
  priority_weight: 10,
});

const enemyArrowShot = skill({
  skill_id: "enemy_arrow_shot",
  skill_name: "ยิงธนู",
  skill_type: "physical_damage",
  target_type: "back_or_standard",
  base_coef: 1.1,
  mp_cost: 20,
  cooldown: 1,
  priority_weight: 60,
});

const enemyFirebolt = skill({
  skill_id: "enemy_firebolt",
  skill_name: "ไฟบอลศัตรู",
  skill_type: "magic_damage",
  element: "Fire",
  base_coef: 1.2,
  mp_cost: 20,
  cooldown: 2,
  status_effect: "Burn",
  status_chance: 20,
  duration: 2,
  priority_weight: 65,
});

export function createMockBattleInput(): BattleInputSnapshot {
  const team = [
    unit({
      unit_id: "main_hero",
      display_name: "นักดาบหลัก",
      side: "player",
      element: "Fire",
      level: 12,
      max_hp: 318,
      stats: stats({ HP: 318, ATK: 62, MAG: 18, DEF: 44, RES: 30, SPD: 28, ACC: 84, EVA: 7, CRIT: 9, CRIT_DMG: 150 }),
      formation_cell: "front_center",
      skills: [
        skill({
          skill_id: "swordsman_slash_01",
          skill_name: "ฟันผ่า",
          skill_type: "physical_damage",
          base_coef: 1.15,
          mp_cost: 20,
          cooldown: 1,
          priority_weight: 80,
        }),
        skill({
          skill_id: "swordsman_guard_break_02",
          skill_name: "ฟันทำลายเกราะ",
          skill_type: "physical_damage",
          base_coef: 0.95,
          mp_cost: 40,
          cooldown: 3,
          status_effect: "DEF Down",
          status_chance: 45,
          duration: 2,
          priority_weight: 65,
        }),
        skill({
          skill_id: "swordsman_brave_guard_03",
          skill_name: "ตั้งโล่กล้าหาญ",
          skill_type: "shield",
          target_type: "self",
          base_coef: 1.2,
          mp_cost: 40,
          cooldown: 4,
          status_effect: "shield",
          status_chance: 100,
          duration: 2,
          priority_weight: 70,
          can_crit: false,
          can_miss: false,
        }),
      ],
      skill_priority: ["swordsman_guard_break_02", "swordsman_slash_01", "swordsman_brave_guard_03"],
    }),
    unit({
      unit_id: "ch_common_priest_light_aid",
      display_name: "นักบวชฝึกหัด",
      side: "player",
      element: "Light",
      level: 10,
      max_hp: 218,
      stats: stats({ HP: 218, ATK: 16, MAG: 58, DEF: 25, RES: 42, SPD: 24, ACC: 80, EVA: 6, CRIT: 5, CRIT_DMG: 150 }),
      formation_cell: "middle_center",
      skills: [
        skill({
          skill_id: "priest_minor_heal_02",
          skill_name: "ฟื้นฟูเบื้องต้น",
          skill_type: "heal",
          element: "Light",
          target_type: "single_ally",
          base_coef: 1.35,
          mp_cost: 20,
          cooldown: 2,
          status_effect: "heal",
          status_chance: 100,
          priority_weight: 90,
          can_crit: false,
          can_miss: false,
        }),
        skill({
          skill_id: "priest_holy_shield_03",
          skill_name: "โล่ศักดิ์สิทธิ์",
          skill_type: "shield",
          element: "Light",
          target_type: "single_ally",
          base_coef: 1.2,
          mp_cost: 40,
          cooldown: 4,
          status_effect: "shield",
          status_chance: 100,
          duration: 2,
          priority_weight: 72,
          can_crit: false,
          can_miss: false,
        }),
      ],
      skill_priority: ["priest_minor_heal_02", "priest_holy_shield_03"],
    }),
    unit({
      unit_id: "ch_common_archer_wind_shot",
      display_name: "นักธนูลม",
      side: "player",
      element: "Wind",
      level: 10,
      max_hp: 205,
      stats: stats({ HP: 205, ATK: 55, MAG: 14, DEF: 22, RES: 23, SPD: 35, ACC: 92, EVA: 10, CRIT: 12, CRIT_DMG: 150 }),
      formation_cell: "back_center",
      skills: [
        skill({
          skill_id: "archer_precise_shot_01",
          skill_name: "ยิงเจาะจุด",
          skill_type: "physical_damage",
          base_coef: 1.25,
          mp_cost: 20,
          cooldown: 1,
          priority_weight: 82,
        }),
        skill({
          skill_id: "archer_arrow_rain_02",
          skill_name: "ฝนธนู",
          skill_type: "physical_damage",
          target_type: "all_enemies",
          base_coef: 0.72,
          mp_cost: 40,
          cooldown: 4,
          priority_weight: 60,
        }),
      ],
      skill_priority: ["archer_arrow_rain_02", "archer_precise_shot_01"],
    }),
  ];

  const enemies = [
    unit({
      unit_id: "enemy_ch1_soldier_fire_a",
      display_name: "ทหารไฟ",
      side: "enemy",
      element: "Fire",
      level: 9,
      max_hp: 190,
      stats: stats({ HP: 190, ATK: 34, MAG: 8, DEF: 24, RES: 18, SPD: 22, ACC: 78, EVA: 5, CRIT: 5, CRIT_DMG: 150 }),
      skills: [normalAttackOnly],
      skill_priority: ["enemy_basic_attack"],
    }),
    unit({
      unit_id: "enemy_ch1_archer_wind_a",
      display_name: "พลธนูลม",
      side: "enemy",
      element: "Wind",
      level: 9,
      max_hp: 165,
      stats: stats({ HP: 165, ATK: 38, MAG: 6, DEF: 18, RES: 16, SPD: 30, ACC: 86, EVA: 8, CRIT: 7, CRIT_DMG: 150 }),
      skills: [normalAttackOnly, enemyArrowShot],
      skill_priority: ["enemy_arrow_shot", "enemy_basic_attack"],
    }),
    unit({
      unit_id: "enemy_ch1_mage_fire_a",
      display_name: "นักเวทไฟศัตรู",
      side: "enemy",
      element: "Fire",
      level: 9,
      max_hp: 150,
      stats: stats({ HP: 150, ATK: 14, MAG: 42, DEF: 14, RES: 22, SPD: 20, ACC: 82, EVA: 5, CRIT: 5, CRIT_DMG: 150 }),
      skills: [normalAttackOnly, enemyFirebolt],
      skill_priority: ["enemy_firebolt", "enemy_basic_attack"],
    }),
  ];

  return {
    battle_id: "battle_engine_mock_1_5_001",
    stage_id: "1-5",
    stage_type: "elite",
    chapter_name: "ป่าประกายเพลิง",
    battle_mode: "stage_mock",
    deterministic_seed: "v1a-phase17-seed-001",
    team_snapshot: team,
    enemy_snapshot: enemies,
    skill_loadout_snapshot: Object.fromEntries(team.map((entry) => [entry.unit_id, entry.skill_priority])),
    formation_snapshot: {
      snapshot_id: "formation_snapshot_phase17_front_middle_back",
      units: team.map((entry) => ({ unit_id: entry.unit_id, cell_id: entry.formation_cell ?? "middle_center" })),
    },
    config_versions: {
      skill_config_version: "skill_config_v1a_phase13_mock",
      equipment_config_version: "equipment_config_v1a_phase14_mock",
      stage_config_version: "stage_config_v1a_phase15_mock",
      battle_formula_version: BATTLE_FORMULA_VERSION,
    },
    turn_limit: 30,
    reward_preview: {
      xp_gained: 320,
      gold_gained: 180,
      drops: [
        {
          item_id: "mat_stone_lv1",
          label: "Stone Lv1",
          quantity: 1,
          icon_asset_id: "icon_reward_stone",
        },
        {
          item_id: "mat_enhancement_powder",
          label: "Enhancement Powder",
          quantity: 20,
          icon_asset_id: "icon_reward_powder",
        },
      ],
      star_chest_reward: {
        item_id: "free_gem",
        label: "Free Gem",
        quantity: 1,
        icon_asset_id: "icon_reward_free_gem",
      },
    },
  };
}
