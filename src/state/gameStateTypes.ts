import type { CellId, ClassName, LaunchStatus } from "@/types/game";
import type { InventoryGearItem, InventoryMaterial, MailboxPreviewItem } from "@/data/mockInventory";
import type { InventoryEngineResult } from "@/engine/inventory";

export const LOCAL_SAVE_KEY = "realzenrpg.v1a.localSave";
export const SAVE_SCHEMA_VERSION = "v1a-local-save-001";
export const SAVE_SOURCE_SPEC =
  "MASTER GAME SPEC V2.8.7 FINAL AUDIT & IMPLEMENTATION-READINESS LOCK";

export type SaveMetadata = {
  save_schema_version: string;
  save_version: number;
  created_at: string;
  updated_at: string;
  source_spec: string;
  environment: "local_mock";
  is_local_mock: true;
  migration_version: string;
  checksum_display_hash: string;
  notes: string;
};

export type CoreFeatureFlags = {
  enableWldWithdraw: false;
  enableWldRewardRanking: false;
  enablePaidGemGacha: false;
  enableBox2: false;
  enableBox3: false;
  enableClass2: false;
  enableClass3: false;
  enableEpicNormalDrop: false;
  enableCrafting: false;
  enableEquipmentSetBonus: false;
  enableShardExchange: false;
  enableWldGuildReward: false;
};

export type CorePlayerState = {
  playerId: string;
  playerName: string;
  level: number;
  effectiveLevelCap: 50;
  gold: number;
  freeGem: number;
  paidGem: number;
  mailboxCount: number;
  inventorySlots: number;
  usedInventorySlots: number;
  teamPower: number;
  launchStatus: LaunchStatus;
};

export type CoreMainCharacterState = {
  id: "main_hero";
  class: ClassName;
  level: number;
  starterWeapon: "gear_sword_t1_common";
  legendaryEquivalentMultiplier: 1.85;
  starSystem: "none-v1a";
};

export type CoreTeammateState = {
  characterId: string;
  displayName: string;
  class: ClassName;
  level: number;
  star: number;
  shardsOwned: number;
  unlocked: boolean;
  starterTeammate: boolean;
};

export type TeamFormationState = {
  canonicalCells: CellId[];
  deployedUnits: Record<CellId, string | null>;
  formation_snapshot: {
    snapshotId: string;
    capturedFor: "local_mock";
    units: Array<{ cellId: CellId; characterId: string }>;
  };
  activeFormationBonus: string;
  mainCharacterMandatory: true;
};

export type SkillLoadoutState = {
  currentClass: "Swordsman";
  activeSkillIds: string[];
  priorityOrder: string[];
  skill_loadout_snapshot: {
    snapshotId: string;
    capturedFor: "local_mock";
    activeSkillIds: string[];
  };
};

export type StageProgressState = {
  currentChapter: number;
  highestStageCleared: string;
  highestThreeStarStage: string;
  unlockedStages: string[];
  starRatings: Record<string, 0 | 1 | 2 | 3>;
  firstClearClaimed: Record<string, boolean>;
  starChestClaimed: Record<string, boolean>;
  rewardedReplayCounters: Record<string, { businessDate: string; count: number; cap: number }>;
  lastRewardLogPreview: {
    log_id: string;
    stage_id: string;
    reward_snapshot_id: string;
    local_mock_only: true;
    no_wld_reward: true;
    no_paid_gem_reward: true;
    no_ledger: true;
  } | null;
  selectedStageId: string;
};

export type InventoryState = {
  inventorySlots: number;
  usedInventorySlots: number;
  equippedItems: InventoryGearItem[];
  gearInstances: InventoryGearItem[];
  materials: InventoryMaterial[];
  tickets: InventoryMaterial[];
  shards: InventoryMaterial[];
  mailboxPreview: MailboxPreviewItem[];
  lastInventoryActionPreview: {
    previewId: string;
    selectedGearId: string;
    validationStatus: InventoryEngineResult["validation"]["status"];
    previewOnly: true;
    noWld: true;
    noPaidGem: true;
    noLedger: true;
  } | null;
};

export type IdleState = {
  idleStage: string;
  accumulatedHours: number;
  maxIdleHours: number;
  xpReady: number;
  goldReady: number;
  autoFarmFreePerDay: number;
  autoFarmUsedToday: number;
  extraAutoFarmPrices: readonly number[];
};

export type GachaState = {
  activeBoxId: "box_1_v1a";
  pity: {
    pullsSinceLastRare: number;
    pityLimit: 30;
    guaranteedGrade: "Rare";
  };
  pullHistoryPreview: Array<{
    logId: string;
    resultCharacterId: string;
    grade: string;
  }>;
  paidGemGachaDisabled: true;
  box2Disabled: true;
  box3Disabled: true;
};

export type GuildCoreState = {
  guildName: string;
  guildLevel: number;
  memberCount: number;
  memberLimit: 30;
  guildPoint: number;
  guildBossEntryUsedToday: number;
  guildBossEntryLimit: 1;
  wldGuildRewardDisabled: true;
};

export type SafetyState = {
  regionRestricted: true;
  policyPlaceholdersUnreviewed: true;
  simulationNotRun: true;
  productionStatus: "NO-GO";
};

export type CoreGameState = {
  metadata: SaveMetadata;
  player: CorePlayerState;
  featureFlags: CoreFeatureFlags;
  mainCharacter: CoreMainCharacterState;
  teammates: CoreTeammateState[];
  teamFormation: TeamFormationState;
  skillLoadout: SkillLoadoutState;
  stageProgress: StageProgressState;
  inventory: InventoryState;
  idle: IdleState;
  gacha: GachaState;
  guild: GuildCoreState;
  safety: SafetyState;
};

export type SaveValidationResult = {
  status: "valid" | "invalid";
  errors: string[];
  warnings: string[];
  checked_at: string;
};

export type GameStateRuntimeStatus = {
  storageAvailable: boolean;
  lastAction: string;
  lastSavedAt: string | null;
  validation: SaveValidationResult;
};
