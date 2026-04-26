import { bossRows } from "@/config/bossConfig";
import { createConfigMeta } from "@/config/meta";
import type { ChapterId, StageType } from "@/types/game";

const configMeta = createConfigMeta({
  configKey: "stages_config",
  notes:
    "Stage 150 Rows config เป็น mock/export-ready foundation. ข้อมูลด่านสร้างจาก deterministic generator.",
  status: "validated_mock",
});

export type StageExportRow = {
  stage_id: string;
  chapter: ChapterId;
  stage_number: number;
  global_stage_index: number;
  recommended_level: number;
  recommended_power: number;
  stage_type: StageType;
  enemy_composition_id: string;
  element_theme: string;
  drop_table_id: string;
  first_clear_reward_formula: string;
  star_chest_reward: string;
  unlock_requirement: string;
  stage_generation_version: string;
  enemy_composition_seed: string;
  enemy_pool_version: string;
  stage_config_version: string;
  boss_id?: string;
  tutorial_override?: string;
  asset_id: string;
  config_version: string;
};

export const chapterConfig: Record<
  ChapterId,
  { title: string; elementTheme: string; stageCount: number; asset_id: string }
> = {
  1: {
    title: "ป่าประกายเพลิง",
    elementTheme: "Fire / Wind",
    stageCount: 10,
    asset_id: "bg_chapter_1_spark_forest",
  },
  2: {
    title: "ลุ่มน้ำเถ้าถ่าน",
    elementTheme: "Water / Fire",
    stageCount: 20,
    asset_id: "bg_chapter_2_ash_river",
  },
  3: {
    title: "หุบเขาศิลา",
    elementTheme: "Earth / Wind",
    stageCount: 30,
    asset_id: "bg_chapter_3_stone_valley",
  },
  4: {
    title: "บึงธาราหิน",
    elementTheme: "Water / Earth",
    stageCount: 40,
    asset_id: "bg_chapter_4_stone_marsh",
  },
  5: {
    title: "วิหารแสงและเงา",
    elementTheme: "Light / Dark",
    stageCount: 50,
    asset_id: "bg_chapter_5_light_shadow_temple",
  },
};

export const stageGenerationConfig = {
  stage_generation_version: "v1a-stage-gen-export-001",
  enemy_pool_version: "v1a-enemy-pool-export-001",
  stage_config_version: configMeta.config_version,
} as const;

export const tutorialOverrideRows = [
  {
    stage_id: "1-1",
    rules: ["2 enemies", "no status", "no backstab", "basic attacks only"],
  },
  {
    stage_id: "1-2",
    rules: ["3 enemies", "basic attacks only"],
  },
  {
    stage_id: "1-3",
    rules: ["3 enemies", "introduces archer/mage", "no hard control"],
  },
  {
    stage_id: "1-5",
    rules: ["first Elite", "not a hard wall"],
  },
  {
    stage_id: "1-10",
    rules: ["tutorial main boss", "no heavy anti-player trait"],
  },
] as const;

function getStageType(chapter: ChapterId, stageNumber: number): StageType {
  if (stageNumber === chapterConfig[chapter].stageCount) return "main-boss";
  if (stageNumber % 10 === 0) return "mini-boss";
  if (stageNumber % 10 === 5) return "elite";
  return "normal";
}

function getGlobalStageIndex(chapter: ChapterId, stageNumber: number): number {
  return ((chapter - 1) * chapter * 10) / 2 + stageNumber;
}

function getRecommendedLevel(chapter: ChapterId, stageNumber: number): number {
  return Math.min(50, Math.max(1, chapter * 7 + Math.ceil(stageNumber / 2)));
}

function getRecommendedPower(chapter: ChapterId, stageNumber: number, stageType: StageType): number {
  const typeMultiplier: Record<StageType, number> = {
    normal: 1,
    elite: 1.15,
    "mini-boss": 1.3,
    "main-boss": 1.5,
  };
  const level = getRecommendedLevel(chapter, stageNumber);
  return Math.round((level * 1200 + getGlobalStageIndex(chapter, stageNumber) * 85) * typeMultiplier[stageType]);
}

function dropTableId(chapter: ChapterId, stageType: StageType) {
  const key = stageType.replace("-", "_");
  return `drop_ch${chapter}_${key}`;
}

function stageAssetId(stageType: StageType) {
  const assetByType: Record<StageType, string> = {
    normal: "icon_stage_normal",
    elite: "icon_stage_elite",
    "mini-boss": "icon_stage_mini_boss",
    "main-boss": "icon_stage_main_boss",
  };
  return assetByType[stageType];
}

function getBossId(stageId: string) {
  return bossRows.find((boss) => boss.stage_id === stageId)?.boss_id;
}

function tutorialOverride(stageId: string) {
  const override = tutorialOverrideRows.find((row) => row.stage_id === stageId);
  return override ? override.rules.join("; ") : undefined;
}

function createStageRow(chapter: ChapterId, stageNumber: number): StageExportRow {
  const stage_id = `${chapter}-${stageNumber}`;
  const stage_type = getStageType(chapter, stageNumber);
  const global_stage_index = getGlobalStageIndex(chapter, stageNumber);
  const boss_id = getBossId(stage_id);

  return {
    stage_id,
    chapter,
    stage_number: stageNumber,
    global_stage_index,
    recommended_level: getRecommendedLevel(chapter, stageNumber),
    recommended_power: getRecommendedPower(chapter, stageNumber, stage_type),
    stage_type,
    enemy_composition_id: `enemy_comp_ch${chapter}_${stageNumber}`,
    element_theme: chapterConfig[chapter].elementTheme,
    drop_table_id: dropTableId(chapter, stage_type),
    first_clear_reward_formula:
      "gold = 100 + global_stage_index * 12; free_gem = boss ? 10 : 0",
    star_chest_reward: `star_chest_ch${chapter}`,
    unlock_requirement:
      stageNumber === 1
        ? chapter === 1
          ? "account_created"
          : `${chapter - 1}-${chapterConfig[(chapter - 1) as ChapterId].stageCount} cleared`
        : `${chapter}-${stageNumber - 1} cleared`,
    stage_generation_version: stageGenerationConfig.stage_generation_version,
    enemy_composition_seed: `seed_ch${chapter}_${stageNumber}_${global_stage_index}`,
    enemy_pool_version: stageGenerationConfig.enemy_pool_version,
    stage_config_version: stageGenerationConfig.stage_config_version,
    boss_id,
    tutorial_override: tutorialOverride(stage_id),
    asset_id: stageAssetId(stage_type),
    config_version: configMeta.config_version,
  };
}

export const stageRows: StageExportRow[] = ([1, 2, 3, 4, 5] as const).flatMap((chapter) =>
  Array.from({ length: chapterConfig[chapter].stageCount }, (_, index) =>
    createStageRow(chapter, index + 1),
  ),
);

export const stageConfig = {
  ...configMeta,
  export_id: "stages_config",
  chapters: chapterConfig,
  stageGenerationConfig,
  tutorialOverrideRows,
  rows: stageRows,
  stageCount: stageRows.length,
} as const;
