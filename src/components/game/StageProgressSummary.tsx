import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";
import type { ProcessedStageProgressResult } from "@/engine/progression";

type StageProgressSummaryProps = {
  progress: ProcessedStageProgressResult;
  compact?: boolean;
};

export function StageProgressSummary({ progress, compact = false }: StageProgressSummaryProps) {
  return (
    <GameCard className="border-emerald-300/20 bg-emerald-500/5">
      <SectionTitle eyebrow="ระบบผ่านด่าน" title="Stage Progress Result" />
      <div className="mb-3 flex flex-wrap gap-2">
        <FeatureLockBadge label="local mock only" status="schema-only" />
        <FeatureLockBadge label="No WLD Reward" status="disabled" />
        <FeatureLockBadge label="No ledger" status="disabled" />
      </div>
      <div className={`grid gap-2 ${compact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}>
        <StatBadge label="Stage" value={progress.stage_id} tone="blue" />
        <StatBadge label="Result" value={progress.result} tone={progress.result === "victory" ? "green" : "red"} />
        <StatBadge label="Prev high" value={progress.previous_highest_stage} tone="purple" />
        <StatBadge label="Next unlock" value={progress.next_stage_unlocked ?? "none"} tone="gold" />
        <StatBadge label="Stars" value={`${progress.stars_before} -> ${progress.stars_after}`} tone="gold" />
        <StatBadge label="Validation" value={progress.validation.status} tone={progress.validation.status === "pass" ? "green" : "red"} />
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-300">
        ปลดล็อกด่านถัดไปเกิดขึ้นเมื่อ battle result = victory เท่านั้น และข้อมูลนี้เป็น local mock preview
      </p>
    </GameCard>
  );
}
