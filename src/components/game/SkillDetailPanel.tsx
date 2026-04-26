import type { SkillConfig } from "@/types/game";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";
import {
  formatCooldown,
  formatMpCost,
  formatStatusChance,
  getElementBadgeLabel,
  getSkillDisplayName,
  getSkillTypeLabel,
  getTargetTypeLabel,
  skillAssetIds,
} from "@/utils/skills";
import { SkillIconFrame } from "./SkillIconFrame";

type SkillDetailPanelProps = {
  skill: SkillConfig;
};

export function SkillDetailPanel({ skill }: SkillDetailPanelProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow="Featured Skill" title={getSkillDisplayName(skill)} />
      <div className="grid grid-cols-[88px_1fr] gap-3">
        <SkillIconFrame
          assetId={skillAssetIds[skill.skill_id] ?? "icon_skill_swordsman_slash"}
          label={getSkillDisplayName(skill)}
        />
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <FeatureLockBadge label={getElementBadgeLabel(skill)} status="enabled" />
            <FeatureLockBadge label={getSkillTypeLabel(skill)} status="schema-only" />
            <FeatureLockBadge label={getTargetTypeLabel(skill)} status="schema-only" />
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {skill.description_short}
          </p>
          <p className="mt-2 text-xs leading-5 text-amber-100">
            {skill.effect_formula}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <StatBadge label="skill_id" value={skill.skill_id} tone="blue" />
        <StatBadge label="class_tier" value={skill.class_tier} tone="gold" />
        <StatBadge label="unlock" value={`Lv ${skill.unlock_level}`} tone="purple" />
        <StatBadge label="coef" value={skill.base_coef} tone="green" />
        <StatBadge label="MP" value={formatMpCost(skill)} tone="blue" />
        <StatBadge label="cooldown" value={formatCooldown(skill)} tone="purple" />
        <StatBadge label="status" value={formatStatusChance(skill)} tone="gold" />
        <StatBadge label="duration" value={skill.duration} tone="green" />
        <StatBadge label="boss mod" value={skill.boss_modifier} tone="blue" />
        <StatBadge label="weight" value={skill.priority_weight} tone="purple" />
        <StatBadge label="crit" value={skill.can_crit ? "can crit" : "no crit"} tone="gold" />
        <StatBadge label="miss" value={skill.can_miss ? "can miss" : "no miss"} tone="red" />
      </div>

      <p className="mt-4 rounded-xl border border-rose-300/25 bg-rose-500/10 p-3 text-xs leading-5 text-rose-100">
        ข้อมูลนี้เป็น mock สำหรับ prototype เท่านั้น. ระบบต่อสู้จริงยังไม่ได้เปิดใน Phase นี้.
      </p>
    </GameCard>
  );
}
