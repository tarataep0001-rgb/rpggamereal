import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { GameCard } from "@/components/ui/GameCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getPityProgress, getPityText } from "@/utils/gacha";

type GachaPityPanelProps = {
  pullsSinceLastRare: number;
  pityLimit: number;
  pityAfter?: number;
  guaranteedTriggered?: boolean;
};

export function GachaPityPanel({
  guaranteedTriggered = false,
  pityAfter,
  pityLimit,
  pullsSinceLastRare,
}: GachaPityPanelProps) {
  return (
    <GameCard>
      <div className="flex gap-4">
        <div className="w-16 shrink-0">
          <ItemIconFrame assetId="icon_gacha_pity" label="Gacha pity" tone="gold" />
        </div>
        <div className="min-w-0 flex-1">
          <SectionTitle eyebrow="Pity" title="Rare guarantee preview" />
          <p className="text-sm text-slate-300">การันตี Rare ที่ครั้งที่ 30</p>
        </div>
      </div>
      <div className="mt-4">
        <ProgressBar
          label={getPityText(pullsSinceLastRare, pityLimit)}
          max={pityLimit}
          value={pullsSinceLastRare}
        />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <p className="text-xs text-slate-500">current pity counter</p>
          <p className="font-bold text-white">
            {pullsSinceLastRare}/{pityLimit}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <p className="text-xs text-slate-500">pity after result</p>
          <p className="font-bold text-white">{pityAfter ?? "-"}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-300">
        Pull #{pityLimit} guarantees Rare. Rare resets counter to 0. Guaranteed Rare uses equal Rare weight.
      </p>
      <p className="mt-1 text-xs text-slate-500">
        Guaranteed Rare state: {guaranteedTriggered ? "triggered" : "not triggered"} / Progress:{" "}
        {getPityProgress(pullsSinceLastRare, pityLimit)}%
      </p>
    </GameCard>
  );
}
