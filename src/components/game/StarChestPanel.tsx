import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";
import type { ProcessedStageProgressResult } from "@/engine/progression";

type StarChestPanelProps = {
  progress: ProcessedStageProgressResult;
};

export function StarChestPanel({ progress }: StarChestPanelProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow="StarChest" title="StarChest รับได้ครั้งเดียวเมื่อทำ 3 ดาวครั้งแรก" />
      <div className="grid grid-cols-2 gap-2">
        <StatBadge label="Available" value={progress.star_chest.available ? "yes" : "no"} tone={progress.star_chest.available ? "green" : "red"} />
        <StatBadge label="Claimed before" value={progress.star_chest.claimed_before ? "yes" : "no"} tone="purple" />
        <StatBadge label="Unlocked now" value={progress.star_chest.unlocked_now ? "yes" : "no"} tone="gold" />
        <StatBadge label="Stage" value={progress.star_chest.stage_id} tone="blue" />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {progress.star_chest.reward_snapshot.map((reward) => (
          <ItemIconFrame
            assetId={reward.icon_asset_id}
            key={reward.item_id}
            label={`${reward.label} x${reward.quantity}`}
            tone="purple"
          />
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-400">
        Paid Gem และ WLD ไม่ถูก grant จาก StarChest ใน V1A
      </p>
    </GameCard>
  );
}
