import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { RewardCurrencyBadge } from "@/components/game/RewardCurrencyBadge";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { GachaBox } from "@/types/game";
import { getBoxStatusText, getPityProgress } from "@/utils/gacha";

type GachaBoxCardProps = {
  box: GachaBox;
};

export function GachaBoxCard({ box }: GachaBoxCardProps) {
  const pityProgress = getPityProgress(
    box.pityState.currentCounter,
    box.pityState.pityLimit,
  );

  return (
    <GameCard className="border-violet-300/20 bg-gradient-to-br from-slate-950/95 via-violet-950/55 to-slate-950/95">
      <div className="flex gap-4">
        <div className="w-20 shrink-0">
          <ItemIconFrame assetId="bg_gacha_box_1_fantasy" label={box.name} tone="purple" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <SectionTitle eyebrow="Gacha / กาชา" title={box.name} />
            <FeatureLockBadge
              label={box.enabled ? "Box live" : "Box locked"}
              status={box.enabled ? "enabled" : "disabled"}
            />
          </div>
          <p className="text-sm text-slate-300">{getBoxStatusText(box)}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <RewardCurrencyBadge label="Currency" value={box.currency} tone="blue" />
        <RewardCurrencyBadge label="Single pull" value={box.singlePullEnabled ? "mock" : "locked"} />
        <RewardCurrencyBadge label="Multi-pull" value="schema-only" tone="red" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {Object.entries(box.rates).map(([grade, rate]) => (
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center" key={grade}>
            <p className="text-xs text-slate-400">{grade}</p>
            <p className="text-lg font-black text-white">{rate}%</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <ProgressBar
          label={`Pity ${box.pityState.currentCounter}/${box.pityState.pityLimit} (${pityProgress}%)`}
          max={box.pityState.pityLimit}
          value={box.pityState.currentCounter}
        />
      </div>
      <div className="mt-4 rounded-xl border border-amber-300/30 bg-amber-400/10 px-4 py-3 text-sm font-bold text-amber-100">
        สุ่มครั้งเดียวเท่านั้น (mock preview)
      </div>
      <p className="mt-3 text-xs text-rose-100">
        Paid Gem Gacha ยังไม่เปิด / no real money logic.
      </p>
    </GameCard>
  );
}
