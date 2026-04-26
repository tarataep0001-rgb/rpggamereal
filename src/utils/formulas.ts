import type {
  CellId,
  Chapter,
  ChapterId,
  EquipmentTemplate,
  FeatureFlagStatus,
  FormationBonus,
  GameCharacter,
  GachaBox,
  GachaPityState,
  GearGrade,
  StageNode,
  StageType,
} from "@/types/game";

const chapterNames: Record<ChapterId, string> = {
  1: "ป่าประกายเพลิง",
  2: "ลุ่มน้ำเถ้าถ่าน",
  3: "หุบเขาศิลา",
  4: "บึงธาราหิน",
  5: "วิหารแสงและเงา",
};

const formationPriority: FormationBonus["id"][] = [
  "front-guard",
  "backline-focus",
  "balanced-line",
  "cross-formation",
  "assassin-spread",
];

export const formationRows: Array<{
  label: "Front" | "Middle" | "Back";
  cells: CellId[];
}> = [
  { label: "Front", cells: ["front_top", "front_center", "front_bottom"] },
  { label: "Middle", cells: ["middle_top", "middle_center", "middle_bottom"] },
  { label: "Back", cells: ["back_top", "back_center", "back_bottom"] },
];

export function getCellLabel(cellId: CellId): string {
  const copy: Record<CellId, string> = {
    front_top: "Front / Top",
    front_center: "Front / Center",
    front_bottom: "Front / Bottom",
    middle_top: "Middle / Top",
    middle_center: "Middle / Center",
    middle_bottom: "Middle / Bottom",
    back_top: "Back / Top",
    back_center: "Back / Center",
    back_bottom: "Back / Bottom",
  };

  return copy[cellId];
}

export function countDeployedUnits(characters: GameCharacter[]): number {
  return characters.filter((character) => Boolean(character.formationCell)).length;
}

export function isMainCharacterDeployed(characters: GameCharacter[]): boolean {
  return characters.some(
    (character) => character.id === "main_hero" && Boolean(character.formationCell),
  );
}

export function findDuplicateCharacterIds(characters: GameCharacter[]): string[] {
  const counts = new Map<string, number>();

  characters.forEach((character) => {
    counts.set(character.id, (counts.get(character.id) ?? 0) + 1);
  });

  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([id]) => id);
}

export function countOrthogonalAdjacency(characters: GameCharacter[]): number {
  const occupied = occupiedCells(characters);
  const adjacencyPairs: [CellId, CellId][] = [
    ["front_top", "front_center"],
    ["front_center", "front_bottom"],
    ["middle_top", "middle_center"],
    ["middle_center", "middle_bottom"],
    ["back_top", "back_center"],
    ["back_center", "back_bottom"],
    ["front_top", "middle_top"],
    ["front_center", "middle_center"],
    ["front_bottom", "middle_bottom"],
    ["middle_top", "back_top"],
    ["middle_center", "back_center"],
    ["middle_bottom", "back_bottom"],
  ];

  return adjacencyPairs.filter(([a, b]) => occupied.has(a) && occupied.has(b)).length;
}

export function formatStageId(chapter: ChapterId, stageNumber: number): string {
  return `${chapter}-${stageNumber}`;
}

export function getGlobalStageIndex(
  chapter: ChapterId,
  stageNumber: number,
): number {
  return ((chapter - 1) * chapter * 10) / 2 + stageNumber;
}

