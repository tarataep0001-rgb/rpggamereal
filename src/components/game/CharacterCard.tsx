import type { GameCharacter } from "@/types/game";
import { GameCard } from "@/components/ui/GameCard";
import { StatBadge } from "@/components/ui/StatBadge";

type CharacterCardProps = {
  character: GameCharacter;
};

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <GameCard>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-200">
            {character.grade} / {character.element} / {character.baseClass}
          </p>
          <h3 className="mt-1 text-xl font-black text-white">
            {character.displayName}
          </h3>
          <p className="text-sm text-slate-300">{character.displayNameTh}</p>
        </div>
        <div className="rounded-2xl border border-violet-300/30 bg-violet-400/10 px-3 py-2 text-center">
          <p className="text-[10px] uppercase text-violet-100/70">Power</p>
          <p className="font-bold text-violet-100">{character.power}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <StatBadge label="Lv" value={character.level} tone="gold" />
        <StatBadge label="Role" value={character.role} tone="blue" />
        <StatBadge
          label="Cell"
          value={character.formationCell ?? "Reserve"}
          tone="purple"
        />
      </div>
    </GameCard>
  );
}
