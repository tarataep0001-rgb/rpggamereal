import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";
import type { InventoryEngineResult } from "@/engine/inventory";

type EnhancementPreviewPanelProps = {
  result: InventoryEngineResult;
};

export function EnhancementPreviewPanel({ result }: EnhancementPreviewPanelProps) {
  const preview = result.enhancement_preview;

  return (
    <GameCard>
      <SectionTitle eyebrow="Enhancement Preview" title="ดูตัวอย่างการตีบวก" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatBadge label="Current" value={`+${preview.current_enhance_level}`} tone="blue" />
        <StatBadge label="TargetEnhanceLevel" value={`+${preview.target_enhance_level}`} tone="gold" />
        <StatBadge label="Success" value={`${preview.success_rate}%`} tone="green" />
        <StatBadge label="Gold cost" value={preview.gold_cost.toLocaleString()} tone="gold" />
      </div>
      <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3 text-sm leading-6 text-slate-300">
        <p>ค่าใช้จ่ายตีบวกใช้ TargetEnhanceLevel</p>
        <p>Stone: {preview.required_stone}</p>
        <p>Failure: {preview.failure_rule}</p>
        <p>ไม่มี WLD / Paid Gem / ledger ในระบบนี้</p>
        <p>
          {preview.anti_break_note ??
            "+41 ถึง +50 มีความเสี่ยงไอเทมแตกถ้าไม่มียันต์กันแตก"}
        </p>
      </div>
    </GameCard>
  );
}
