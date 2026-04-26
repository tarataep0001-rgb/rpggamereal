import { AutoFarmPanel } from "@/components/game/AutoFarmPanel";
import { IdleDropPreview } from "@/components/game/IdleDropPreview";
import { IdleRewardCard } from "@/components/game/IdleRewardCard";
import { IdleXpDistributionPanel } from "@/components/game/IdleXpDistributionPanel";
import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { mockIdle } from "@/data/mockIdle";
import { summarizeIdleDropPreview } from "@/utils/idle";

export function IdleClaimScreen() {
  return (
    <div className="space-y-4 px-4">
      <IdleRewardCard
        accumulatedHours={mockIdle.accumulatedHours}
        goldReady={mockIdle.goldReady}
        highestThreeStarStage={mockIdle.highestThreeStarStage}
        idleStage={mockIdle.idleStage}
        maxIdleHours={mockIdle.maxIdleHours}
        xpReady={mockIdle.xpReady}
      />

      <IdleXpDistributionPanel
        deployedTeamSnapshot={mockIdle.deployedTeamSnapshot}
        undeployedPreview={mockIdle.undeployedPreview}
      />

      <AutoFarmPanel
        freePerDay={mockIdle.autoFarmFreePerDay}
        prices={mockIdle.extraAutoFarmPrices}
        usedToday={mockIdle.autoFarmUsedToday}
      />

      <GameCard>
        <SectionTitle eyebrow="Snapshot / Atomicity" title="Display-only claim rules" />
        <div className="flex gap-4">
          <div className="w-16 shrink-0">
            <ItemIconFrame assetId="icon_idle_snapshot" label="Idle snapshot" tone="purple" />
          </div>
          <div className="space-y-2 text-sm leading-6 text-slate-300">
            <p>Idle claim uses reward_snapshot in the real system.</p>
            <p>Claim must be atomic.</p>
            <p>If inventory lacks space, item rewards attempt mailbox overflow.</p>
            <p>If mailbox also full, claim is blocked before partial reward.</p>
            <p>ระบบจริงต้องคำนวณจาก server/config version</p>
          </div>
        </div>
      </GameCard>

      <IdleDropPreview drops={mockIdle.materialPreview} />

      <GameCard>
        <SectionTitle eyebrow="Safety / Scope" title="Prototype constraints" />
        <div className="space-y-2 text-sm leading-6 text-slate-300">
          <p>Drop preview: {summarizeIdleDropPreview(mockIdle.materialPreview)}</p>
          {mockIdle.safetyNotes.map((note) => (
            <p key={note}>{note}</p>
          ))}
          <p>No server-authoritative idle calculation exists in this phase.</p>
          <p>No real reward claim, WLD reward, paid feature, or production launch status exists.</p>
          <p className="font-semibold text-rose-100">Production status remains NO-GO.</p>
        </div>
      </GameCard>
    </div>
  );
}
