import type { BattleRuntimeUnit, BattleSkillSnapshot } from "./battleTypes";
import type { DeterministicRng } from "./deterministicRng";
import { battleConstants } from "./battleConstants";
import { getElementModifier } from "./elementResolver";
import { clamp, getEffectiveStats } from "./statCalculator";

export type DamageResult = {
  hit: boolean;
  crit: boolean;
  final_damage: number;
  shield_damage: number;
  actual_hp_damage: number;
  overkill_damage: number;
  element_modifier: number;
};

export function calculateDamage(
  attacker: BattleRuntimeUnit,
  defender: BattleRuntimeUnit,
  skill: BattleSkillSnapshot | null,
  rng: DeterministicRng,
): DamageResult {
  const attackerStats = getEffectiveStats(attacker);
  const defenderStats = getEffectiveStats(defender);
  const canMiss = skill?.can_miss ?? true;
  const canCrit = skill?.can_crit ?? true;
  const hitChance = canMiss
    ? clamp(85 + attackerStats.ACC - defenderStats.EVA, battleConstants.hitChanceFloor, battleConstants.hitChanceCeiling)
    : 100;
  const hit = !canMiss || rng.rollPercent(hitChance);

  if (!hit) {
    return {
      hit: false,
      crit: false,
      final_damage: 0,
      shield_damage: 0,
      actual_hp_damage: 0,
      overkill_damage: 0,
      element_modifier: 1,
    };
  }

  const coef = skill?.base_coef ?? battleConstants.normalAttackCoef;
  const skillType = skill?.skill_type ?? "physical_damage";
  const usesMagic = skillType === "magic_damage";
  const attackStat = usesMagic ? attackerStats.MAG : attackerStats.ATK;
  const defenseStat = usesMagic ? defenderStats.RES : defenderStats.DEF;
  const element = skill?.element === "Neutral" || !skill ? attacker.element : skill.element;
  const elementModifier = getElementModifier(element, defender.element);
  const critChance = canCrit ? clamp(attackerStats.CRIT || battleConstants.baseCrit, 0, 95) : 0;
  const crit = canCrit && rng.rollPercent(critChance);
  const critMultiplier = crit
    ? Math.min(battleConstants.critDamageCap, attackerStats.CRIT_DMG / 100 || battleConstants.baseCritDamageMultiplier)
    : 1;
  const rawDamage = Math.max(1, Math.floor(((attackStat * coef) - defenseStat) * elementModifier * critMultiplier));
  const shieldDamage = Math.min(rawDamage, defender.current_shield);
  const hpDamageBeforeCap = rawDamage - shieldDamage;
  const actualHpDamage = Math.min(hpDamageBeforeCap, defender.current_hp);
  const overkillDamage = Math.max(0, hpDamageBeforeCap - defender.current_hp);

  return {
    hit,
    crit,
    final_damage: rawDamage,
    shield_damage: shieldDamage,
    actual_hp_damage: actualHpDamage,
    overkill_damage: overkillDamage,
    element_modifier: elementModifier,
  };
}
