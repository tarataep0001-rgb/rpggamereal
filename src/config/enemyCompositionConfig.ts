import { bossRows } from "@/config/bossConfig";
import { enemyRows } from "@/config/enemyConfig";
import { createConfigMeta } from "@/config/meta";
import { stageGenerationConfig, stageRows, type StageExportRow } from "@/config/stageConfig";
import type { StageType } from "@/types/game";

const configMeta = createConfigMeta({
  configKey: "enemy_compositions_config",
  notes:
    "Enemy Composition 150 Rows config เป็น mock/export-ready foundation. ยังไม่มี battle engine จริงหรือ server-authoritative battle logic.",
  status: "validated_mock",
});

export type EnemyCompositionEnemy = {
  enemy_id: string;
  count: number;
  role: "minion" | "elite" | "boss_support";
};

export type EnemyCompositionRow = {
  enemy_composition_id: string;
  stage_id: string;
  chapter: StageExportRow["chapter"];
  stage_number: number;
  stage_type: StageType;
  enemies: EnemyCompositionEnemy[];
  boss_id?: string;
  composition_rule: string;
  seed: string;
  enemy_pool_version: string;
  config_version: string;
};

function chapterPool(stage: StageExportRow) {
  return enemyRows.filter((enemy) => enemy.chapter_appearance.includes(stage.chapter));
}

function pickEnemyIds(stage: StageExportRow, count: number): string[] {
  const pool = chapterPool(stage);
  return Array.from({ length: count }, (_, index) => pool[index % pool.length].enemy_id);
}

function normalEnemyCount(stage: StageExportRow): number {
  if (stage.stage_id === "1-1") return 2;
  if (stage.stage_id === "1-2" || stage.stage_id === "1-3") return 3;
  return 3 + ((stage.stage_number + stage.chapter) % 3);
}

function minionCount(stage: StageExportRow): number {
  if (stage.stage_id === "1-5") return 2;
  return 2 + ((stage.stage_number + stage.chapter) % 3);
}

function compositionRule(stage: StageExportRow): string {
  if (stage.stage_id === "1-1") return "tutorial override: 2 enemies, no status, basic attacks only";
  if (stage.stage_id === "1-2") return "tutorial override: 3 enemies, basic attacks only";
  if (stage.stage_id === "1-3") return "tutorial override: 3 enemies introducing archer/mage";
  if (stage.stage_id === "1-5") return "tutorial override: first elite, not a hard wall";
  if (stage.stage_id === "1-10") return "tutorial override: tutorial main boss, no heavy anti-player trait";

  const rules: Record<StageType, string> = {
    normal: "Normal: 3-5 enemies using chapter enemy pool",
    elite: "Elite: 1 elite + 2-4 minions",
    "mini-boss": "Mini-Boss: 1 mini boss + 2-4 minions",
    "main-boss": "Main Boss: 1 main boss + phases + optional minions",
  };
  return rules[stage.stage_type];
}

function buildEnemies(stage: StageExportRow): EnemyCompositionEnemy[] {
  if (stage.stage_type === "normal") {
    return pickEnemyIds(stage, normalEnemyCount(stage)).map((enemy_id) => ({
      enemy_id,
      count: 1,
      role: "minion",
    }));
  }

  if (stage.stage_type === "elite") {
    const [eliteId, ...minionIds] = pickEnemyIds(stage, minionCount(stage) + 1);
    return [
      { enemy_id: eliteId, count: 1, role: "elite" },
      ...minionIds.map((enemy_id) => ({ enemy_id, count: 1, role: "minion" as const })),
    ];
  }

  const minionIds = pickEnemyIds(stage, minionCount(stage));
  return minionIds.map((enemy_id) => ({
    enemy_id,
    count: 1,
    role: "boss_support",
  }));
}

function createCompositionRow(stage: StageExportRow): EnemyCompositionRow {
  const boss_id = bossRows.find((boss) => boss.stage_id === stage.stage_id)?.boss_id;

  return {
    enemy_composition_id: stage.enemy_composition_id,
    stage_id: stage.stage_id,
    chapter: stage.chapter,
    stage_number: stage.stage_number,
    stage_type: stage.stage_type,
    enemies: buildEnemies(stage),
    ...(boss_id ? { boss_id } : {}),
    composition_rule: compositionRule(stage),
    seed: stage.enemy_composition_seed,
    enemy_pool_version: stageGenerationConfig.enemy_pool_version,
    config_version: configMeta.config_version,
  };
}

export const enemyCompositionRows: EnemyCompositionRow[] = stageRows.map(createCompositionRow);

export const enemyCompositionConfig = {
  ...configMeta,
  export_id: "enemy_compositions_config",
  rows: enemyCompositionRows,
  compositionCount: enemyCompositionRows.length,
} as const;
