import { ClassSkillFormationExportPanel } from "@/components/admin/ClassSkillFormationExportPanel";
import { ClassSkillFormationValidationPanel } from "@/components/admin/ClassSkillFormationValidationPanel";
import { ConfigExportSummaryPanel } from "@/components/admin/ConfigExportSummaryPanel";
import { ConfigValidationResultPanel } from "@/components/admin/ConfigValidationResultPanel";
import { EquipmentItemDropExportPanel } from "@/components/admin/EquipmentItemDropExportPanel";
import { EquipmentItemDropValidationPanel } from "@/components/admin/EquipmentItemDropValidationPanel";
import { ExportOrderPanel } from "@/components/admin/ExportOrderPanel";
import { V1AAcceptanceChecklist } from "@/components/admin/V1AAcceptanceChecklist";
import { ValidationChecklistPanel } from "@/components/admin/ValidationChecklistPanel";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { mockValidationResults } from "@/utils/mockValidation";

export function ExportReadinessScreen() {
  return (
    <div className="space-y-4 px-4">
      <GameCard className="border-amber-300/20 bg-amber-400/10">
        <SectionTitle eyebrow="Export Readiness" title="Incomplete / mock" />
        <p className="text-sm leading-6 text-amber-100">
          This page is frontend readiness display only. It is not production-ready and does not export real config files in this phase.
        </p>
      </GameCard>

      <ConfigExportSummaryPanel />
      <ConfigValidationResultPanel />
      <ClassSkillFormationExportPanel />
      <ClassSkillFormationValidationPanel />
      <EquipmentItemDropExportPanel />
      <EquipmentItemDropValidationPanel />
      <ExportOrderPanel />
      <ValidationChecklistPanel />
      <V1AAcceptanceChecklist />

      <GameCard>
        <SectionTitle eyebrow="Mock Checks" title="Current data validation preview" />
        <div className="space-y-2 text-sm text-slate-300">
          {mockValidationResults.map((result) => (
            <p className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2" key={result.id}>
              {result.status.toUpperCase()}: {result.label} - {result.detail}
            </p>
          ))}
        </div>
      </GameCard>
    </div>
  );
}
