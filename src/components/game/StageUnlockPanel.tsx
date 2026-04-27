import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";
import type { ProcessedStageProgressResult } from "@/engine/progression";

type StageUnlockPanelProps = {
  progress: ProcessedStageProgressResult;
};

export function StageUnlockPanel({ progress }: StageUnlockPanelProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow="Unlock" title="ปลดล็อกด่านถัดไป" />
      <div className="grid grid-cols-2 gap-2">
        <StatBadge label="Stage" value={progress.stage_id} tone="blue" />
        <StatBadge label="Result" value={progress.result} tone={progress.result === "victory" ? "green" : "red"} />
        <StatBadge label="Previous high" value={progress.previous_highest_stage} tone="purple" />
        <StatBadge label="Next" value={progress.next_stage_unlocked ?? "none"} tone="gold" />
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-400">
        Defeat จะไม่ปลดล็อกด่านถัดไป และไม่ให้ First Clear reward
      </p>
    </GameCard>
  );
}
