import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { IdleMissionPreview } from "@/engine/idle";

type IdleMissionDebugPanelProps = {
  preview: IdleMissionPreview;
  onReset: () => void;
};

export function IdleMissionDebugPanel({ onReset, preview }: IdleMissionDebugPanelProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow="Safety / Scope" title="Production status: NO-GO" />
      <div className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
        <p>ระบบ Idle / Auto Farm / Mission</p>
        <p>local mock only; no server-authoritative idle/reward in this phase.</p>
        <p>no real reward claim, no WLD, no Paid Gem reward, no ledger.</p>
        <p>daily reset: {preview.daily_reset_display}</p>
        <p>weekly reset: {preview.weekly_reset_display}</p>
      </div>
      <button
        className="mt-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-200"
        onClick={onReset}
        type="button"
      >
        Reset idle/mission mock
      </button>
    </GameCard>
  );
}
