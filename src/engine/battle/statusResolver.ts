import type { BattleRuntimeUnit, BattleSkillSnapshot, BattleStatusName } from "./battleTypes";
import type { DeterministicRng } from "./deterministicRng";
import { clamp, getEffectiveStats } from "./statCalculator";

export function normalizeStatusName(statusEffect: string): BattleStatusName | null {
  const normalized: Record<string, BattleStatusName> = {
    burn: "Burn",
    Burn: "Burn",
    bleed: "Bleed",
    freeze: "Freeze",
    slow: "SPD Down",
    "SPD Down": "SPD Down",
    def_down: "DEF Down",
    "DEF Down": "DEF Down",
    shield: "Shield",
    acc_up: "Buff CRIT",
    eva_up: "Buff EVA",
    stun: "Stun",
    silence: "Silence",
  };
  return normalized[statusEffect] ?? null;
}

export function applyStatus(
  source: BattleRuntimeUnit,
  target: BattleRuntimeUnit,
  skill: BattleSkillSnapshot,
  rng: DeterministicRng,
) {
  const statusName = normalizeStatusName(skill.status_effect);
  if (!statusName || skill.status_chance <= 0) return null;

  const finalChance = clamp(skill.status_chance, 0, 95);
  const applied = skill.status_chance >= 100 || rng.rollPercent(finalChance);
  if (!applied) {
    return { statusName, result: "resisted" as const };
  }

  const valueByStatus: Partial<Record<BattleStatusName, number>> = {
    "DEF Down": -0.25,
    "SPD Down": -0.2,
    "Buff CRIT": 12,
    "Buff EVA": 10,
    Shield: skill.base_coef,
  };

  target.statuses = target.statuses.filter((status) => status.name !== statusName);
  target.statuses.push({
    name: statusName,
    source_id: source.unit_id,
    duration: Math.max(1, skill.duration),
    value: valueByStatus[statusName],
  });

  return { statusName, result: statusName === "Shield" ? ("generated" as const) : ("applied" as const) };
}

export function applyShield(source: BattleRuntimeUnit, target: BattleRuntimeUnit, skill: BattleSkillSnapshot) {
  const sourceStats = getEffectiveStats(source);
  const basis = skill.skill_id.includes("swordsman") ? sourceStats.DEF : sourceStats.MAG;
  const shieldAmount = Math.floor(basis * skill.base_coef);
  target.current_shield = Math.max(target.current_shield, shieldAmount);
  return shieldAmount;
}

export function applyHeal(source: BattleRuntimeUnit, target: BattleRuntimeUnit, skill: BattleSkillSnapshot) {
  const sourceStats = getEffectiveStats(source);
  const healAmount = Math.floor(sourceStats.MAG * skill.base_coef);
  const before = target.current_hp;
  target.current_hp = Math.min(target.max_hp, target.current_hp + healAmount);
  return target.current_hp - before;
}

export function tickStatuses(unit: BattleRuntimeUnit) {
  const expired = unit.statuses
    .map((status) => ({ ...status, duration: status.duration - 1 }))
    .filter((status) => status.duration <= 0);
  unit.statuses = unit.statuses
    .map((status) => ({ ...status, duration: status.duration - 1 }))
    .filter((status) => status.duration > 0);
  return expired;
}
