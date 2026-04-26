import type { StageNode } from "@/types/game";

type StageVersionInfoProps = {
  stage: StageNode;
};

export function StageVersionInfo({ stage }: StageVersionInfoProps) {
  const rows = [
    ["stage_generation_version", stage.stage_generation_version],
    ["enemy_composition_seed", stage.enemy_composition_seed],
    ["enemy_pool_version", stage.enemy_pool_version],
    ["stage_config_version", stage.stage_config_version],
  ];

  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
        Snapshot / Version
      </p>
      <div className="space-y-1">
        {rows.map(([label, value]) => (
          <div className="flex justify-between gap-3 text-[11px]" key={label}>
            <span className="text-slate-500">{label}</span>
            <span className="break-all text-right text-slate-300">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
