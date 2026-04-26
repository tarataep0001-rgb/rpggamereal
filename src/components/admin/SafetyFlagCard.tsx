import type { SafetyFlag } from "@/types/game";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";

type SafetyFlagCardProps = {
  flag: SafetyFlag;
};

export function SafetyFlagCard({ flag }: SafetyFlagCardProps) {
  return (
    <article className="rounded-2xl border border-rose-300/20 bg-rose-500/10 p-3">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-bold text-white">{flag.label}</h3>
        <FeatureLockBadge label={flag.status} status={flag.status} />
      </div>
      <p className="mt-2 text-sm leading-6 text-rose-100/80">{flag.detail}</p>
    </article>
  );
}
