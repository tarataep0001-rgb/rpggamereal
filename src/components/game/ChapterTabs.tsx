import type { ChapterId, StageNode } from "@/types/game";
import { chapterLore, getChapterProgress } from "@/utils/stages";

type ChapterTabsProps = {
  chapters: ChapterId[];
  selectedChapter: ChapterId;
  stagesByChapter: Record<ChapterId, StageNode[]>;
  onSelectChapter: (chapter: ChapterId) => void;
};

export function ChapterTabs({
  chapters,
  selectedChapter,
  stagesByChapter,
  onSelectChapter,
}: ChapterTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {chapters.map((chapterId) => {
        const lore = chapterLore[chapterId];
        const progress = getChapterProgress(stagesByChapter[chapterId]);
        const isActive = chapterId === selectedChapter;
        const isLocked = progress.completedCount === 0 && chapterId > 1;

        return (
          <button
            className={`min-w-48 rounded-2xl border p-3 text-left transition ${
              isActive
                ? "border-amber-300/60 bg-amber-300 text-slate-950 shadow-lg shadow-amber-900/25"
                : "border-white/10 bg-white/5 text-slate-200"
            }`}
            key={chapterId}
            onClick={() => onSelectChapter(chapterId)}
            type="button"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold">Chapter {chapterId}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  isActive ? "bg-slate-950/15" : "bg-black/30 text-slate-300"
                }`}
              >
                {isLocked ? "Locked path" : "V1A"}
              </span>
            </div>
            <p className="mt-1 text-sm font-bold">{lore.title}</p>
            <p className={`mt-1 text-xs ${isActive ? "text-slate-800" : "text-slate-400"}`}>
              {lore.elementTheme} · {progress.stageCount} stages · {progress.bossCheckpointCount} bosses
            </p>
          </button>
        );
      })}
    </div>
  );
}
