import { featureFlagsConfig } from "@/config/featureFlagsConfig";
import { box1GachaCharacters, mainCharacter, mockCharacters } from "@/data/mockCharacters";
import { gachaBoxes, gachaLogPreview } from "@/data/mockGacha";
import { mockGuild } from "@/data/mockGuild";
import { mockIdle } from "@/data/mockIdle";
import { mockInventory } from "@/data/mockInventory";
import { mockPlayer } from "@/data/mockPlayer";
import { mockStages } from "@/data/mockStages";
import type { CellId, GameCharacter } from "@/types/game";
import { createDisplayHash } from "@/utils/saveFormatting";
import type { CoreGameState, SaveMetadata } from "@/state/gameStateTypes";
import {
  SAVE_SCHEMA_VERSION,
  SAVE_SOURCE_SPEC,
} from "@/state/gameStateTypes";

const canonicalCells: CellId[] = [
  "front_top",
  "front_center",
  "front_bottom",
  "middle_top",
  "middle_center",
  "middle_bottom",
  "back_top",
  "back_center",
  "back_bottom",
];

function nowIso() {
  return new Date().toISOString();
}

function createMetadata(createdAt = nowIso()): SaveMetadata {
  return {
    save_schema_version: SAVE_SCHEMA_VERSION,
    save_version: 1,
    created_at: createdAt,
    updated_at: createdAt,
    source_spec: SAVE_SOURCE_SPEC,
    environment: "local_mock",
    is_local_mock: true,
    migration_version: "local_mock_migration_v1",
    checksum_display_hash: "mock_pending",
    notes:
      "ข้อมูล Save นี้เป็น local mock สำหรับ prototype เท่านั้น ระบบจริงต้องใช้ server-authoritative state",
  };
}

function deployedUnitsFromCharacters(characters: GameCharacter[]) {
  const deployedUnits = Object.fromEntries(canonicalCells.map((cell) => [cell, null])) as Record<
    CellId,
    string | null
  >;

  characters.forEach((character) => {
    if (character.formationCell) {
      deployedUnits[character.formationCell] = character.id;
    }
  });

  return deployedUnits;
}

function teammateState(character: GameCharacter) {
  return {
    characterId: character.id,
    displayName: character.displayName,
    class: character.baseClass,
    level: character.level,
    star: character.star === "none-v1a" ? 0 : character.star,
    shardsOwned: character.shardState.owned,
    unlocked: character.id === "ch_common_priest_light_aid" || mockCharacters.some((item) => item.id === character.id),
    starterTeammate: character.id === "ch_common_priest_light_aid",
  };
}

function unlockedStageIds() {
  return mockStages.filter((stage) => !stage.locked).map((stage) => stage.stage_id);
}

function stageRatings() {
  return Object.fromEntries(
    mockStages
      .filter((stage) => stage.stage_id <= "1-6" || !stage.locked)
      .map((stage) => [stage.stage_id, stage.star_rating]),
  ) as Record<string, 0 | 1 | 2 | 3>;
}