export function getStageType(
  stageNumber: number,
  chapter: ChapterId | number,
): StageType {
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

export function getChapterName(chapter: ChapterId): string {
  return chapterNames[chapter];
}

export function getRecommendedLevel(
  chapter: ChapterId,
  stageNumber: number,
): number {
  return Math.min(50, Math.max(1, chapter * 7 + Math.ceil(stageNumber / 2)));
}

export function getRecommendedPower(
  chapter: ChapterId,
  stageNumber: number,
): number {
  return (
    getRecommendedLevel(chapter, stageNumber) * 1200 +
    getGlobalStageIndex(chapter, stageNumber) * 85
  );
}

export function createChapterStages(
  chapter: Chapter,
  highestStageCleared: string,
): StageNode[] {
  const [clearedChapterRaw, clearedStageRaw] = highestStageCleared
    .split("-")
    .map(Number);
  const clearedChapter = clearedChapterRaw as ChapterId;
  const clearedStage = clearedStageRaw;

  return Array.from({ length: chapter.id * 10 }, (_, index) => {
    const stageNumber = index + 1;
    const stageId = formatStageId(chapter.id, stageNumber);
    const globalStageIndex = getGlobalStageIndex(chapter.id, stageNumber);
    const unlocked =
      chapter.id < clearedChapter ||
      (chapter.id === clearedChapter && stageNumber <= clearedStage + 1);

    return {
      stage_id: stageId,
      chapter: chapter.id,
      stage_number: stageNumber,
      global_stage_index: globalStageIndex,
      recommended_level: getRecommendedLevel(chapter.id, stageNumber),
      recommended_power: getRecommendedPower(chapter.id, stageNumber),
      stage_type: getStageType(stageNumber, chapter.id),
      enemy_composition_id: `enemy_comp_${stageId.replace("-", "_")}`,
      element_theme: chapter.elementTheme,
      drop_table_id: `drop_${stageId.replace("-", "_")}`,
      first_clear_reward_formula:
        "gold = 100 + global_stage_index * 12; free_gem = boss ? 10 : 0",
      star_chest_reward: `star_chest_ch${chapter.id}`,
      unlock_requirement:
        stageNumber === 1
          ? chapter.id === 1
            ? "account_created"
            : `${chapter.id - 1}-${(chapter.id - 1) * 10} cleared`
          : `${chapter.id}-${stageNumber - 1} cleared`,
      stage_generation_version: "v1a-stage-gen-001",
      enemy_composition_seed: `seed_${chapter.id}_${stageNumber}_${globalStageIndex}`,
      enemy_pool_version: "v1a-enemy-pool-001",
      stage_config_version: "v1a-stage-config-001",
      star_rating: unlocked && stageNumber <= clearedStage ? 3 : 0,
      locked: !unlocked,
    };
  });
}

function occupiedCells(characters: GameCharacter[]): Set<CellId> {
  return new Set(
    characters
      .map((character) => character.formationCell)
      .filter((cell): cell is CellId => Boolean(cell)),
  );
}

export function calculateFormationBonus(
  characters: GameCharacter[],
): FormationBonus[] {
  const occupied = occupiedCells(characters);
  const frontCells: CellId[] = ["front_top", "front_center", "front_bottom"];
  const middleCells: CellId[] = [
    "middle_top",
    "middle_center",
    "middle_bottom",
  ];
  const backCells: CellId[] = ["back_top", "back_center", "back_bottom"];
  const crossArms: CellId[] = [
    "front_center",
    "middle_top",
    "middle_bottom",
    "back_center",
  ];
  const adjacencyPairs: [CellId, CellId][] = [
    ["front_top", "front_center"],
    ["front_center", "front_bottom"],
    ["middle_top", "middle_center"],
    ["middle_center", "middle_bottom"],
    ["back_top", "back_center"],
    ["back_center", "back_bottom"],
    ["front_top", "middle_top"],
    ["front_center", "middle_center"],
    ["front_bottom", "middle_bottom"],
    ["middle_top", "back_top"],
    ["middle_center", "back_center"],
    ["middle_bottom", "back_bottom"],
  ];
  const hasAll = (cells: CellId[]) => cells.every((cell) => occupied.has(cell));
  const rowCount = (cells: CellId[]) =>
    cells.filter((cell) => occupied.has(cell)).length;
  const adjacentUnitLinks = adjacencyPairs.filter(
    ([a, b]) => occupied.has(a) && occupied.has(b),
  ).length;

  const candidates: FormationBonus[] = [
    {
      id: "front-guard",
      name: "Front Guard",
      effect: "front row 3 units = DEF +8%, RES +8%",
      priority: 1,
      active: false,
      statModifiers: { DEF: 8, RES: 8 },
    },
    {
      id: "backline-focus",
      name: "Backline Focus",
      effect: "back row 3 units = ATK +6%, MAG +6%",
      priority: 2,
      active: false,
      statModifiers: { ATK: 6, MAG: 6 },
    },
    {
      id: "balanced-line",
      name: "Balanced Line",
      effect: "at least 1 unit in front/middle/back = HP +5%, SPD +3%",
      priority: 3,
      active: false,
      statModifiers: { HP: 5, SPD: 3 },
    },
    {
      id: "cross-formation",
      name: "Cross Formation",
      effect: "middle_center plus 3 cross arms = MP Gain +5%, RES +3%",
      priority: 4,
      active: false,
      statModifiers: { MP_GAIN: 5, RES: 3 },
    },
    {
      id: "assassin-spread",
      name: "Assassin Spread",
      effect: "no more than 2 adjacent links = EVA +5%, CRIT +3%",
      priority: 5,
      active: false,
      statModifiers: { EVA: 5, CRIT: 3 },
    },
  ];

  const activeById: Record<FormationBonus["id"], boolean> =
    occupied.size < 3
      ? {
          "front-guard": false,
          "backline-focus": false,
          "balanced-line": false,
          "cross-formation": false,
          "assassin-spread": false,
        }
      : {
          "front-guard": hasAll(frontCells),
          "backline-focus": hasAll(backCells),
          "balanced-line":
            rowCount(frontCells) > 0 &&
            rowCount(middleCells) > 0 &&
            rowCount(backCells) > 0,
          "cross-formation":
            occupied.has("middle_center") &&
            crossArms.filter((cell) => occupied.has(cell)).length >= 3,
          "assassin-spread": adjacentUnitLinks <= 2,
        };

  const firstActive = formationPriority.find((id) => activeById[id]);

  return candidates.map((bonus) => ({
    ...bonus,
    active: bonus.id === firstActive,
  }));
}

export function getFormationPriorityResult(
  characters: GameCharacter[],
): FormationBonus | null {
  return calculateFormationBonus(characters).find((bonus) => bonus.active) ?? null;
}

export function getActiveFormationBonuses(
  characters: GameCharacter[],
): FormationBonus[] {
  return calculateFormationBonus(characters);
}

export function calculateInventoryUsagePercent(used: number, total: number): number {
  if (total <= 0) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round((used / total) * 100)));
}

