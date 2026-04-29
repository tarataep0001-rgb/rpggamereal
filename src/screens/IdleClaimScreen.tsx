"use client";

import { AutoFarmUsagePanel } from "@/components/game/AutoFarmUsagePanel";
import { DailyMissionPanel } from "@/components/game/DailyMissionPanel";
import { IdleAtomicityPanel } from "@/components/game/IdleAtomicityPanel";
import { IdleMissionDebugPanel } from "@/components/game/IdleMissionDebugPanel";
import { IdleMissionValidationPanel } from "@/components/game/IdleMissionValidationPanel";
import { IdleRewardPreviewPanel } from "@/components/game/IdleRewardPreviewPanel";
import { IdleXpDistributionPanel } from "@/components/game/IdleXpDistributionPanel";
import { MissionRewardSnapshotPanel } from "@/components/game/MissionRewardSnapshotPanel";
import { WeeklyMissionPanel } from "@/components/game/WeeklyMissionPanel";
import { useGameState } from "@/state/gameStateStore";

export function IdleClaimScreen() {
  const {
    previewAutoFarmMock,
    previewIdleClaimMock,
    previewMissionClaimMock,
    resetIdleMissionMock,
    state,
  } = useGameState();
  const preview = state.idle.lastIdleMissionPreview;

  if (!preview) {
    return (
      <div className="space-y-4 px-4">
        <IdleMissionDebugPanel
          onReset={resetIdleMissionMock}
          preview={{
            preview_id: "empty",
            bangkok_business_date: state.idle.bangkokBusinessDate,
            bangkok_week_key: state.idle.bangkokWeekKey,
            daily_reset_display: "00:00 Asia/Bangkok",
            weekly_reset_display: "Monday 00:00 Asia/Bangkok",
            idle_reward: {
              idle_stage: state.idle.idleStage,
              idle_stage_global_index: 0,
              highest_three_star_stage: state.idle.idleStage,
              accumulated_hours: state.idle.accumulatedHours,
              capped_hours: Math.min(state.idle.maxIdleHours, state.idle.accumulatedHours),
              max_idle_hours: 8,
              xp_ready: state.idle.xpReady,
              gold_ready: state.idle.goldReady,
              material_preview: [],
              drop_preview: [],
              deployed_team_snapshot: [],
              xp_distribution_preview: [],
              reward_snapshot: {
                reward_snapshot_id: "empty",
                source: "idle_claim",
                period_key: state.idle.bangkokBusinessDate,
                rewards: [],
                no_wld_reward: true,
                no_paid_gem_reward: true,
                no_ledger: true,
                local_mock_only: true,
              },
              config_versions: {
                idle_config: "empty",
                stage_config: "empty",
                drop_config: "empty",
                source_spec: "MASTER GAME SPEC V2.8.7 FINAL AUDIT & IMPLEMENTATION-READINESS LOCK",
              },
              created_at: state.metadata.updated_at,
              no_wld_reward: true,
              no_ledger: true,
            },
            auto_farm: {
              auto_farm_hours: 2,
              free_auto_farm_per_day: 2,
              used_free_auto_farm_today: state.idle.autoFarmUsedToday,
              remaining_free_auto_farm: Math.max(0, 2 - state.idle.autoFarmUsedToday),
              extra_purchase_index: 0,
              extra_price_ladder: [20, 40, 60, 80, 100, 120],
              next_extra_price: 20,
              bangkok_business_date: state.idle.bangkokBusinessDate,
              can_use_free_auto_farm: true,
              paid_disabled_note: "Paid Gem and WLD payment disabled.",
              free_test_gem_preview_only: true,
              no_wld_payment: true,
              no_paid_gem_payment: true,
            },
            daily_missions: [],
            weekly_missions: [],
            atomicity: {
              inventory_slots: state.inventory.inventorySlots,
              used_inventory_slots: state.inventory.usedInventorySlots,
              mailbox_count: state.player.mailboxCount,
              mailbox_limit: 100,
              item_rewards_need_slots: 0,
              can_fit_inventory: true,
              can_overflow_to_mailbox: true,
              blocked_before_partial_reward: false,
              currency_rewards_skip_mailbox: true,
              wld_ledger_rewards_never_mailbox: true,
              all_or_nothing_claim: true,
              notes: [],
            },
            validation: { status: "warning", errors: [], warnings: ["No preview loaded."], checked_at: state.metadata.updated_at },
            no_wld_reward: true,
            no_paid_gem_reward: true,
            no_ledger: true,
            no_backend_authority: true,
            local_mock_only: true,
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4">
      <IdleRewardPreviewPanel onPreview={previewIdleClaimMock} preview={preview.idle_reward} />
      <IdleXpDistributionPanel
        deployedTeamSnapshot={preview.idle_reward.xp_distribution_preview.filter((unit) => unit.deployed)}
        undeployedPreview={preview.idle_reward.xp_distribution_preview.filter((unit) => !unit.deployed)}
      />
      <AutoFarmUsagePanel onPreview={previewAutoFarmMock} preview={preview.auto_farm} />
      <DailyMissionPanel
        missions={preview.daily_missions}
        onPreviewClaim={previewMissionClaimMock}
        periodKey={preview.bangkok_business_date}
      />
      <WeeklyMissionPanel
        missions={preview.weekly_missions}
        onPreviewClaim={previewMissionClaimMock}
        periodKey={preview.bangkok_week_key}
      />
      <MissionRewardSnapshotPanel missions={[...preview.daily_missions, ...preview.weekly_missions]} />
      <IdleAtomicityPanel atomicity={preview.atomicity} />
      <IdleMissionValidationPanel validation={preview.validation} />
      <IdleMissionDebugPanel onReset={resetIdleMissionMock} preview={preview} />
    </div>
  );
}
