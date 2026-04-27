import type { BattleRuntimeUnit, BattleSkillSnapshot } from "./battleTypes";
import { battleConstants } from "./battleConstants";

function hasStatus(unit: BattleRuntimeUnit, statusName: string) {
  return unit.statuses.some((status) => status.name === statusName && status.duration > 0);
}

export function isSilenced(unit: BattleRuntimeUnit) {
  return hasStatus(unit, "Silence");
}

export function isStunned(unit: BattleRuntimeUnit) {
  return hasStatus(unit, "Stun") || hasStatus(unit, "Freeze");
}

export function chooseSkill(unit: BattleRuntimeUnit, validTargetExists: (skill: BattleSkillSnapshot) => boolean) {
  if (unit.current_hp <= 0 || isSilenced(unit)) return null;

  const priorityIndex = new Map(unit.skill_priority.map((skillId, index) => [skillId, index]));
  const usable = unit.skills.filter((skill) => {
    const cooldown = unit.cooldowns[skill.skill_id] ?? 0;
    return unit.current_mp >= skill.mp_cost && cooldown === 0 && validTargetExists(skill);
  });

  return (
    usable.sort((left, right) => {
      const leftPriority = priorityIndex.get(left.skill_id) ?? Number.MAX_SAFE_INTEGER;
      const rightPriority = priorityIndex.get(right.skill_id) ?? Number.MAX_SAFE_INTEGER;
      return (
        leftPriority - rightPriority ||
        right.priority_weight - left.priority_weight ||
        left.skill_id.localeCompare(right.skill_id)
      );
    })[0] ?? null
  );
}

export function grantMp(unit: BattleRuntimeUnit, amount: number) {
  const cappedGain = Math.min(battleConstants.mpGainActionCap, amount);
  unit.current_mp = Math.min(battleConstants.maxMp, unit.current_mp + cappedGain);
}

export function tickCooldowns(unit: BattleRuntimeUnit, skipSkillId?: string) {
  Object.keys(unit.cooldowns).forEach((skillId) => {
    if (skillId === skipSkillId) return;
    unit.cooldowns[skillId] = Math.max(0, unit.cooldowns[skillId] - 1);
  });
}
