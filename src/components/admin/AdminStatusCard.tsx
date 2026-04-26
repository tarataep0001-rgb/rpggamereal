import type { AdminPanel } from "@/types/game";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";

type AdminStatusCardProps = {
  panel: AdminPanel;
};

export function AdminStatusCard({ panel }: AdminStatusCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-3">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-bold text-white">{panel.title}</h3>
        <FeatureLockBadge label={panel.status} status={panel.status} />
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{panel.detail}</p>
    </article>
  );
}
