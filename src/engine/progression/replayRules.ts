import type { BattleEngineResult } from "../battle/battleTypes";
import type { ReplayRewardPreview, StageProgressModel, StageProgressStage } from "./progressTypes";
import { V1A_REWARDED_REPLAY_CAP_PER_DAY } from "./stageProgressionRules";

export function canClaimRewardedReplay(
  state: StageProgressModel,
  stageId: string,
  bangkokBusinessDate: string,
) {
  const counter = state.rewardedReplayCounters[stageId];
  const used = counter?.businessDate === bangkokBusinessDate ? counter.count : 0;
  return {
    eligible: Boolean(state.firstClearClaimed[stageId]),
    used,
    cap: counter?.cap ?? V1A_REWARDED_REPLAY_CAP_PER_DAY,
    capReached: used >= (counter?.cap ?? V1A_REWARDED_REPLAY_CAP_PER_DAY),
  };
}

export function createReplayRewardPreview(
  state: StageProgressModel,
  stage: StageProgressStage,
  battleResult: BattleEngineResult,
  bangkokBusinessDate: string,
): ReplayRewardPreview {
  const replay = canClaimRewardedReplay(state, stage.stage_id, bangkokBusinessDate);
  const canReward = replay.eligible && !replay.capReached && battleResult.result === "victory";

  return {
    stage_id: stage.stage_id,
    eligible: canReward,
    rewarded_replay_cap_per_day: replay.cap,
    rewarded_replay_used_today: replay.used,
    bangkok_business_date: bangkokBusinessDate,
    cap_reached: replay.capReached,
    message_th: replay.capReached ? "วันนี้รับรางวัลเล่นซ้ำครบแล้ว" : "Replay Reward ใช้โควตารายวัน",
    xp_reward: canReward ? Math.floor(battleResult.xp_gained * 0.35) : 0,
    gold_reward: canReward ? Math.floor(battleResult.gold_gained * 0.35) : 0,
    drops: canReward ? battleResult.drops.slice(0, 1) : [],
    gear_chance_multiplier: 0.2,
  };
}

export function incrementRewardedReplayCounter(
  state: StageProgressModel,
  stageId: string,
  bangkokBusinessDate: string,
): StageProgressModel {
  const replay = canClaimRewardedReplay(state, stageId, bangkokBusinessDate);
  if (!replay.eligible || replay.capReached) return state;

  return {
    ...state,
    rewardedReplayCounters: {
      ...state.rewardedReplayCounters,
      [stageId]: {
        businessDate: bangkokBusinessDate,
        count: replay.used + 1,
        cap: replay.cap,
      },
    },
  };
}
