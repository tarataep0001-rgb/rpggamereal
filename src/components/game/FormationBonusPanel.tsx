import type { FormationBonus, GameCharacter } from "@/types/game";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { countDeployedUnits } from "@/utils/formulas";

type FormationBonusPanelProps = {
  activeBonus: FormationBonus | null;
  units: GameCharacter[];
};

export function FormationBonusPanel({ activeBonus, units }: FormationBonusPanelProps) {
  const deployedCount = countDeployedUnits(units);

  return (
    <GameCard className="border-amber-300/25">
      <SectionTitle eyebrow="Active Bonus" title={activeBonus?.name ?? "No pattern bonus"} />
      <div className="rounded-2xl border border-amber-300/25 bg-amber-400/10 p-3">
        <p className="text-sm font-bold text-white">
          {activeBonus
            ? activeBonus.effect
            : deployedCount < 3
              ? "Team has fewer than 3 deployed units"
              : "No matched formation pattern"}
        </p>
        <p className="mt-2 text-xs leading-5 text-slate-300">
          Priority: Front Guard, Backline Focus, Balanced Line, Cross Formation,
          Assassin Spread. Formation bonus is calculated from formation_snapshot at
          battle start and remains locked for that battle.
        </p>
      </div>
      <p className="mt-3 text-xs text-amber-100">
        บัฟ Formation นี้เป็น mock display สำหรับ prototype
      </p>
    </GameCard>
  );
}
