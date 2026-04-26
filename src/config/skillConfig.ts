import { createConfigMeta } from "@/config/meta";
import { mockSkills } from "@/data/mockSkills";
import type { SkillConfig } from "@/types/game";
import { skillAssetIds } from "@/utils/skills";

export type SkillConfigExportRow = SkillConfig & {
  asset_id: string;
  live_in_v1a: boolean;
  schema_only: boolean;
  config_version: string;
};

function getClass1UnlockLevel(skillId: string): number {
  if (skillId.endsWith("_01")) {
    return 10;
  }

  if (skillId.endsWith("_02")) {
    return 20;
  }

  return 40;
}

export const skillConfigRows: SkillConfigExportRow[] = mockSkills.map((skill) => ({
  ...skill,
  unlock_level: getClass1UnlockLevel(skill.skill_id),
  asset_id: skillAssetIds[skill.skill_id] ?? "icon_config_blocked",
  live_in_v1a: skill.class_tier === 1,
  schema_only: false,
  config_version: `v1a.skill.${skill.skill_id}.0`,
}));

export const skillConfig = {
  ...createConfigMeta({
    configKey: "skill_config",
    status: "validated_mock",
    notes:
      "Skill config exports all 15 Class 1 skill rows for V1A mock export. This is not a battle engine.",
  }),
  export_id: "skill_config",
  rows: skillConfigRows,
  liveSkillScope: {
    v1aLiveSkills: "Class 1 only",
    class2RowsRequiredBeforeV1B: true,
    class3RowsRequiredBeforeRoadmap: true,
    placeholderOnlySkillsCannotGoLive: true,
  },
  skillSystemConstants: {
    mp: {
      MaxMP: 100,
      BattleStartMP: 0,
      MPCannotExceedMaxMP: true,
      MPGainActionCap: 40,
    },
    normalAttack: {
      NormalAttackCoef: 1.0,
      NormalAttackType: "physical_damage",
      uses: "ATK",
      NormalAttackElement: "character element if available, otherwise neutral",
      grantsMp: 20,
      canMissUnlessConfigSaysOtherwise: true,
      canCritUnlessConfigSaysOtherwise: true,
    },
    cooldown: {
      equippedUnlockedSkillsStartCurrentCooldown: 0,
      unlessInitialCooldownConfigured: true,
      startsAfterSkillUse: true,
      decreasesWhenOwnerFinishesOwnAction: true,
    },
    crit: {
      BaseCRIT: 5,
      BaseCritDamageMultiplier: 1.5,
      CritDamageCap: 3.0,
    },
    positiveBuffCaps: {
      ATK_MAG_DEF_RES_HP: "+80%",
      SPD: "+50%",
      CRIT: "+50 percentage points from buffs",
      CRIT_DMG: "+100 percentage points from buffs",
      EVA_ACC: "+50 percentage points from buffs",
      MPGain_HealPower_DebuffChance: "+50%",
    },
  },
  skillPriorityRules: {
    activeLoadoutOnly: true,
    unlockedButNotEquippedIgnored: true,
    loadoutChangesOutsideBattleOnly: true,
    battleUsesSkillLoadoutSnapshot: true,
    activeBattleCannotBeChangedByLaterUiEdits: true,
    aiOrder: [
      "If dead, skip",
      "If Stunned, consume skip and end action",
      "If Silenced, only normal attack allowed",
      "Collect active skills where unlocked, equipped, MP enough, cooldown = 0, ai_condition true, target valid",
      "Sort by player priority order",
      "If tied, priority_weight descending",
      "If tied, skill_id stable order",
      "Cast first valid skill",
      "If no valid skill, Normal Attack",
    ],
    ultimate: {
      forcedAutomatically: false,
      usedOnlyIfPlayerPriorityOrAiConditionSaysSo: true,
      liveInV1A: false,
    },
  },
  importantCorrections: {
    swordsman_brave_guard_03: "shield_amount = floor(DEF * 1.20)",
    priest_holy_shield_03: "shield_amount = floor(MAG * 1.20)",
  },
  class1SkillIds: skillConfigRows.map((skill) => skill.skill_id),
  class1SkillCount: skillConfigRows.length,
} as const;
