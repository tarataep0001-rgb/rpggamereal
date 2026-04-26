import Image from "next/image";
import { getLocalAssetImagePath } from "@/data/localAssetImages";
import type { EquipmentItem, EquipmentSlotName } from "@/types/game";

type EquipmentSlotProps = {
  slot: EquipmentSlotName;
  item?: EquipmentItem;
};

export function EquipmentSlot({ slot, item }: EquipmentSlotProps) {
  const imagePath = item ? getLocalAssetImagePath(item.gear_template_id) : null;

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-3">
      <p className="text-xs font-semibold uppercase text-slate-400">{slot}</p>
      {item ? (
        <>
          {imagePath ? (
            <div className="relative mt-3 aspect-square w-full overflow-hidden rounded-xl border border-white/10">
              <Image
                alt={item.display_name_th}
                className="object-cover"
                fill
                loading="eager"
                sizes="50vw"
                src={imagePath}
                unoptimized
              />
            </div>
          ) : null}
          <p className="mt-2 text-sm font-bold text-white">
            {item.display_name_th}
          </p>
          <p className="text-xs text-amber-100">{item.grade}</p>
          <p className="text-[11px] text-slate-400">
            Lv snapshot {item.gear_level_snapshot}
          </p>
        </>
      ) : (
        <p className="mt-2 text-sm text-slate-500">Empty slot</p>
      )}
    </div>
  );
}
