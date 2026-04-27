import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";
import type { ProcessedStageProgressResult } from "@/engine/progression";

type RewardAtomicityPanelProps = {
  progress: ProcessedStageProgressResult;
};

export function RewardAtomicityPanel({ progress }: RewardAtomicityPanelProps) {
  return (
    <GameCard className="border-sky-300/20 bg-sky-500/5">
      <SectionTitle eyebrow="Atomicity" title="Reward Snapshot / all-or-nothing" />
      <div className="grid grid-cols-2 gap-2">
        <StatBadge label="Inventory" value={`${progress.atomicity.usedInventorySlots}/${progress.atomicity.inventorySlots}`} tone="blue" />
        <StatBadge label="Mailbox" value={`${progress.atomicity.mailboxCount}/${progress.atomicity.mailboxLimit}`} tone="purple" />
        <StatBadge label="Needs slots" value={progress.atomicity.itemRewardsNeedSlots} tone="gold" />
        <StatBadge
          label="Blocked"
          value={progress.atomicity.blockedBeforePartialReward ? "yes" : "no"}
          tone={progress.atomicity.blockedBeforePartialReward ? "red" : "green"}
        />
      </div>
      <div className="mt-3 space-y-2 text-xs leading-5 text-slate-300">
        {progress.atomicity.notes.map((note) => (
          <p key={note}>{note}</p>
        ))}
      </div>
      <p className="mt-3 rounded-xl border border-rose-300/25 bg-rose-500/10 p-3 text-xs text-rose-100">
        ไม่มี ledger จริง และ WLD/ledger rewards never go to mailbox
      </p>
    </GameCard>
  );
}
