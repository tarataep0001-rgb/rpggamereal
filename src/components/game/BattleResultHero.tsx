import { BattleResultArtFrame } from "@/components/game/BattleResultArtFrame";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { StatBadge } from "@/components/ui/StatBadge";
import type { MockBattleResult } from "@/data/mockBattleResult";
import {
  formatBattleResult,
  getResultBadgeStyle,
  getStageTypeBattleTone,
} from "@/utils/battleDisplay";

type BattleResultHeroProps = {
  result: MockBattleResult;
};

export function BattleResultHero({ result }: BattleResultHeroProps) {
  const isVictory = result.result === "victory";
  const stars = "★".repeat(result.stars).padEnd(3, "☆");

  return (
    <GameCard
      className={
        isVictory
          ? "border-amber-300/30 bg-gradient-to-br from-slate-950 via-blue-950/55 to-amber-950/35"
          : "border-rose-300/30 bg-gradient-to-br from-slate-950 via-rose-950/40 to-slate-950"
      }
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <BattleResultArtFrame
          assetId={isVictory ? "bg_battle_result_victory" : "bg_battle_result_defeat"}
          label={formatBattleResult(result.result)}
          tone={isVictory ? "victory" : "defeat"}
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full border px-3 py-1 text-xs font-bold ${getResultBadgeStyle(result.result)}`}>
              {formatBattleResult(result.result)}
            </span>
            <FeatureLockBadge label="V1A mock-only" status="schema-only" />
          </div>
          <h1 className="mt-3 text-3xl font-black text-white">ผลการต่อสู้</h1>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {result.stage_id} · {result.chapter_name} · {getStageTypeBattleTone(result.stage_type)}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <StatBadge label="Stars" value={stars} tone="gold" />
            <StatBadge label="Turns" value={result.turns_used} tone="blue" />
            <StatBadge label="Grade" value={result.battle_grade} tone="purple" />
            <StatBadge label="Stage type" value={result.stage_type} tone="green" />
          </div>
          <p className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3 text-xs leading-5 text-slate-300">
            No real battle calculation. Battle logs are mock/display only in this phase.
          </p>
        </div>
      </div>
    </GameCard>
  );
}
