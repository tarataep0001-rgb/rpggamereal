import { exportManifest } from "@/config/exportManifest";
import { ACTIVE_SOURCE_SPEC } from "@/config/meta";
import { configValidationResults } from "@/utils/configValidation";

export const mockConfigExport = {
  activeSpec: ACTIVE_SOURCE_SPEC,
  foundationStatus: "mock/export foundation only",
  productionReady: false,
  exportManifest,
  validationResults: configValidationResults,
  blockingNotes: [
    "ยังไม่ใช่ production config",
    "ยังไม่ได้รัน simulation จริง",
    "ยังไม่ได้ legal/policy review",
    "ยังไม่ได้ security audit",
    "ถ้า config อ้างอิง ID ที่ไม่มี ต้องถือว่า invalid",
    "ทุก config ต้องมี schema_version / config_version / effective_at / generated_at / checksum",
  ],
} as const;
