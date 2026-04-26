import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { mockConfigExport } from "@/data/mockConfigExport";

export function ConfigValidationResultPanel() {
  return (
    <GameCard>
      <div className="flex gap-4">
        <div className="w-16 shrink-0">
          <ItemIconFrame assetId="icon_config_validation" label="Config validation" tone="gold" />
        </div>
        <div>
          <SectionTitle eyebrow="Validation" title="Current mock validation result" />
          <p className="text-sm text-slate-300">Local frontend validation only. No production validation claimed.</p>
        </div>
      </div>
      <div className="mt-4 space-y-2 text-sm text-slate-300">
        {mockConfigExport.validationResults.map((result) => (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2" key={result.id}>
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-white">{result.label}</span>
              <span className={result.status === "pass" ? "text-emerald-100" : "text-amber-100"}>
                {result.status.toUpperCase()}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">{result.detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2 text-sm text-amber-100">
        {mockConfigExport.blockingNotes.map((note) => (
          <p key={note}>- {note}</p>
        ))}
      </div>
    </GameCard>
  );
}
