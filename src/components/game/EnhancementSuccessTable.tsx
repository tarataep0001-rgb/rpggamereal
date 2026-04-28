import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { enhancementSuccessTable } from "@/engine/inventory";

export function EnhancementSuccessTable() {
  return (
    <GameCard>
      <SectionTitle eyebrow="Enhancement Success Table" title="+1 ถึง +50" />
      <div className="grid gap-2">
        {enhancementSuccessTable.map((band) => (
          <div
            className="grid gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-slate-300 md:grid-cols-4"
            key={band.label}
          >
            <span className="font-semibold text-white">{band.label}</span>
            <span>Success {band.success_rate}%</span>
            <span>{band.stone_tier}</span>
            <span>{band.failure_rule}</span>
          </div>
        ))}
      </div>
    </GameCard>
  );
}
