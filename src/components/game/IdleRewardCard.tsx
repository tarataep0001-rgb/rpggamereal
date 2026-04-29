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
  cappedHours?: number;
  maxIdleHours: number;
  xpReady: number;
  goldReady: number;
  onPreview?: () => void;
};

export function IdleRewardCard({
  accumulatedHours,
  cappedHours,
  goldReady,
  highestThreeStarStage,
  idleStage,
  maxIdleHours,
  onPreview,
  xpReady,
}: IdleRewardCardProps) {
  const displayHours = cappedHours ?? accumulatedHours;
  const capPercent = getIdleCapPercent(displayHours, maxIdleHours);

  return (
    <GameCard className="border-sky-300/20 bg-gradient-to-br from-slate-950/95 via-blue-950/60 to-slate-950/95">
      <div className="flex gap-4">
        <div className="w-20 shrink-0">
          <ItemIconFrame assetId="bg_idle_claim_fantasy" label="Idle claim" tone="blue" />
        </div>
        <div className="min-w-0 flex-1">
          <SectionTitle
            eyebrow="Idle Claim / ระบบ Idle / Auto Farm / Mission"
            title={`Stage ${idleStage}`}
          />
          <p className="text-sm text-slate-300">
            Highest 3-star stage: {highestThreeStarStage} / Idle สูงสุด {maxIdleHours} ชั่วโมง
          </p>
        </div>
      </div>
      <div className="mt-4">
        <ProgressBar
          label={`${displayHours}h / ${maxIdleHours}h (${capPercent}%)`}
          max={maxIdleHours}
          value={displayHours}
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <StatBadge label="XP ready" value={`+${formatNumber(xpReady)}`} tone="blue" />
        <StatBadge label="Gold ready" value={`+${formatNumber(goldReady)}`} tone="gold" />
      </div>
      {onPreview ? (
        <button
          className="mt-4 w-full rounded-xl border border-amber-300/40 bg-amber-400/15 px-4 py-3 text-sm font-bold text-amber-100"
          onClick={onPreview}
          type="button"
        >
          Preview Idle Claim (mock)
        </button>
      ) : null}
    </GameCard>
  );
}
