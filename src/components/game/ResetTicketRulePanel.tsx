import type { CharacterProgressionResult } from "@/engine/progression";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

type ResetTicketRulePanelProps = {
  progression: CharacterProgressionResult;
};

export function ResetTicketRulePanel({ progression }: ResetTicketRulePanelProps) {
  const reset = progression.reset_ticket_preview.basic_reset_ticket;

  return (
    <GameCard>
      <SectionTitle eyebrow="Reset Ticket" title="Behavior preview" />
      <div className="mb-3 flex flex-wrap gap-2">
        <FeatureLockBadge label={reset.can_preview ? "Basic preview available" : "Basic blocked"} status={reset.can_preview ? "schema-only" : "disabled"} />
        <FeatureLockBadge label="Advanced schema only" status="schema-only" />
      </div>
      <div className="space-y-2 text-sm leading-6 text-slate-300">
        <p>Basic Reset Ticket ไม่คืนวัสดุและไม่รีเซ็ตเลเวล</p>
        <p>ไม่รีเซ็ต skill levels, gear, resources, gacha characters, หรือ star levels</p>
        <p>ถ้า gear ที่ใส่อยู่ใช้ไม่ได้หลัง reset ต้อง unequip และถ้ากระเป๋าเต็มจะถูก block</p>
        {reset.blocked_reason ? <p className="text-rose-100">{reset.blocked_reason}</p> : null}
      </div>
    </GameCard>
  );
}
