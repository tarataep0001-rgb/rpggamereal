import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { mockConfigExport } from "@/data/mockConfigExport";

export function ConfigExportSummaryPanel() {
  return (
    <GameCard className="border-sky-300/20 bg-gradient-to-br from-slate-950/95 via-sky-950/45 to-slate-950/95">
      <div className="flex gap-4">
        <div className="w-20 shrink-0">
          <ItemIconFrame assetId="icon_config_manifest" label="Config manifest" tone="blue" />
        </div>
        <div className="min-w-0 flex-1">
          <SectionTitle eyebrow="โครง Export Config" title="Config Export Foundation" />
          <p className="text-sm leading-6 text-slate-300">
            {mockConfigExport.foundationStatus}. Active spec: {mockConfigExport.activeSpec}.
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-2">
        {mockConfigExport.exportManifest.items.map((item) => (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm" key={item.export_id}>
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-white">{item.export_id}</span>
              <span className="text-amber-100">{item.validation_state}</span>
            </div>
            <p className="mt-1 text-slate-400">{item.file_key}</p>
            <p className="text-slate-500">
              depends_on: {item.depends_on.length > 0 ? item.depends_on.join(", ") : "none"}
            </p>
          </div>
        ))}
      </div>
    </GameCard>
  );
}
