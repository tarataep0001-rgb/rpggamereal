import { LaunchGateChecklist } from "@/components/admin/LaunchGateChecklist";
import { NoGoStatusPanel } from "@/components/admin/NoGoStatusPanel";
import { SimulationReadinessPanel } from "@/components/admin/SimulationReadinessPanel";
import { SaveWarningPanel } from "@/components/game/SaveWarningPanel";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { mockPlayer } from "@/data/mockPlayer";

export function LaunchGateScreen() {
  return (
    <div className="space-y-4 px-4">
      <NoGoStatusPanel />
      <SaveWarningPanel />
      <LaunchGateChecklist />
      <SimulationReadinessPanel />
      <GameCard>
        <SectionTitle eyebrow="Launch Status" title={`Default status: ${mockPlayer.launchStatus}`} />
        <div className="space-y-2 text-sm leading-6 text-slate-300">
          <p>ยังไม่ผ่าน security audit</p>
          <p>ยังไม่ผ่าน legal/policy review</p>
          <p>ยังไม่พร้อม production</p>
          <p>Do not mark GO in this phase.</p>
        </div>
      </GameCard>
    </div>
  );
}
