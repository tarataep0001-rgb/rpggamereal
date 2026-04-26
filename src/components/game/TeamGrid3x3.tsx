import type { CellId, GameCharacter } from "@/types/game";

const cells: CellId[] = [
  "front_top",
  "middle_top",
  "back_top",
  "front_center",
  "middle_center",
  "back_center",
  "front_bottom",
  "middle_bottom",
  "back_bottom",
];

type TeamGrid3x3Props = {
  characters: GameCharacter[];
};

export function TeamGrid3x3({ characters }: TeamGrid3x3Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {cells.map((cell) => {
        const character = characters.find((item) => item.formationCell === cell);

        return (
          <div
            className={`min-h-24 rounded-2xl border p-2 ${
              character
                ? "border-amber-300/40 bg-amber-400/10"
                : "border-white/10 bg-slate-900/80"
            }`}
            key={cell}
          >
            <p className="text-[10px] font-semibold uppercase text-slate-400">
              {cell}
            </p>
            {character ? (
              <div className="mt-2">
                <p className="text-sm font-bold text-white">
                  {character.displayName}
                </p>
                <p className="text-xs text-slate-300">{character.role}</p>
              </div>
            ) : (
              <p className="mt-4 text-xs text-slate-500">Empty</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
