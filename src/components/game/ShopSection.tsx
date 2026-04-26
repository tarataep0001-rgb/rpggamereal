import { ShopItemCard } from "@/components/game/ShopItemCard";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { MockShopItem } from "@/data/mockShop";

type ShopSectionProps = {
  eyebrow: string;
  title: string;
  items: readonly MockShopItem[];
  note?: string;
};

export function ShopSection({ eyebrow, title, items, note }: ShopSectionProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow={eyebrow} title={title} />
      {note ? <p className="mb-4 text-sm text-slate-300">{note}</p> : null}
      <div className="grid gap-3">
        {items.map((item) => (
          <ShopItemCard item={item} key={item.item_id} />
        ))}
      </div>
    </GameCard>
  );
}
