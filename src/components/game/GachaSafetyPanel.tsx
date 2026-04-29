import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function GachaSafetyPanel() {
  const locks = [
    "Paid Gem Gacha ยังไม่เปิด",
    "Box 2 ยังไม่เปิดใน V1A",
    "Box 3 ยังไม่เปิด",
    "Multi-pull ยังไม่เปิด",
    "no real payment",
    "no ledger",
  ];

  return (
    <GameCard>
      <div className="flex items-start justify-between gap-3">
        <SectionTitle eyebrow="Locked Features" title="Production status: NO-GO" />
        <FeatureLockBadge label="NO-GO" status="disabled" />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {locks.map((label) => (
          <FeatureLockBadge key={label} label={label} status="disabled" />
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">
        ไม่มี WLD / Paid Gem / ledger ในระบบนี้. ระบบนี้เป็น local mock preview เท่านั้น.
      </p>
    </GameCard>
  );
}
