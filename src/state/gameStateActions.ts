import type { CellId } from "@/types/game";
import { initialGameState } from "@/state/initialGameState";
import type { CoreGameState } from "@/state/gameStateTypes";
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
  return {
    ...state,
    idle: {
      ...state.idle,
      accumulatedHours: 0,
      xpReady: 0,
      goldReady: 0,
    },
  };
}

export function runGachaMockPreview(state: CoreGameState): CoreGameState {
  return {
    ...state,
    gacha: {
      ...state.gacha,
      pity: {
        ...state.gacha.pity,
        pullsSinceLastRare: Math.min(
          state.gacha.pity.pityLimit,
          state.gacha.pity.pullsSinceLastRare + 1,
        ),
      },
      pullHistoryPreview: [
        {
          logId: `mock_preview_${state.gacha.pullHistoryPreview.length + 1}`,
          resultCharacterId: "ch_common_priest_light_aid",
          grade: "Common",
        },
        ...state.gacha.pullHistoryPreview.slice(0, 4),
      ],
    },
  };
}

export function processMockStageClear(
  state: CoreGameState,
  processedResult: ProcessedStageProgressResult,
): CoreGameState {
  return applyLocalStageProgressPreview(state, processedResult);
}
