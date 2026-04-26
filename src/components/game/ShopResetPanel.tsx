import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { formatShopResetTime } from "@/utils/shop";

type ShopResetPanelProps = {
  resetTimes: readonly string[];
};

export function ShopResetPanel({ resetTimes }: ShopResetPanelProps) {
  return (
    <GameCard>
      <div className="flex gap-4">
        <div className="w-16 shrink-0">
          <ItemIconFrame assetId="icon_shop_reset_time" label="Shop reset" tone="blue" />
        </div>
        <div>
          <SectionTitle eyebrow="Reset" title="Shop reset times" />
          <p className="text-sm text-slate-300">รีเซ็ตร้านค้าเวลา 00:00 Asia/Bangkok</p>
        </div>
      </div>
      <div className="mt-4 space-y-2 text-sm text-slate-300">
        {resetTimes.map((item) => (
          <p key={item}>{formatShopResetTime(item)}</p>
        ))}
      </div>
    </GameCard>
  );
}
