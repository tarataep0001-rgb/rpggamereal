import { initialGameState } from "@/state/initialGameState";
import {
  SAVE_SCHEMA_VERSION,
  type CoreGameState,
} from "@/state/gameStateTypes";
import { validateCoreGameStateSave } from "@/state/saveValidation";

export type SaveMigrationResult = {
  state: CoreGameState;
  migrated: boolean;
  valid: boolean;
  reason: string;
};

export function migrateLocalSave(candidate: unknown): SaveMigrationResult {
  if (!candidate || typeof candidate !== "object") {
    return {
      state: initialGameState,
      migrated: false,
      valid: false,
      reason: "Missing or non-object save. Fallback to initial mock state.",
    };
  }

  const state = candidate as CoreGameState;
  if (state.metadata?.save_schema_version !== SAVE_SCHEMA_VERSION) {
    return {
      state: initialGameState,
      migrated: false,
      valid: false,
      reason: "Unknown save schema version. Fallback to initial mock state.",
    };
  }

  const validation = validateCoreGameStateSave(state);
  if (validation.status === "invalid") {
    return {
      state: initialGameState,
      migrated: false,
      valid: false,
      reason: `Invalid local save: ${validation.errors.join(" ")}`,
    };
  }

  return {
    state,
    migrated: false,
    valid: true,
    reason: "Current schema only. No migration required.",
  };
}

// Production migration must be server-reviewed before real launch.
