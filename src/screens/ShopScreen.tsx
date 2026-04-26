import { LockedShopFeaturePanel } from "@/components/game/LockedShopFeaturePanel";
import { ShopResetPanel } from "@/components/game/ShopResetPanel";
import { ShopSection } from "@/components/game/ShopSection";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  gemShopItems,
  goldShopItems,
  guildShopItems,
  shopResetTimes,
} from "@/data/mockShop";
import { getInventoryExpansionPrice } from "@/utils/shop";

export function ShopScreen() {
  return (
    <div className="space-y-4 px-4">
      <GameCard className="border-amber-300/20 bg-gradient-to-br from-slate-950/95 via-amber-950/30 to-slate-950/95">
        <div className="flex items-start justify-between gap-3">
          <SectionTitle eyebrow="Shop / ร้านค้า" title="V1A shop mock" />
          <span className="rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-100">
            V1A mock only
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <FeatureLockBadge label="Gold Shop" status="enabled" />
          <FeatureLockBadge label="Gem Shop" status="enabled" />
          <FeatureLockBadge label="Guild Shop preview" status="enabled" />
          <FeatureLockBadge label="Paid shop" status="disabled" />
          <FeatureLockBadge label="WLD Payment" status="disabled" />
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-300">
          ระบบซื้อขายนี้เป็น mock เท่านั้น ไม่มีการชำระเงินจริง ไม่มี WLD Payment
          และไม่มี ledger/payment provider.
        </p>
      </GameCard>

      <ShopSection
        eyebrow="Gold Shop"
        items={goldShopItems}
        note="Daily stock uses Bangkok business date."
        title="Gold Shop"
      />
      <ShopSection
        eyebrow="Gem Shop"
        items={gemShopItems}
        note={`Inventory Expansion +20 starts ${getInventoryExpansionPrice(0)} Gem, increases +25 each purchase, max 200 Gem.`}
        title="Gem Shop"
      />
      <ShopSection
        eyebrow="Guild Shop"
        items={guildShopItems}
        note="Guild Shop weekly stock resets Monday 00:00 Asia/Bangkok."
        title="Guild Shop preview"
      />
      <ShopResetPanel resetTimes={shopResetTimes} />
      <LockedShopFeaturePanel />
    </div>
  );
}
