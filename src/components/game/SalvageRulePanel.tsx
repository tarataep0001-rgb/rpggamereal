import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getSalvageReturn } from "@/utils/inventory";

export function SalvageRulePanel() {
  return (
    <GameCard>
      <SectionTitle eyebrow="Salvage / ย่อยอุปกรณ์" title="Live V1A salvage rules" />
      <div className="grid gap-2 text-sm text-slate-300">
        {(["Common", "Uncommon", "Rare"] as const).map((grade) => (
          <div
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2"
            key={grade}
          >
            <span>{grade}</span>
            <span className="font-semibold text-amber-100">{getSalvageReturn(grade)}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
        <p>ไอเทมที่ใส่อยู่หรือถูกล็อกไม่สามารถย่อยได้</p>
        <p>Salvage destroys the source item and real system must write salvage_log.</p>
        <p>ข้อมูลนี้เป็น mock สำหรับ prototype เท่านั้น</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <FeatureLockBadge label="Crafting ยังไม่เปิดใน V1A" status="schema-only" />
        <FeatureLockBadge label="Set Bonus ยังไม่เปิดใน V1A" status="schema-only" />
        <FeatureLockBadge label="Epic normal drop" status="schema-only" />
      </div>
    </GameCard>
  );
}
