import type { GameCharacter } from "@/types/game";
import { formationRows } from "@/utils/formulas";
import { FormationCell } from "./FormationCell";

type FormationBoardProps = {
  units: GameCharacter[];
};

export function FormationBoard({ units }: FormationBoardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,.92),rgba(30,27,75,.66))] p-3">
      <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
        <span>asset_id: bg_formation_board_dark_fantasy</span>
        <span>status: placeholder</span>
      </div>
      <div className="space-y-3">
        {formationRows.map((row) => (
          <section key={row.label}>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-black text-white">{row.label} Row</p>
              <p className="text-xs text-slate-400">{row.cells.join(", ")}</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {row.cells.map((cellId) => (
                <FormationCell
                  cellId={cellId}
                  key={cellId}
                  unit={units.find((unit) => unit.formationCell === cellId)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
