import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";
import type { ProcessedStageProgressResult } from "@/engine/progression";

type StageRewardPreviewProps = {
  progress: ProcessedStageProgressResult;
};

export function StageRewardPreview({ progress }: StageRewardPreviewProps) {
  const rewards = [...progress.first_clear.material_rewards, ...progress.first_clear.item_rewards];

  return (
    <GameCard>
      <SectionTitle eyebrow="Reward Preview" title="รางวัลด่าน / mock preview" />
      <div className="mb-3 flex flex-wrap gap-2">
        <FeatureLockBadge label="First Clear รับได้ครั้งเดียว" status="schema-only" />
        <FeatureLockBadge label="ไม่มี WLD Reward ใน V1A" status="disabled" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <StatBadge label="XP" value={progress.first_clear.xp_reward} tone="blue" />
        <StatBadge label="Gold" value={progress.first_clear.gold_reward} tone="gold" />
        <StatBadge label="First clear" value={progress.first_clear.first_clear_available ? "available" : "locked/claimed"} tone="green" />
        <StatBadge label="Gear chance" value={progress.first_clear.gear_chance_preview} tone="purple" />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {rewards.map((reward) => (
          <ItemIconFrame
            assetId={reward.icon_asset_id}
            key={`${reward.item_id}-${reward.quantity}`}
            label={`${reward.label} x${reward.quantity}`}
            tone="gold"
          />
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-400">
        รางวัลนี้เป็น mock preview เท่านั้น ระบบจริงต้องใช้ server-authoritative reward snapshot
      </p>
    </GameCard>
  );
}
