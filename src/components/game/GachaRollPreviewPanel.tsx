import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { GachaEngineResult } from "@/engine/gacha";

type GachaRollPreviewPanelProps = {
  preview: GachaEngineResult | null;
  onPreviewPull: () => void;
  onResetPity: () => void;
  onClearPreview: () => void;
};

export function GachaRollPreviewPanel({
  preview,
  onClearPreview,
  onPreviewPull,
  onResetPity,
}: GachaRollPreviewPanelProps) {
  return (
    <GameCard className="border-amber-300/20 bg-gradient-to-br from-slate-950 via-violet-950/45 to-slate-950">
      <div className="flex items-start justify-between gap-3">
        <SectionTitle eyebrow="Gacha Roll Preview" title="ระบบกาชา" />
        <FeatureLockBadge label="local mock preview" status="schema-only" />
      </div>
      <div className="mt-3 grid gap-2 text-sm text-slate-300">
        <p>กาชา Box 1 เปิดใน V1A</p>
        <p>ใช้ Free/Test Gem เท่านั้น</p>
        <p>ระบบนี้เป็น local mock preview เท่านั้น</p>
      </div>
      {preview ? (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <p className="text-xs text-slate-500">selected box</p>
            <p className="break-words text-sm font-bold text-white">{preview.box_id}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <p className="text-xs text-slate-500">seed</p>
            <p className="break-words text-sm font-bold text-amber-100">{preview.seed}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <p className="text-xs text-slate-500">result grade</p>
            <p className="text-sm font-bold text-white">{preview.result.grade}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <p className="text-xs text-slate-500">single pull only</p>
            <p className="text-sm font-bold text-white">enabled mock</p>
          </div>
        </div>
      ) : (
        <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-slate-300">
          No current mock pull preview.
        </p>
      )}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <button
          className="rounded-xl border border-amber-300/40 bg-amber-400/15 px-3 py-2 text-xs font-bold text-amber-100"
          onClick={onPreviewPull}
          type="button"
        >
          Preview pull
        </button>
        <button
          className="rounded-xl border border-sky-300/30 bg-sky-400/10 px-3 py-2 text-xs font-bold text-sky-100"
          onClick={onResetPity}
          type="button"
        >
          Reset pity
        </button>
        <button
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-200"
          onClick={onClearPreview}
          type="button"
        >
          Clear
        </button>
      </div>
    </GameCard>
  );
}
