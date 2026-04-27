import { runBattle } from "../battle/battleEngine";
import { createMockBattleInput } from "../battle/mockBattleInput";
import type { StageProgressInput, StageProgressModel, StageProgressStage } from "./progressTypes";

export const mockProgressState: StageProgressModel = {
  highestStageCleared: "1-4",
  unlockedStages: ["1-1", "1-2", "1-3", "1-4", "1-5"],
  starRatings: {
    "1-1": 3,
    "1-2": 3,
    "1-3": 2,
    "1-4": 2,
    "1-5": 0,
  },
  firstClearClaimed: {
    "1-1": true,
    "1-2": true,
    "1-3": true,
    "1-4": true,
    "1-5": false,
  },
  starChestClaimed: {
    "1-1": true,
    "1-2": true,
    "1-3": false,
    "1-4": false,
    "1-5": false,
  },
  rewardedReplayCounters: {
    "1-3": { businessDate: "2026-04-27", count: 2, cap: 10 },
  },
};

export const mockProgressStage: StageProgressStage = {
  stage_id: "1-5",
  chapter: 1,
  stage_number: 5,
  stage_type: "elite",
  drop_table_id: "drop_ch1_elite",
  first_clear_reward_formula: "XP +320, Gold +180, material drop preview",
  star_chest_reward: "Free Gem x1, Enhancement Powder x20, Skill Book Fragment x1",
};

export function createMockStageProgressInput(): StageProgressInput {
  const battleInput = createMockBattleInput();
  return {
    state: mockProgressState,
    stage: mockProgressStage,
    battleResult: runBattle(battleInput),
    bangkokBusinessDate: "2026-04-27",
    inventoryPreview: {
      inventorySlots: 100,
      usedInventorySlots: 82,
      mailboxCount: 12,
      mailboxLimit: 100,
    },
  };
}
