export type RiskSeverity = "low" | "medium" | "high" | "critical";

export type MockRiskFlag = {
  id: string;
  label: string;
  severity: RiskSeverity;
  recommendedAction: string;
  mockCount: number;
  lastSeen: string;
  status: "open" | "reviewing" | "blocked" | "monitoring";
  asset_id: string;
};

export const riskSeverityRules: Record<RiskSeverity, string> = {
  low: "log only",
  medium: "manual review",
  high: "temporary hold / withdraw hold",
  critical: "block feature / account review",
};

export const mockRiskFlags: MockRiskFlag[] = [
  {
    id: "impossible_damage",
    label: "impossible_damage",
    severity: "critical",
    recommendedAction: "block feature / account review",
    mockCount: 0,
    lastSeen: "not seen in mock",
    status: "blocked",
    asset_id: "icon_risk_impossible_damage",
  },
  {
    id: "impossible_turns",
    label: "impossible_turns",
    severity: "high",
    recommendedAction: "temporary hold / withdraw hold",
    mockCount: 0,
    lastSeen: "not seen in mock",
    status: "monitoring",
    asset_id: "icon_risk_high",
  },
  {
    id: "abnormal_replay_rate",
    label: "abnormal_replay_rate",
    severity: "medium",
    recommendedAction: "manual review",
    mockCount: 2,
    lastSeen: "2026-04-26 mock",
    status: "reviewing",
    asset_id: "icon_risk_medium",
  },
  {
    id: "multi_account_pattern",
    label: "multi_account_pattern",
    severity: "high",
    recommendedAction: "temporary hold / account review",
    mockCount: 1,
    lastSeen: "2026-04-26 mock",
    status: "reviewing",
    asset_id: "icon_risk_multi_account",
  },
  {
    id: "withdrawal_risk",
    label: "withdrawal_risk",
    severity: "high",
    recommendedAction: "withdraw hold",
    mockCount: 0,
    lastSeen: "disabled in V1A",
    status: "blocked",
    asset_id: "icon_risk_withdrawal",
  },
  {
    id: "gacha_abuse",
    label: "gacha_abuse",
    severity: "medium",
    recommendedAction: "manual review by threshold",
    mockCount: 1,
    lastSeen: "2026-04-26 mock",
    status: "monitoring",
    asset_id: "icon_risk_gacha_abuse",
  },
  {
    id: "leaderboard_reroll",
    label: "leaderboard_reroll",
    severity: "medium",
    recommendedAction: "manual review by threshold",
    mockCount: 0,
    lastSeen: "ranking disabled in V1A",
    status: "blocked",
    asset_id: "icon_risk_medium",
  },
];
