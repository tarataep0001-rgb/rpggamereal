import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { GachaRecoveryPolicyPreview } from "@/engine/gacha";

type GachaRecoveryRulePanelProps = {
  recoveryPolicy: GachaRecoveryPolicyPreview | null;
};

export function GachaRecoveryRulePanel({ recoveryPolicy }: GachaRecoveryRulePanelProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow="Recovery / Refund" title="Recovery-safe preview" />
      <div className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
        <p>ถ้ามีผลลัพธ์ finalized แล้ว recovery ต้องคืนผลเดิม</p>
        <p>Refund เฉพาะกรณีไม่มี finalized result</p>
        <p>Recovery ต้องไม่ให้รางวัลซ้ำ</p>
        <p>ไม่มี WLD / Paid Gem / ledger ในระบบนี้</p>
        <p>No WLD refund. No Paid Gem refund in V1A.</p>
        {recoveryPolicy ? (
          <p>
            refund snapshot: {recoveryPolicy.refund_currency_snapshot.currency} balance{" "}
            {recoveryPolicy.refund_currency_snapshot.balance_before}
          </p>
        ) : null}
      </div>
    </GameCard>
  );
}
