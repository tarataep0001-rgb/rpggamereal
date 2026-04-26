import type { MockRiskFlag, RiskSeverity } from "@/data/mockRiskFlags";

export function getRiskSeverityLabel(severity: RiskSeverity): string {
  const labels: Record<RiskSeverity, string> = {
    low: "ความเสี่ยงต่ำ",
    medium: "ความเสี่ยงกลาง",
    high: "ความเสี่ยงสูง",
    critical: "ความเสี่ยงวิกฤต",
  };

  return labels[severity];
}

export function groupRiskFlagsBySeverity(flags: MockRiskFlag[]) {
  return flags.reduce<Record<RiskSeverity, MockRiskFlag[]>>(
    (groups, flag) => {
      groups[flag.severity].push(flag);
      return groups;
    },
    { low: [], medium: [], high: [], critical: [] },
  );
}
