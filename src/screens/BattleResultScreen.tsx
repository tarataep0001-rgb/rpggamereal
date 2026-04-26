import { BattleResultHero } from "@/components/game/BattleResultHero";
import { BattleRewardSummary } from "@/components/game/BattleRewardSummary";
import { BattleRuleReference } from "@/components/game/BattleRuleReference";
import { BattleSnapshotNotice } from "@/components/game/BattleSnapshotNotice";
import { BattleTurnSummary } from "@/components/game/BattleTurnSummary";
import { DamageLogPreview } from "@/components/game/DamageLogPreview";
import { SkillCastLogPreview } from "@/components/game/SkillCastLogPreview";
import { StarRatingBreakdown } from "@/components/game/StarRatingBreakdown";
import { StatusEffectSummary } from "@/components/game/StatusEffectSummary";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { mockBattleResult } from "@/data/mockBattleResult";

export function BattleResultScreen() {
  return (
    <div className="space-y-4 px-4">
      <BattleResultHero result={mockBattleResult} />

      <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <BattleRewardSummary result={mockBattleResult} />
        <StarRatingBreakdown result={mockBattleResult} />
      </div>

      <BattleTurnSummary summary={mockBattleResult.turn_summary} />

      <div className="grid gap-4 xl:grid-cols-2">
        <DamageLogPreview logs={mockBattleResult.damage_logs} />
        <SkillCastLogPreview logs={mockBattleResult.skill_cast_logs} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <StatusEffectSummary logs={mockBattleResult.status_logs} />
        <BattleSnapshotNotice result={mockBattleResult} />
      </div>

      <BattleRuleReference />

      <GameCard className="border-rose-300/25">
        <SectionTitle eyebrow="Safety / Scope" title="Battle Result Phase Scope" />
        <div className="mb-4 flex flex-wrap gap-2">
          <FeatureLockBadge label="Frontend mock only" status="schema-only" />
          <FeatureLockBadge label="No real battle engine" status="disabled" />
          <FeatureLockBadge label="No WLD rewards" status="disabled" />
          <FeatureLockBadge label="Production NO-GO" status="disabled" />
        </div>
        <div className="space-y-2 text-sm leading-6 text-slate-300">
          <p>ระบบต่อสู้จริงยังไม่ได้เปิดใน Phase นี้.</p>
          <p>No server-authoritative combat calculation, no backend, no paid feature, and no WLD reward.</p>
          <p>ยังไม่มีการรัน simulation จริง. No legal/policy/security completion is claimed.</p>
        </div>
      </GameCard>
    </div>
  );
}
