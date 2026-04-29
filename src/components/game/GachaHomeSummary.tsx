"use client";

import type { ScreenId } from "@/types/game";
import { GameCard } from "@/components/ui/GameCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useGameState } from "@/state/gameStateStore";

type GachaHomeSummaryProps = {
  onNavigate: (screen: ScreenId) => void;
};

export function GachaHomeSummary({ onNavigate }: GachaHomeSummaryProps) {
  const { state } = useGameState();
  const remaining = Math.max(0, state.gacha.pity.pityLimit - state.gacha.pity.pullsSinceLastRare);

  return (
    <GameCard>
      <div className="flex items-start justify-between gap-3">
        <SectionTitle eyebrow="Gacha" title="Box 1 live" />
        <button
          className="rounded-xl border border-amber-300/40 bg-amber-400/15 px-3 py-2 text-xs font-bold text-amber-100"
          onClick={() => onNavigate("gacha")}
          type="button"
        >
          Open
        </button>
      </div>
      <div className="mt-3">
        <ProgressBar
          label={`${remaining} pulls to guaranteed Rare`}
          max={state.gacha.pity.pityLimit}
          value={state.gacha.pity.pullsSinceLastRare}
        />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300">
        <p className="rounded-xl border border-white/10 bg-white/[0.04] p-2">ใช้ Free/Test Gem เท่านั้น</p>
        <p className="rounded-xl border border-white/10 bg-white/[0.04] p-2">Paid Gem Gacha ยังไม่เปิด</p>
        <p className="rounded-xl border border-white/10 bg-white/[0.04] p-2">no WLD/Paid Gem</p>
        <p className="rounded-xl border border-white/10 bg-white/[0.04] p-2">local mock preview</p>
      </div>
    </GameCard>
  );
}
