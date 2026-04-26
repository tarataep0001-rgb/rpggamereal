import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { equipmentItemDropExport } from "@/config/equipmentItemDropExport";

export function EquipmentItemDropExportPanel() {
  return (
    <GameCard className="border-cyan-300/20 bg-gradient-to-br from-slate-950/95 via-cyan-950/30 to-slate-950/95">
      <SectionTitle
        eyebrow="Export Equipment / Item / Material / Drop"
        title="Equipment / Item / Material / Drop Export Status"
      />
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-slate-400">Equipment Template</p>
          <p className="text-xl font-black text-white">
            {equipmentItemDropExport.equipment_config.template_count}
          </p>
          <p className="mt-1 text-xs text-cyan-100">รายการ</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-slate-400">Families / Tiers</p>
          <p className="text-xl font-black text-white">
            {equipmentItemDropExport.equipment_config.family_count} /{" "}
            {equipmentItemDropExport.equipment_config.tier_count}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-slate-400">Materials</p>
          <p className="text-xl font-black text-white">
            {equipmentItemDropExport.item_material_config.material_count}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-slate-400">Drop table patterns</p>
          <p className="text-xl font-black text-white">
            {equipmentItemDropExport.drop_config.drop_table_pattern_count}
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
        <p>Crafting ยังไม่เปิดใน V1A</p>
        <p>Set Bonus ยังไม่เปิดใน V1A</p>
        <p>Epic Gear ไม่ดรอปปกติใน V1A</p>
        <p>Drop Config นี้เป็น mock/export-ready foundation</p>
      </div>
    </GameCard>
  );
}
