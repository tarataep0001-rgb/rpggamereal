import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { gachaLogPreview as fallbackLogPreview } from "@/data/mockGacha";
import type { GachaLogPreviewEntry } from "@/engine/gacha";

type GachaLogPreviewProps = {
  logPreview?: GachaLogPreviewEntry | null;
};

export function GachaLogPreview({ logPreview }: GachaLogPreviewProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow="Gacha Log" title="Recovery-safe mock log" />
      {logPreview ? (
        <div className="space-y-2 text-sm leading-6 text-slate-300">
          <p>gacha_log_id: {logPreview.gacha_log_id}</p>
          <p>status: {logPreview.status}</p>
          <p>seed: {logPreview.seed}</p>
          <p>
            result: {logPreview.result_character_id} / {logPreview.result_grade}
          </p>
          <p>odds snapshot: total {logPreview.odds_snapshot.rates_total}%</p>
          <p>
            pity snapshot: {logPreview.pity_snapshot_before.pulls_since_last_rare} -&gt;{" "}
            {logPreview.pity_snapshot_after.pulls_since_last_rare}
          </p>
          <p>
            currency spend snapshot: {logPreview.currency_spend_snapshot.currency} x
            {logPreview.currency_spend_snapshot.single_pull_cost}, spend_applied=false
          </p>
          <p>
            duplicate: {logPreview.is_duplicate ? "yes" : "no"} / shard_gain: {logPreview.shard_gain}
          </p>
          <p>ถ้ามีผลลัพธ์ finalized แล้ว recovery ต้องคืนผลเดิม</p>
        </div>
      ) : (
        <div className="space-y-2 text-sm leading-6 text-slate-300">
          <p>log_id: {fallbackLogPreview.logId}</p>
          <p>status: {fallbackLogPreview.status}</p>
          <p>
            result: {fallbackLogPreview.resultCharacterId} / {fallbackLogPreview.grade}
          </p>
          <p>odds_snapshot: {fallbackLogPreview.oddsSnapshot}</p>
          <p>pity_snapshot_before: {fallbackLogPreview.pitySnapshotBefore}</p>
          <p>currency_spend_snapshot: {fallbackLogPreview.currencySpendSnapshot}</p>
          <p>{fallbackLogPreview.recoveryNote}</p>
        </div>
      )}
    </GameCard>
  );
}
