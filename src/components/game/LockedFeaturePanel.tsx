import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { FeatureStatus } from "@/types/game";

type LockedFeaturePanelProps = {
  eyebrow: string;
  title: string;
  items: ReadonlyArray<{ label: string; status: FeatureStatus; note?: string }>;
};

export function LockedFeaturePanel({ eyebrow, title, items }: LockedFeaturePanelProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow={eyebrow} title={title} />
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <FeatureLockBadge key={item.label} label={item.label} status={item.status} />
        ))}
      </div>
      <div className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
        {items
          .filter((item) => item.note)
          .map((item) => (
            <p key={`${item.label}-note`}>{item.note}</p>
          ))}
      </div>
    </GameCard>
  );
}
