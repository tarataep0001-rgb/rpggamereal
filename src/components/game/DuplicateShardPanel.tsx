import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { duplicateShardRules } from "@/data/mockGacha";

export function DuplicateShardPanel() {
  return (
    <GameCard>
      <SectionTitle eyebrow="Duplicate / Shard" title="Duplicate conversion" />
      <div className="grid gap-2">
        {duplicateShardRules.map((rule) => (
          <div
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm"
            key={rule.grade}
          >
            <span className="text-slate-200">{rule.grade} duplicate</span>
            <span className="font-bold text-amber-100">{rule.shards} shards</span>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
        <p>Duplicate จะกลายเป็น Shard</p>
        <p>First pull unlocks character. Star system applies to teammates only.</p>
        <p>If Star 5 already, extra shards are stored.</p>
        <p>Shard exchange disabled/schema only in V1A.</p>
      </div>
    </GameCard>
  );
}
