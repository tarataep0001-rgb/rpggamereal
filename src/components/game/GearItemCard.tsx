import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import type { InventoryGearItem } from "@/data/mockInventory";
import { equipmentTemplates } from "@/data/mockEquipment";
import { calculateEquipmentMainStatDisplay } from "@/utils/formulas";
import { formatBindType, formatGearLevelSnapshot, getSalvageReturn } from "@/utils/inventory";

type GearItemCardProps = {
  item: InventoryGearItem;
};

export function GearItemCard({ item }: GearItemCardProps) {
  const template = equipmentTemplates.find(
    (equipment) => equipment.gear_template_id === item.gear_template_id,
  );
  const mainStat = template
    ? calculateEquipmentMainStatDisplay(template, item.gear_level_snapshot)
    : `${item.main_stat_type} +?`;
  const salvageBlocked = item.equipped || item.locked;

  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-3">
      <div className="flex gap-3">
        <div className="w-20 shrink-0">
          <ItemIconFrame assetId={item.gear_template_id} label={item.display_name} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-bold text-white">{item.display_name}</p>
            <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-2 py-0.5 text-[11px] text-amber-100">
              {item.grade}
            </span>
            <span className="rounded-full border border-sky-300/30 bg-sky-400/10 px-2 py-0.5 text-[11px] text-sky-100">
              Tier {item.tier}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">{item.gear_instance_id}</p>
          <p className="mt-1 text-xs text-slate-300">{item.gear_template_id}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300">
            <span>{item.slot}</span>
            <span>{formatGearLevelSnapshot(item.gear_level_snapshot)}</span>
            <span>{mainStat}</span>
            <span>{formatBindType(item.bind_state)}</span>
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
        {item.substats.map((substat) => (
          <span
            className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-slate-200"
            key={`${item.gear_instance_id}-${substat.stat}`}
          >
            {substat.stat} +{substat.value}
          </span>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-white/10 bg-black/20 p-3 text-xs leading-5 text-slate-300">
        <p>{item.note}</p>
        <p>
          Salvage: {salvageBlocked ? "blocked because equipped/locked" : getSalvageReturn(item.grade)}
        </p>
      </div>
    </article>
  );
}
