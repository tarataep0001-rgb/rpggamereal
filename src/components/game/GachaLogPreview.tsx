import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { gachaLogPreview } from "@/data/mockGacha";

export function GachaLogPreview() {
  return (
    <GameCard>
      <SectionTitle eyebrow="Gacha Log" title="Recovery-safe mock log" />
      <div className="space-y-2 text-sm leading-6 text-slate-300">
        <p>log_id: {gachaLogPreview.logId}</p>
        <p>status: {gachaLogPreview.status}</p>
        <p>result: {gachaLogPreview.resultCharacterId} / {gachaLogPreview.grade}</p>
        <p>odds_snapshot: {gachaLogPreview.oddsSnapshot}</p>
        <p>pity_snapshot_before: {gachaLogPreview.pitySnapshotBefore}</p>
        <p>currency_spend_snapshot: {gachaLogPreview.currencySpendSnapshot}</p>
        <p>{gachaLogPreview.recoveryNote}</p>
      </div>
    </GameCard>
  );
}
