import { createBattleSeed } from "./battleSeed";
import {
  createBattleLogState,
  createResultBase,
  logAction,
  logDamage,
  logSkillCast,
  logTurn,
  nextActionNumber,
} from "./battleLogger";
import type { BattleEngineResult, BattleInputSnapshot, BattleRuntimeUnit } from "./battleTypes";
import { validateBattleInput } from "./battleValidation";
import { calculateDamage } from "./damageCalculator";
import { createDeterministicRng } from "./deterministicRng";
import { chooseSkill, grantMp, isStunned, tickCooldowns } from "./skillResolver";
import { createRuntimeUnit } from "./statCalculator";
import { applyHeal, applyShield, applyStatus, tickStatuses } from "./statusResolver";
import { resolveTargets } from "./targetResolver";
import { getTurnOrder } from "./turnOrder";

function living(units: BattleRuntimeUnit[]) {
  return units.filter((unit) => unit.current_hp > 0);
}

function isBattleOver(players: BattleRuntimeUnit[], enemies: BattleRuntimeUnit[]) {
  return living(players).length === 0 || living(enemies).length === 0;
}

function applyDamage(target: BattleRuntimeUnit, damage: ReturnType<typeof calculateDamage>) {
  target.current_shield = Math.max(0, target.current_shield - damage.shield_damage);
  target.current_hp = Math.max(0, target.current_hp - damage.actual_hp_damage);
}

function finalStates(units: BattleRuntimeUnit[]): BattleEngineResult["final_unit_states"] {
  return units.map((unit) => ({
    unit_id: unit.unit_id,
    side: unit.side,
    hp: unit.current_hp,
    mp: unit.current_mp,
    shield: unit.current_shield,
    alive: unit.current_hp > 0,
    statuses: unit.statuses.map((status) => status.name),
  }));
}

function computeStars(result: "victory" | "defeat", turnsUsed: number, playerDeaths: number): 0 | 1 | 2 | 3 {
  if (result === "defeat") return 0;
  if (turnsUsed <= 18 && playerDeaths <= 1) return 3;
  if (turnsUsed <= 30) return 2;
  return 1;
}

function gradeFromStars(stars: 0 | 1 | 2 | 3) {
  if (stars === 3) return "S";
  if (stars === 2) return "A";
  if (stars === 1) return "B";
  return "D";
}

function logExpiredStatuses(
  logs: ReturnType<typeof createBattleLogState>,
  unit: BattleRuntimeUnit,
  expired: ReturnType<typeof tickStatuses>,
) {
  expired.forEach((status) => {
    logs.statusLogs.push({
      status_name: status.name,
      source: status.source_id,
      target: unit.display_name,
      duration: 0,
      chance: 100,
      result: "expired",
    });
  });
}

function logStatusAttempt(
  logs: ReturnType<typeof createBattleLogState>,
  source: BattleRuntimeUnit,
  target: BattleRuntimeUnit,
  skill: NonNullable<ReturnType<typeof chooseSkill>>,
  result: NonNullable<ReturnType<typeof applyStatus>>,
) {
  logs.statusLogs.push({
    status_name: result.statusName,
    source: source.display_name,
    target: target.display_name,
    duration: skill.duration,
    chance: skill.status_chance,
    result: result.result,
  });
}

function resolveAction(
  input: BattleInputSnapshot,
  logs: ReturnType<typeof createBattleLogState>,
  actor: BattleRuntimeUnit,
  players: BattleRuntimeUnit[],
  enemies: BattleRuntimeUnit[],
  turnNumber: number,
) {
  const allies = actor.side === "player" ? players : enemies;
  const opponents = actor.side === "player" ? enemies : players;
  const actionNumber = nextActionNumber(logs);

  if (isStunned(actor)) {
    actor.statuses = actor.statuses.filter((status) => status.name !== "Stun" && status.name !== "Freeze");
    logAction(logs, actionNumber, turnNumber, actor, "skip", `${actor.display_name} skipped by control status`);
    tickCooldowns(actor);
    logExpiredStatuses(logs, actor, tickStatuses(actor));
    return;
  }

  const skill = chooseSkill(actor, (candidate) => resolveTargets(actor, candidate, allies, opponents).length > 0);
  const targets = resolveTargets(actor, skill, allies, opponents);
  const actionLabel = skill?.skill_name ?? "Normal Attack";
  const mpBefore = actor.current_mp;

  if (skill) {
    actor.current_mp = Math.max(0, actor.current_mp - skill.mp_cost);
  } else {
    grantMp(actor, 20);
  }

  if (skill?.skill_type === "heal") {
    const target = targets[0];
    const healed = target ? applyHeal(actor, target, skill) : 0;
    logs.healingDone += healed;
    logSkillCast(logs, actor, skill, mpBefore, actor.current_mp, `healed ${target?.display_name ?? "none"} for ${healed}`);
    logAction(logs, actionNumber, turnNumber, actor, "skill", `healed ${healed}`);
  } else if (skill?.skill_type === "shield") {
    const target = targets[0];
    const shieldAmount = target ? applyShield(actor, target, skill) : 0;
    logs.shieldsGenerated += shieldAmount > 0 ? 1 : 0;
    if (target) {
      logs.statusLogs.push({
        status_name: "Shield",
        source: actor.display_name,
        target: target.display_name,
        duration: skill.duration,
        chance: 100,
        result: "generated",
      });
    }
    logSkillCast(logs, actor, skill, mpBefore, actor.current_mp, `shield ${shieldAmount}`);
    logAction(logs, actionNumber, turnNumber, actor, "skill", `shielded ${shieldAmount}`);
  } else if (skill?.skill_type === "buff") {
    targets.forEach((target) => {
      const status = applyStatus(
        actor,
        target,
        skill,
        createDeterministicRng(`${input.deterministic_seed}:${turnNumber}:${actionNumber}:${target.unit_id}`),
      );
      if (status) logStatusAttempt(logs, actor, target, skill, status);
    });
    logSkillCast(logs, actor, skill, mpBefore, actor.current_mp, "buff attempted");
    logAction(logs, actionNumber, turnNumber, actor, "skill", "buff attempted");
  } else {
    const rng = createDeterministicRng(`${input.deterministic_seed}:${turnNumber}:${actionNumber}:${actor.unit_id}`);
    targets.forEach((target) => {
      const damage = calculateDamage(actor, target, skill, rng);
      applyDamage(target, damage);
      logDamage(logs, actionNumber, turnNumber, actor, target, actionLabel, damage);
      if (skill && damage.hit) {
        const status = applyStatus(actor, target, skill, rng);
        if (status) logStatusAttempt(logs, actor, target, skill, status);
      }
    });
    if (skill) {
      logSkillCast(logs, actor, skill, mpBefore, actor.current_mp, `hit ${targets.length} target(s)`);
    }
    logAction(logs, actionNumber, turnNumber, actor, skill ? "skill" : "normal_attack", `${actionLabel} resolved`);
  }

  if (skill) {
    actor.cooldowns[skill.skill_id] = skill.cooldown;
  }
  tickCooldowns(actor, skill?.skill_id);
  logExpiredStatuses(logs, actor, tickStatuses(actor));
}

