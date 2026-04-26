import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { adminConfigKeys, adminThresholds } from "@/data/mockAdmin";
import { formatAdminThreshold } from "@/utils/admin";

export function AdminRoleLimitPanel() {
  return (
    <GameCard>
      <SectionTitle eyebrow="Admin limits" title="Role limits and thresholds" />
      <div className="grid gap-3">
        {Object.entries(adminThresholds.roleLimits).map(([role, limits]) => (
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-3" key={role}>
            <p className="font-bold text-white">{role}</p>
            <div className="mt-2 space-y-1 text-sm text-slate-300">
              {limits.map((limit) => (
                <p key={limit}>- {limit}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="mt-4 grid gap-2 text-sm">
        {adminConfigKeys.map((item) => (
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2" key={item.key}>
            <span className="text-slate-300">{item.key}</span>
            <span className="font-semibold text-amber-100">
              {formatAdminThreshold(item.value, item.key.includes("WLD") ? "WLD-equivalent" : "units")}
            </span>
          </div>
        ))}
      </div>
    </GameCard>
  );
}
