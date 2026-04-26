import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

const aiSteps = [
  "If dead, skip",
  "If Stunned, consume skip and end action",
  "If Silenced, only normal attack allowed",
  "Collect active skills where unlocked, equipped, MP enough, cooldown = 0, ai_condition true, target valid",
  "Sort by player priority order",
  "If tied, sort by priority_weight descending",
  "If tied, sort by skill_id stable order",
  "Cast first valid skill",
  "If no valid skill, use Normal Attack",
];

export function SkillPriorityRuleCard() {
  return (
    <GameCard>
      <SectionTitle eyebrow="AI Rules" title="Auto Skill decision order" />
      <ol className="space-y-2 text-sm leading-6 text-slate-300">
        {aiSteps.map((step, index) => (
          <li key={step}>
            {index + 1}. {step}
          </li>
        ))}
      </ol>
      <p className="mt-4 rounded-xl border border-amber-300/25 bg-amber-400/10 p-3 text-xs leading-5 text-amber-50">
        Ultimate is not forced automatically and is not live in V1A.
      </p>
    </GameCard>
  );
}
