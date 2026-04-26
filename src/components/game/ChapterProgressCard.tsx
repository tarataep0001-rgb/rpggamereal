import { GameCard } from "@/components/ui/GameCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { ChapterId, StageNode } from "@/types/game";
import { formatNumber } from "@/utils/formatting";
import { chapterLore, getChapterProgress } from "@/utils/stages";

type ChapterProgressCardProps = {
  chapter: ChapterId;
  stages: StageNode[];
};

export function ChapterProgressCard({ chapter, stages }: ChapterProgressCardProps) {
  const lore = chapterLore[chapter];
  const progress = getChapterProgress(stages);

  const stats = [
    ["Stages", progress.stageCount],
    ["Normal", progress.normalCount],
    ["Elite", progress.eliteCount],
    ["Mini-Boss", progress.miniBossCount],
    ["Main Boss", progress.mainBossCount],
    ["Stars", `${progress.starsEarned}/${progress.totalStars}`],
  ];

  return (
    <GameCard className="bg-gradient-to-br from-slate-950/90 via-indigo-950/50 to-slate-950/85">
      <SectionTitle eyebrow={lore.elementTheme} title={`Chapter ${chapter} - ${lore.title}`} />
      <p className="text-sm leading-6 text-slate-300">{lore.tone}</p>
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
          <span>Chapter completion</span>
          <span>{progress.completionPercent}%</span>
        </div>
        <ProgressBar value={progress.completionPercent} max={100} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {stats.map(([label, value]) => (
          <div className="rounded-xl border border-white/10 bg-black/20 p-3" key={label}>
            <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">{label}</p>
            <p className="mt-1 text-sm font-bold text-white">
              {typeof value === "number" ? formatNumber(value) : value}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Asset ref: {lore.assetId} · status placeholder
      </p>
    </GameCard>
  );
}
