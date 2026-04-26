import { mockPlayer } from "@/data/mockPlayer";
import { formatNumber } from "@/utils/formatting";

export function TopStatusBar() {
  return (
    <div className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 px-4 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-between gap-3">
        <div>
          <p className="text-xs text-slate-400">RPG V1A Prototype</p>
          <p className="text-sm font-bold text-white">
            {mockPlayer.playerName} / Lv {mockPlayer.level}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="rounded-full bg-amber-400/15 px-2 py-1 text-amber-100">
            Gold {formatNumber(mockPlayer.gold)}
          </span>
          <span className="rounded-full bg-sky-400/15 px-2 py-1 text-sky-100">
            Free {formatNumber(mockPlayer.freeGem)}
          </span>
        </div>
      </div>
    </div>
  );
}
