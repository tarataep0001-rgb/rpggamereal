import {
  SAVE_SCHEMA_VERSION,
  SAVE_SOURCE_SPEC,
  type CoreGameState,
  type SaveValidationResult,
} from "@/state/gameStateTypes";

function result(errors: string[], warnings: string[]): SaveValidationResult {
  return {
    status: errors.length > 0 ? "invalid" : "valid",
    errors,
    warnings,
    checked_at: new Date().toISOString(),
  };
}

export function validateCoreGameStateSave(state: CoreGameState): SaveValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!state.metadata.save_schema_version) errors.push("Missing save_schema_version.");
  if (!state.metadata.save_version) errors.push("Missing save_version.");
  if (!state.metadata.created_at) errors.push("Missing created_at.");
  if (!state.metadata.updated_at) errors.push("Missing updated_at.");
  if (state.metadata.source_spec !== SAVE_SOURCE_SPEC) errors.push("source_spec mismatch.");
  if (state.metadata.environment !== "local_mock") errors.push("environment must be local_mock.");
  if (state.metadata.is_local_mock !== true) errors.push("is_local_mock must be true.");
  if (!state.metadata.migration_version) errors.push("Missing migration_version.");
  if (!state.metadata.checksum_display_hash) errors.push("Missing checksum_display_hash.");
  if (state.metadata.save_schema_version !== SAVE_SCHEMA_VERSION) {
    errors.push(`Unsupported save_schema_version: ${state.metadata.save_schema_version}.`);
  }

  if (state.featureFlags.enableWldWithdraw !== false) errors.push("WLD withdraw must stay disabled.");
  if (state.featureFlags.enableWldRewardRanking !== false) errors.push("WLD reward ranking must stay disabled.");
  if (state.featureFlags.enablePaidGemGacha !== false) errors.push("Paid Gem gacha must stay disabled.");
  if (state.featureFlags.enableClass2 !== false) errors.push("Class 2 must not be live in V1A.");
  if (state.featureFlags.enableClass3 !== false) errors.push("Class 3 must remain schema-only in V1A.");
  if (state.featureFlags.enableWldGuildReward !== false) errors.push("WLD guild reward must stay disabled.");

  if (state.inventory.inventorySlots < 0) errors.push("Inventory slots cannot be negative.");
  if (state.inventory.usedInventorySlots < 0) errors.push("Used inventory slots cannot be negative.");
  if (state.inventory.usedInventorySlots > state.inventory.inventorySlots) {
    errors.push("usedInventorySlots cannot exceed inventorySlots.");
  }

  if (state.player.level > state.player.effectiveLevelCap) {
    errors.push("Player level cannot exceed effective level cap.");
  }

  const deployedIds = Object.values(state.teamFormation.deployedUnits).filter(
    (characterId): characterId is string => Boolean(characterId),
  );
  if (deployedIds.length < 1 || deployedIds.length > 6) {
    errors.push("Team size must be between 1 and 6.");
  }
  if (!deployedIds.includes("main_hero")) {
    errors.push("Main character must be deployed.");
  }
  if (new Set(deployedIds).size !== deployedIds.length) {
    errors.push("Duplicate character_id found in team formation.");
  }

  if (state.player.paidGem !== 0) {
    warnings.push("Paid Gem is display-only in this prototype and must not be treated as paid balance.");
  }
  if (state.safety.productionStatus !== "NO-GO" || state.player.launchStatus !== "NO-GO") {
    errors.push("Production status must remain NO-GO.");
  }

  return result(errors, warnings);
}
