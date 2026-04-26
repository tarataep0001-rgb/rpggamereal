import type { CellId, GameCharacter } from "@/types/game";
import { getCellLabel } from "@/utils/formulas";
import { FormationUnitCard } from "./FormationUnitCard";

type FormationCellProps = {
  cellId: CellId;
  unit?: GameCharacter;
};

export function FormationCell({ cellId, unit }: FormationCellProps) {
  const rowTone = cellId.startsWith("front")
    ? "border-amber-300/25 bg-amber-400/10"
    : cellId.startsWith("middle")
      ? "border-violet-300/25 bg-violet-400/10"
      : "border-sky-300/25 bg-sky-400/10";

  return (
    <div className={`min-h-28 rounded-2xl border p-2 ${rowTone}`}>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-300">
        {cellId}
      </p>
      <p className="text-[10px] text-slate-500">{getCellLabel(cellId)}</p>
      {unit ? (
        <div className="mt-2">
          <FormationUnitCard compact unit={unit} />
        </div>
      ) : (
        <div className="mt-3 rounded-xl border border-dashed border-white/10 bg-black/15 p-3 text-center text-xs text-slate-500">
          Empty cell
        </div>
      )}
    </div>
  );
}
