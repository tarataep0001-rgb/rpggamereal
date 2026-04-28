import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { InventoryEngineResult } from "@/engine/inventory";

type EnhancementLogPreviewProps = {
  result: InventoryEngineResult;
};

export function EnhancementLogPreview({ result }: EnhancementLogPreviewProps) {
  const log = result.enhancement_preview.log_preview;

  return (
    <GameCard>
      <SectionTitle eyebrow="Enhancement Log Preview" title="Mock enhancement_log" />
      <div className="grid gap-2 text-sm text-slate-300 md:grid-cols-2">
        <p>target_enhance_level: {log.target_enhance_level}</p>
        <p>gold_spent: {log.gold_spent.toLocaleString()}</p>
        <p>success_rate_snapshot: {log.success_rate_snapshot}%</p>
        <p>rng_roll: {log.rng_roll}</p>
        <p>result: {log.result}</p>
        <p>before: {log.item_snapshot_before}</p>
        <p>after: {log.item_snapshot_after}</p>
        <p>
          materials_spent:{" "}
          {log.materials_spent.map((item) => `${item.item_id} x${item.quantity}`).join(", ")}
        </p>
      </div>
    </GameCard>
  );
}
