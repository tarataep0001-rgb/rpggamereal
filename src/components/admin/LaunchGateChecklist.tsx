import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { launchGateChecklist } from "@/data/mockLaunchGate";
import { countBlockingLaunchItems } from "@/utils/launchGate";

export function LaunchGateChecklist() {
  const blockingCount = countBlockingLaunchItems(launchGateChecklist);

  return (
    <GameCard>
      <SectionTitle eyebrow="GO/NO-GO" title={`Blocking items: ${blockingCount}`} />
      <div className="grid gap-2 text-sm text-slate-300">
        {launchGateChecklist.map((item) => (
          <div className="rounded-xl border border-rose-300/20 bg-rose-500/10 p-3" key={item.id}>
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-white">{item.label}</span>
              <span className="text-rose-100">{item.status}</span>
            </div>
            <p className="mt-1 text-xs text-rose-100/75">{item.reason}</p>
          </div>
        ))}
      </div>
    </GameCard>
  );
}
