import { IDLE_CONFIG_VERSION } from "./idleRules";
import type { IdleMissionInput, IdleTeamXpRow, MissionState } from "./idleTypes";

const MOCK_IDLE = {
  idleStage: "1-5",
  highestThreeStarStage: "1-5",
  idleStageGlobalIndex: 5,
  accumulatedHours: 5.5,
  autoFarmUsedToday: 1,
} as const;

const MOCK_INVENTORY = {
  inventorySlots: 100,
  usedInventorySlots: 32,
  mailboxCount: 3,
  mailboxMaxActive: 100,
} as const;

type MockIdleMissionInputOptions = {
  now?: string;
  accumulatedHours?: number;
  autoFarmUsedToday?: number;
  state?: {
    idle: {
      idleStage: string;
      accumulatedHours: number;
      autoFarmUsedToday: number;
    };
    inventory: {
      inventorySlots: number;
      usedInventorySlots: number;
      mailboxPreview: readonly unknown[];
    };
    player: {
      mailboxCount: number;
    };
    teamFormation: {
      deployedUnits: Record<string, string | null>;
    };
    mainCharacter: {
      level: number;
    };
    teammates: Array<{
      characterId: string;
      displayName: string;
      level: number;
      unlocked: boolean;
    }>;
    stageProgress: {
      highestThreeStarStage: string;
    };
    gacha: {
      pullHistoryPreview: readonly unknown[];
    };
    guild: {
      guildBossEntryUsedToday: number;
    };
  };
};

function teamSnapshotFromMock(): IdleTeamXpRow[] {
  return [
    ...[
      {
        character_id: "main_hero",
        display_name: "Hero",
        cell_id: "front_center",
      },
      {
        character_id: "ch_common_priest_light_aid",
        display_name: "Light Aid Priest",
        cell_id: "back_center",
      },
      {
        character_id: "ch_common_archer_wind_shot",
        display_name: "Wind Shot Archer",
        cell_id: "back_top",
      },
    ].map((unit) => ({
      character_id: unit.character_id,
      display_name: unit.display_name,
      cell_id: unit.cell_id as IdleTeamXpRow["cell_id"],
      deployed: true,
      level: 12,
      level_cap: 50 as const,
      xp_share_percent: 100 as const,
      xp_gain_preview: 0,
      level_capped: false,
      capped_no_conversion_v1a: false,
    })),
    ...[
      {
        character_id: "ch_common_thief_dark_cut",
        display_name: "Dark Cut Thief",
      },
    ].map((unit) => ({
      character_id: unit.character_id,
      display_name: unit.display_name,
      cell_id: "undeployed" as const,
      deployed: false,
      level: 1,
      level_cap: 50 as const,
      xp_share_percent: 0 as const,
      xp_gain_preview: 0,
      level_capped: false,
      capped_no_conversion_v1a: false,
    })),
  ];
}

function teamSnapshotFromState(options: MockIdleMissionInputOptions): IdleTeamXpRow[] {
  if (!options.state) return teamSnapshotFromMock();

  const deployedIds = new Set(Object.values(options.state.teamFormation.deployedUnits).filter(Boolean));
  const rows: IdleTeamXpRow[] = [
    {
      character_id: "main_hero",
      display_name: "Hero",
      cell_id: "front_center",
      deployed: deployedIds.has("main_hero"),
      level: options.state.mainCharacter.level,
      level_cap: 50,
      xp_share_percent: deployedIds.has("main_hero") ? 100 : 0,
      xp_gain_preview: 0,
      level_capped: options.state.mainCharacter.level >= 50,
      capped_no_conversion_v1a: options.state.mainCharacter.level >= 50,
    },
    ...options.state.teammates
      .filter((teammate) => teammate.unlocked)
      .map((teammate) => ({
        character_id: teammate.characterId,
        display_name: teammate.displayName,
        cell_id: (deployedIds.has(teammate.characterId) ? "back_center" : "undeployed") as IdleTeamXpRow["cell_id"],
        deployed: deployedIds.has(teammate.characterId),
        level: teammate.level,
        level_cap: 50 as const,
        xp_share_percent: deployedIds.has(teammate.characterId) ? 100 as const : 0 as const,
        xp_gain_preview: 0,
        level_capped: teammate.level >= 50,
        capped_no_conversion_v1a: teammate.level >= 50,
      })),
  ];

  return rows;
}

function missionProgress(options: MockIdleMissionInputOptions): Record<string, number> {
  return {
    clear_stage: 30,
    win_battle: 5,
    claim_idle: 5,
    use_auto_farm: options.autoFarmUsedToday ?? options.state?.idle.autoFarmUsedToday ?? MOCK_IDLE.autoFarmUsedToday,
    open_gacha: Math.max(1, options.state?.gacha.pullHistoryPreview.length ?? 1),
    guild_boss: options.state?.guild.guildBossEntryUsedToday ?? 1,
  };
}

export function createMockIdleMissionInput(options: MockIdleMissionInputOptions = {}): IdleMissionInput {
  const now = options.now ?? "2026-04-29T12:00:00+07:00";
  const claimedDaily: MissionState[] = [
    {
      mission_id: "daily_open_gacha_1",
      period_key: "2026-04-29",
      progress: 1,
      claimed: true,
    },
  ];

  return {
    now,
    idle_stage: options.state?.idle.idleStage ?? MOCK_IDLE.idleStage,
    highest_three_star_stage: options.state?.stageProgress.highestThreeStarStage ?? MOCK_IDLE.highestThreeStarStage,
    idle_stage_global_index: MOCK_IDLE.idleStageGlobalIndex,
    accumulated_hours: options.accumulatedHours ?? options.state?.idle.accumulatedHours ?? MOCK_IDLE.accumulatedHours,
    inventory: {
      inventory_slots: options.state?.inventory.inventorySlots ?? MOCK_INVENTORY.inventorySlots,
      used_inventory_slots: options.state?.inventory.usedInventorySlots ?? MOCK_INVENTORY.usedInventorySlots,
      mailbox_count: options.state?.player.mailboxCount ?? MOCK_INVENTORY.mailboxCount,
      mailbox_limit: MOCK_INVENTORY.mailboxMaxActive,
    },
    team_snapshot: teamSnapshotFromState(options),
    auto_farm: {
      used_today: options.autoFarmUsedToday ?? options.state?.idle.autoFarmUsedToday ?? MOCK_IDLE.autoFarmUsedToday,
      extra_purchase_count_today: 0,
    },
    mission_progress: missionProgress(options),
    claimed_daily: claimedDaily,
    claimed_weekly: [],
    config_versions: {
      idle_config: IDLE_CONFIG_VERSION,
      stage_config: "v1a.stages_config.foundation.0",
      drop_config: "v1a.drop_config.foundation.0",
      source_spec: "MASTER GAME SPEC V2.8.7 FINAL AUDIT & IMPLEMENTATION-READINESS LOCK",
    },
  };
}
