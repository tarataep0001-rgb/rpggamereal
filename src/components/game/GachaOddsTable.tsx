import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { GachaBox } from "@/types/game";
import { formatGachaRate } from "@/utils/gacha";

type GachaOddsTableProps = {
  box: GachaBox;
};

export function GachaOddsTable({ box }: GachaOddsTableProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow="Odds Snapshot" title="Box 1 odds snapshot" />
      <div className="overflow-hidden rounded-xl border border-white/10">
        <div className="grid grid-cols-3 bg-white/[0.06] px-3 py-2 text-xs font-bold text-slate-300">
          <span>Grade</span>
          <span>Total rate</span>
          <span>Per character</span>
        </div>
        {(["Common", "Uncommon", "Rare"] as const).map((grade) => {
          const entries = box.pool.filter((entry) => entry.grade === grade);
          const firstEntry = entries[0];

          return (
            <div
              className="grid grid-cols-3 border-t border-white/10 px-3 py-2 text-sm text-slate-200"
              key={grade}
            >
              <span>{grade}</span>
              <span>{formatGachaRate(box.rates[grade])}</span>
              <span>{firstEntry ? formatGachaRate(firstEntry.ratePercent) : "0%"}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">
        odds_snapshot mock: Common 70%, Uncommon 25%, Rare 5%. Within each grade, characters use equal weight.
      </p>
    </GameCard>
  );
}
