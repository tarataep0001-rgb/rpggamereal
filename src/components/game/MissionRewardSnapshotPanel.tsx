import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { MissionPreview } from "@/engine/idle";

type MissionRewardSnapshotPanelProps = {
  missions: MissionPreview[];
};

export function MissionRewardSnapshotPanel({ missions }: MissionRewardSnapshotPanelProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow="Mission Reward Snapshot" title="No WLD / Paid Gem / ledger reward" />
      <div className="mt-3 space-y-2 text-sm text-slate-300">
        {missions.slice(0, 4).map((mission) => (
          <p key={mission.mission_id}>
            {mission.mission_id}: {mission.reward_snapshot.rewards.map((reward) => `${reward.display_name} x${reward.quantity}`).join(", ")}
          </p>
        ))}
      </div>
      <p className="mt-3 text-xs text-rose-100">ไม่มี WLD Reward ใน V1A / ไม่มี Paid Gem reward / ไม่มี ledger จริง</p>
    </GameCard>
  );
}
