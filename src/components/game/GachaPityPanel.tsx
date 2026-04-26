import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { GameCard } from "@/components/ui/GameCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getPityProgress, getPityText } from "@/utils/gacha";

type GachaPityPanelProps = {
  pullsSinceLastRare: number;
  pityLimit: number;
};

export function GachaPityPanel({ pullsSinceLastRare, pityLimit }: GachaPityPanelProps) {
  return (
    <GameCard>
      <div className="flex gap-4">
        <div className="w-16 shrink-0">
          <ItemIconFrame assetId="icon_gacha_pity" label="Gacha pity" tone="gold" />
        </div>
        <div className="min-w-0 flex-1">
          <SectionTitle eyebrow="Pity" title="Rare guarantee preview" />
          <p className="text-sm text-slate-300">
            การันตี Rare ที่ครั้งที่ 30 ถ้ายังไม่ได้ Rare
          </p>
        </div>
      </div>
      <div className="mt-4">
        <ProgressBar
          label={getPityText(pullsSinceLastRare, pityLimit)}
          max={pityLimit}
          value={pullsSinceLastRare}
        />
      </div>
      <p className="mt-3 text-sm text-slate-300">
        Pull #{pityLimit} guarantees Rare. Rare resets counter to 0. Guaranteed Rare uses equal Rare weight.
      </p>
      <p className="mt-1 text-xs text-slate-500">
        Progress: {getPityProgress(pullsSinceLastRare, pityLimit)}%
      </p>
    </GameCard>
  );
}
