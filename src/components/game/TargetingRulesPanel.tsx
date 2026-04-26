import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

const rowRules = [
  "Front Row = front_top, front_center, front_bottom",
  "Middle Row = middle_top, middle_center, middle_bottom",
  "Back Row = back_top, back_center, back_bottom",
];

const targetingRules = [
  "Enemies target Front Row first when living units exist there",
  "If Front Row is empty, target Middle Row",
  "If Middle Row is empty, target Back Row",
  "Backstab / Archer / Assassin skills can target back row directly unless blocked by Taunt",
  "AoE hits all valid enemies",
  "Row attacks target the row with most living enemies",
  "Column attacks target the column with most living enemies",
  "Empty front row does not protect backline",
];

export function TargetingRulesPanel() {
  return (
    <GameCard>
      <SectionTitle eyebrow="Targeting" title="Row / position rules" />
      <div className="space-y-3">
        <div className="rounded-2xl border border-sky-300/25 bg-sky-400/10 p-3">
          <p className="text-sm font-bold text-white">Rows</p>
          <div className="mt-2 space-y-1 text-xs leading-5 text-slate-300">
            {rowRules.map((rule) => (
              <p key={rule}>{rule}</p>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-violet-300/25 bg-violet-400/10 p-3">
          <p className="text-sm font-bold text-white">Targeting</p>
          <div className="mt-2 space-y-1 text-xs leading-5 text-slate-300">
            {targetingRules.map((rule) => (
              <p key={rule}>{rule}</p>
            ))}
          </div>
        </div>
      </div>
    </GameCard>
  );
}
