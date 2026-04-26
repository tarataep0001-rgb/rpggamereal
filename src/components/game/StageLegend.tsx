import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

const legendItems = [
  ["Normal", "standard stage node"],
  ["Elite", "x-5 non-boss checkpoint"],
  ["Mini-Boss", "earlier x-10 boss checkpoint"],
  ["Main Boss", "final stage of each chapter"],
  ["Locked", "requires previous stage clear"],
  ["Completed", "mock 3-star cleared state"],
  ["3-star", "StarChest eligible once"],
  ["Tutorial", "early-stage override indicator"],
];

export function StageLegend() {
  return (
    <GameCard>
      <SectionTitle eyebrow="Legend" title="Stage Legend" />
      <div className="grid grid-cols-2 gap-2">
        {legendItems.map(([label, detail]) => (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3" key={label}>
            <p className="text-sm font-bold text-white">{label}</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">{detail}</p>
          </div>
        ))}
      </div>
    </GameCard>
  );
}
