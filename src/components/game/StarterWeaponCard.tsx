import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { class1Previews, mainCharacter } from "@/data/mockCharacters";
import { equipmentTemplates, mockEquipment } from "@/data/mockEquipment";
import { calculateEquipmentMainStatDisplay } from "@/utils/formulas";

export function StarterWeaponCard() {
  const equippedWeapon = mockEquipment.find(
    (item) => item.gear_template_id === mainCharacter.starterWeaponId && item.equipped,
  );
  const template = equipmentTemplates.find(
    (item) => item.gear_template_id === mainCharacter.starterWeaponId,
  );

  return (
    <GameCard>
      <SectionTitle eyebrow="Starter Weapon" title="V1A starter equipment" />
      <div className="rounded-2xl border border-amber-300/25 bg-amber-400/10 p-3">
        <p className="text-sm font-bold text-white">
          Equipped: {equippedWeapon?.display_name_th ?? "Training Sword"}
        </p>
        <p className="mt-1 text-xs text-slate-300">
          gear_template_id: {mainCharacter.starterWeaponId}
        </p>
        <p className="mt-1 text-xs text-slate-300">
          gear_level_snapshot: {equippedWeapon?.gear_level_snapshot ?? 12}
        </p>
        <p className="mt-1 text-xs text-slate-300">bind_type: account_inventory_unbound display note</p>
        {template ? (
          <p className="mt-2 text-xs text-amber-100">
            {calculateEquipmentMainStatDisplay(
              template,
              equippedWeapon?.gear_level_snapshot ?? 12,
            )}
          </p>
        ) : null}
      </div>

      <div className="mt-4 space-y-2">
        {class1Previews.map((item) => (
          <div
            className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-xs"
            key={item.className}
          >
            <span className="text-slate-200">{item.className}</span>
            <span className="text-amber-100">{item.starterWeaponId}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-400">
        Starter weapon must be granted/equipped before stage 1-1. This is a V1A display mock only.
      </p>
    </GameCard>
  );
}