export function getGachaPerCharacterRate(
  box: GachaBox,
  grade: Exclude<GearGrade, never>,
): number {
  const count = box.pool.filter((entry) => entry.grade === grade).length;

  if (count === 0) {
    return 0;
  }

  return box.rates[grade] / count;
}

export function getPityDisplay(pityState: GachaPityState): string {
  const pullsUntilGuarantee = pityState.pityLimit - pityState.currentCounter;
  return `${pullsUntilGuarantee} pulls until guaranteed ${pityState.guaranteedGrade}`;
}

export function calculateEquipmentMainStatDisplay(
  template: EquipmentTemplate,
  gearLevelSnapshot: number,
): string {
  const gradeMultiplier: Record<GearGrade, number> = {
    Common: 1,
    Uncommon: 1.35,
    Rare: 1.8,
  };
  const tierBase = template.tier === 1 ? 8 : 18;
  const value = Math.floor(
    (tierBase + gearLevelSnapshot * 1.6) * gradeMultiplier[template.grade],
  );

  return `${template.main_stat_type} +${value}`;
}

export function formatFeatureLockedState(status: FeatureFlagStatus): string {
  const copy: Record<FeatureFlagStatus, string> = {
    enabled: "Enabled",
    disabled: "Disabled",
    "schema-only": "Schema only",
    "internal-test": "Internal test",
  };

  return copy[status];
}

export function getGuildBossHp(guildLevel: number, memberLimit: number): number {
  return 100000 + guildLevel * 25000 + memberLimit * 1500;
}

export function getGuildPointScore(
  damage: number,
  participationBonus: number,
): number {
  return Math.floor(damage / 1000) + participationBonus;
}
