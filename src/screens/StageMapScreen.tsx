"use client";

import { useMemo, useState } from "react";
import { ChapterProgressCard } from "@/components/game/ChapterProgressCard";
import { ChapterTabs } from "@/components/game/ChapterTabs";
import { DropPreviewPanel } from "@/components/game/DropPreviewPanel";
import { EnemyCompositionPreview } from "@/components/game/EnemyCompositionPreview";
import { StageDetailPanel } from "@/components/game/StageDetailPanel";
import { StageLegend } from "@/components/game/StageLegend";
import { StageMapPath } from "@/components/game/StageMapPath";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { mockPlayer } from "@/data/mockPlayer";
import { mockStages } from "@/data/mockStages";
import type { ChapterId, StageNode } from "@/types/game";
import {
  chapterLore,
  getChapterProgress,
  getChapterStages,
  getNextSuggestedStage,
} from "@/utils/stages";

const chapterIds: ChapterId[] = [1, 2, 3, 4, 5];

export function StageMapScreen() {
  const [chapterId, setChapterId] = useState<ChapterId>(mockPlayer.currentChapter);
  const [selectedStageId, setSelectedStageId] = useState<string>("1-6");

  const stagesByChapter = useMemo(
    () => ({
      1: getChapterStages(mockStages, 1),
      2: getChapterStages(mockStages, 2),
      3: getChapterStages(mockStages, 3),
      4: getChapterStages(mockStages, 4),
      5: getChapterStages(mockStages, 5),
    }),
    [],
  );

  const selectedChapterStages = stagesByChapter[chapterId];
  const nextSuggestedStage = getNextSuggestedStage(selectedChapterStages);
  const selectedStage =
    selectedChapterStages.find((stage) => stage.stage_id === selectedStageId) ??
    nextSuggestedStage;
  const selectedLore = chapterLore[chapterId];
  const totalProgress = getChapterProgress(mockStages);

  function handleSelectChapter(nextChapter: ChapterId) {
    setChapterId(nextChapter);
    setSelectedStageId(getNextSuggestedStage(stagesByChapter[nextChapter]).stage_id);
  }

  function handleSelectStage(stage: StageNode) {
    setSelectedStageId(stage.stage_id);
  }

  return (
    <div className="space-y-4 px-4">
      <GameCard className="overflow-hidden bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.22),transparent_35%),linear-gradient(145deg,rgba(15,23,42,0.95),rgba(30,41,59,0.75),rgba(2,6,23,0.98))]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200/80">
              Stage Map / แผนที่ด่าน
            </p>
            <h1 className="mt-1 text-2xl font-black text-white">Chapter 1-5 V1A Map</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Chapter 1-5 เปิดใน V1A. ข้อมูลด่านสร้างจาก deterministic generator และเป็น mock สำหรับ
              prototype เท่านั้น.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <FeatureLockBadge label="V1A mock only" status="schema-only" />
            <FeatureLockBadge label="No WLD rewards" status="disabled" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            ["Highest cleared", mockPlayer.highestStageCleared],
            ["Effective cap", `Lv${mockPlayer.effectiveLevelCap}`],
            ["Total stages", totalProgress.stageCount],
            ["Launch", mockPlayer.launchStatus],
          ].map(([label, value]) => (
            <div className="rounded-xl border border-white/10 bg-black/20 p-3" key={label}>
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">{label}</p>
              <p className="mt-1 text-sm font-bold text-white">{value}</p>
            </div>
          ))}
        </div>
      </GameCard>

      <GameCard>
        <SectionTitle eyebrow="Chapters" title="Chapter Tabs" />
        <ChapterTabs
          chapters={chapterIds}
          onSelectChapter={handleSelectChapter}
          selectedChapter={chapterId}
          stagesByChapter={stagesByChapter}
        />
      </GameCard>

      <ChapterProgressCard chapter={chapterId} stages={selectedChapterStages} />

      <GameCard className="bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-indigo-950/60">
        <SectionTitle eyebrow={selectedLore.elementTheme} title={`${selectedLore.title} Stage Path`} />
        <StageMapPath
          onSelectStage={handleSelectStage}
          selectedStageId={selectedStage.stage_id}
          stages={selectedChapterStages}
        />
      </GameCard>

      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <StageDetailPanel stage={selectedStage} teamPower={mockPlayer.teamPower} />
        <div className="space-y-4">
          <EnemyCompositionPreview stage={selectedStage} />
          <DropPreviewPanel stage={selectedStage} />
        </div>
      </div>

      <StageLegend />

      <GameCard>
        <SectionTitle eyebrow="Safety / Scope" title="Stage Phase Scope" />
        <div className="grid gap-2 text-sm leading-6 text-slate-300">
          <p>Boss Skill และระบบต่อสู้จริงยังไม่เปิดใน Phase นี้.</p>
          <p>No server-authoritative reward calculation, no backend route, no WLD reward, and no paid feature.</p>
          <p>ยังไม่มีการรัน simulation จริง. Legal/policy review is not claimed.</p>
        </div>
      </GameCard>
    </div>
  );
}
