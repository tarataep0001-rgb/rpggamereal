import { ShopItemCard } from "@/components/game/ShopItemCard";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { guildShopItems } from "@/data/mockShop";

export function GuildShopPreview() {
  return (
    <GameCard>
      <SectionTitle eyebrow="Guild Shop" title="Guild Point preview" />
      <div className="grid gap-3">
        {guildShopItems.map((item) => (
          <ShopItemCard item={item} key={item.item_id} />
        ))}
      </div>
      <p className="mt-4 text-sm text-slate-300">
        Anti-break Charm = 20 fragments when feature live. Guild Shop weekly stock resets Monday 00:00 Asia/Bangkok.
      </p>
    </GameCard>
  );
}
