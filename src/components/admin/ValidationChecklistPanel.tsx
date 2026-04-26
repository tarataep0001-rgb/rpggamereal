import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { universalValidationChecks } from "@/data/mockExportReadiness";

export function ValidationChecklistPanel() {
  return (
    <GameCard>
      <SectionTitle eyebrow="Validation" title="Universal validation checks" />
      <div className="grid gap-2 text-sm text-slate-300">
        {universalValidationChecks.map((check) => (
          <p className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2" key={check}>
            {check}
          </p>
        ))}
      </div>
    </GameCard>
  );
}
