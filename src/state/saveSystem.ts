import { initialGameState } from "@/state/initialGameState";
import {
  LOCAL_SAVE_KEY,
  type CoreGameState,
} from "@/state/gameStateTypes";
import { migrateLocalSave } from "@/state/saveMigration";
import { validateCoreGameStateSave } from "@/state/saveValidation";
import { createDisplayHash } from "@/utils/saveFormatting";

export type LocalSaveLoadResult = {
  state: CoreGameState;
  storageAvailable: boolean;
  loaded: boolean;
  message: string;
};

function localStorageAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function prepareStateForLocalSave(state: CoreGameState): CoreGameState {
  const updatedAt = new Date().toISOString();
  const nextState: CoreGameState = {
    ...state,
    metadata: {
      ...state.metadata,
      save_version: state.metadata.save_version + 1,
      updated_at: updatedAt,
      notes:
        "ระบบ Save นี้เป็น local mock สำหรับ prototype เท่านั้น ยังไม่ใช่ server-authoritative state",
    },
  };

  return {
    ...nextState,
    metadata: {
      ...nextState.metadata,
      checksum_display_hash: createDisplayHash({
        ...nextState,
        metadata: { ...nextState.metadata, checksum_display_hash: "mock_pending" },
      }),
    },
  };
}

export function saveLocalState(state: CoreGameState): LocalSaveLoadResult {
  if (!localStorageAvailable()) {
    return {
      state,
      storageAvailable: false,
      loaded: false,
      message: "localStorage unavailable. State remains in memory only.",
    };
  }

  const nextState = prepareStateForLocalSave(state);
  const validation = validateCoreGameStateSave(nextState);
  if (validation.status === "invalid") {
    return {
      state,
      storageAvailable: true,
      loaded: false,
      message: `Save blocked by local validation: ${validation.errors.join(" ")}`,
    };
  }

  window.localStorage.setItem(LOCAL_SAVE_KEY, JSON.stringify(nextState));
  return {
    state: nextState,
    storageAvailable: true,
    loaded: true,
    message: "Mock state saved to localStorage.",
  };
}

export function loadLocalSave(): LocalSaveLoadResult {
  if (!localStorageAvailable()) {
    return {
      state: initialGameState,
      storageAvailable: false,
      loaded: false,
      message: "localStorage unavailable. Fallback to initial mock state.",
    };
  }

  const raw = window.localStorage.getItem(LOCAL_SAVE_KEY);
  if (!raw) {
    return {
      state: initialGameState,
      storageAvailable: true,
      loaded: false,
      message: "No local save found. Fallback to initial mock state.",
    };
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    const migration = migrateLocalSave(parsed);
    return {
      state: migration.state,
      storageAvailable: true,
      loaded: migration.valid,
      message: migration.reason,
    };
  } catch {
    return {
      state: initialGameState,
      storageAvailable: true,
      loaded: false,
      message: "Local save JSON parse failed. Fallback to initial mock state.",
    };
  }
}

export function resetLocalSave(): LocalSaveLoadResult {
  if (localStorageAvailable()) {
    window.localStorage.removeItem(LOCAL_SAVE_KEY);
  }

  return {
    state: initialGameState,
    storageAvailable: localStorageAvailable(),
    loaded: false,
    message: "Local save reset. Fallback to initial mock state.",
  };
}
