import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { IdleMissionValidationResult } from "@/engine/idle";

type IdleMissionValidationPanelProps = {
  validation: IdleMissionValidationResult;
};

export function IdleMissionValidationPanel({ validation }: IdleMissionValidationPanelProps) {
  const rows = validation.errors.length > 0 ? validation.errors : validation.warnings;

  return (
    <GameCard>
      <SectionTitle eyebrow="Idle / Mission Validation" title="Local frontend validation" />
      <div className="mt-3 rounded-xl border border-emerald-300/20 bg-emerald-400/10 p-3">
        <p className="text-sm font-black text-emerald-100">validation status: {validation.status}</p>
        <p className="mt-1 text-xs text-emerald-50/80">checked_at: {validation.checked_at}</p>
      </div>
      <div className="mt-3 space-y-2 text-sm text-slate-300">
        {rows.length > 0 ? rows.map((row) => <p key={row}>{row}</p>) : <p>Idle, Auto Farm, mission, reward snapshot, and no WLD/Paid/ledger checks pass.</p>}
      </div>
    </GameCard>
  );
}
