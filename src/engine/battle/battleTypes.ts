import type { Element, StageType, StatBlock, TargetType } from "../../types/game";

export type BattleResultState = "victory" | "defeat";

export type BattleDrop = {
  item_id: string;
  label: string;
  quantity: number;
  icon_asset_id: string;
};

export type BattleSide = "player" | "enemy";

export type BattleStatusName =
  | "Burn"
  | "Freeze"
  | "Bleed"
  | "DEF Down"
  | "SPD Down"
  | "Shield"
  | "Buff CRIT"
  | "Buff EVA"
  | "Stun"
  | "Silence";

export type BattleSkillKind = "physical_damage" | "magic_damage" | "heal" | "shield" | "buff" | "debuff";

export type BattleSkillSnapshot = {
  skill_id: string;
  skill_name: string;
  skill_type: BattleSkillKind;
  element: Element;
  target_type: TargetType | "standard_front" | "back_or_standard" | "ally_lowest_hp";
  base_coef: number;
  mp_cost: number;
  cooldown: number;
  status_effect: string;
  status_chance: number;
  duration: number;
  ai_condition: string;
  priority_weight: number;
  can_crit: boolean;
  can_miss: boolean;
};

export type BattleUnitSnapshot = {
  unit_id: string;
  display_name: string;
  side: BattleSide;
  element: Element;
  level: number;
  max_hp: number;
  stats: StatBlock;
  skills: BattleSkillSnapshot[];
  skill_priority: string[];
  formation_cell?: string;
  required_target?: boolean;
};

export type BattleConfigVersionsSnapshot = {
  skill_config_version: string;
  equipment_config_version: string;
  stage_config_version: string;
  battle_formula_version: string;
};

export type BattleInputSnapshot = {
  battle_id: string;
  stage_id: string;
  stage_type: StageType;
  chapter_name: string;
  battle_mode: "stage_mock";
  deterministic_seed: string;
  team_snapshot: BattleUnitSnapshot[];
  enemy_snapshot: BattleUnitSnapshot[];
  skill_loadout_snapshot: Record<string, string[]>;
  formation_snapshot: {
    snapshot_id: string;
    units: Array<{ unit_id: string; cell_id: string }>;
  };
  config_versions: BattleConfigVersionsSnapshot;
  turn_limit: number;
  reward_preview: {
    xp_gained: number;
    gold_gained: number;
    drops: BattleDrop[];
    star_chest_reward: BattleDrop | null;
  };
};

export type BattleRuntimeStatus = {
  name: BattleStatusName;
  source_id: string;
  duration: number;
  value?: number;
};

export type BattleRuntimeUnit = BattleUnitSnapshot & {
  current_hp: number;
  current_mp: number;
  current_shield: number;
  cooldowns: Record<string, number>;
  statuses: BattleRuntimeStatus[];
};

export type BattleActionIntent = {
  actor: BattleRuntimeUnit;
  skill: BattleSkillSnapshot | null;
  targets: BattleRuntimeUnit[];
  isNormalAttack: boolean;
};

export type BattleValidationResult = {
  status: "pass" | "fail";
  errors: string[];
  warnings: string[];
};

export type BattleTurnLog = {
  turn_number: number;
  acting_unit_ids: string[];
};

export type BattleActionLog = {
  action_number: number;
  turn_number: number;
  unit_id: string;
  action_type: "normal_attack" | "skill" | "skip";
  result_summary: string;
};

export type BattleFinalUnitState = {
  unit_id: string;
  side: BattleSide;
  hp: number;
  mp: number;
  shield: number;
  alive: boolean;
  statuses: string[];
};

export type BattleEngineResult = {
  battle_id: string;
  stage_id: string;
  stage_type: StageType;
  chapter_name: string;
  battle_mode: "stage_mock";
  deterministic_seed: string;
  result: BattleResultState;
  stars: 0 | 1 | 2 | 3;
  turns_used: number;
  battle_grade: string;
  xp_gained: number;
  gold_gained: number;
  drops: BattleDrop[];
  star_chest_reward: BattleDrop | null;
  turn_summary: {
    total_turns_used: number;
    player_actions: number;
    enemy_actions: number;
    skills_cast: number;
    normal_attacks: number;
    statuses_applied: number;
    shields_generated: number;
    healing_done: number;
  };
  snapshot_info: {
    battle_id: string;
    deterministic_seed: string;
    team_snapshot: "present";
    enemy_snapshot: "present";
  };
  config_versions: BattleConfigVersionsSnapshot;
  team_snapshot: BattleUnitSnapshot[];
  enemy_snapshot: BattleUnitSnapshot[];
  skill_loadout_snapshot: Record<string, string[]>;
  formation_snapshot: BattleInputSnapshot["formation_snapshot"];
  turn_logs: BattleTurnLog[];
  action_logs: BattleActionLog[];
  damage_logs: Array<{
    action_no: number;
    attacker: string;
    target: string;
    skill: string;
    final_damage: number;
    shield_damage: number;
    actual_hp_damage: number;
    overkill_damage: number;
    hit: boolean;
    crit: boolean;
    element_modifier: string;
  }>;
  skill_cast_logs: Array<{
    unit: string;
    skill_name: string;
    mp_before: number;
    mp_after: number;
    cooldown_started: number;
    target_type: string;
    result_summary: string;
  }>;
  status_logs: Array<{
    status_name: string;
    source: string;
    target: string;
    duration: number;
    chance: number;
    result: "applied" | "resisted" | "expired" | "generated";
  }>;
  reward_preview: BattleInputSnapshot["reward_preview"];
  final_unit_states: BattleFinalUnitState[];
  error_state: string | null;
  safety_notes: string[];
};
