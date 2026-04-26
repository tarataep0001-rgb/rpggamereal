import { StageVersionInfo } from "@/components/game/StageVersionInfo";
import { TutorialOverrideBadge } from "@/components/game/TutorialOverrideBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { StageNode } from "@/types/game";
import { formatNumber } from "@/utils/formatting";
import { getStageStatus, stageTypeLabel } from "@/utils/stages";

type StageDetailPanelProps = {
  stage: StageNode;
  teamPower: number;
};

export function StageDetailPanel({ stage, teamPower }: StageDetailPanelProps) {
  const status = getStageStatus(stage);
  const underpowered = teamPower < stage.recommended_power;

  const detailRows = [
    ["stage_id", stage.stage_id],
    ["stage_type", stageTypeLabel[stage.stage_type]],
    ["global_stage_index", stage.global_stage_index],
    ["recommended_level", `Lv ${stage.recommended_level}`],
    ["recommended_power", formatNumber(stage.recommended_power)],
    ["enemy_composition_id", stage.enemy_composition_id],
    ["element_theme", stage.element_theme],
    ["drop_table_id", stage.drop_table_id],
    ["unlock_requirement", stage.unlock_requirement],
    ["star_chest_reward", stage.star_chest_reward],
  ];

  return (
    <GameCard>
      <div className="flex items-start justify-between gap-3">
        <SectionTitle eyebrow="Selected Stage" title={`${stage.stage_id} · ${stageTypeLabel[stage.stage_type]}`} />
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            status === "completed"
              ? "bg-emerald-400/15 text-emerald-100"
              : status === "unlocked"
                ? "bg-sky-400/15 text-sky-100"
                : "bg-rose-400/15 text-rose-100"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="grid gap-2">
        {detailRows.map(([label, value]) => (
          <div
            className="flex justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs"
            key={label}
          >
            <span className="text-slate-500">{label}</span>
            <span className="break-all text-right font-semibold text-slate-200">{value}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl border border-violet-300/20 bg-violet-400/10 p-3 text-xs leading-5 text-violet-100">
        <p className="font-semibold">First Clear</p>
        <p>{stage.first_clear_reward_formula}</p>
        <p className="mt-1 text-violet-200/80">
          First Clear รับได้ครั้งเดียว · StarChest รับได้ครั้งเดียวเมื่อทำ 3 ดาวครั้งแรก
        </p>
      </div>

      {underpowered ? (
        <p className="mt-3 rounded-xl border border-amber-300/30 bg-amber-400/10 p-3 text-xs text-amber-100">
          Team Power {formatNumber(teamPower)} is below recommended power. This is a mock warning only.
        </p>
      ) : null}

      <div className="mt-3">
        <TutorialOverrideBadge note={stage.tutorial_override} />
      </div>
      <div className="mt-3">
        <StageVersionInfo stage={stage} />
      </div>
    </GameCard>
  );
}
