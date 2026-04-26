import type {
  AdminPanel,
  AdminRole,
  FeatureFlags,
  LaunchGateItem,
  SafetyFlag,
} from "@/types/game";

export const v1aFeatureFlags: FeatureFlags = {
  enableWldWithdraw: false,
  enableWldRewardRanking: false,
  enablePaidGemGacha: false,
  enableBox2: false,
  enableBox3: false,
  enableClass2: false,
  enableClass3: false,
};

export const featureFlagRows = [
  { key: "ENABLE_WLD_WITHDRAW", enabled: false },
  { key: "ENABLE_WLD_REWARD_RANKING", enabled: false },
  { key: "ENABLE_PAID_GEM_GACHA", enabled: false },
  { key: "ENABLE_BOX_2", enabled: false },
  { key: "ENABLE_BOX_3", enabled: false },
  { key: "ENABLE_CLASS_2", enabled: false },
  { key: "ENABLE_CLASS_3", enabled: false },
];

export const adminPanels: AdminPanel[] = [
  { id: "overview", title: "Overview", status: "enabled", detail: "Mock status only" },
  { id: "users", title: "Users", status: "enabled", detail: "Local UI placeholder" },
  {
    id: "wallet-ledger",
    title: "Wallet/Ledger",
    status: "disabled",
    detail: "No real wallet, ledger, or payment logic",
  },
  {
    id: "reward-pools",
    title: "Reward Pools",
    status: "disabled",
    detail: "WLD reward pools disabled",
  },
  {
    id: "withdraw-review",
    title: "Withdraw Review",
    status: "disabled",
    detail: "Withdraw flow disabled",
  },
  {
    id: "gacha-logs",
    title: "Gacha Logs",
    status: "enabled",
    detail: "Mock UI review only",
  },
  {
    id: "battle-logs",
    title: "Battle Logs",
    status: "enabled",
    detail: "Placeholder logs, no battle engine",
  },
  {
    id: "risk-flags",
    title: "Risk Flags",
    status: "enabled",
    detail: "Safety review placeholders",
  },
  {
    id: "config",
    title: "Config",
    status: "schema-only",
    detail: "Export planning only",
  },
  {
    id: "emergency-pause",
    title: "Emergency Pause",
    status: "disabled",
    detail: "Mock controls only",
  },
  {
    id: "audit-logs",
    title: "Audit Logs",
    status: "schema-only",
    detail: "No production audit pipeline",
  },
];

export const safetyFlags: SafetyFlag[] = [
  {
    id: "wld-withdraw",
    label: "WLD Withdraw",
    status: "disabled",
    detail: "Locked off for V1A",
  },
  {
    id: "wld-ranking",
    label: "WLD Reward Ranking",
    status: "disabled",
    detail: "Ranking rewards disabled",
  },
  {
    id: "region",
    label: "Region Default",
    status: "disabled",
    detail: "Restricted for WLD/Paid features; no country automatically allowed",
  },
  {
    id: "policy",
    label: "Policy Placeholders",
    status: "schema-only",
    detail: "Terms, Privacy, Gacha Odds, Paid Gem, WLD, Withdraw, and Risk notices are unreviewed",
  },
  {
    id: "paid-gem",
    label: "Paid Gem Gacha",
    status: "disabled",
    detail: "No paid payment logic",
  },
];

export const policyPlaceholders = [
  { id: "terms", label: "Terms placeholder", reviewed: false },
  { id: "privacy", label: "Privacy placeholder", reviewed: false },
  { id: "gacha-odds", label: "Gacha Odds placeholder", reviewed: false },
  { id: "paid-gem", label: "Paid Gem Notice placeholder", reviewed: false },
  { id: "wld-reward", label: "WLD Reward Notice placeholder", reviewed: false },
  { id: "withdraw", label: "Withdraw Notice placeholder", reviewed: false },
  { id: "risk", label: "Risk Notice placeholder", reviewed: false },
];

