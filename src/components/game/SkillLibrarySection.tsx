import type { ClassName, SkillConfig } from "@/types/game";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  classThaiNames,
  formatStatusChance,
  getSkillDisplayName,
  skillAssetIds,
} from "@/utils/skills";
import { SkillIconFrame } from "./SkillIconFrame";

type SkillLibrarySectionProps = {
  className: ClassName;
  skills: SkillConfig[];
};

export function SkillLibrarySection({
  className,
  skills,
}: SkillLibrarySectionProps) {
  return (
    <GameCard>
      <SectionTitle
        eyebrow={`${className} / ${classThaiNames[className]}`}
        title="Class 1 skills"
      />
      <div className="space-y-3">
        {skills.map((skill) => (
          <article
            className="grid grid-cols-[72px_1fr] gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
            key={skill.skill_id}
          >
            <SkillIconFrame
              assetId={skillAssetIds[skill.skill_id] ?? "icon_skill_swordsman_slash"}
              label={getSkillDisplayName(skill)}
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-black text-white">{getSkillDisplayName(skill)}</h3>
                <FeatureLockBadge label={`Lv ${skill.unlock_level}`} status="enabled" />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">{skill.skill_id}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-sky-400/10 px-2 py-1 text-sky-100">
                  {skill.element}
                </span>
                <span className="rounded-full bg-violet-400/10 px-2 py-1 text-violet-100">
                  {skill.target_type}
                </span>
                <span className="rounded-full bg-amber-400/10 px-2 py-1 text-amber-100">
                  {formatStatusChance(skill)}
                </span>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-300">
                {skill.description_short}
              </p>
            </div>
          </article>
        ))}
      </div>
    </GameCard>
  );
}
