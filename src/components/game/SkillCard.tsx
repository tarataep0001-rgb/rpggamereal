import type { SkillConfig } from "@/types/game";
import { GameCard } from "@/components/ui/GameCard";

type SkillCardProps = {
  skill: SkillConfig;
};

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <GameCard>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-amber-200">
            Priority #{skill.priority_weight}
          </p>
          <h3 className="text-lg font-bold text-white">{skill.skill_name}</h3>
          <p className="text-sm text-slate-300">{skill.class_required}</p>
        </div>
        <div className="text-right text-xs text-slate-300">
          <p>MP {skill.mp_cost}</p>
          <p>CD {skill.cooldown}</p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-300">
        {skill.description_th}
      </p>
      <p className="mt-2 text-xs text-slate-400">{skill.effect_formula}</p>
    </GameCard>
  );
}
