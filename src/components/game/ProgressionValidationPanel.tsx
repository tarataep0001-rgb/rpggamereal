import type { CharacterProgressionResult } from "@/engine/progression";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

type ProgressionValidationPanelProps = {
  progression: CharacterProgressionResult;
};

export function ProgressionValidationPanel({ progression }: ProgressionValidationPanelProps) {
  return (
    <GameCard className="border-sky-300/25">
      <SectionTitle eyebrow="Validation" title="Local progression checks" />
      <div className="mb-3 flex flex-wrap gap-2">
        <FeatureLockBadge label={progression.validation.status} status={progression.validation.status === "pass" ? "enabled" : "disabled"} />
        <FeatureLockBadge label={progression.loadout_validation.status === "pass" ? "Loadout valid" : "Loadout invalid"} status={progression.loadout_validation.status === "pass" ? "enabled" : "disabled"} />
        <FeatureLockBadge label="Local frontend only" status="schema-only" />
      </div>
      <div className="space-y-2 text-xs leading-5 text-slate-300">
        {progression.validation.errors.length === 0 ? <p>No local validation errors.</p> : null}
        {progression.validation.errors.map((error) => <p className="text-rose-100" key={error}>{error}</p>)}
        {progression.validation.warnings.map((warning) => <p className="text-amber-100" key={warning}>{warning}</p>)}
        {progression.loadout_validation.errors.map((error) => <p className="text-rose-100" key={error}>{error}</p>)}
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-400">
        ไม่มี WLD / Paid Gem / ledger ในระบบนี้ และยังไม่ใช่ production authority.
      </p>
    </GameCard>
  );
}
