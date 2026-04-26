import type { Chapter, StageNode, StageType } from "@/types/game";

export const stageGenerationMeta = {
  stage_generation_version: "v1a-stage-gen-001",
  enemy_pool_version: "v1a-enemy-pool-001",
  stage_config_version: "v1a-stage-config-001",
} as const;

export const chapters: Chapter[] = [
  { id: 1, title: "ป่าประกายเพลิง", elementTheme: "Fire / Wind" },
  { id: 2, title: "ลุ่มน้ำเถ้าถ่าน", elementTheme: "Water / Fire" },
  { id: 3, title: "หุบเขาศิลา", elementTheme: "Earth / Wind" },
  { id: 4, title: "บึงธาราหิน", elementTheme: "Water / Earth" },
  { id: 5, title: "วิหารแสงและเงา", elementTheme: "Light / Dark" },
];

const tutorialOverrides: Record<string, string> = {
  "1-1": "2 enemies, no status, no backstab, basic attacks only",
  "1-2": "3 enemies, basic attacks only",
  "1-3": "3 enemies, introduces archer/mage, no hard control",
  "1-5": "first elite, not hard wall",
  "1-10": "tutorial boss, no heavy anti-player trait",
};

function stageType(chapter: number, stageNumber: number): StageType {
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

function globalStageIndex(chapter: number, stageNumber: number): number {
  return ((chapter - 1) * chapter * 10) / 2 + stageNumber;
}

function recommendedLevel(chapter: number, stageNumber: number): number {
  return Math.min(50, Math.max(1, chapter * 7 + Math.ceil(stageNumber / 2)));
}

function recommendedPower(chapter: number, stageNumber: number): number {
  const level = recommendedLevel(chapter, stageNumber);
  return level * 1200 + globalStageIndex(chapter, stageNumber) * 85;
}

function createStage(chapter: Chapter, stageNumber: number): StageNode {
  const stageId = `${chapter.id}-${stageNumber}`;
  const type = stageType(chapter.id, stageNumber);
  const globalIndex = globalStageIndex(chapter.id, stageNumber);
  const isCleared = chapter.id === 1 && stageNumber <= 5;
  const isNext = chapter.id === 1 && stageNumber === 6;
  const locked = !(isCleared || isNext);

  return {
    stage_id: stageId,
    chapter: chapter.id,
    stage_number: stageNumber,
    global_stage_index: globalIndex,
    recommended_level: recommendedLevel(chapter.id, stageNumber),
    recommended_power: recommendedPower(chapter.id, stageNumber),
    stage_type: type,
    enemy_composition_id: `enemy_comp_${stageId.replace("-", "_")}`,
    element_theme: chapter.elementTheme,
    drop_table_id: `drop_${stageId.replace("-", "_")}_${type}`,
    first_clear_reward_formula:
      "gold = 100 + global_stage_index * 12; free_gem = boss ? 10 : 0",
    star_chest_reward: `star_chest_ch${chapter.id}`,
    unlock_requirement:
      stageNumber === 1
        ? chapter.id === 1
          ? "account_created"
          : `${chapter.id - 1}-${(chapter.id - 1) * 10} cleared`
        : `${chapter.id}-${stageNumber - 1} cleared`,
    stage_generation_version: stageGenerationMeta.stage_generation_version,
    enemy_composition_seed: `seed_${chapter.id}_${stageNumber}_${globalIndex}`,
    enemy_pool_version: stageGenerationMeta.enemy_pool_version,
    stage_config_version: stageGenerationMeta.stage_config_version,
    tutorial_override: tutorialOverrides[stageId],
    star_rating: isCleared ? 3 : 0,
    locked,
  };
}

export const mockStages: StageNode[] = chapters.flatMap((chapter) =>
  Array.from({ length: chapter.id * 10 }, (_, index) =>
    createStage(chapter, index + 1),
  ),
);
