import type {
  BattleDamageLog,
  BattleResultState,
  BattleStatusLog,
  MockBattleResult,
} from "@/data/mockBattleResult";
import { formatNumber } from "@/utils/formatting";

export function formatBattleResult(result: BattleResultState): string {
  return result === "victory" ? "ชนะ / Victory" : "แพ้ / Defeat";
}

export function formatDamageNumber(value: number): string {
  return formatNumber(value);
}

export function getResultBadgeStyle(result: BattleResultState): string {
  return result === "victory"
    ? "border-amber-300/50 bg-amber-400/15 text-amber-100"
    : "border-rose-300/50 bg-rose-500/15 text-rose-100";
}

export function getStageTypeBattleTone(stageType: string): string {
  const tones: Record<string, string> = {
    normal: "Standard encounter",
    elite: "Elite checkpoint",
    "mini-boss": "Mini-boss checkpoint",
    "main-boss": "Main boss encounter",
  };

  return tones[stageType] ?? "Stage encounter";
}

export function getStatusBadgeLabel(status: BattleStatusLog): string {
  return `${status.status_name} · ${status.result} · ${status.duration}T`;
}

export function getDamageLogTotals(logs: BattleDamageLog[]) {
  return logs.reduce(
    (totals, log) => ({
      finalDamage: totals.finalDamage + log.final_damage,
      shieldDamage: totals.shieldDamage + log.shield_damage,
      actualHpDamage: totals.actualHpDamage + log.actual_hp_damage,
      overkillDamage: totals.overkillDamage + log.overkill_damage,
    }),
    {
      finalDamage: 0,
      shieldDamage: 0,
      actualHpDamage: 0,
      overkillDamage: 0,
    },
  );
}

export function calculateMockStarSummary(result: MockBattleResult) {
  return [
    {
      label: "1 star: clear stage",
      achieved: result.result === "victory",
      detail: "Win condition met.",
    },
    {
      label: "2 stars: clear within 30 turns",
      achieved: result.result === "victory" && result.turns_used <= 30,
      detail: `${result.turns_used}/30 turns used.`,
    },
    {
      label: "3 stars: clear within 18 turns and no more than 1 unit dead",
      achieved: result.stars >= 3,
      detail: "Mock result assumes 0 deployed units dead at battle end.",
    },
  ];
}

export function formatStarCondition(achieved: boolean): string {
  return achieved ? "Achieved" : "Not achieved";
}

export function formatConfigVersionList(result: MockBattleResult): string[] {
  return Object.entries(result.config_versions).map(
    ([key, value]) => `${key}: ${value}`,
  );
}
