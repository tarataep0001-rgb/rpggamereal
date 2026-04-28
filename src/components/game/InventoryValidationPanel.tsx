import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { InventoryEngineResult } from "@/engine/inventory";

type InventoryValidationPanelProps = {
  result: InventoryEngineResult;
};

export function InventoryValidationPanel({ result }: InventoryValidationPanelProps) {
  const validation = result.validation;

  return (
    <GameCard>
      <SectionTitle eyebrow="Inventory Validation" title="ตรวจสอบระบบกระเป๋า" />
      <div className="grid gap-2 text-sm text-slate-300 md:grid-cols-2">
        <p>Capacity: {result.usage.used_inventory_slots}/{result.usage.inventory_slots}</p>
        <p>Stack limit check: local mock validation</p>
        <p>Equipped gear check: included</p>
        <p>Mailbox check: {result.mailbox_preview.mailbox_count_after_preview}/100</p>
        <p>Crafting disabled: checked</p>
        <p>Set Bonus disabled: checked</p>
        <p>Epic normal drop disabled: checked</p>
        <p>WLD/ledger mailbox check: never mailbox</p>
      </div>
      <div className="mt-3 rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-slate-300">
        <p>Status: {validation.status}</p>
        {validation.errors.length > 0 ? <p>Errors: {validation.errors.join(" / ")}</p> : null}
        <p>Warnings: {validation.warnings.join(" / ")}</p>
      </div>
    </GameCard>
  );
}
