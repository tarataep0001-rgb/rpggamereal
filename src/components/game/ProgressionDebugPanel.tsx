import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { ProcessedStageProgressResult } from "@/engine/progression";

type ProgressionDebugPanelProps = {
  progress: ProcessedStageProgressResult;
};

export function ProgressionDebugPanel({ progress }: ProgressionDebugPanelProps) {
  const rows = [
    ["reward_log", progress.reward_log_preview.log_id],
    ["snapshot", progress.reward_log_preview.reward_snapshot_id],
    ["validation", progress.validation.status],
    ["local_mock_only", String(progress.reward_log_preview.local_mock_only)],
    ["no_wld_reward", String(progress.reward_log_preview.no_wld_reward)],
    ["no_paid_gem_reward", String(progress.reward_log_preview.no_paid_gem_reward)],
    ["no_ledger", String(progress.reward_log_preview.no_ledger)],
  ];

  return (
    <GameCard>
      <SectionTitle eyebrow="Progression Debug" title="Safe local-only reward log" />
      <div className="space-y-2">
        {rows.map(([label, value]) => (
          <div className="flex justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs" key={label}>
            <span className="text-slate-500">{label}</span>
            <span className="break-all text-right font-semibold text-slate-200">{value}</span>
          </div>
        ))}
      </div>
    </GameCard>
  );
}
