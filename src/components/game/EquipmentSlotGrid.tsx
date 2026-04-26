import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import type { InventoryGearItem } from "@/data/mockInventory";
import type { GearSlot } from "@/types/game";
import { formatGearLevelSnapshot } from "@/utils/inventory";

type EquipmentSlotGridProps = {
  slots: GearSlot[];
  equippedItems: readonly InventoryGearItem[];
};

export function EquipmentSlotGrid({ slots, equippedItems }: EquipmentSlotGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {slots.map((slot) => {
        const item = equippedItems.find((gear) => gear.slot === slot);

        return (
          <div
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-3"
            key={slot}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {slot}
            </p>
            {item ? (
              <div className="mt-3 flex gap-3">
                <div className="w-16 shrink-0">
                  <ItemIconFrame assetId={item.gear_template_id} label={item.display_name} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white">{item.display_name}</p>
                  <p className="text-xs text-amber-100">{item.grade} / Tier {item.tier}</p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {formatGearLevelSnapshot(item.gear_level_snapshot)}
                  </p>
                  <p className="mt-1 text-[11px] text-emerald-200">equipped</p>
                </div>
              </div>
            ) : (
              <div className="mt-3 rounded-xl border border-dashed border-white/10 bg-slate-900/60 p-4 text-center text-xs text-slate-500">
                Empty slot
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
