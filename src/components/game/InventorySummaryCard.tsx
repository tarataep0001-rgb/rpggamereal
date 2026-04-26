import { GameCard } from "@/components/ui/GameCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";
import { calculateInventoryUsagePercent, isInventoryCloseToFull } from "@/utils/inventory";

type InventorySummaryCardProps = {
  usedSlots: number;
  totalSlots: number;
  mailboxCount: number;
  mailboxMaxActive: number;
};

export function InventorySummaryCard({
  usedSlots,
  totalSlots,
  mailboxCount,
  mailboxMaxActive,
}: InventorySummaryCardProps) {
  const usagePercent = calculateInventoryUsagePercent(usedSlots, totalSlots);
  const closeToFull = isInventoryCloseToFull(usedSlots, totalSlots);

  return (
    <GameCard className="border-amber-300/20 bg-gradient-to-br from-slate-950/95 via-indigo-950/60 to-slate-950/95">
      <div className="flex items-start justify-between gap-3">
        <SectionTitle eyebrow="Inventory / กระเป๋า" title="Bag capacity" />
        <span className="rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-100">
          V1A mock only
        </span>
      </div>
      <ProgressBar
        label={`${usedSlots} used / ${totalSlots} slots (${usagePercent}%)`}
        max={totalSlots}
        value={usedSlots}
      />
      {closeToFull ? (
        <p className="mt-3 rounded-xl border border-amber-300/30 bg-amber-400/10 p-3 text-sm text-amber-100">
          Inventory is close to full. ถ้ากระเป๋าเต็ม ระบบจะส่งของไปกล่องจดหมายเมื่อทำได้
        </p>
      ) : null}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <StatBadge label="Used slots" value={`${usedSlots}/${totalSlots}`} tone="gold" />
        <StatBadge label="Mailbox" value={`${mailboxCount}/${mailboxMaxActive}`} tone="blue" />
      </div>
    </GameCard>
  );
}
