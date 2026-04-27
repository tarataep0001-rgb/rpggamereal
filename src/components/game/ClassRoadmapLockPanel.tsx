import type { CharacterProgressionResult } from "@/engine/progression";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

type ClassRoadmapLockPanelProps = {
  progression: CharacterProgressionResult;
};

export function ClassRoadmapLockPanel({ progression }: ClassRoadmapLockPanelProps) {
  return (
    <GameCard className="border-rose-300/25">
      <SectionTitle eyebrow="Class Roadmap" title="V1A lock state" />
      <div className="mb-3 flex flex-wrap gap-2">
        <FeatureLockBadge label="Class 1 เปิดใช้งานใน V1A" status="enabled" />
        <FeatureLockBadge label="Class 2 ยังไม่เปิดใน V1A" status="disabled" />
        <FeatureLockBadge label="Class 3 เป็นโครงข้อมูลเท่านั้น" status="schema-only" />
        <FeatureLockBadge label={progression.class_roadmap.production_status} status="disabled" />
      </div>
      <div className="space-y-2 text-sm leading-6 text-slate-300">
        {progression.class_roadmap.notes.map((note) => (
          <p key={note}>{note}</p>
        ))}
      </div>
    </GameCard>
  );
}
