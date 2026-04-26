import type { GachaBox } from "@/types/game";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";

type GachaPoolCardProps = {
  box: GachaBox;
};

export function GachaPoolCard({ box }: GachaPoolCardProps) {
  return (
    <GameCard>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white">{box.name}</h3>
          <p className="text-sm text-slate-300">{box.currency}</p>
        </div>
        <FeatureLockBadge
          label={box.enabled ? "Box open" : "Box locked"}
          status={box.enabled ? "enabled" : "disabled"}
        />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
        {Object.entries(box.rates).map(([grade, rate]) => (
          <div className="rounded-xl bg-white/5 p-2" key={grade}>
            <p className="text-slate-400">{grade}</p>
            <p className="font-bold text-white">{rate}%</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-400">{box.pityRule}</p>
    </GameCard>
  );
}
