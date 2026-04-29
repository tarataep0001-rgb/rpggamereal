import type { CellId } from "@/types/game";
import { initialGameState } from "@/state/initialGameState";
import type { CoreGameState } from "@/state/gameStateTypes";
import { createMockGachaInput, runSinglePull } from "@/engine/gacha";
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
