import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";

export function IdleMissionFoundationPanel() {
  return (
    <GameCard>
      <SectionTitle eyebrow="Idle / Mission Foundation" title="Local mock reward snapshots" />
      <div className="mt-3 grid grid-cols-2 gap-2">
        <StatBadge label="Idle max" value="8h" tone="blue" />
        <StatBadge label="Auto Farm" value="2/day free" tone="green" />
        <StatBadge label="Daily reset" value="00:00 BKK" tone="gold" />
        <StatBadge label="Weekly reset" value="Mon 00:00" tone="purple" />
      </div>
      <div className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
        <p>Mission reward snapshots are local mock previews.</p>
        <p>No admin reward authority, WLD, Paid Gem reward, ledger, or production action exists.</p>
        <p className="font-semibold text-rose-100">Production status: NO-GO</p>
      </div>
    </GameCard>
  );
}
