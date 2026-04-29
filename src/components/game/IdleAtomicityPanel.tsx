import { GameCard } from "@/components/ui/GameCard";
import { StatBadge } from "@/components/ui/StatBadge";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { IdleAtomicityPreview } from "@/engine/idle";

type IdleAtomicityPanelProps = {
  atomicity: IdleAtomicityPreview;
};

export function IdleAtomicityPanel({ atomicity }: IdleAtomicityPanelProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow="Atomicity" title="All-or-nothing claim preview" />
      <div className="mt-3 grid grid-cols-2 gap-2">
        <StatBadge label="Inventory" value={`${atomicity.used_inventory_slots}/${atomicity.inventory_slots}`} tone="blue" />
        <StatBadge label="Mailbox" value={`${atomicity.mailbox_count}/${atomicity.mailbox_limit}`} tone="purple" />
        <StatBadge label="Needs slots" value={atomicity.item_rewards_need_slots} tone="gold" />
        <StatBadge label="Blocked" value={atomicity.blocked_before_partial_reward ? "yes" : "no"} tone={atomicity.blocked_before_partial_reward ? "red" : "green"} />
      </div>
      <div className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
        <p>Claim must be atomic: either all rewards grant/log or claim fails safely.</p>
        <p>If inventory lacks space, item rewards attempt mailbox overflow.</p>
        <p>If mailbox also full, claim is blocked before partial rewards.</p>
        <p>WLD/ledger rewards never go to mailbox.</p>
      </div>
    </GameCard>
  );
}
