import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getAutoFarmPriceLabel } from "@/utils/idle";

type AutoFarmPanelProps = {
  freePerDay: number;
  usedToday: number;
  prices: readonly number[];
};

export function AutoFarmPanel({ freePerDay, usedToday, prices }: AutoFarmPanelProps) {
  return (
    <GameCard>
      <div className="flex gap-4">
        <div className="w-16 shrink-0">
          <ItemIconFrame assetId="icon_auto_farm" label="Auto Farm" tone="green" />
        </div>
        <div>
          <SectionTitle eyebrow="Auto Farm" title="2 hours idle shortcut" />
          <p className="text-sm text-slate-300">
            Auto Farm เท่ากับ 2 ชั่วโมง Idle / Free Auto Farm {freePerDay}/day
          </p>
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-300">
        Used today: {usedToday}/{freePerDay}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {prices.map((price, index) => (
          <span
            className="rounded-xl border border-violet-300/20 bg-violet-400/10 px-3 py-2 text-xs text-violet-100"
            key={price}
          >
            {getAutoFarmPriceLabel(price, index)}
          </span>
        ))}
      </div>
      <p className="mt-4 text-xs text-rose-100">Paid/WLD systems are not involved.</p>
    </GameCard>
  );
}
