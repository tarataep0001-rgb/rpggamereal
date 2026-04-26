import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { v1aAcceptanceChecklist } from "@/data/mockExportReadiness";

export function V1AAcceptanceChecklist() {
  return (
    <GameCard>
      <SectionTitle eyebrow="V1A Acceptance" title="Data acceptance checklist" />
      <div className="grid gap-2 text-sm text-slate-300">
        {v1aAcceptanceChecklist.map((item) => (
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2" key={item.id}>
            <span>{item.label}</span>
            <span className="text-amber-100">{item.status}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-rose-100">Default state: incomplete / mock / not production-ready.</p>
    </GameCard>
  );
}
