import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { GachaEngineResult } from "@/engine/gacha";

type GachaResultPreviewProps = {
  preview: GachaEngineResult | null;
};

export function GachaResultPreview({ preview }: GachaResultPreviewProps) {
  const result = preview?.result;

  return (
    <GameCard>
      <SectionTitle eyebrow="Gacha Result Preview" title="Character unlock preview" />
      {result ? (
        <div className="mt-3 flex gap-4">
          <div className="w-20 shrink-0">
            <ItemIconFrame
              assetId={result.character.asset_id}
              label={result.character.display_name}
              tone={result.grade === "Rare" ? "gold" : result.grade === "Uncommon" ? "purple" : "blue"}
            />
          </div>
          <div className="min-w-0 flex-1 space-y-2 text-sm text-slate-300">
            <div>
              <p className="font-black text-white">{result.character.display_name}</p>
              <p className="text-xs text-slate-500">{result.character_id}</p>
            </div>
            <p>
              {result.grade} / {result.character.element} / {result.character.class_name} / {result.character.role}
            </p>
            <p>{preview.shard_preview.is_new_unlock ? "New unlock preview" : "Duplicate จะกลายเป็น Shard"}</p>
            <p>Shard gain: {preview.shard_preview.shard_gain}</p>
          </div>
        </div>
      ) : (
        <p className="mt-3 text-sm text-slate-300">No result preview selected.</p>
      )}
    </GameCard>
  );
}
