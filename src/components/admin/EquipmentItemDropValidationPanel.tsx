import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { equipmentItemDropExport } from "@/config/equipmentItemDropExport";
import {
  validateDropConfigV1A,
  validateEquipmentConfigV1A,
  validateItemMaterialConfigV1A,
} from "@/utils/configValidation";

const rows = [
  {
    id: "equipment",
    label: "Equipment config validation",
    passed: validateEquipmentConfigV1A(),
    detail: "78 templates, 13 families, 2 tiers, Common/Uncommon/Rare only, Epic/Crafting/Set Bonus locked.",
  },
  {
    id: "item-material",
    label: "Item/material config validation",
    passed: validateItemMaterialConfigV1A(),
    detail: "Unique item IDs, stack limits, fragment conversions, Advanced Emblem schema-only.",
  },
  {
    id: "drop",
    label: "Drop config validation",
    passed: validateDropConfigV1A(),
    detail: "Gear roll rates, 100% distributions, gear chests, 30 Chapter 1-5 drop table IDs.",
  },
];

export function EquipmentItemDropValidationPanel() {
  return (
    <GameCard>
      <SectionTitle eyebrow="Validation" title="Equipment / Item / Drop mock validation" />
      <div className="space-y-2 text-sm">
        {rows.map((row) => (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2" key={row.id}>
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-white">{row.label}</span>
              <span className={row.passed ? "text-emerald-100" : "text-rose-100"}>
                {row.passed ? "PASS" : "FAIL"}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">{row.detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2 text-sm text-amber-100">
        {equipmentItemDropExport.limitations.map((limitation) => (
          <p key={limitation}>- {limitation}</p>
        ))}
        <p>- ยังไม่ใช่ production config</p>
        <p>- ยังไม่ได้รัน simulation จริง</p>
        <p>- ยังไม่มี drop engine จริง</p>
      </div>
    </GameCard>
  );
}
