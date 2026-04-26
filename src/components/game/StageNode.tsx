import type { StageNode as StageNodeType } from "@/types/game";
import { formatLocked, formatNumber } from "@/utils/formatting";
import { getStageStatus, stageTypeLabel } from "@/utils/stages";

type StageNodeProps = {
  stage: StageNodeType;
  selected?: boolean;
  onSelect?: (stage: StageNodeType) => void;
};

const typeClasses: Record<StageNodeType["stage_type"], string> = {
  normal: "border-sky-300/25 bg-sky-400/10",
  elite: "border-violet-300/35 bg-violet-400/10",
  "mini-boss": "border-amber-300/40 bg-amber-400/10",
  "main-boss": "border-rose-300/40 bg-rose-400/10",
} as const;

const statusClasses = {
  completed: "ring-1 ring-emerald-300/50",
  unlocked: "ring-1 ring-sky-300/40",
  locked: "opacity-55",
};

export function StageNode({ stage, selected = false, onSelect }: StageNodeProps) {
  const status = getStageStatus(stage);
  const stars = "★".repeat(stage.star_rating).padEnd(3, "☆");

  return (
    <button
      className={`w-full rounded-2xl border p-3 text-left transition ${typeClasses[stage.stage_type]} ${
        statusClasses[status]
      } ${selected ? "scale-[1.01] border-amber-200 shadow-lg shadow-amber-950/30" : ""}`}
      onClick={() => onSelect?.(stage)}
      type="button"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-white">{stage.stage_id}</h3>
        <span className="rounded-full bg-black/25 px-2 py-1 text-[11px] text-slate-200">
          {stageTypeLabel[stage.stage_type]}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300">
        <span>Lv {stage.recommended_level}</span>
        <span>Power {formatNumber(stage.recommended_power)}</span>
        <span className="text-amber-100">{stars}</span>
        <span>{formatLocked(stage.locked)}</span>
      </div>
      <p className="mt-2 text-xs text-slate-400">{stage.element_theme}</p>
      {stage.tutorial_override ? (
        <p className="mt-2 rounded-lg bg-amber-400/10 px-2 py-1 text-xs text-amber-100">
          Tutorial
        </p>
      ) : null}
    </button>
  );
}