export function createInitialGameState(): CoreGameState {
  const metadata = createMetadata();
  const deployedUnits = deployedUnitsFromCharacters(mockCharacters);
  const gachaBox1 = gachaBoxes.find((box) => box.id === "box_1_v1a") ?? gachaBoxes[0];

  const state: CoreGameState = {
    metadata,
    player: {
      playerId: "mock_player_001",
      playerName: mockPlayer.playerName,
      level: mockPlayer.level,
      effectiveLevelCap: mockPlayer.effectiveLevelCap,
      gold: mockPlayer.gold,
      freeGem: mockPlayer.freeGem,
      paidGem: mockPlayer.paidGem,
      mailboxCount: mockPlayer.mailboxCount,
      inventorySlots: mockInventory.inventorySlots,
      usedInventorySlots: mockInventory.usedInventorySlots,
      teamPower: mockPlayer.teamPower,
      launchStatus: mockPlayer.launchStatus,
    },
    featureFlags: {
      enableWldWithdraw: featureFlagsConfig.flags.ENABLE_WLD_WITHDRAW,
      enableWldRewardRanking: featureFlagsConfig.flags.ENABLE_WLD_REWARD_RANKING,
      enablePaidGemGacha: featureFlagsConfig.flags.ENABLE_PAID_GEM_GACHA,
      enableBox2: featureFlagsConfig.flags.ENABLE_BOX_2,
      enableBox3: featureFlagsConfig.flags.ENABLE_BOX_3,
      enableClass2: featureFlagsConfig.flags.ENABLE_CLASS_2,
      enableClass3: featureFlagsConfig.flags.ENABLE_CLASS_3,
      enableEpicNormalDrop: featureFlagsConfig.flags.ENABLE_EPIC_NORMAL_DROP,
      enableCrafting: featureFlagsConfig.flags.ENABLE_CRAFTING,
      enableEquipmentSetBonus: featureFlagsConfig.flags.ENABLE_EQUIPMENT_SET_BONUS,
      enableShardExchange: featureFlagsConfig.flags.ENABLE_SHARD_EXCHANGE,
      enableWldGuildReward: featureFlagsConfig.flags.ENABLE_WLD_GUILD_REWARD,
    },
    mainCharacter: {
      id: "main_hero",
      class: mainCharacter.baseClass,
      level: mainCharacter.level,
      starterWeapon: "gear_sword_t1_common",
      legendaryEquivalentMultiplier: 1.85,
      starSystem: "none-v1a",
    },
    teammates: box1GachaCharacters.map(teammateState),
    teamFormation: {
      canonicalCells,
      deployedUnits,
      formation_snapshot: {
        snapshotId: "formation_snapshot_local_mock_001",
        capturedFor: "local_mock",
        units: Object.entries(deployedUnits)
          .filter(([, characterId]) => Boolean(characterId))
          .map(([cellId, characterId]) => ({ cellId: cellId as CellId, characterId: characterId as string })),
      },
      activeFormationBonus: "Balanced Line",
      mainCharacterMandatory: true,
    },
    skillLoadout: {
      currentClass: "Swordsman",
      activeSkillIds: [
        "swordsman_slash_01",
        "swordsman_guard_break_02",
        "swordsman_brave_guard_03",
      ],
      priorityOrder: [
        "swordsman_guard_break_02",
        "swordsman_slash_01",
        "swordsman_brave_guard_03",
      ],
      skill_loadout_snapshot: {
        snapshotId: "skill_loadout_snapshot_local_mock_001",
        capturedFor: "local_mock",
        activeSkillIds: [
          "swordsman_guard_break_02",
          "swordsman_slash_01",
          "swordsman_brave_guard_03",
        ],
      },
    },
    stageProgress: {
      currentChapter: mockPlayer.currentChapter,
      highestStageCleared: mockPlayer.highestStageCleared,
      highestThreeStarStage: mockIdle.highestThreeStarStage,
      unlockedStages: unlockedStageIds(),
      starRatings: stageRatings(),
      firstClearClaimed: {
        "1-1": true,
        "1-2": true,
        "1-3": true,
        "1-4": true,
        "1-5": true,
      },
      starChestClaimed: {
        "1-1": true,
        "1-5": false,
      },
      rewardedReplayCounters: {
        "1-3": {
          businessDate: "2026-04-27",
          count: 2,
          cap: 10,
        },
      },
      lastRewardLogPreview: null,
      selectedStageId: "1-6",
    },
    inventory: {
      inventorySlots: mockInventory.inventorySlots,
      usedInventorySlots: mockInventory.usedInventorySlots,
      equippedItems: [...mockInventory.equippedItems],
      gearInstances: [...mockInventory.gearInstances],
      materials: [...mockInventory.materials],
      tickets: [...mockInventory.tickets],
      shards: [...mockInventory.shards],
      mailboxPreview: [...mockInventory.mailboxPreview],
    },
    idle: {
      idleStage: mockIdle.idleStage,
      accumulatedHours: mockIdle.accumulatedHours,
      maxIdleHours: mockIdle.maxIdleHours,
      xpReady: mockIdle.xpReady,
      goldReady: mockIdle.goldReady,
      autoFarmFreePerDay: mockIdle.autoFarmFreePerDay,
      autoFarmUsedToday: mockIdle.autoFarmUsedToday,
      extraAutoFarmPrices: mockIdle.extraAutoFarmPrices,
    },
    gacha: {
      activeBoxId: "box_1_v1a",
      pity: {
        pullsSinceLastRare: gachaBox1.pityState.currentCounter,
        pityLimit: gachaBox1.pityState.pityLimit,
        guaranteedGrade: "Rare",
      },
      pullHistoryPreview: [
        {
          logId: gachaLogPreview.logId,
          resultCharacterId: gachaLogPreview.resultCharacterId,
          grade: gachaLogPreview.grade,
        },
      ],
      paidGemGachaDisabled: true,
      box2Disabled: true,
      box3Disabled: true,
    },
    guild: {
      guildName: mockGuild.name,
      guildLevel: mockGuild.level,
      memberCount: mockGuild.members,
      memberLimit: mockGuild.memberLimit,
      guildPoint: mockGuild.guildPoint,
      guildBossEntryUsedToday: mockGuild.guildBoss.entryUsedToday,
      guildBossEntryLimit: mockGuild.guildBoss.entryLimitPerMember,
      wldGuildRewardDisabled: true,
    },
    safety: {
      regionRestricted: true,
      policyPlaceholdersUnreviewed: true,
      simulationNotRun: true,
      productionStatus: "NO-GO",
    },
  };

  return {
    ...state,
    metadata: {
      ...metadata,
      checksum_display_hash: createDisplayHash({ ...state, metadata: { ...metadata, checksum_display_hash: "mock_pending" } }),
    },
  };
}

export const initialGameState = createInitialGameState();
