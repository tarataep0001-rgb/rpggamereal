import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import type { MockShopItem } from "@/data/mockShop";
import { formatShopPrice, getShopItemLockReason } from "@/utils/shop";

type ShopItemCardProps = {
  item: MockShopItem;
};

export function ShopItemCard({ item }: ShopItemCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
      <div className="flex gap-3">
        <div className="w-16 shrink-0">
          <ItemIconFrame
            assetId={item.asset_id}
            label={item.display_name}
            tone={item.locked ? "red" : item.currency === "Gold" ? "gold" : "blue"}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-bold text-white">{item.display_name}</p>
              <p className="text-[11px] text-slate-500">{item.item_id}</p>
            </div>
            <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-2 py-1 text-xs font-semibold text-amber-100">
              {formatShopPrice(item)}
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-300">Stock: {item.stock}</p>
          <p className="text-xs text-slate-400">{getShopItemLockReason(item)}</p>
          <button
            className="mt-3 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-slate-300"
            disabled
          >
            ระบบซื้อขายนี้เป็น mock เท่านั้น
          </button>
        </div>
      </div>
    </article>
  );
}
