import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { GameCard } from "@/components/ui/GameCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";
import { formatNumber } from "@/utils/formatting";
import { getIdleCapPercent } from "@/utils/idle";

type IdleRewardCardProps = {
  idleStage: string;
  highestThreeStarStage: string;
  accumulatedHours: number;
  maxIdleHours: number;
  xpReady: number;
  goldReady: number;
};

export function IdleRewardCard({
  idleStage,
  highestThreeStarStage,
  accumulatedHours,
  maxIdleHours,
  xpReady,
  goldReady,
}: IdleRewardCardProps) {
  const capPercent = getIdleCapPercent(accumulatedHours, maxIdleHours);

  return (
    <GameCard className="border-sky-300/20 bg-gradient-to-br from-slate-950/95 via-blue-950/60 to-slate-950/95">
      <div className="flex gap-4">
        <div className="w-20 shrink-0">
          <ItemIconFrame assetId="bg_idle_claim_fantasy" label="Idle claim" tone="blue" />
        </div>
        <div className="min-w-0 flex-1">
          <SectionTitle
            eyebrow="Idle Claim / รับรางวัลฟาร์มอัตโนมัติ"
            title={`Stage ${idleStage}`}
          />
          <p className="text-sm text-slate-300">
            Highest 3-star stage: {highestThreeStarStage} / Idle สูงสุด {maxIdleHours} ชั่วโมง
          </p>
        </div>
      </div>
      <div className="mt-4">
        <ProgressBar
          label={`${accumulatedHours}h / ${maxIdleHours}h (${capPercent}%)`}
          max={maxIdleHours}
          value={accumulatedHours}
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <StatBadge label="XP ready" value={`+${formatNumber(xpReady)}`} tone="blue" />
        <StatBadge label="Gold ready" value={`+${formatNumber(goldReady)}`} tone="gold" />
      </div>
      <button className="mt-4 w-full rounded-2xl border border-amber-300/40 bg-amber-400/15 px-4 py-3 text-sm font-bold text-amber-100">
        Claim Idle (mock)
      </button>
    </GameCard>
  );
}
