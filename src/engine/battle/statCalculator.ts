import type { StatBlock } from "../../types/game";
import type { BattleRuntimeStatus, BattleRuntimeUnit, BattleUnitSnapshot } from "./battleTypes";
import { battleConstants } from "./battleConstants";

const statKeys = ["HP", "ATK", "MAG", "DEF", "RES", "SPD", "ACC", "EVA", "CRIT", "CRIT_DMG"] as const;

function cloneStats(stats: StatBlock): StatBlock {
  return Object.fromEntries(statKeys.map((key) => [key, stats[key]])) as StatBlock;
}

export function createRuntimeUnit(snapshot: BattleUnitSnapshot): BattleRuntimeUnit {
  return {
    ...snapshot,
    stats: cloneStats(snapshot.stats),
    skills: snapshot.skills.map((skill) => ({ ...skill })),
    skill_priority: [...snapshot.skill_priority],
    current_hp: snapshot.max_hp,
    current_mp: battleConstants.battleStartMp,
    current_shield: 0,
    cooldowns: Object.fromEntries(snapshot.skills.map((skill) => [skill.skill_id, 0])),
    statuses: [],
  };
}

function statusValue(statuses: BattleRuntimeStatus[], name: BattleRuntimeStatus["name"]) {
  return statuses.find((status) => status.name === name)?.value ?? 0;
}

export function getEffectiveStats(unit: BattleRuntimeUnit): StatBlock {
  const stats = cloneStats(unit.stats);
  const defDown = Math.max(battleConstants.debuffCaps.DEF, statusValue(unit.statuses, "DEF Down"));
  const spdDown = Math.max(battleConstants.debuffCaps.SPD, statusValue(unit.statuses, "SPD Down"));
  const critUp = Math.min(battleConstants.positiveBuffCaps.CRIT, statusValue(unit.statuses, "Buff CRIT"));
  const evaUp = Math.min(battleConstants.positiveBuffCaps.EVA, statusValue(unit.statuses, "Buff EVA"));

  stats.DEF = Math.max(0, Math.floor(stats.DEF * (1 + defDown)));
  stats.SPD = Math.max(1, Math.floor(stats.SPD * (1 + spdDown)));
  stats.CRIT = Math.max(0, Math.floor(stats.CRIT + critUp));
  stats.EVA = Math.max(0, Math.floor(stats.EVA + evaUp));

  return stats;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
