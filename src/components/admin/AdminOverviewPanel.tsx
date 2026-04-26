import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { adminPanels, featureFlagRows } from "@/data/mockAdmin";

export function AdminOverviewPanel() {
  return (
    <GameCard className="border-sky-300/20 bg-gradient-to-br from-slate-950/95 via-sky-950/50 to-slate-950/95">
      <div className="flex gap-4">
        <div className="w-20 shrink-0">
          <ItemIconFrame assetId="icon_admin_dashboard" label="Admin dashboard" tone="blue" />
        </div>
        <div className="min-w-0 flex-1">
          <SectionTitle eyebrow="แอดมิน" title="Safety dashboard mock" />
          <p className="text-sm leading-6 text-slate-300">
            ระบบนี้เป็น mock สำหรับ prototype เท่านั้น ไม่มีการอนุมัติเงินจริง ไม่มีการถอน WLD จริง และไม่มี ledger จริงใน Phase นี้.
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-2">
        {adminPanels.map((panel) => (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3" key={panel.id}>
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-white">{panel.title}</span>
              <FeatureLockBadge label={panel.status} status={panel.status} />
            </div>
            <p className="mt-2 text-sm text-slate-300">{panel.detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-2">
        {featureFlagRows.map((flag) => (
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm" key={flag.key}>
            <span className="text-slate-300">{flag.key}</span>
            <span className={flag.enabled ? "text-emerald-100" : "text-rose-100"}>
              {String(flag.enabled)}
            </span>
          </div>
        ))}
      </div>
    </GameCard>
  );
}
