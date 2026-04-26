import { StageNode } from "@/components/game/StageNode";
import type { StageNode as StageNodeType } from "@/types/game";

type StageMapPathProps = {
  stages: StageNodeType[];
  selectedStageId: string;
  onSelectStage: (stage: StageNodeType) => void;
};

export function StageMapPath({
  stages,
  selectedStageId,
  onSelectStage,
}: StageMapPathProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.16),transparent_35%),linear-gradient(135deg,rgba(15,23,42,0.95),rgba(30,27,75,0.64),rgba(2,6,23,0.95))] p-3">
      <div className="mb-3 flex items-center justify-between px-1">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-200/80">
            Stage Node Map
          </p>
          <h3 className="text-base font-bold text-white">เส้นทางด่านแบบ deterministic</h3>
        </div>
        <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-slate-300">
          {stages.length} nodes
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stages.map((stage) => (
          <StageNode
            key={stage.stage_id}
            onSelect={onSelectStage}
            selected={stage.stage_id === selectedStageId}
            stage={stage}
          />
        ))}
      </div>
      <p className="mt-3 text-xs text-slate-500">
        UI refs: ui_stage_path_line, ui_stage_checkpoint_frame, ui_stage_boss_frame · placeholder
      </p>
    </div>
  );
}
