import type { StatBlock } from "@/types/game";
import { StatBadge } from "@/components/ui/StatBadge";

type StatGridProps = {
  stats: StatBlock;
};

const statOrder: Array<keyof StatBlock> = [
  "HP",
  "ATK",
  "MAG",
  "DEF",
  "RES",
  "SPD",
  "ACC",
  "EVA",
  "CRIT",
  "CRIT_DMG",
];

export function StatGrid({ stats }: StatGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {statOrder.map((key) => (
        <StatBadge key={key} label={key} value={stats[key]} tone="purple" />
      ))}
    </div>
  );
}
