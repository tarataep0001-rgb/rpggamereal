import type { StageType } from "@/types/game";

export type BattleResultState = "victory" | "defeat";

export type BattleDrop = {
  item_id: string;
  label: string;
  quantity: number;
  icon_asset_id: string;
};

export type BattleTurnSummary = {
  total_turns_used: number;
  player_actions: number;
  enemy_actions: number;
  skills_cast: number;
  normal_attacks: number;
  statuses_applied: number;
  shields_generated: number;
  healing_done: number;
};

export type BattleDamageLog = {
  action_no: number;
  attacker: string;
  target: string;
  skill: string;
  final_damage: number;
  shield_damage: number;
  actual_hp_damage: number;
  overkill_damage: number;
  crit: boolean;
  element_modifier: string;
};

export type BattleSkillCastLog = {
  unit: string;
  skill_name: string;
  mp_before: number;
  mp_after: number;
  cooldown_started: number;
  target_type: string;
  result_summary: string;
};

export type BattleStatusLog = {
  status_name: string;
  source: string;
  target: string;
  duration: number;
  chance: number;
  result: "applied" | "resisted" | "expired" | "generated";
};

export type BattleSnapshotInfo = {
  battle_id: string;
  deterministic_seed: string;
  team_snapshot: "present";
  enemy_snapshot: "present";
};

export type BattleConfigVersions = {
  skill_config_version: string;
  equipment_config_version: string;
  stage_config_version: string;
  battle_formula_version: string;
};

export type MockBattleResult = {
  battle_id: string;
  stage_id: string;
  stage_type: StageType;
  chapter_name: string;
  result: BattleResultState;
  stars: 0 | 1 | 2 | 3;
  turns_used: number;
  battle_grade: string;
  xp_gained: number;
  gold_gained: number;
  drops: BattleDrop[];
  star_chest_reward: BattleDrop | null;
  turn_summary: BattleTurnSummary;
  damage_logs: BattleDamageLog[];
  skill_cast_logs: BattleSkillCastLog[];
  status_logs: BattleStatusLog[];
  snapshot_info: BattleSnapshotInfo;
  config_versions: BattleConfigVersions;
  safety_notes: string[];
};

export const mockBattleResult: MockBattleResult = {
  battle_id: "battle_mock_1_5_0001",
  stage_id: "1-5",
  stage_type: "elite",
  chapter_name: "ป่าประกายเพลิง",
  result: "victory",
  stars: 3,
  turns_used: 16,
  battle_grade: "S",
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
  turn_summary: {
    total_turns_used: 16,
    player_actions: 31,
    enemy_actions: 28,
    skills_cast: 12,
    normal_attacks: 47,
    statuses_applied: 6,
    shields_generated: 3,
    healing_done: 420,
  },
  damage_logs: [
    {
      action_no: 3,
      attacker: "Hero",
      target: "Ash Wolf Elite",
      skill: "ฟันผ่า",
      final_damage: 460,
      shield_damage: 0,
      actual_hp_damage: 460,
      overkill_damage: 0,
      crit: true,
      element_modifier: "1.00x",
    },
    {
      action_no: 7,
      attacker: "Ash Wolf Elite",
      target: "Hero",
      skill: "Claw Break",
      final_damage: 310,
      shield_damage: 140,
      actual_hp_damage: 170,
      overkill_damage: 0,
      crit: false,
      element_modifier: "1.00x",
    },
    {
      action_no: 14,
      attacker: "Fire Spark",
      target: "Ash Wolf Elite",
      skill: "ลูกไฟ",
      final_damage: 690,
      shield_damage: 0,
      actual_hp_damage: 540,
      overkill_damage: 150,
      crit: false,
      element_modifier: "1.15x",
    },
  ],
  skill_cast_logs: [
    {
      unit: "Hero",
      skill_name: "ตั้งโล่กล้าหาญ",
      mp_before: 84,
      mp_after: 62,
      cooldown_started: 4,
      target_type: "self",
      result_summary: "Generated shield using DEF display formula.",
    },
    {
      unit: "Light Aid",
      skill_name: "ฟื้นฟูเบื้องต้น",
      mp_before: 72,
      mp_after: 52,
      cooldown_started: 2,
      target_type: "single_ally",
      result_summary: "Healed Hero for 260 mock HP.",
    },
    {
      unit: "Fire Spark",
      skill_name: "ลูกไฟ",
      mp_before: 55,
      mp_after: 41,
      cooldown_started: 1,
      target_type: "single_enemy",
      result_summary: "Applied Burn roll success.",
    },
  ],
  status_logs: [
    {
      status_name: "Burn",
      source: "Fire Spark",
      target: "Ash Wolf Elite",
      duration: 2,
      chance: 20,
      result: "applied",
    },
    {
      status_name: "DEF Down",
      source: "Hero",
      target: "Ash Wolf Elite",
      duration: 2,
      chance: 45,
      result: "applied",
    },
    {
      status_name: "Shield",
      source: "Hero",
      target: "Hero",
      duration: 2,
      chance: 100,
      result: "generated",
    },
    {
      status_name: "Buff EVA",
      source: "Dark Cut",
      target: "Dark Cut",
      duration: 2,
      chance: 100,
      result: "expired",
    },
  ],
  snapshot_info: {
    battle_id: "battle_mock_1_5_0001",
    deterministic_seed: "seed_mock_1_5_elite_20260425",
    team_snapshot: "present",
    enemy_snapshot: "present",
  },
  config_versions: {
    skill_config_version: "v1a-skill-config-001",
    equipment_config_version: "v1a-equipment-config-001",
    stage_config_version: "v1a-stage-config-001",
    battle_formula_version: "v1a-battle-formula-display-001",
  },
  safety_notes: [
    "frontend mock only",
    "no real battle engine in this phase",
    "no server-authoritative combat calculation",
    "no WLD rewards",
    "no paid feature",
    "no simulation pass claimed",
    "Production status: NO-GO",
  ],
};
