import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getAutoFarmPriceLabel } from "@/utils/idle";

type AutoFarmPanelProps = {
  freePerDay: number;
  usedToday: number;
  remainingToday?: number;
  autoFarmHours?: number;
  nextExtraPrice?: number | null;
  prices: readonly number[];
  onPreview?: () => void;
};

export function AutoFarmPanel({
  autoFarmHours = 2,
  freePerDay,
  nextExtraPrice,
  onPreview,
  prices,
  remainingToday,
  usedToday,
}: AutoFarmPanelProps) {
  return (
    <GameCard>
      <div className="flex gap-4">
        <div className="w-16 shrink-0">
          <ItemIconFrame assetId="icon_auto_farm" label="Auto Farm" tone="green" />
        </div>
        <div>
          <SectionTitle eyebrow="Auto Farm" title="Auto Farm เท่ากับ 2 ชั่วโมง Idle" />
          <p className="text-sm text-slate-300">
            Free Auto Farm ใช้ได้ {freePerDay} ครั้งต่อวัน / Auto Farm = {autoFarmHours} hours idle.
          </p>
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-300">
        Used today: {usedToday}/{freePerDay} / remaining: {remainingToday ?? Math.max(0, freePerDay - usedToday)}
      </div>
      <div className="mt-3 rounded-xl border border-amber-300/20 bg-amber-400/10 p-3 text-sm text-amber-100">
        Next extra price: {nextExtraPrice ?? "max ladder reached"} Free/Test Gem preview only
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {prices.map((price, index) => (
          <span
            className="rounded-xl border border-violet-300/20 bg-violet-400/10 px-3 py-2 text-xs text-violet-100"
            key={`${price}-${index}`}
          >
            {getAutoFarmPriceLabel(price, index)}
          </span>
        ))}
      </div>
      {onPreview ? (
        <button
          className="mt-4 rounded-xl border border-emerald-300/30 bg-emerald-400/10 px-3 py-2 text-xs font-bold text-emerald-100"
          onClick={onPreview}
          type="button"
        >
          Preview Auto Farm
        </button>
      ) : null}
      <p className="mt-4 text-xs text-rose-100">Paid Gem and WLD systems are not involved.</p>
    </GameCard>
  );
}
