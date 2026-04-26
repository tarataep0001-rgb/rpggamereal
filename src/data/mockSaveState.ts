import { initialGameState } from "@/state/initialGameState";
import { LOCAL_SAVE_KEY } from "@/state/gameStateTypes";

export const mockSaveState = {
  localStorageKey: LOCAL_SAVE_KEY,
  schemaVersion: initialGameState.metadata.save_schema_version,
  environment: initialGameState.metadata.environment,
  isLocalMock: initialGameState.metadata.is_local_mock,
  warningCopy:
    "ข้อมูล Save นี้เป็น local mock สำหรับ prototype เท่านั้น ระบบจริงต้องใช้ server-authoritative state",
  noStoredData: [
    "no secrets",
    "no wallet private data",
    "no real WLD values",
    "no real payment data",
    "no real ledger",
  ],
} as const;
