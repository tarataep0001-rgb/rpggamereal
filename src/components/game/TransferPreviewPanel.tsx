import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { InventoryEngineResult } from "@/engine/inventory";

type TransferPreviewPanelProps = {
  result: InventoryEngineResult;
};

export function TransferPreviewPanel({ result }: TransferPreviewPanelProps) {
  const preview = result.transfer_preview;

  return (
    <GameCard>
      <SectionTitle eyebrow="Transfer Preview" title="Transfer ต้องใช้ Transfer Stone" />
      <div className="space-y-2 text-sm leading-6 text-slate-300">
        <p>Source: {preview.source_gear_instance_id}</p>
        <p>Target: {preview.target_gear_instance_id}</p>
        <p>Status: {preview.can_transfer ? "allowed" : "blocked"}</p>
        <p>Transfer level: +{preview.transfer_level_preview}</p>
        <p>{preview.result_summary}</p>
        {preview.blocked_reasons.length > 0 ? (
          <p className="text-rose-100">{preview.blocked_reasons.join(" / ")}</p>
        ) : null}
        <p className="text-xs text-slate-400">
          transfer_log required in real system. This phase is preview only.
        </p>
      </div>
    </GameCard>
  );
}
