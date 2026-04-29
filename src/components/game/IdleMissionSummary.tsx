"use client";

import type { ScreenId } from "@/types/game";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";
import { useGameState } from "@/state/gameStateStore";

type IdleMissionSummaryProps = {
  onNavigate: (screen: ScreenId) => void;
};

export function IdleMissionSummary({ onNavigate }: IdleMissionSummaryProps) {
  const { state } = useGameState();
  const preview = state.idle.lastIdleMissionPreview;
  const dailyClaimable = preview?.daily_missions.filter((mission) => mission.claimable).length ?? 0;
  const weeklyClaimable = preview?.weekly_missions.filter((mission) => mission.claimable).length ?? 0;
  const autoFarmRemaining = preview?.auto_farm.remaining_free_auto_farm ?? 0;

  return (
    <GameCard>
      <div className="flex items-start justify-between gap-3">
        <SectionTitle eyebrow="Idle / Mission" title="Idle mission preview" />
        <button
          className="rounded-xl border border-sky-300/30 bg-sky-400/10 px-3 py-2 text-xs font-bold text-sky-100"
          onClick={() => onNavigate("idle")}
          type="button"
        >
          Open
        </button>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <StatBadge label="Ready hours" value={`${state.idle.accumulatedHours}/${state.idle.maxIdleHours}h`} tone="blue" />
        <StatBadge label="Auto Farm left" value={autoFarmRemaining} tone="green" />
        <StatBadge label="Daily claimable" value={dailyClaimable} tone="gold" />
        <StatBadge label="Weekly claimable" value={weeklyClaimable} tone="purple" />
      </div>
      <p className="mt-3 text-xs text-rose-100">ไม่มี WLD Reward ใน V1A</p>
    </GameCard>
  );
}
