import { AdminOverviewPanel } from "@/components/admin/AdminOverviewPanel";
import { AdminRoleLimitPanel } from "@/components/admin/AdminRoleLimitPanel";
import { AuditLogPreview } from "@/components/admin/AuditLogPreview";
import { ClassSkillFormationExportPanel } from "@/components/admin/ClassSkillFormationExportPanel";
import { ConfigExportSummaryPanel } from "@/components/admin/ConfigExportSummaryPanel";
import { EmergencyPausePanel } from "@/components/admin/EmergencyPausePanel";
import { EquipmentItemDropExportPanel } from "@/components/admin/EquipmentItemDropExportPanel";
import { EnemyBossStageExportPanel } from "@/components/admin/EnemyBossStageExportPanel";
import { PolicyStatusPanel } from "@/components/admin/PolicyStatusPanel";
import { RegionPolicyPanel } from "@/components/admin/RegionPolicyPanel";
import { RiskFlagPanel } from "@/components/admin/RiskFlagPanel";
import { SafetyStatusBadge } from "@/components/admin/SafetyStatusBadge";
import { GameCard } from "@/components/ui/GameCard";
import { GameStateDebugPanel } from "@/components/game/GameStateDebugPanel";
import { LocalSaveControls } from "@/components/game/LocalSaveControls";
import { SaveStatusPanel } from "@/components/game/SaveStatusPanel";
import { SaveWarningPanel } from "@/components/game/SaveWarningPanel";
import { SectionTitle } from "@/components/ui/SectionTitle";

const adminTabNames = [
  "Overview",
  "Users",
  "Wallet / Ledger",
  "Reward Pools",
  "Withdraw Review",
  "Gacha Logs",
  "Battle Logs",
  "Risk Flags",
  "Config",
  "Emergency Pause",
  "Audit Logs",
] as const;

export function AdminDashboardScreen() {
  return (
    <div className="space-y-4 px-4">
      <AdminOverviewPanel />

      <GameCard>
        <SectionTitle eyebrow="Admin tabs" title="Prototype control center" />
        <div className="grid grid-cols-2 gap-2">
          {adminTabNames.map((tab) => (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-200" key={tab}>
              {tab}
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <SafetyStatusBadge label="Admin UI" status="mock" />
          <SafetyStatusBadge label="Wallet/Ledger" status="blocked" />
          <SafetyStatusBadge label="Withdraw approval" status="blocked" />
          <SafetyStatusBadge label="Secrets" status="blocked" />
        </div>
      </GameCard>

      <AdminRoleLimitPanel />
      <ConfigExportSummaryPanel />
      <SaveStatusPanel />
      <LocalSaveControls />
      <GameStateDebugPanel />
      <SaveWarningPanel />
      <ClassSkillFormationExportPanel />
      <EquipmentItemDropExportPanel />
      <EnemyBossStageExportPanel />
      <EmergencyPausePanel />
      <RiskFlagPanel />
      <RegionPolicyPanel />
      <PolicyStatusPanel />
      <AuditLogPreview />
    </div>
  );
}
