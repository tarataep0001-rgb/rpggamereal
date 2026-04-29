import { GameCard } from "@/components/ui/GameCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { GachaShardPreview } from "@/engine/gacha";

type GachaShardPreviewPanelProps = {
  preview: GachaShardPreview | null;
};

export function GachaShardPreviewPanel({ preview }: GachaShardPreviewPanelProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow="Shard / Star" title="Star upgrade preview integration" />
      {preview ? (
        <div className="mt-3 space-y-3 text-sm text-slate-300">
          <p>{preview.is_new_unlock ? "First pull unlocks character" : "Duplicate จะกลายเป็น Shard"}</p>
          <p>Shard gain: {preview.shard_gain}</p>
          <ProgressBar
            label={`Star ${preview.star_preview.current_star} -> ${preview.star_preview.next_star ?? "max"}`}
            max={Math.max(1, preview.star_preview.shards_required_for_next_star)}
            value={Math.min(
              preview.star_preview.shards_required_for_next_star || preview.star_preview.shards_owned_after_preview,
              preview.star_preview.shards_owned_after_preview,
            )}
          />
          <p>
            can upgrade after preview: {preview.star_preview.can_upgrade_after_preview ? "yes" : "no"}
          </p>
          <p>Shard Exchange ยังไม่เปิดใน V1A</p>
          <p>If Star 5 already, extra shards are stored: {preview.extra_shards_stored}</p>
        </div>
      ) : (
        <p className="mt-3 text-sm text-slate-300">No shard preview selected.</p>
      )}
    </GameCard>
  );
}