export const adminThresholds = {
  goldGrantMax: 50000,
  itemGrantMax: 20,
  freeGemGrantMax: 200,
  ledgerAdjustmentThresholdWldEquivalent: 10,
  roleLimits: {
    support_admin: ["cannot adjust currencies"],
    game_admin: [
      "item grant max 20 units / user / day",
      "Gold grant max 50,000 / user / day",
      "Free Gem grant max 200 / user / day",
      "cannot grant Paid Gem",
      "cannot grant WLD",
    ],
    finance_admin: [
      "ledger adjustment max 10 WLD-equivalent / adjustment",
      "above threshold requires owner_admin confirmation",
    ],
    owner_admin: ["can approve higher-risk changes", "all actions audited"],
    super_admin: ["mock role only in frontend prototype"],
  } satisfies Record<AdminRole, string[]>,
};

export const adminConfigKeys = [
  { key: "ADMIN_GRANT_THRESHOLD_GOLD", value: 50000 },
  { key: "ADMIN_ITEM_GRANT_THRESHOLD", value: 20 },
  { key: "ADMIN_FREE_GEM_GRANT_THRESHOLD", value: 200 },
  { key: "ADMIN_LEDGER_ADJUSTMENT_THRESHOLD_WLD", value: 10 },
] as const;

export const emergencyPauseStates = [
  { key: "pause_withdrawals", enabled: true, detail: "Withdrawals disabled in V1A" },
  { key: "pause_rewards", enabled: false, detail: "Mock reward pause only" },
  { key: "pause_gacha", enabled: false, detail: "Box 1 mock remains display-only" },
  { key: "pause_battles", enabled: false, detail: "No battle engine in this phase" },
  {
    key: "pause_admin_adjustments",
    enabled: true,
    detail: "No real admin adjustment action exists",
  },
] as const;

export const auditEventTypes = [
  "ADMIN_LOGIN",
  "ADMIN_LOGOUT",
  "ADMIN_WITHDRAW_APPROVE",
  "ADMIN_WITHDRAW_REJECT",
  "ADMIN_REWARD_POOL_ADJUST",
  "ADMIN_LEDGER_ADJUST",
  "ADMIN_GACHA_RATE_CHANGE",
  "ADMIN_CONFIG_CHANGE",
  "ADMIN_ITEM_GRANT",
  "ADMIN_USER_BAN",
  "ADMIN_USER_UNBAN",
  "ADMIN_PAUSE_SYSTEM",
  "ADMIN_UNPAUSE_SYSTEM",
  "ADMIN_ROLE_CHANGE",
] as const;

export const auditLogPreview = [
  {
    timestamp: "2026-04-26T10:15:00+07:00",
    adminRole: "owner_admin",
    eventType: "ADMIN_CONFIG_CHANGE",
    target: "feature_flags_config",
    reason: "Verify V1A sensitive flags remain disabled",
    status: "mock-review",
    request_id: "req_mock_admin_001",
  },
  {
    timestamp: "2026-04-26T10:20:00+07:00",
    adminRole: "game_admin",
    eventType: "ADMIN_ITEM_GRANT",
    target: "user:hero",
    reason: "Prototype display row only",
    status: "blocked-mock",
    request_id: "req_mock_admin_002",
  },
  {
    timestamp: "2026-04-26T10:25:00+07:00",
    adminRole: "finance_admin",
    eventType: "ADMIN_LEDGER_ADJUST",
    target: "ledger:none",
    reason: "Ledger disabled in Phase 11",
    status: "blocked-disabled",
    request_id: "req_mock_admin_003",
  },
] as const;

export const launchGateItems: LaunchGateItem[] = [
  {
    id: "implementation",
    label: "Implementation complete",
    status: "NO-GO",
    reason: "Implementation is not complete",
  },
  {
    id: "simulation",
    label: "Simulation suite passed",
    status: "NO-GO",
    reason: "Simulations have not been run",
  },
  {
    id: "policy",
    label: "Policy/legal review",
    status: "NO-GO",
    reason: "Policy/legal review is not completed",
  },
  {
    id: "security",
    label: "Security audit",
    status: "NO-GO",
    reason: "Security audit is not completed",
  },
  {
    id: "launch",
    label: "Production launch gates",
    status: "NO-GO",
    reason: "Production launch gates have not passed",
  },
];
