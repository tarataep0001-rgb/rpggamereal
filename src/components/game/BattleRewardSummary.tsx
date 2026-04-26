import Image from "next/image";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";
import { getLocalAssetImagePath } from "@/data/localAssetImages";
import type { BattleDrop, MockBattleResult } from "@/data/mockBattleResult";
import { formatNumber } from "@/utils/formatting";

type BattleRewardSummaryProps = {
  result: MockBattleResult;
};

function DropRow({ drop }: { drop: BattleDrop }) {
  const imagePath = getLocalAssetImagePath(drop.icon_asset_id);

  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="relative size-12 overflow-hidden rounded-xl border border-white/10 bg-slate-900">
        {imagePath ? (
          <Image
            alt={drop.label}
            className="object-cover"
            fill
            loading="eager"
            sizes="48px"
            src={imagePath}
            unoptimized
          />
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-white">{drop.label}</p>
        <p className="text-xs text-slate-500">{drop.item_id}</p>
      </div>
      <p className="text-sm font-black text-amber-100">x{drop.quantity}</p>
    </div>
  );
}

export function BattleRewardSummary({ result }: BattleRewardSummaryProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow="Rewards" title="รางวัลที่ได้รับ" />
      <div className="grid grid-cols-2 gap-2">
        <StatBadge label="XP" value={`+${formatNumber(result.xp_gained)}`} tone="purple" />
        <StatBadge label="Gold" value={`+${formatNumber(result.gold_gained)}`} tone="gold" />
      </div>
      <div className="mt-3 space-y-2">
        {result.drops.map((drop) => (
          <DropRow drop={drop} key={drop.item_id} />
        ))}
        {result.star_chest_reward ? (
          <DropRow drop={result.star_chest_reward} />
        ) : null}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <FeatureLockBadge label="First Clear once" status="schema-only" />
        <FeatureLockBadge label="Replay reward later" status="schema-only" />
        <FeatureLockBadge label="No WLD Reward in V1A" status="disabled" />
      </div>
    </GameCard>
  );
}
