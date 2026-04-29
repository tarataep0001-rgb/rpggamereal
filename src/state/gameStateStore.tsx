"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { initialGameState } from "@/state/initialGameState";
import type { CoreGameState, GameStateRuntimeStatus } from "@/state/gameStateTypes";
import {
  hydrateFromMockData,
  markStageSelectedMock,
  previewAutoFarmMock,
  previewIdleClaimMock,
  processMockStageClear,
  previewMissionClaimMock,
  previewInventoryActionMock,
  claimIdleMockPreview,
  clearGachaPreviewMock,
  runGachaMockPreview,
  resetGachaPityMock,
  resetIdleMissionMock,
  updateFormationMock,
  updateSkillLoadoutMock,
} from "@/state/gameStateActions";
import { loadLocalSave, resetLocalSave, saveLocalState } from "@/state/saveSystem";
import { validateCoreGameStateSave } from "@/state/saveValidation";
import type { CellId } from "@/types/game";
import type { ProcessedStageProgressResult } from "@/engine/progression";
import type { InventoryEngineResult } from "@/engine/inventory";
import type { MissionPreview } from "@/engine/idle";

type GameStateContextValue = {
  state: CoreGameState;
  runtime: GameStateRuntimeStatus;
  saveMockState: () => void;
  loadMockSave: () => void;
  resetMockSave: () => void;
  hydrateMockState: () => void;
  updateFormationMock: (cellId: CellId, characterId: string | null) => void;
  updateSkillLoadoutMock: (priorityOrder: string[]) => void;
  markStageSelectedMock: (stageId: string) => void;
  processMockStageClear: (processedResult: ProcessedStageProgressResult) => void;
  previewInventoryActionMock: (result: InventoryEngineResult) => void;
  claimIdleMockPreview: () => void;
  previewIdleClaimMock: () => void;
  previewAutoFarmMock: () => void;
  previewMissionClaimMock: (mission: MissionPreview) => void;
  resetIdleMissionMock: () => void;
  runGachaMockPreview: () => void;
  resetGachaPityMock: () => void;
  clearGachaPreviewMock: () => void;
};

const GameStateContext = createContext<GameStateContextValue | null>(null);

function createRuntime(state: CoreGameState): GameStateRuntimeStatus {
  return {
    storageAvailable: typeof window !== "undefined" && typeof window.localStorage !== "undefined",
    lastAction: "initial mock state",
    lastSavedAt: null,
    validation: validateCoreGameStateSave(state),
  };
}

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CoreGameState>(initialGameState);
  const [runtime, setRuntime] = useState<GameStateRuntimeStatus>(() => createRuntime(initialGameState));

  const value = useMemo<GameStateContextValue>(
    () => ({
      state,
      runtime,
      saveMockState: () => {
        const result = saveLocalState(state);
        setState(result.state);
        setRuntime({
          storageAvailable: result.storageAvailable,
          lastAction: result.message,
          lastSavedAt: result.loaded ? result.state.metadata.updated_at : runtime.lastSavedAt,
          validation: validateCoreGameStateSave(result.state),
        });
      },
      loadMockSave: () => {
        const result = loadLocalSave();
        setState(result.state);
        setRuntime({
          storageAvailable: result.storageAvailable,
          lastAction: result.message,
          lastSavedAt: result.loaded ? result.state.metadata.updated_at : null,
          validation: validateCoreGameStateSave(result.state),
        });
      },
      resetMockSave: () => {
        const result = resetLocalSave();
        setState(result.state);
        setRuntime({
          storageAvailable: result.storageAvailable,
          lastAction: result.message,
          lastSavedAt: null,
          validation: validateCoreGameStateSave(result.state),
        });
      },
      hydrateMockState: () => {
        const nextState = hydrateFromMockData();
        setState(nextState);
        setRuntime({
          storageAvailable: runtime.storageAvailable,
          lastAction: "Hydrated from local mock data.",
          lastSavedAt: runtime.lastSavedAt,
          validation: validateCoreGameStateSave(nextState),
        });
      },
      updateFormationMock: (cellId, characterId) => {
        setState((current) => updateFormationMock(current, cellId, characterId));
      },
      updateSkillLoadoutMock: (priorityOrder) => {
        setState((current) => updateSkillLoadoutMock(current, priorityOrder));
      },
      markStageSelectedMock: (stageId) => {
        setState((current) => markStageSelectedMock(current, stageId));
      },
      processMockStageClear: (processedResult) => {
        setState((current) => processMockStageClear(current, processedResult));
      },
      previewInventoryActionMock: (result) => {
        setState((current) => previewInventoryActionMock(current, result));
      },
      claimIdleMockPreview: () => {
        setState((current) => claimIdleMockPreview(current));
      },
      previewIdleClaimMock: () => {
        setState((current) => previewIdleClaimMock(current));
      },
      previewAutoFarmMock: () => {
        setState((current) => previewAutoFarmMock(current));
      },
      previewMissionClaimMock: (mission) => {
        setState((current) => previewMissionClaimMock(current, mission));
      },
      resetIdleMissionMock: () => {
        setState((current) => resetIdleMissionMock(current));
      },
      runGachaMockPreview: () => {
        setState((current) => runGachaMockPreview(current));
      },
      resetGachaPityMock: () => {
        setState((current) => resetGachaPityMock(current));
      },
      clearGachaPreviewMock: () => {
        setState((current) => clearGachaPreviewMock(current));
      },
    }),
    [runtime, state],
  );

  return <GameStateContext.Provider value={value}>{children}</GameStateContext.Provider>;
}

export function useGameState() {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error("useGameState must be used inside GameStateProvider.");
  }
  return context;
}
