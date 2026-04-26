"use client";

import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";
import { useGameState } from "@/state/gameStateStore";
import { summarizeCoreState } from "@/utils/saveFormatting";

export function GameStateDebugPanel() {
  const { state } = useGameState();
  const summary = summarizeCoreState(state);
  const disabledFlagCount = Object.values(state.featureFlags).filter((value) => value === false).length;

  return (
    <GameCard>
      <SectionTitle eyebrow="State Debug" title="Core local state summary" />
      <div className="grid grid-cols-2 gap-2">
        <StatBadge label="Player" value={summary.player} tone="blue" />
        <StatBadge label="Flags disabled" value={`${disabledFlagCount}/12`} tone="green" />
        <StatBadge label="Formation" value={summary.formation} tone="purple" />
        <StatBadge label="Inventory" value={summary.inventory} tone="gold" />
        <StatBadge label="Stage" value={summary.stage} tone="blue" />
        <StatBadge label="Gacha pity" value={summary.gacha} tone="purple" />
        <StatBadge label="Idle" value={summary.idle} tone="green" />
        <StatBadge label="Launch" value={summary.launch} tone="red" />
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-300">
        ยังไม่ใช่ server-authoritative state และยังไม่มี backend/database จริง.
      </p>
    </GameCard>
  );
}
