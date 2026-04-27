import type { BattleEngineResult } from "../battle/battleTypes";
import { createRewardAtomicityPreview } from "./rewardAtomicity";
import { createFirstClearRewardSnapshot, createStarChestSnapshot } from "./rewardPreview";
import { createReplayRewardPreview, incrementRewardedReplayCounter } from "./replayRules";
import { calculateStageStars } from "./starRating";
import type {
  ProcessedStageProgressResult,
  StageProgressInput,
  StageProgressModel,
} from "./progressTypes";
import { unlockStageAfterVictory } from "./stageProgressionRules";
import { validateProcessedStageProgress, validateStageProgressInput } from "./progressValidation";

type StageProgressPreviewState = {
  stageProgress: StageProgressModel & {
    highestThreeStarStage: string;
    lastRewardLogPreview: ProcessedStageProgressResult["reward_log_preview"] | null;
  };
};

export function createXpDistributionPreview(battleResult: BattleEngineResult) {
  return battleResult.final_unit_states
    .filter((unit) => unit.side === "player")
    .map((unit) => {
      const xpPercent = unit.alive ? 100 : 70;
      return {
        unit_id: unit.unit_id,
        display_name: unit.unit_id,
        alive_at_end: unit.alive,
        xp_percent: xpPercent as 100 | 70,
        xp_amount: Math.floor((battleResult.xp_gained * xpPercent) / 100),
        capped_no_extra_xp: false,
      };
    });
}

export function processBattleForStageProgress(input: StageProgressInput): ProcessedStageProgressResult {
  const inputValidation = validateStageProgressInput(input);
  const battleStars = calculateStageStars(input.battleResult);
  const starsBefore = input.state.starRatings[input.stage.stage_id] ?? 0;
  const starsAfter = input.battleResult.result === "victory" ? Math.max(starsBefore, battleStars) as 0 | 1 | 2 | 3 : starsBefore;
  const firstClear = createFirstClearRewardSnapshot(
    input.stage,
    { ...input.battleResult, stars: battleStars },
    Boolean(input.state.firstClearClaimed[input.stage.stage_id]),
  );
  const starChest = createStarChestSnapshot(
    input.stage,
    { ...input.battleResult, stars: battleStars },
    starsBefore,
    Boolean(input.state.starChestClaimed[input.stage.stage_id]),
  );
  const replay = createReplayRewardPreview(input.state, input.stage, input.battleResult, input.bangkokBusinessDate);
  const rewardsForAtomicity = [
    ...firstClear.material_rewards,
    ...firstClear.item_rewards,
    ...starChest.reward_snapshot,
    ...replay.drops,
  ];
  const atomicity = createRewardAtomicityPreview(input, rewardsForAtomicity);
  const unlocked = input.battleResult.result === "victory"
    ? unlockStageAfterVictory(input.state, input.stage.stage_id)
    : { nextStage: null, unlockedStages: input.state.unlockedStages };

  const result: ProcessedStageProgressResult = {
    stage_id: input.stage.stage_id,
    result: input.battleResult.result,
    previous_highest_stage: input.state.highestStageCleared,
    next_stage_unlocked: input.battleResult.result === "victory" ? unlocked.nextStage : null,
    stars_before: starsBefore,
    stars_after: starsAfter,
    first_clear: firstClear,
    star_chest: starChest,
    replay,
    xp_distribution: createXpDistributionPreview(input.battleResult),
    atomicity,
    reward_log_preview: {
      log_id: `local_reward_log_${input.stage.stage_id}_${input.battleResult.deterministic_seed}`,
      stage_id: input.stage.stage_id,
      reward_snapshot_id: firstClear.first_clear_reward_snapshot,
      local_mock_only: true,
      no_wld_reward: true,
      no_paid_gem_reward: true,
      no_ledger: true,
    },
    validation: inputValidation,
    safety_notes: [
      "รางวัลนี้เป็น mock preview เท่านั้น",
      "ไม่มี WLD Reward ใน V1A",
      "ไม่มี ledger จริง",
      "ระบบจริงต้องใช้ server-authoritative reward snapshot",
      "Production status: NO-GO",
    ],
  };

  return {
    ...result,
    validation: inputValidation.status === "fail" ? inputValidation : validateProcessedStageProgress(result),
  };
}

export function applyLocalStageProgressPreview<TState extends StageProgressPreviewState>(
  state: TState,
  processedResult: ProcessedStageProgressResult,
): TState {
  if (processedResult.result !== "victory") return state;

  const nextStateModel: StageProgressModel = incrementRewardedReplayCounter(
    {
      highestStageCleared: state.stageProgress.highestStageCleared,
      unlockedStages: state.stageProgress.unlockedStages,
      starRatings: state.stageProgress.starRatings,
      firstClearClaimed: state.stageProgress.firstClearClaimed,
      starChestClaimed: state.stageProgress.starChestClaimed,
      rewardedReplayCounters: state.stageProgress.rewardedReplayCounters,
    },
    processedResult.stage_id,
    processedResult.replay.bangkok_business_date,
  );

  return {
    ...state,
    stageProgress: {
      ...state.stageProgress,
      highestStageCleared: processedResult.stage_id,
      highestThreeStarStage:
        processedResult.stars_after === 3 ? processedResult.stage_id : state.stageProgress.highestThreeStarStage,
      unlockedStages: processedResult.next_stage_unlocked && !state.stageProgress.unlockedStages.includes(processedResult.next_stage_unlocked)
        ? [...state.stageProgress.unlockedStages, processedResult.next_stage_unlocked]
        : state.stageProgress.unlockedStages,
      starRatings: {
        ...state.stageProgress.starRatings,
        [processedResult.stage_id]: processedResult.stars_after,
      },
      firstClearClaimed: {
        ...state.stageProgress.firstClearClaimed,
        [processedResult.stage_id]: state.stageProgress.firstClearClaimed[processedResult.stage_id] || processedResult.first_clear.first_clear_available,
      },
      starChestClaimed: state.stageProgress.starChestClaimed,
      rewardedReplayCounters: nextStateModel.rewardedReplayCounters,
      lastRewardLogPreview: processedResult.reward_log_preview,
    },
  };
}
