import type { GameCharacter } from "@/types/game";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { FormationUnitCard } from "./FormationUnitCard";

type AvailableUnitCardProps = {
  unit: GameCharacter;
};

export function AvailableUnitCard({ unit }: AvailableUnitCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-3">
      <FormationUnitCard unit={unit} />
      <div className="mt-3 flex flex-wrap gap-2">
        <FeatureLockBadge
          label={unit.formationCell ? "Deployed" : "Undeployed"}
          status={unit.formationCell ? "enabled" : "schema-only"}
        />
      </div>
    </article>
  );
}
