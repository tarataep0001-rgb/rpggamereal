import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { exportOrder } from "@/data/mockExportReadiness";

export function ExportOrderPanel() {
  return (
    <GameCard>
      <div className="flex gap-4">
        <div className="w-16 shrink-0">
          <ItemIconFrame assetId="icon_export_config" label="Export config" tone="blue" />
        </div>
        <SectionTitle eyebrow="Export" title="Config export order" />
      </div>
      <ol className="mt-4 space-y-2 text-sm text-slate-300">
        {exportOrder.map((item, index) => (
          <li key={item}>{index + 1}. {item}</li>
        ))}
      </ol>
    </GameCard>
  );
}
