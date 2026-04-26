import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { simulationReadinessReports } from "@/data/mockLaunchGate";

export function SimulationReadinessPanel() {
  return (
    <GameCard>
      <div className="flex gap-4">
        <div className="w-16 shrink-0">
          <ItemIconFrame assetId="icon_simulation_not_run" label="Simulation not run" tone="red" />
        </div>
        <div>
          <SectionTitle eyebrow="Simulation" title="ยังไม่ผ่าน simulation" />
          <p className="text-sm text-slate-300">Status: Not run / No pass claimed.</p>
        </div>
      </div>
      <div className="mt-4 grid gap-3">
        {simulationReadinessReports.map((report) => (
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm" key={report.id}>
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold text-white">{report.name}</p>
              <span className="text-rose-100">{report.status}</span>
            </div>
            <p className="mt-1 text-slate-400">
              config {report.config_version} / simulator {report.simulator_version} / seed {report.random_seed_range}
            </p>
            <p className="text-slate-400">scenario: {report.scenario}</p>
            <p className="text-slate-400">observed: {report.observed_result}</p>
            <p className="text-slate-500">risk: {report.unresolved_risk_notes}</p>
          </article>
        ))}
      </div>
    </GameCard>
  );
}
