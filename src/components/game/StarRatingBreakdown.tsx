import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { MockBattleResult } from "@/data/mockBattleResult";
import { calculateMockStarSummary, formatStarCondition } from "@/utils/battleDisplay";

type StarRatingBreakdownProps = {
  result: MockBattleResult;
};

export function StarRatingBreakdown({ result }: StarRatingBreakdownProps) {
  const rows = calculateMockStarSummary(result);

  return (
    <GameCard>
      <SectionTitle eyebrow="Stars" title="Star Rating Breakdown" />
      <div className="space-y-2">
        {rows.map((row, index) => (
          <div
            className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
            key={row.label}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-white">
                {index + 1}★ {row.label}
              </p>
              <span
                className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                  row.achieved
                    ? "bg-emerald-400/15 text-emerald-100"
                    : "bg-slate-500/15 text-slate-300"
                }`}
              >
                {formatStarCondition(row.achieved)}
              </span>
            </div>
            <p className="mt-1 text-xs leading-5 text-slate-400">{row.detail}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-amber-100">
        StarChest once-only when first achieving 3 stars.
      </p>
    </GameCard>
  );
}
