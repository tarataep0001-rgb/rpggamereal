import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { mockRiskFlags, riskSeverityRules } from "@/data/mockRiskFlags";
import { getRiskSeverityLabel } from "@/utils/risk";

const toneBySeverity = {
  low: "green",
  medium: "gold",
  high: "red",
  critical: "red",
} as const;

export function RiskFlagPanel() {
  return (
    <GameCard>
      <SectionTitle eyebrow="Risk Flags" title="ต้องตรวจสอบด้วยแอดมิน" />
      <div className="grid gap-3">
        {mockRiskFlags.map((flag) => (
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-3" key={flag.id}>
            <div className="flex gap-3">
              <div className="w-14 shrink-0">
                <ItemIconFrame
                  assetId={flag.asset_id}
                  label={flag.label}
                  tone={toneBySeverity[flag.severity]}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-bold text-white">{flag.label}</p>
                  <span className="rounded-full border border-rose-300/30 bg-rose-400/10 px-2 py-1 text-xs text-rose-100">
                    {getRiskSeverityLabel(flag.severity)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-300">{riskSeverityRules[flag.severity]}</p>
                <p className="text-xs text-slate-400">{flag.recommendedAction}</p>
                <p className="mt-2 text-xs text-slate-500">
                  count {flag.mockCount} / last seen {flag.lastSeen} / {flag.status}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </GameCard>
  );
}
