import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";
import type { InventoryEngineResult } from "@/engine/inventory";

type EquipmentActionPreviewProps = {
  result: InventoryEngineResult;
};

function formatBlockedReasons(reasons: string[]) {
  return reasons.length > 0 ? reasons.join(" / ") : "พร้อมแสดงผล preview";
}

export function EquipmentActionPreview({ result }: EquipmentActionPreviewProps) {
  const selected = result.selected_gear;

  return (
    <GameCard>
      <SectionTitle eyebrow="Inventory Action Preview" title="ระบบกระเป๋าและอุปกรณ์" />
      <div className="grid gap-3 md:grid-cols-3">
        <StatBadge label="Selected gear" value={selected.gear_instance_id} tone="purple" />
        <StatBadge label="Snapshot level" value={selected.gear_level_snapshot} tone="blue" />
        <StatBadge label="Enhance" value={`+${selected.enhance_level}`} tone="gold" />
      </div>
      <div className="mt-4 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <p className="font-semibold text-white">ดูตัวอย่างการใส่อุปกรณ์</p>
          <p className="mt-1">
            Status: {result.equip_preview.can_equip ? "allowed" : "blocked"}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {formatBlockedReasons(result.equip_preview.blocked_reasons)}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <p className="font-semibold text-white">Unequip preview</p>
          <p className="mt-1">
            Status: {result.unequip_preview.can_unequip ? "allowed" : "blocked"}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {formatBlockedReasons(result.unequip_preview.blocked_reasons)}
          </p>
        </div>
        <div className="rounded-xl border border-amber-300/20 bg-amber-500/10 p-3">
          <p className="font-semibold text-amber-100">Salvage preview</p>
          <p className="mt-1">
            {result.salvage_preview.can_salvage ? "allowed" : "blocked"}
          </p>
          <p className="mt-1 text-xs text-amber-100/80">
            ไอเทมที่ใส่อยู่หรือถูกล็อกไม่สามารถย่อยได้
          </p>
        </div>
        <div className="rounded-xl border border-sky-300/20 bg-sky-500/10 p-3">
          <p className="font-semibold text-sky-100">Mailbox overflow preview</p>
          <p className="mt-1">
            {result.mailbox_preview.can_overflow_to_mailbox
              ? "inventory full -> mailbox available"
              : "inventory/mailbox check only"}
          </p>
          <p className="mt-1 text-xs text-sky-100/80">WLD/ledger never use mailbox.</p>
        </div>
      </div>
    </GameCard>
  );
}
