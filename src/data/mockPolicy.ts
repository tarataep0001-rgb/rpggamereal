export const regionPolicyStatus = {
  config_id: "region_policy_config_default",
  defaultState: "restricted",
  reviewed: false,
  wldDepositAllowed: false,
  paidGemAllowed: false,
  paidGemGachaAllowed: false,
  wldWithdrawAllowed: false,
  wldRankingAllowed: false,
  note: "missing / unknown / not reviewed = restricted; no country automatically allowed for WLD/Paid features",
} as const;

export const policyDocuments = [
  "Terms of Service",
  "Privacy Notice",
  "Gacha Odds Notice",
  "Paid Gem Notice",
  "WLD Reward Notice",
  "Withdraw Notice",
  "Risk Notice",
].map((name) => ({
  id: name.toLowerCase().replaceAll(" ", "_"),
  name,
  status: "placeholder",
  reviewed: false,
  version: "draft",
  requiredBefore: "relevant feature goes live",
}));
