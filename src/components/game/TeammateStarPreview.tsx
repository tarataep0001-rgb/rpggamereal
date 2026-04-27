import type { CharacterProgressionResult } from "@/engine/progression";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";

type TeammateStarPreviewProps = {
  progression: CharacterProgressionResult;
};

export function TeammateStarPreview({ progression }: TeammateStarPreviewProps) {
  const star = progression.star_preview;
  const duplicate = progression.duplicate_preview;

  return (
    <GameCard>
      <SectionTitle eyebrow="Teammate Star" title="Shard progression preview" />
      <div className="mb-3 flex flex-wrap gap-2">
        <FeatureLockBadge label="Main has no Star" status="disabled" />
        <FeatureLockBadge label="Gacha teammates only" status="schema-only" />
        <FeatureLockBadge label="Shard exchange disabled" status="disabled" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <StatBadge label="Current Star" value={star.current_star} tone="gold" />
        <StatBadge label="Next Star" value={star.next_star ?? "Max"} tone="green" />
        <StatBadge label="Shards Owned" value={star.shards_owned} tone="blue" />
        <StatBadge label="Required" value={star.shards_required} tone="purple" />
        <StatBadge label="Duplicate" value={`${duplicate.grade} +${duplicate.shard_gain}`} tone="gold" />
        <StatBadge label="Extra Stored" value={star.extra_shards_stored} tone="green" />
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-300">
        Duplicate จะกลายเป็น Shard. Star max = 5 และ shard ส่วนเกินหลัง Star 5 จะถูกเก็บไว้.
      </p>
    </GameCard>
  );
}
