import { createConfigMeta } from "@/config/meta";
import type { CellId } from "@/types/game";

export type FormationConfigRow = {
  formation_id: string;
  name: string;
  priority: number;
  condition: string[];
  required_cells?: CellId[];
  one_of_each_row?: boolean;
  cross_anchor?: CellId;
  cross_required_from?: CellId[];
  cross_required_count?: number;
  max_orthogonal_adjacency?: number;
  min_team_size_for_bonus: number;
  bonuses: Array<{ stat: string; value: number; label: string }>;
  asset_id: string;
  live_in_v1a: true;
  config_version: string;
};

export const canonicalFormationCells: CellId[] = [
  "front_top",
  "front_center",
  "front_bottom",
  "middle_top",
  "middle_center",
  "middle_bottom",
  "back_top",
  "back_center",
  "back_bottom",
];

export const formationConfigRows: FormationConfigRow[] = [
  {
    formation_id: "front_guard",
    name: "Front Guard",
    priority: 1,
    condition: ["front_top, front_center, front_bottom occupied"],
    required_cells: ["front_top", "front_center", "front_bottom"],
    min_team_size_for_bonus: 3,
    bonuses: [
      { stat: "DEF", value: 0.08, label: "DEF +8%" },
      { stat: "RES", value: 0.08, label: "RES +8%" },
    ],
    asset_id: "icon_formation_front_guard",
    live_in_v1a: true,
    config_version: "v1a.formation.front_guard.0",
  },
  {
    formation_id: "backline_focus",
    name: "Backline Focus",
    priority: 2,
    condition: ["back_top, back_center, back_bottom occupied"],
    required_cells: ["back_top", "back_center", "back_bottom"],
    min_team_size_for_bonus: 3,
    bonuses: [
      { stat: "ATK", value: 0.06, label: "ATK +6%" },
      { stat: "MAG", value: 0.06, label: "MAG +6%" },
    ],
    asset_id: "icon_formation_backline_focus",
    live_in_v1a: true,
    config_version: "v1a.formation.backline_focus.0",
  },
  {
    formation_id: "balanced_line",
    name: "Balanced Line",
    priority: 3,
    condition: [
      "at least 1 unit in front row",
      "at least 1 unit in middle row",
      "at least 1 unit in back row",
    ],
    one_of_each_row: true,
    min_team_size_for_bonus: 3,
    bonuses: [
      { stat: "HP", value: 0.05, label: "HP +5%" },
      { stat: "SPD", value: 0.03, label: "SPD +3%" },
    ],
    asset_id: "icon_formation_balanced_line",
    live_in_v1a: true,
    config_version: "v1a.formation.balanced_line.0",
  },
  {
    formation_id: "cross_formation",
    name: "Cross Formation",
    priority: 4,
    condition: [
      "middle_center occupied",
      "plus at least 3 of front_center, middle_top, middle_bottom, back_center",
    ],
    cross_anchor: "middle_center",
    cross_required_from: ["front_center", "middle_top", "middle_bottom", "back_center"],
    cross_required_count: 3,
    min_team_size_for_bonus: 4,
    bonuses: [
      { stat: "MP_GAIN", value: 0.05, label: "MP Gain +5%" },
      { stat: "RES", value: 0.03, label: "RES +3%" },
    ],
    asset_id: "icon_formation_cross",
    live_in_v1a: true,
    config_version: "v1a.formation.cross_formation.0",
  },
  {
    formation_id: "assassin_spread",
    name: "Assassin Spread",
    priority: 5,
    condition: ["no more than 2 allied units orthogonally adjacent"],
    max_orthogonal_adjacency: 2,
    min_team_size_for_bonus: 3,
    bonuses: [
      { stat: "EVA", value: 0.05, label: "EVA +5%" },
      { stat: "CRIT", value: 0.03, label: "CRIT +3%" },
    ],
    asset_id: "icon_formation_assassin_spread",
    live_in_v1a: true,
    config_version: "v1a.formation.assassin_spread.0",
  },
];

export const formationConfig = {
  ...createConfigMeta({
    configKey: "formation_config",
    status: "validated_mock",
    notes:
      "Formation config exports canonical cells and 5 V1A formation patterns. Real battle use must be server-authoritative later.",
  }),
  export_id: "formation_config",
  canonicalCells: canonicalFormationCells,
  cellRules: {
    oneCellCanHoldAtMostOneUnit: true,
    teamSizeMin: 1,
    teamSizeMax: 6,
    mainCharacterMandatory: true,
    noDuplicateCharacterId: true,
    formationChangesOutsideBattleOnly: true,
    formationSnapshotCapturedAtBattleStart: true,
    fewerThanThreeUnitsNoPatternBonus: true,
  },
  priority: formationConfigRows.map((row) => row.name),
  rows: formationConfigRows,
} as const;
