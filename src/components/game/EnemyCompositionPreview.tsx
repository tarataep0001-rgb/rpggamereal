import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { StageNode } from "@/types/game";
import { getBossId, getEnemyCompositionSummary, stageTypeLabel } from "@/utils/stages";

type EnemyCompositionPreviewProps = {
  stage: StageNode;
};

export function EnemyCompositionPreview({ stage }: EnemyCompositionPreviewProps) {
  const bossId = getBossId(stage);

  return (
    <GameCard>
      <SectionTitle eyebrow="Enemy Preview" title="Enemy Composition Preview" />
      <div className="space-y-2 text-sm text-slate-300">
        <p>
          <span className="text-slate-500">composition:</span>{" "}
          <span className="font-semibold text-white">{stage.enemy_composition_id}</span>
        </p>
        <p>
          <span className="text-slate-500">type:</span> {stageTypeLabel[stage.stage_type]}
        </p>
        <p>
          <span className="text-slate-500">summary:</span> {getEnemyCompositionSummary(stage)}
        </p>
        {bossId ? (
          <p>
            <span className="text-slate-500">boss_id:</span>{" "}
            <span className="font-semibold text-amber-100">{bossId}</span>
          </p>
        ) : null}
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">
        Boss Skill และระบบต่อสู้จริงยังไม่เปิดใน Phase นี้. This preview is frontend-only mock data.
      </p>
    </GameCard>
  );
}
