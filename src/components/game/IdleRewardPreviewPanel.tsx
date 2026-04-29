import { IdleDropPreview } from "@/components/game/IdleDropPreview";
import { IdleRewardCard } from "@/components/game/IdleRewardCard";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { IdleRewardPreview } from "@/engine/idle";

type IdleRewardPreviewPanelProps = {
  preview: IdleRewardPreview;
  onPreview: () => void;
};

export function IdleRewardPreviewPanel({ onPreview, preview }: IdleRewardPreviewPanelProps) {
  return (
    <div className="space-y-4">
      <IdleRewardCard
        accumulatedHours={preview.accumulated_hours}
        cappedHours={preview.capped_hours}
        goldReady={preview.gold_ready}
        highestThreeStarStage={preview.highest_three_star_stage}
        idleStage={preview.idle_stage}
        maxIdleHours={preview.max_idle_hours}
        onPreview={onPreview}
        xpReady={preview.xp_ready}
      />
      <GameCard>
        <SectionTitle eyebrow="Reward Snapshot" title="Mission Reward ใช้ reward_snapshot" />
        <div className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
          <p>reward_snapshot: {preview.reward_snapshot.reward_snapshot_id}</p>
          <p>idle_stage_global_index: {preview.idle_stage_global_index}</p>
          <p>ระบบจริงต้องใช้ server-authoritative reward snapshot</p>
          <p>รางวัลนี้เป็น local mock preview เท่านั้น</p>
        </div>
      </GameCard>
      <IdleDropPreview drops={[...preview.material_preview, ...preview.drop_preview]} />
    </div>
  );
}
