import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { BattleTurnSummary as BattleTurnSummaryType } from "@/data/mockBattleResult";
import { formatNumber } from "@/utils/formatting";

type BattleTurnSummaryProps = {
  summary: BattleTurnSummaryType;
};

export function BattleTurnSummary({ summary }: BattleTurnSummaryProps) {
  const rows = [
    ["total turns", summary.total_turns_used],
    ["player actions", summary.player_actions],
    ["enemy actions", summary.enemy_actions],
    ["skills cast", summary.skills_cast],
    ["normal attacks", summary.normal_attacks],
    ["statuses applied", summary.statuses_applied],
    ["shields generated", summary.shields_generated],
    ["healing done", summary.healing_done],
  ];

  return (
    <GameCard>
      <SectionTitle eyebrow="Actions" title="Turn / Action Summary" />
      <div className="grid grid-cols-2 gap-2">
        {rows.map(([label, value]) => (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3" key={label}>
            <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">{label}</p>
            <p className="mt-1 text-lg font-black text-white">{formatNumber(Number(value))}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-slate-500">This is display-only mock data.</p>
    </GameCard>
  );
}
