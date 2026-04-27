import { BattleResultHero } from "@/components/game/BattleResultHero";
import { BattleRewardSummary } from "@/components/game/BattleRewardSummary";
import { BattleRuleReference } from "@/components/game/BattleRuleReference";
import { BattleSnapshotNotice } from "@/components/game/BattleSnapshotNotice";
import { BattleTurnSummary } from "@/components/game/BattleTurnSummary";
import { DamageLogPreview } from "@/components/game/DamageLogPreview";
import { ProgressionDebugPanel } from "@/components/game/ProgressionDebugPanel";
import { ReplayRewardPanel } from "@/components/game/ReplayRewardPanel";
import { RewardAtomicityPanel } from "@/components/game/RewardAtomicityPanel";
import { SkillCastLogPreview } from "@/components/game/SkillCastLogPreview";
import { StageProgressSummary } from "@/components/game/StageProgressSummary";
import { StageRewardPreview } from "@/components/game/StageRewardPreview";
import { StageUnlockPanel } from "@/components/game/StageUnlockPanel";
import { StarChestPanel } from "@/components/game/StarChestPanel";
import { StarRatingBreakdown } from "@/components/game/StarRatingBreakdown";
import { StatusEffectSummary } from "@/components/game/StatusEffectSummary";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { createMockStageProgressInput, processBattleForStageProgress } from "@/engine/progression";

export function BattleResultScreen() {
  const progressInput = createMockStageProgressInput();
  const battleResult = progressInput.battleResult;
  const stageProgress = processBattleForStageProgress(progressInput);

  return (
    <div className="space-y-4 px-4">
      <BattleResultHero result={battleResult} />

      <GameCard className="border-sky-300/25 bg-sky-500/5">
        <SectionTitle eyebrow="Battle Engine Foundation" title="Deterministic Mock Result" />
        <div className="mb-3 flex flex-wrap gap-2">
          <FeatureLockBadge label="Deterministic mock" status="schema-only" />
          <FeatureLockBadge label="No backend server" status="disabled" />
          <FeatureLockBadge label="No real reward" status="disabled" />
          <FeatureLockBadge label="Production NO-GO" status="disabled" />
        </div>
        <div className="space-y-2 text-sm leading-6 text-slate-300">
          <p>ผลนี้มาจาก Battle Engine foundation แบบ deterministic mock ยังไม่ใช่ production server</p>
          <p>ใช้ Snapshot และ Seed เพื่อเตรียม deterministic replay แต่ยังไม่มี reward จริง ไม่มี WLD Reward และไม่มี ledger จริง</p>
          <p>ยังไม่ได้รัน simulation จริง และ Production status ยังคงเป็น NO-GO</p>
        </div>
      </GameCard>

      <StageProgressSummary progress={stageProgress} />
      <StageUnlockPanel progress={stageProgress} />

      <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <BattleRewardSummary result={battleResult} />
        <StarRatingBreakdown result={battleResult} />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <StageRewardPreview progress={stageProgress} />
        <StarChestPanel progress={stageProgress} />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <ReplayRewardPanel progress={stageProgress} />
        <RewardAtomicityPanel progress={stageProgress} />
      </div>

      <BattleTurnSummary summary={battleResult.turn_summary} />

      <div className="grid gap-4 xl:grid-cols-2">
        <DamageLogPreview logs={battleResult.damage_logs} />
        <SkillCastLogPreview logs={battleResult.skill_cast_logs} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <StatusEffectSummary logs={battleResult.status_logs} />
        <BattleSnapshotNotice result={battleResult} />
      </div>

      <ProgressionDebugPanel progress={stageProgress} />
      <BattleRuleReference />

      <GameCard className="border-rose-300/25">
        <SectionTitle eyebrow="Safety / Scope" title="Battle Result + Stage Progress Scope" />
        <div className="mb-4 flex flex-wrap gap-2">
          <FeatureLockBadge label="Foundation mock only" status="schema-only" />
          <FeatureLockBadge label="No production reward authority" status="disabled" />
          <FeatureLockBadge label="No WLD rewards" status="disabled" />
          <FeatureLockBadge label="Production NO-GO" status="disabled" />
        </div>
        <div className="space-y-2 text-sm leading-6 text-slate-300">
          <p>First Clear รับได้ครั้งเดียว และ StarChest รับได้ครั้งเดียวเมื่อทำ 3 ดาวครั้งแรก</p>
          <p>Replay Reward ใช้โควตารายวันและ Bangkok business date แบบ local mock เท่านั้น</p>
          <p>ระบบจริงต้องใช้ server-authoritative reward snapshot ไม่มี ledger จริง และไม่มี WLD Reward ใน V1A</p>
        </div>
      </GameCard>
    </div>
  );
}
