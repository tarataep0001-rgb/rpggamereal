import { createAutoFarmPreview } from "./autoFarmRules";
import { getBangkokBusinessDate, getBangkokWeekKey } from "./bangkokBusinessDate";
import { createIdleClaimAtomicityPreview } from "./idleAtomicity";
import { createIdleRewardPreview } from "./idleRewardPreview";
import { validateIdleMissionPreview } from "./idleMissionValidation";
import { dailyMissionConfigs, weeklyMissionConfigs } from "./missionRules";
import { createMissionRewardSnapshot } from "./missionRewardPreview";
import type {
  IdleMissionInput,
  IdleMissionPreview,
  MissionClaimValidation,
  MissionConfig,
  MissionPreview,
  MissionState,
} from "./idleTypes";

function missionStateFor(
  states: readonly MissionState[],
  missionId: string,
  periodKey: string,
): MissionState | undefined {
  return states.find((state) => state.mission_id === missionId && state.period_key === periodKey);
}

function createMissionPreview(
  mission: MissionConfig,
  input: IdleMissionInput,
  periodKey: string,
  claimedStates: readonly MissionState[],
): MissionPreview {
  const state = missionStateFor(claimedStates, mission.mission_id, periodKey);
  const progress = Math.max(0, input.mission_progress[mission.progress_key] ?? state?.progress ?? 0);
  const claimed = state?.claimed ?? false;
  const claimable = progress >= mission.target && !claimed;

  return {
    mission_id: mission.mission_id,
    frequency: mission.frequency,
    name: mission.name,
    description: mission.description,
    progress,
    target: mission.target,
    period_key: periodKey,
    claimable,
    claimed,
    blocked_reason: claimed
      ? "Mission Claim รับได้ครั้งเดียวต่อรอบ"
      : progress < mission.target
        ? "progress below target"
        : null,
    reward_snapshot: createMissionRewardSnapshot(mission, periodKey),
  };
}

export function createDailyMissionProgressPreview(input: IdleMissionInput): MissionPreview[] {
  const periodKey = getBangkokBusinessDate(input.now);

  return dailyMissionConfigs.map((mission) =>
    createMissionPreview(mission, input, periodKey, input.claimed_daily),
  );
}

export function createWeeklyMissionProgressPreview(input: IdleMissionInput): MissionPreview[] {
  const periodKey = getBangkokWeekKey(input.now);

  return weeklyMissionConfigs.map((mission) =>
    createMissionPreview(mission, input, periodKey, input.claimed_weekly),
  );
}

export function canClaimMission(
  missionState: MissionPreview,
  missionId: string,
  periodKey: string,
): MissionClaimValidation {
  if (missionState.mission_id !== missionId) {
    return { mission_id: missionId, can_claim: false, reason: "mission_id mismatch" };
  }
  if (missionState.period_key !== periodKey) {
    return { mission_id: missionId, can_claim: false, reason: "period key mismatch" };
  }
  if (missionState.claimed) {
    return { mission_id: missionId, can_claim: false, reason: "already claimed this period" };
  }
  if (missionState.progress < missionState.target) {
    return { mission_id: missionId, can_claim: false, reason: "progress below target" };
  }

  return { mission_id: missionId, can_claim: true, reason: "claimable local mock preview" };
}

export function createIdleMissionPreview(input: IdleMissionInput): IdleMissionPreview {
  const idleReward = createIdleRewardPreview(input);
  const autoFarm = createAutoFarmPreview(input);
  const dailyMissions = createDailyMissionProgressPreview(input);
  const weeklyMissions = createWeeklyMissionProgressPreview(input);
  const atomicity = createIdleClaimAtomicityPreview(input, idleReward.reward_snapshot.rewards);
  const previewBase = {
    preview_id: `idle_mission_preview_${input.idle_stage}_${input.now}`,
    bangkok_business_date: getBangkokBusinessDate(input.now),
    bangkok_week_key: getBangkokWeekKey(input.now),
    daily_reset_display: "00:00 Asia/Bangkok" as const,
    weekly_reset_display: "Monday 00:00 Asia/Bangkok" as const,
    idle_reward: idleReward,
    auto_farm: autoFarm,
    daily_missions: dailyMissions,
    weekly_missions: weeklyMissions,
    atomicity,
    validation: { status: "pass" as const, errors: [], warnings: [], checked_at: input.now },
    no_wld_reward: true as const,
    no_paid_gem_reward: true as const,
    no_ledger: true as const,
    no_backend_authority: true as const,
    local_mock_only: true as const,
  };

  return {
    ...previewBase,
    validation: validateIdleMissionPreview({ input, preview: previewBase }),
  };
}

export function validateMissionClaimPreview(input: IdleMissionInput, mission: MissionPreview): MissionClaimValidation {
  const periodKey = mission.frequency === "daily" ? getBangkokBusinessDate(input.now) : getBangkokWeekKey(input.now);

  return canClaimMission(mission, mission.mission_id, periodKey);
}

export function applyLocalIdleMissionPreview<TState extends { idle: object }>(
  state: TState,
  preview: IdleMissionPreview,
): TState {
  return {
    ...state,
    idle: {
      ...state.idle,
      lastIdleMissionPreview: preview,
    },
  };
}