export function runBattle(input: BattleInputSnapshot): BattleEngineResult {
  const validation = validateBattleInput(input);
  const resultBase = createResultBase(input);
  const logs = createBattleLogState();
  const players = input.team_snapshot.map(createRuntimeUnit);
  const enemies = input.enemy_snapshot.map(createRuntimeUnit);
  const rng = createDeterministicRng(createBattleSeed(input));
  let turnsUsed = 0;

  if (validation.status === "fail") {
    return {
      ...resultBase,
      result: "defeat",
      stars: 0,
      turns_used: 0,
      battle_grade: "INVALID",
      turn_summary: {
        total_turns_used: 0,
        player_actions: 0,
        enemy_actions: 0,
        skills_cast: 0,
        normal_attacks: 0,
        statuses_applied: 0,
        shields_generated: 0,
        healing_done: 0,
      },
      turn_logs: [],
      action_logs: [],
      damage_logs: [],
      skill_cast_logs: [],
      status_logs: [],
      final_unit_states: finalStates([...players, ...enemies]),
      error_state: validation.errors.join("; "),
      safety_notes: [
        "Battle Engine Foundation local deterministic mock only.",
        "No backend, reward authority, WLD, Paid Gem, or ledger logic is implemented.",
      ],
    };
  }

  for (let turnNumber = 1; turnNumber <= input.turn_limit; turnNumber += 1) {
    if (isBattleOver(players, enemies)) break;
    const actingUnits = getTurnOrder([...players, ...enemies], rng);
    logTurn(logs, turnNumber, actingUnits);
    turnsUsed = turnNumber;

    for (const actor of actingUnits) {
      if (actor.current_hp <= 0 || isBattleOver(players, enemies)) continue;
      resolveAction(input, logs, actor, players, enemies, turnNumber);
    }
  }

  const requiredEnemiesDead = living(enemies).length === 0;
  const playerAlive = living(players).length > 0;
  const turnLimitReached = turnsUsed >= input.turn_limit && !requiredEnemiesDead;
  const battleResult = requiredEnemiesDead && playerAlive && !turnLimitReached ? "victory" : "defeat";
  const playerDeaths = players.filter((unit) => unit.current_hp <= 0).length;
  const stars = computeStars(battleResult, turnsUsed, playerDeaths);

  return {
    ...resultBase,
    result: battleResult,
    stars,
    turns_used: turnsUsed,
    battle_grade: gradeFromStars(stars),
    turn_summary: {
      total_turns_used: turnsUsed,
      player_actions: logs.actionLogs.filter((log) => players.some((unit) => unit.unit_id === log.unit_id)).length,
      enemy_actions: logs.actionLogs.filter((log) => enemies.some((unit) => unit.unit_id === log.unit_id)).length,
      skills_cast: logs.skillCastLogs.length,
      normal_attacks: logs.actionLogs.filter((log) => log.action_type === "normal_attack").length,
      statuses_applied: logs.statusLogs.filter((log) => log.result === "applied" || log.result === "generated").length,
      shields_generated: logs.shieldsGenerated,
      healing_done: logs.healingDone,
    },
    turn_logs: logs.turnLogs,
    action_logs: logs.actionLogs,
    damage_logs: logs.damageLogs,
    skill_cast_logs: logs.skillCastLogs,
    status_logs: logs.statusLogs,
    final_unit_states: finalStates([...players, ...enemies]),
    error_state: null,
    safety_notes: [
      "ผลนี้เป็น deterministic mock สำหรับ Battle Engine Foundation เท่านั้น",
      "ยังไม่ใช่ production server และยังไม่มี backend จริง",
      "ไม่มี reward จริง ไม่มี WLD Reward และไม่มี ledger จริง",
      "ใช้ Snapshot และ Seed เพื่อเตรียม deterministic replay",
      "ยังไม่ได้รัน simulation จริง",
      "Production status: NO-GO",
    ],
  };
}
