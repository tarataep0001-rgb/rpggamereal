import type { StageProgressModel } from "./progressTypes";

export const V1A_REWARDED_REPLAY_CAP_PER_DAY = 10;

function parseStageId(stageId: string) {
  const [chapterText, stageText] = stageId.split("-");
  return {
    chapter: Number(chapterText),
    stageNumber: Number(stageText),
  };
}

function chapterStageCount(chapter: number) {
  return chapter * 10;
}

export function getBangkokBusinessDate(now = new Date()): string {
  // Production business date must be server-authoritative.
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const year = parts.find((part) => part.type === "year")?.value ?? "1970";
  const month = parts.find((part) => part.type === "month")?.value ?? "01";
  const day = parts.find((part) => part.type === "day")?.value ?? "01";
  return `${year}-${month}-${day}`;
}

export function getNextStageUnlock(stageId: string): string | null {
  const { chapter, stageNumber } = parseStageId(stageId);
  const finalStage = chapterStageCount(chapter);

  if (chapter < 1 || chapter > 5 || stageNumber < 1 || stageNumber > finalStage) return null;
  if (stageNumber < finalStage) return `${chapter}-${stageNumber + 1}`;
  if (chapter < 5) return `${chapter + 1}-1`;
  return null;
}

export function isStageUnlocked(state: StageProgressModel, stageId: string) {
  return stageId === "1-1" || state.unlockedStages.includes(stageId);
}

export function unlockStageAfterVictory(state: StageProgressModel, stageId: string) {
  const nextStage = getNextStageUnlock(stageId);
  if (!nextStage || state.unlockedStages.includes(nextStage)) return { nextStage, unlockedStages: state.unlockedStages };
  return { nextStage, unlockedStages: [...state.unlockedStages, nextStage] };
}
