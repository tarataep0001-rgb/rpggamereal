import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { regionPolicyStatus } from "@/data/mockPolicy";
import { getPolicyReadinessStatus } from "@/utils/launchGate";

export function RegionPolicyPanel() {
  return (
    <GameCard>
      <div className="flex gap-4">
        <div className="w-16 shrink-0">
          <ItemIconFrame assetId="icon_region_restricted" label="Region restricted" tone="red" />
        </div>
        <div>
          <SectionTitle eyebrow="Region Policy" title="Region default = restricted" />
          <p className="text-sm leading-6 text-slate-300">
            ประเทศที่ยังไม่ review จะไม่เปิดฟีเจอร์ WLD/Paid.
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-slate-300">
        <p>region_policy_config default = {regionPolicyStatus.defaultState}</p>
        <p>reviewed = {String(regionPolicyStatus.reviewed)}</p>
        <p>readiness = {getPolicyReadinessStatus(regionPolicyStatus.reviewed)}</p>
        <p>WLD deposit allowed = {String(regionPolicyStatus.wldDepositAllowed)}</p>
        <p>Paid Gem allowed = {String(regionPolicyStatus.paidGemAllowed)}</p>
        <p>Paid Gem Gacha allowed = {String(regionPolicyStatus.paidGemGachaAllowed)}</p>
        <p>WLD Withdraw allowed = {String(regionPolicyStatus.wldWithdrawAllowed)}</p>
        <p>WLD Ranking allowed = {String(regionPolicyStatus.wldRankingAllowed)}</p>
      </div>
    </GameCard>
  );
}
