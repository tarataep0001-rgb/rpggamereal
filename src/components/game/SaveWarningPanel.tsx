import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

const warnings = [
  "ระบบ Save นี้เป็น local mock สำหรับ prototype เท่านั้น",
  "ยังไม่ใช่ server-authoritative state",
  "ยังไม่มี backend/database จริง",
  "ห้ามใช้ข้อมูลนี้แทน production save",
  "ไม่มีการเก็บข้อมูลลับ",
  "ไม่มี WLD จริง",
  "ไม่มี ledger จริง",
  "ไม่มี real paid data",
  "Production status: NO-GO",
  "ถ้า Save เสีย ระบบจะ fallback เป็น mock state เริ่มต้น",
] as const;

export function SaveWarningPanel() {
  return (
    <GameCard className="border-amber-300/25">
      <SectionTitle eyebrow="Save Safety" title="Local mock only" />
      <div className="space-y-2 text-sm leading-6 text-slate-300">
        {warnings.map((warning) => (
          <p key={warning}>{warning}</p>
        ))}
      </div>
    </GameCard>
  );
}
