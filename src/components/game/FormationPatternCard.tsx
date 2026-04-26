import type { FormationBonus } from "@/types/game";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";

const patternAssets: Record<FormationBonus["id"], string> = {
  "front-guard": "icon_formation_front_guard",
  "backline-focus": "icon_formation_backline_focus",
  "balanced-line": "icon_formation_balanced_line",
  "cross-formation": "icon_formation_cross",
  "assassin-spread": "icon_formation_assassin_spread",
};

type FormationPatternCardProps = {
  bonus: FormationBonus;
};

export function FormationPatternCard({ bonus }: FormationPatternCardProps) {
  return (
    <article
      className={`rounded-2xl border p-3 ${
        bonus.active
          ? "border-amber-300/40 bg-amber-400/10"
          : "border-white/10 bg-white/5"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-slate-400">
            Priority {bonus.priority} / asset_id: {patternAssets[bonus.id]}
          </p>
          <h3 className="mt-1 font-black text-white">{bonus.name}</h3>
        </div>
        <FeatureLockBadge
          label={bonus.active ? "Active" : "Inactive"}
          status={bonus.active ? "enabled" : "schema-only"}
        />
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{bonus.effect}</p>
      <div className="mt-3 grid grid-cols-3 gap-1 text-center text-[10px] text-slate-400">
        <span className="rounded bg-white/5 py-1">Top</span>
        <span className="rounded bg-white/5 py-1">Center</span>
        <span className="rounded bg-white/5 py-1">Bottom</span>
      </div>
    </article>
  );
}
