import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { StageNode } from "@/types/game";

type DropPreviewPanelProps = {
  stage: StageNode;
};

const materialDrops = ["Gold", "XP", "Enhancement Powder", "Skill Book Shard"];

export function DropPreviewPanel({ stage }: DropPreviewPanelProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow="Drops" title="Drop Preview" />
      <div className="rounded-xl border border-white/10 bg-black/20 p-3">
        <p className="text-xs text-slate-500">drop_table_id</p>
        <p className="break-all text-sm font-semibold text-white">{stage.drop_table_id}</p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {materialDrops.map((drop) => (
          <span
            className="rounded-full border border-sky-300/20 bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-100"
            key={drop}
          >
            {drop}
          </span>
        ))}
      </div>
      <div className="mt-3 space-y-2 text-xs leading-5 text-slate-300">
        <p>Normal gear max Rare. Epic gear ไม่ดรอปปกติใน V1A.</p>
        <p>StarChest: {stage.star_chest_reward}</p>
        <p>First Clear รับได้ครั้งเดียว. Replay rewards use cap/snapshot later.</p>
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Reward icons: icon_drop_gold, icon_drop_xp, icon_drop_gear, icon_drop_star_chest · placeholder
      </p>
    </GameCard>
  );
}
