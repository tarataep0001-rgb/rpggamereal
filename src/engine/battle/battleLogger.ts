import type {
  BattleActionLog,
  BattleEngineResult,
  BattleInputSnapshot,
  BattleRuntimeUnit,
  BattleSkillSnapshot,
  BattleTurnLog,
} from "./battleTypes";
import { formatElementModifier } from "./elementResolver";
import type { DamageResult } from "./damageCalculator";

export type BattleLogState = {
  turnLogs: BattleTurnLog[];
  actionLogs: BattleActionLog[];
  damageLogs: BattleEngineResult["damage_logs"];
  skillCastLogs: BattleEngineResult["skill_cast_logs"];
  statusLogs: BattleEngineResult["status_logs"];
  actionNumber: number;
  healingDone: number;
  shieldsGenerated: number;
};

export function createBattleLogState(): BattleLogState {
  return {
    turnLogs: [],
    actionLogs: [],
    damageLogs: [],
    skillCastLogs: [],
    statusLogs: [],
    actionNumber: 0,
    healingDone: 0,
    shieldsGenerated: 0,
  };
}

export function nextActionNumber(logs: BattleLogState) {
  logs.actionNumber += 1;
  return logs.actionNumber;
}

export function logTurn(logs: BattleLogState, turnNumber: number, actingUnits: BattleRuntimeUnit[]) {
  logs.turnLogs.push({
    turn_number: turnNumber,
    acting_unit_ids: actingUnits.map((unit) => unit.unit_id),
  });
}

export function logAction(
  logs: BattleLogState,
  actionNumber: number,
  turnNumber: number,
  unit: BattleRuntimeUnit,
  actionType: BattleActionLog["action_type"],
  resultSummary: string,
) {
  logs.actionLogs.push({
    action_number: actionNumber,
    turn_number: turnNumber,
    unit_id: unit.unit_id,
    action_type: actionType,
    result_summary: resultSummary,
  });
}

export function logDamage(
  logs: BattleLogState,
  actionNumber: number,
  turnNumber: number,
  attacker: BattleRuntimeUnit,
  target: BattleRuntimeUnit,
  skillLabel: string,
  damage: DamageResult,
) {
  logs.damageLogs.push({
    action_no: actionNumber,
    attacker: attacker.display_name,
    target: target.display_name,
    skill: skillLabel,
    final_damage: damage.final_damage,
    shield_damage: damage.shield_damage,
    actual_hp_damage: damage.actual_hp_damage,
    overkill_damage: damage.overkill_damage,
    hit: damage.hit,
    crit: damage.crit,
    element_modifier: formatElementModifier(damage.element_modifier),
  });
}

export function logSkillCast(
  logs: BattleLogState,
  unit: BattleRuntimeUnit,
  skill: BattleSkillSnapshot,
  mpBefore: number,
  mpAfter: number,
  resultSummary: string,
) {
  logs.skillCastLogs.push({
    unit: unit.display_name,
    skill_name: skill.skill_name,
    mp_before: mpBefore,
    mp_after: mpAfter,
    cooldown_started: skill.cooldown,
    target_type: String(skill.target_type),
    result_summary: resultSummary,
  });
}

export function createResultBase(input: BattleInputSnapshot) {
  return {
    battle_id: input.battle_id,
    stage_id: input.stage_id,
    stage_type: input.stage_type,
    chapter_name: input.chapter_name,
    battle_mode: input.battle_mode,
    deterministic_seed: input.deterministic_seed,
    xp_gained: input.reward_preview.xp_gained,
    gold_gained: input.reward_preview.gold_gained,
    drops: input.reward_preview.drops,
    star_chest_reward: input.reward_preview.star_chest_reward,
    snapshot_info: {
      battle_id: input.battle_id,
      deterministic_seed: input.deterministic_seed,
      team_snapshot: "present" as const,
      enemy_snapshot: "present" as const,
    },
    config_versions: input.config_versions,
    team_snapshot: input.team_snapshot,
    enemy_snapshot: input.enemy_snapshot,
    skill_loadout_snapshot: input.skill_loadout_snapshot,
    formation_snapshot: input.formation_snapshot,
    reward_preview: input.reward_preview,
  };
}
