import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { InventoryEngineResult } from "@/engine/inventory";

type InventoryActionDebugPanelProps = {
  result: InventoryEngineResult;
};

export function InventoryActionDebugPanel({ result }: InventoryActionDebugPanelProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow="Safety / Scope" title="ระบบนี้เป็น local mock preview เท่านั้น" />
      <div className="space-y-2 text-sm leading-6 text-slate-300">
        {result.safety_notes.map((note) => (
          <p key={note}>{note}</p>
        ))}
        <p>ไม่มีการ mutate item จริง ไม่มี reward authority และไม่มี backend/database จริง</p>
        <p>WLD/ledger rewards never use mailbox.</p>
        <p>Crafting ยังไม่เปิดใน V1A</p>
        <p>Set Bonus ยังไม่เปิดใน V1A</p>
        <p>Epic gear ไม่ดรอปปกติใน V1A</p>
      </div>
    </GameCard>
  );
}
