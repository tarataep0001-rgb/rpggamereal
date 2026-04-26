export const ACTIVE_SOURCE_SPEC =
  "MASTER GAME SPEC V2.8.7 FINAL AUDIT & IMPLEMENTATION-READINESS LOCK";

export type ConfigExportStatus =
  | "draft"
  | "mock"
  | "export_ready_mock"
  | "invalid"
  | "validated_mock";

export type ConfigMetaBase = {
  schema_version: string;
  config_version: string;
  effective_at: string;
  generated_at: string;
  checksum: string;
  source_spec: typeof ACTIVE_SOURCE_SPEC;
  status: ConfigExportStatus;
  notes: string;
};

export function createConfigMeta(params: {
  configKey: string;
  status?: ConfigExportStatus;
  notes: string;
}): ConfigMetaBase {
  return {
    schema_version: "v1a.config.schema.0",
    config_version: `v1a.${params.configKey}.foundation.0`,
    effective_at: "2026-04-26T00:00:00+07:00",
    generated_at: "2026-04-26T00:00:00+07:00",
    checksum: `mock_hash_placeholder_${params.configKey}`,
    source_spec: ACTIVE_SOURCE_SPEC,
    status: params.status ?? "export_ready_mock",
    notes: params.notes,
  };
}
