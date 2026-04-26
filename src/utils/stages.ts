import type { ChapterId, StageNode, StageType } from "@/types/game";

export type StageStatus = "completed" | "unlocked" | "locked";

export type ChapterLore = {
  id: ChapterId;
  title: string;
  elementTheme: string;
  tone: string;
  assetId: string;
};

export const chapterLore: Record<ChapterId, ChapterLore> = {
  1: {
    id: 1,
    title: "ป่าประกายเพลิง",
    elementTheme: "Fire / Wind",
    tone: "tutorial forest, beginner fire/wind enemies",
    assetId: "bg_chapter_1_spark_forest",
  },
  2: {
    id: 2,
    title: "ลุ่มน้ำเถ้าถ่าน",
    elementTheme: "Water / Fire",
    tone: "river ruins and ash fields",
    assetId: "bg_chapter_2_ash_river",
  },
  3: {
    id: 3,
    title: "หุบเขาศิลา",
    elementTheme: "Earth / Wind",
    tone: "stone valley, assassins/controllers begin appearing",
    assetId: "bg_chapter_3_stone_valley",
  },
  4: {
    id: 4,
    title: "บึงธาราหิน",
    elementTheme: "Water / Earth",
    tone: "swamp and stone guardians",
    assetId: "bg_chapter_4_stone_marsh",
  },
  5: {
    id: 5,
    title: "วิหารแสงและเงา",
    elementTheme: "Light / Dark",
    tone: "temple of light and shadow, no hard-counter boss tuning",
    assetId: "bg_chapter_5_light_shadow_temple",
  },
};

export const stageTypeLabel: Record<StageType, string> = {
  normal: "Normal",
  elite: "Elite",
  "mini-boss": "Mini-Boss",
  "main-boss": "Main Boss",
};

export function getStageType(chapter: ChapterId, stageNumber: number): StageType {
  const finalStage = chapter * 10;

  if (stageNumber === finalStage) {
    return "main-boss";
  }

  if (stageNumber % 10 === 0) {
    return "mini-boss";
  }

  if (stageNumber % 10 === 5) {
    return "elite";
  }

  return "normal";
}

export function getChapterElementTheme(chapter: ChapterId): string {
  return chapterLore[chapter].elementTheme;
}

export function getChapterTone(chapter: ChapterId): string {
  return chapterLore[chapter].tone;
}

export function isMainBossStage(stage: StageNode): boolean {
  return stage.stage_type === "main-boss";
}

export function isMiniBossStage(stage: StageNode): boolean {
  return stage.stage_type === "mini-boss";
}

export function isBossStage(stage: StageNode): boolean {
  return isMiniBossStage(stage) || isMainBossStage(stage);
}

export function isEliteStage(stage: StageNode): boolean {
  return stage.stage_type === "elite";
}

export function isTutorialOverrideStage(stage: StageNode): boolean {
  return Boolean(stage.tutorial_override);
}

export function getStageStatus(stage: StageNode): StageStatus {
  if (stage.star_rating > 0) {
    return "completed";
  }

  return stage.locked ? "locked" : "unlocked";
}

export function getStageStarRating(stage: StageNode): 0 | 1 | 2 | 3 {
  return stage.star_rating;
}

export function getDropTableId(chapter: ChapterId, stageType: StageType): string {
  return `drop_ch${chapter}_${stageType}_v1a`;
}

export function getEnemyCompositionId(
  chapter: ChapterId,
  stageNumber: number,
  stageType: StageType,
): string {
  return `enemy_comp_ch${chapter}_${stageNumber}_${stageType}`;
}

export function getChapterStages(
  stages: StageNode[],
  chapter: ChapterId,
): StageNode[] {
  return stages.filter((stage) => stage.chapter === chapter);
}

export function getNextSuggestedStage(stages: StageNode[]): StageNode {
  return (
    stages.find((stage) => !stage.locked && stage.star_rating === 0) ??
    stages.find((stage) => !stage.locked) ??
    stages[0]
  );
}

export function getEnemyCompositionSummary(stage: StageNode): string {
  const copy: Record<StageType, string> = {
    normal: "3-5 enemies, basic frontline plus ranged mix",
    elite: "1 elite + 2-4 minions",
    "mini-boss": "1 mini-boss + 2-4 minions",
    "main-boss": "main boss encounter with phases and optional minions",
  };

  return copy[stage.stage_type];
}

export function getBossId(stage: StageNode): string | null {
  if (!isBossStage(stage)) {
    return null;
  }

  return `${stage.stage_type}_ch${stage.chapter}_${stage.stage_number}`;
}

export function getChapterProgress(stages: StageNode[]) {
  const stageCount = stages.length;
  const completedCount = stages.filter((stage) => getStageStatus(stage) === "completed").length;
  const normalCount = stages.filter((stage) => stage.stage_type === "normal").length;
  const eliteCount = stages.filter((stage) => stage.stage_type === "elite").length;
  const miniBossCount = stages.filter((stage) => stage.stage_type === "mini-boss").length;
  const mainBossCount = stages.filter((stage) => stage.stage_type === "main-boss").length;
  const starsEarned = stages.reduce((total, stage) => total + stage.star_rating, 0);
  const totalStars = stageCount * 3;
  const completionPercent =
    stageCount === 0 ? 0 : Math.round((completedCount / stageCount) * 100);

  return {
    stageCount,
    completedCount,
    normalCount,
    eliteCount,
    miniBossCount,
    mainBossCount,
    bossCheckpointCount: miniBossCount + mainBossCount,
    starsEarned,
    totalStars,
    completionPercent,
  };
}
