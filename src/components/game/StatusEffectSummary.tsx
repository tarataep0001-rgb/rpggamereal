import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { BattleStatusLog } from "@/data/mockBattleResult";
import { getStatusBadgeLabel } from "@/utils/battleDisplay";

type StatusEffectSummaryProps = {
  logs: BattleStatusLog[];
};

const statusReference = [
  "Burn",
  "Freeze",
  "Bleed",
  "DEF Down",
  "Shield",
  "Buff CRIT",
  "Buff EVA",
];

export function StatusEffectSummary({ logs }: StatusEffectSummaryProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow="Status" title="สถานะที่เกิดขึ้น" />
      <div className="mb-3 flex flex-wrap gap-2">
        {statusReference.map((status) => (
          <span className="rounded-full bg-white/5 px-2 py-1 text-[11px] text-slate-300" key={status}>
            {status}
          </span>
        ))}
      </div>
      <div className="space-y-2">
        {logs.map((log) => (
          <div
            className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
            key={`${log.source}-${log.target}-${log.status_name}`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-white">{log.status_name}</p>
              <span className="rounded-full bg-amber-400/10 px-2 py-1 text-[11px] text-amber-100">
                {getStatusBadgeLabel(log)}
              </span>
            </div>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              {log.source} → {log.target} · chance/result mock {log.chance}%
            </p>
          </div>
        ))}
      </div>
    </GameCard>
  );
}
