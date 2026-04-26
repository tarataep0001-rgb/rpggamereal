import type { SkillConfig } from "@/types/game";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { formatCooldown, formatMpCost, getSkillDisplayName } from "@/utils/skills";

type SkillLoadoutPanelProps = {
  skills: SkillConfig[];
};

export function SkillLoadoutPanel({ skills }: SkillLoadoutPanelProps) {
  return (
    <GameCard className="border-amber-300/25">
      <SectionTitle eyebrow="Active Loadout" title="Swordsman active skills" />
      <div className="space-y-3">
        {skills.map((skill, index) => (
          <div
            className="rounded-2xl border border-white/10 bg-white/5 p-3"
            key={skill.skill_id}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-amber-200">Priority #{index + 1}</p>
                <h3 className="font-black text-white">
                  {getSkillDisplayName(skill)}
                </h3>
                <p className="mt-1 text-xs text-slate-400">{skill.skill_id}</p>
              </div>
              <FeatureLockBadge label="Equipped" status="enabled" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300">
              <span>{formatMpCost(skill)}</span>
              <span>{formatCooldown(skill)}</span>
              <span>{skill.target_type}</span>
              <span>{skill.ai_condition}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 rounded-xl border border-sky-300/25 bg-sky-400/10 p-3 text-xs leading-5 text-sky-100">
        ใช้เฉพาะสกิลที่ใส่ในช่อง Active Skill. Battle จะใช้ Skill Loadout Snapshot ตอนเริ่มต่อสู้
      </p>
    </GameCard>
  );
}
