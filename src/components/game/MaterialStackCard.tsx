import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import type { InventoryMaterial } from "@/data/mockInventory";
import { formatNumber } from "@/utils/formatting";

type MaterialStackCardProps = {
  item: InventoryMaterial;
};

export function MaterialStackCard({ item }: MaterialStackCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-3">
      <div className="flex gap-3">
        <div className="w-14 shrink-0">
          <ItemIconFrame assetId={item.asset_id} label={item.display_name} tone="blue" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-white">{item.display_name}</p>
          <p className="text-xs text-slate-500">{item.item_id}</p>
          <p className="mt-2 text-sm text-slate-200">
            {formatNumber(item.quantity)} / {formatNumber(item.max_stack)}
          </p>
          <p className="text-[11px] uppercase tracking-wide text-slate-500">{item.item_type}</p>
        </div>
      </div>
    </article>
  );
}
