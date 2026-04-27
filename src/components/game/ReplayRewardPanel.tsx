import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";
import type { ProcessedStageProgressResult } from "@/engine/progression";

type ReplayRewardPanelProps = {
  progress: ProcessedStageProgressResult;
};

export function ReplayRewardPanel({ progress }: ReplayRewardPanelProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow="Replay" title="Replay Reward ใช้โควตารายวัน" />
      <div className="grid grid-cols-2 gap-2">
        <StatBadge label="Eligible" value={progress.replay.eligible ? "yes" : "no"} tone={progress.replay.eligible ? "green" : "red"} />
        <StatBadge label="Bangkok date" value={progress.replay.bangkok_business_date} tone="blue" />
        <StatBadge label="Used" value={`${progress.replay.rewarded_replay_used_today}/${progress.replay.rewarded_replay_cap_per_day}`} tone="gold" />
        <StatBadge label="Gear chance" value="20% of normal" tone="purple" />
      </div>
      <p className="mt-3 rounded-xl border border-amber-300/25 bg-amber-400/10 p-3 text-xs leading-5 text-amber-100">
        {progress.replay.message_th}
      </p>
      <p className="mt-3 text-xs leading-5 text-slate-400">
        ใช้ Bangkok business date เฉพาะ local mock display ใน production ต้องให้ server เป็น authority
      </p>
    </GameCard>
  );
}
