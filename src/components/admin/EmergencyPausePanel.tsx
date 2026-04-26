import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { emergencyPauseStates } from "@/data/mockAdmin";
import { getEmergencyPauseStatusLabel } from "@/utils/admin";

export function EmergencyPausePanel() {
  return (
    <GameCard className="border-amber-300/20 bg-gradient-to-br from-slate-950/95 via-rose-950/30 to-slate-950/95">
      <div className="flex gap-4">
        <div className="w-20 shrink-0">
          <ItemIconFrame assetId="bg_emergency_pause_panel" label="Emergency pause" tone="red" />
        </div>
        <div>
          <SectionTitle eyebrow="Emergency Pause" title="Mock controls only" />
          <p className="text-sm leading-6 text-slate-300">
            No real system effect. ทุก action สำคัญในระบบจริงต้องมี audit log.
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-2">
        {emergencyPauseStates.map((state) => (
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm" key={state.key}>
            <div>
              <p className="font-semibold text-white">{state.key}</p>
              <p className="text-xs text-slate-400">{state.detail}</p>
            </div>
            <span className={state.enabled ? "text-rose-100" : "text-slate-300"}>
              {getEmergencyPauseStatusLabel(state.enabled)}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-amber-100">
        Emergency pause must be tested before production. Production launch remains NO-GO.
      </p>
    </GameCard>
  );
}
