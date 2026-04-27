import type { CharacterProgressionResult } from "@/engine/progression";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

type SkillUnlockTimelineProps = {
  progression: CharacterProgressionResult;
};

export function SkillUnlockTimeline({ progression }: SkillUnlockTimelineProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow="Skill Unlock" title="Lv10 / Lv20 / Lv40" />
      <div className="space-y-3">
        {progression.unlocked_skills.map((skill) => (
          <div className="rounded-xl border border-white/10 bg-white/5 p-3" key={skill.skill_id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-black text-white">Lv{skill.level} {skill.skill_name_th}</p>
                <p className="mt-1 text-xs text-slate-400">{skill.skill_id}</p>
              </div>
              <FeatureLockBadge label={skill.unlocked ? "Unlocked" : "Locked"} status={skill.unlocked ? "enabled" : "disabled"} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-300">
        สกิลปลดล็อกที่ Lv10 / Lv20 / Lv40. Skill Loadout ใช้เฉพาะสกิลที่ปลดล็อกและใส่ในช่อง active เท่านั้น.
      </p>
    </GameCard>
  );
}
