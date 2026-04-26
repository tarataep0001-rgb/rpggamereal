import type { GameCharacter } from "@/types/game";

type FormationUnitCardProps = {
  unit: GameCharacter;
  compact?: boolean;
};

export function FormationUnitCard({ unit, compact = false }: FormationUnitCardProps) {
  const isMain = unit.id === "main_hero";
  const isStarterPriest = unit.id === "ch_common_priest_light_aid";

  return (
    <div
      className={`rounded-xl border p-2 ${
        isMain
          ? "border-amber-300/50 bg-amber-400/15"
          : isStarterPriest
            ? "border-sky-300/40 bg-sky-400/10"
            : "border-white/10 bg-slate-950/80"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className={`${compact ? "text-xs" : "text-sm"} truncate font-bold text-white`}>
            {unit.displayName}
          </p>
          <p className="truncate text-[10px] text-slate-400">{unit.id}</p>
        </div>
        <span className="rounded-full bg-black/25 px-2 py-1 text-[10px] text-amber-100">
          {unit.grade}
        </span>
      </div>
      {!compact ? (
        <div className="mt-2 grid grid-cols-2 gap-1 text-[11px] text-slate-300">
          <span>{unit.baseClass}</span>
          <span>{unit.element}</span>
          <span>{unit.role}</span>
          <span>Lv {unit.level}</span>
          <span>{unit.star === "none-v1a" ? "No Star" : `Star ${unit.star}`}</span>
          <span>{unit.formationCell ? "Deployed" : "Reserve"}</span>
        </div>
      ) : (
        <p className="mt-1 text-[10px] text-slate-300">
          {unit.baseClass} / Lv {unit.level}
        </p>
      )}
    </div>
  );
}
