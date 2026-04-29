import type { CellId } from "@/types/game";
import { initialGameState } from "@/state/initialGameState";
import type { CoreGameState } from "@/state/gameStateTypes";
import { createMockGachaInput, runSinglePull } from "@/engine/gacha";
import { createIdleMissionPreview, createMockIdleMissionInput, type MissionPreview } from "@/engine/idle";
import type { InventoryEngineResult } from "@/engine/inventory";
import type { ProcessedStageProgressResult } from "@/engine/progression";
import { applyLocalStageProgressPreview } from "@/engine/progression";

function withUpdatedSnapshot(state: CoreGameState): CoreGameState {
  const units = Object.entries(state.teamFormation.deployedUnits)
    .filter(([, characterId]) => Boolean(characterId))
    .map(([cellId, characterId]) => ({ cellId: cellId as CellId, characterId: characterId as string }));

  return {
    ...state,
    teamFormation: {
      ...state.teamFormation,
      formation_snapshot: {
        snapshotId: `formation_snapshot_local_mock_${state.metadata.save_version}`,
        capturedFor: "local_mock",
        units,
      },
    },
  };
}

export function hydrateFromMockData(): CoreGameState {
  return initialGameState;
}

export function updateFormationMock(
  state: CoreGameState,
  cellId: CellId,
  characterId: string | null,
): CoreGameState {
  const nextState = {
    ...state,
    teamFormation: {
      ...state.teamFormation,
      deployedUnits: {
        ...state.teamFormation.deployedUnits,
        [cellId]: characterId,
      },
    },
  };

  return withUpdatedSnapshot(nextState);
}

export function updateSkillLoadoutMock(state: CoreGameState, priorityOrder: string[]): CoreGameState {
  return {
    ...state,
    skillLoadout: {
      ...state.skillLoadout,
      priorityOrder,
      skill_loadout_snapshot: {
        snapshotId: `skill_loadout_snapshot_local_mock_${state.metadata.save_version}`,
        capturedFor: "local_mock",
        activeSkillIds: priorityOrder,
      },
    },
  };
}

export function markStageSelectedMock(state: CoreGameState, stageId: string): CoreGameState {
  return {
    ...state,
    stageProgress: {
      ...state.stageProgress,
      selectedStageId: stageId,
    },
  };
}

export function claimIdleMockPreview(state: CoreGameState): CoreGameState {
  const preview = createIdleMissionPreview(createMockIdleMissionInput({ state }));

  return {
    ...state,
    idle: {
      ...state.idle,
      accumulatedHours: 0,
      xpReady: 0,
      goldReady: 0,
      bangkokBusinessDate: preview.bangkok_business_date,
      bangkokWeekKey: preview.bangkok_week_key,
      lastIdleMissionPreview: preview,
    },
  };
}

export function previewIdleClaimMock(state: CoreGameState): CoreGameState {
  const preview = createIdleMissionPreview(createMockIdleMissionInput({ state }));

  return {
    ...state,
    idle: {
      ...state.idle,
      xpReady: preview.idle_reward.xp_ready,
      goldReady: preview.idle_reward.gold_ready,
      bangkokBusinessDate: preview.bangkok_business_date,
      bangkokWeekKey: preview.bangkok_week_key,
      lastIdleMissionPreview: preview,
    },
  };
}

export function previewAutoFarmMock(state: CoreGameState): CoreGameState {
  const preview = createIdleMissionPreview(
    createMockIdleMissionInput({
      state,
      accumulatedHours: Math.min(state.idle.maxIdleHours, state.idle.accumulatedHours + 2),
    }),
  );

  return {
    ...state,
    idle: {
      ...state.idle,
      lastIdleMissionPreview: preview,
    },
  };
}

export function previewMissionClaimMock(state: CoreGameState, mission: MissionPreview): CoreGameState {
  const preview = createIdleMissionPreview(createMockIdleMissionInput({ state }));
  const isDaily = mission.frequency === "daily";
  const claimedMissionIds = isDaily
    ? state.idle.dailyMissionClaimedPreview
    : state.idle.weeklyMissionClaimedPreview;
  const nextClaimed = mission.claimable && !claimedMissionIds.includes(mission.mission_id)
    ? [...claimedMissionIds, mission.mission_id]
    : claimedMissionIds;

  return {
    ...state,
    idle: {
      ...state.idle,
      dailyMissionClaimedPreview: isDaily ? nextClaimed : state.idle.dailyMissionClaimedPreview,
      weeklyMissionClaimedPreview: isDaily ? state.idle.weeklyMissionClaimedPreview : nextClaimed,
      lastIdleMissionPreview: preview,
    },
  };
}

export function resetIdleMissionMock(state: CoreGameState): CoreGameState {
  const preview = createIdleMissionPreview(createMockIdleMissionInput());

  return {
    ...state,
    idle: {
      ...state.idle,
      accumulatedHours: initialGameState.idle.accumulatedHours,
      xpReady: initialGameState.idle.xpReady,
      goldReady: initialGameState.idle.goldReady,
      autoFarmUsedToday: initialGameState.idle.autoFarmUsedToday,
      bangkokBusinessDate: preview.bangkok_business_date,
      bangkokWeekKey: preview.bangkok_week_key,
      dailyMissionClaimedPreview: [],
      weeklyMissionClaimedPreview: [],
      lastIdleMissionPreview: preview,
    },
  };
}

export function runGachaMockPreview(state: CoreGameState): CoreGameState {
  const seed = `phase21-local-mock-${state.gacha.pullHistoryPreview.length + 1}-${state.gacha.pity.pullsSinceLastRare}`;
  const preview = runSinglePull(createMockGachaInput({ seed, state }));

  return {
    ...state,
    gacha: {
      ...state.gacha,
      pity: {
        ...state.gacha.pity,
        pullsSinceLastRare: preview.pity_snapshot_after.pulls_since_last_rare,
      },
      pullHistoryPreview: [
        {
          logId: preview.log_preview.gacha_log_id,
          resultCharacterId: preview.result.character_id,
          grade: preview.result.grade,
          seed: preview.seed,
          shardGain: preview.shard_preview.shard_gain,
        },
        ...state.gacha.pullHistoryPreview.slice(0, 4),
      ],
      lastRollPreview: preview,
    },
  };
}

export function resetGachaPityMock(state: CoreGameState): CoreGameState {
  return {
    ...state,
    gacha: {
      ...state.gacha,
      pity: {
        ...state.gacha.pity,
        pullsSinceLastRare: 0,
      },
    },
  };
}

export function clearGachaPreviewMock(state: CoreGameState): CoreGameState {
  return {
    ...state,
    gacha: {
      ...state.gacha,
      pullHistoryPreview: [],
      lastRollPreview: null,
    },
  };
}

export function processMockStageClear(
  state: CoreGameState,
  processedResult: ProcessedStageProgressResult,
): CoreGameState {
  return applyLocalStageProgressPreview(state, processedResult);
}

export function previewInventoryActionMock(
  state: CoreGameState,
  result: InventoryEngineResult,
): CoreGameState {
  return {
    ...state,
    inventory: {
      ...state.inventory,
      lastInventoryActionPreview: {
        previewId: result.preview_id,
        selectedGearId: result.selected_gear.gear_instance_id,
        validationStatus: result.validation.status,
        previewOnly: true,
        noWld: true,
        noPaidGem: true,
        noLedger: true,
      },
    },
  };
}
